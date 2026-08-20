import Reveal from '../motion/Reveal'

/**
 * White card holding the body copy of a detail page. Paragraphs are passed as
 * plain strings so each page only owns its words, not its layout.
 */
export default function ProsePanel({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10 lg:p-12">
      <div className="space-y-6">
        {paragraphs.map((text, i) => (
          <Reveal key={i} delay={Math.min(i * 0.06, 0.3)}>
            <p className="text-sm leading-relaxed text-brand-muted sm:text-[15px]">{text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
