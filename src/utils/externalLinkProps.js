// Off-site links (WhatsApp, Companies House, socials) open in a new tab; in-page anchors and '#' don't.
export default function externalLinkProps(href) {
  return /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
