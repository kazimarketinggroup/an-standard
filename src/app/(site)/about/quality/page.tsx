import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import ProsePanel from '@/components/layout/ProsePanel'
import QuoteCta from '@/components/layout/QuoteCta'

export const metadata: Metadata = {
  title: 'Quality and Accreditations — A.N. Standard Ltd.',
  description:
    'Every roll is checked for thread breaks and slips before it leaves us. Stock wadding is UK-sourced and complies with BS5852 Part 2 1982.',
}

const paragraphs = [
  'Our quality control is a person, a bench and the full length of every roll. After quilting, each roll is run through repair and check, where it is inspected for thread breaks, skipped stitches, slipped or bunched wadding and pattern drift. Faults that can be repaired are repaired; anything that cannot be is stopped there rather than discovered by you in cutting.',
  'This is the stage most enquiries never ask about, and it is the one that decides whether you receive a usable roll. It is also why we would rather quote a realistic lead time than a heroic one — the check does not get skipped to hit a date.',
  'On materials: our stock polyester wadding is UK-sourced, made from recycled polyester, and complies with BS5852 Part 2 1982. Documentation for the wadding we supply is available with any order, and we can provide batch traceability on request.',
  'On finished-product performance: reaction-to-fire and thermal classifications are properties of a finished article and its test, not of roll goods. Where your end product has to meet a standard, we quilt to your specification using materials you approve or supply, provide the data we hold for our own materials, and quilt free sample panels for you or your test house to submit. We do not publish performance claims for products we have not had tested, which is the only honest position for a commission quilter to take.',
  'Where a customer operates under an audited quality system and needs us to work to a written control plan — fixed pattern, fixed wadding batch, sign-off panels, retained samples — we do that as a matter of routine. Ask at quote stage and it is built into the job.',
]

export default function QualityPage() {
  return (
    <>
      <PageHero
        align="left"
        title="Quality And Accreditations"
        intro="Every roll is checked for thread breaks and slips before it leaves us."
        image="/images/quality/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png"
        imageAlt="Checking the stitching on a quilted navy jacket panel"
      />

      <section className="section bg-brand-cream">
        <div className="container">
          <ProsePanel paragraphs={paragraphs} />
          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
