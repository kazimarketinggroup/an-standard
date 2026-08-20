import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Services from '@/components/home/Services'
import Insulation from '@/components/home/Insulation'
import Sectors from '@/components/home/Sectors'
import Patterns from '@/components/home/Patterns'
import Process from '@/components/home/Process'
import Heritage from '@/components/home/Heritage'
import ContactCta from '@/components/home/ContactCta'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Insulation />
      <Sectors />
      <Patterns />
      <Process />
      <Heritage />
      <ContactCta />
    </>
  )
}
