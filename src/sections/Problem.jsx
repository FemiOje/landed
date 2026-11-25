const STATEMENT =
  'text-[30px] leading-[1.2] font-medium tracking-[-0.05em] md:text-[44px] xl:text-[52px] xl:leading-[62px]'

const PROBLEMS = [
  'Every price doubles when they hear your accent.',
  "Nights out you can't vet.",
  "The tailor who swears it'll be ready.",
  'Your first week home, gone sorting things out.',
]

export default function Problem() {
  return (
    <section aria-labelledby="problem-title" className="bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-9 px-5 py-16 md:px-10 md:py-24 xl:px-20 xl:pt-[109px] xl:pb-[120px]">
        <div className="flex flex-col gap-2">
          <h2 id="problem-title" className={`${STATEMENT} text-ink`}>
            You know how December goes.
          </h2>
          {PROBLEMS.map((line) => (
            <p key={line} className={`${STATEMENT} text-faint`}>
              {line}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className={`${STATEMENT} text-gold-soft italic`}>Not this year.</p>
          <p className={`${STATEMENT} text-ink`}>This year, Landed takes care of you.</p>
        </div>
      </div>
    </section>
  )
}
