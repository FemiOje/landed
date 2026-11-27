// Vercel Function: receives Insider Map sign-ups from the form on the home page and emails each one to Landed.
//
// TODO: not live yet. SMTP_USER and SMTP_PASS still need setting in Vercel (waiting on the client's mailbox and
// App Password). Until then every sign-up gets the 503 / WhatsApp fallback described below.
//
// Mail goes out through Google's SMTP server (Gmail / Google Workspace, which the privacy policy already lists),
// signed in as the mailbox below. Set these in the Vercel project (Settings → Environment Variables):
//   SMTP_USER        the Google account that sends the email, e.g. the Landed mailbox
//   SMTP_PASS        a 16-character App Password for that account (needs 2-Step Verification), not its real password
//   SMTP_HOST/PORT   optional; default to smtp.gmail.com:465
//   INSIDER_MAP_TO   optional; who receives sign-ups. Defaults to COMPANY.email in src/config.js
// Without SMTP_USER and SMTP_PASS every sign-up gets a 503 and the form asks the visitor to message on WhatsApp
// instead, so nothing is silently lost.

import nodemailer from 'nodemailer'
import { COMPANY } from '../src/config.js'

const MAX_BODY_BYTES = 4096
const MAX_FIELD_LENGTH = 200
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE = /^(\d{2})\/(\d{2})\/(\d{4})$/
// Line breaks and other control characters have no place in these fields, and would let someone tamper with the
// email's subject or headers.
// oxlint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/

function json(body, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

// DD/MM/YYYY to a Date, or null if it isn't a real calendar date (e.g. 31/02/2026).
function parseDate(value) {
  const match = DATE.exec(value)
  if (!match) return null
  const [, day, month, year] = match.map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCDate() === day && date.getUTCMonth() === month - 1 ? date : null
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function readField(entry, name) {
  const value = entry?.[name]
  return typeof value === 'string' ? value.trim() : ''
}

export function validate(entry) {
  const fields = {
    name: readField(entry, 'name'),
    email: readField(entry, 'email'),
    arriving: readField(entry, 'arriving'),
    leaving: readField(entry, 'leaving'),
  }
  const errors = []

  for (const [key, value] of Object.entries(fields)) {
    if (!value) errors.push(`${key} is required`)
    else if (value.length > MAX_FIELD_LENGTH) errors.push(`${key} is too long`)
    else if (CONTROL_CHARS.test(value)) errors.push(`${key} contains invalid characters`)
  }
  if (fields.email && !EMAIL.test(fields.email)) errors.push('email is not valid')

  const arriving = fields.arriving && parseDate(fields.arriving)
  const leaving = fields.leaving && parseDate(fields.leaving)
  if (fields.arriving && !arriving) errors.push('arriving must be a date as DD/MM/YYYY')
  if (fields.leaving && !leaving) errors.push('leaving must be a date as DD/MM/YYYY')
  if (arriving && leaving && leaving < arriving) errors.push('leaving must not be before arriving')

  return { fields, errors }
}

// Reply-To is the visitor, so replying to the email goes straight to them with their guide.
export function signupEmail({ name, email, arriving, leaving }, { from, to }) {
  const rows = [
    ['Name', name],
    ['Email', email],
    ['Arriving in Lagos', arriving],
    ['Leaving', leaving],
  ]
  const note = 'They asked for the Insider Map only. Reply to this email to send them their guide for these dates.'

  return {
    from: { name: 'Landed website', address: from },
    to,
    replyTo: { name, address: email },
    subject: `Insider Map sign-up: ${name}, ${arriving} to ${leaving}`,
    text: `New Insider Map sign-up\n\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\n${note}\n`,
    html: `<h2 style="margin:0 0 12px">New Insider Map sign-up</h2>
<table cellpadding="6" style="border-collapse:collapse">
${rows.map(([label, value]) => `<tr><th align="left">${label}</th><td>${escapeHtml(value)}</td></tr>`).join('\n')}
</table>
<p>${note}</p>`,
  }
}

function createTransport(env) {
  const port = Number(env.SMTP_PORT) || 465
  return nodemailer.createTransport({
    host: env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    // Stay well inside the function's time limit if Google is slow to answer.
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  })
}

// `transport` is only passed in tests; normally it's built from the SMTP_* variables.
export async function handleSignup(request, { env = process.env, transport } = {}) {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } })
  }

  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'Request too large' }, 413)
  }

  let entry
  try {
    entry = JSON.parse(raw)
  } catch {
    return json({ ok: false, error: 'Send the entry as JSON' }, 400)
  }

  // Honeypot filled in: a bot. Report success so it doesn't retry, but don't send anything.
  if (readField(entry, 'website')) return json({ ok: true })

  const { fields, errors } = validate(entry)
  if (errors.length) return json({ ok: false, errors }, 422)

  if (!transport && !(env.SMTP_USER && env.SMTP_PASS)) {
    console.error('Insider Map sign-up rejected: SMTP_USER and SMTP_PASS are not set')
    return json({ ok: false, error: 'Sign-ups are not connected' }, 503)
  }

  try {
    const mailer = transport ?? createTransport(env)
    await mailer.sendMail(signupEmail(fields, { from: env.SMTP_USER, to: env.INSIDER_MAP_TO || COMPANY.email }))
  } catch (error) {
    // Log the failure, not the visitor's details.
    console.error('Insider Map sign-up email could not be sent:', error?.code ?? '', error?.message ?? error)
    return json({ ok: false, error: 'Could not send your details' }, 502)
  }

  return json({ ok: true })
}

export default {
  fetch: (request) => handleSignup(request),
}
