import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '../data/site';
import { SectionHead } from './Section';

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="section">
      <div className="shell">
        <SectionHead
          marker="Questions"
          title="The ones owners actually ask."
        />

        <div className="mt-12 max-w-3xl">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-rule last:border-b">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={`text-base font-semibold transition-colors sm:text-lg ${
                        isOpen ? 'text-ink' : 'text-body'
                      }`}
                    >
                      {f.q}
                    </span>
                    <Plus
                      aria-hidden="true"
                      strokeWidth={1.6}
                      className={`mt-1 h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  hidden={!isOpen}
                  className="max-w-2xl pb-6 leading-relaxed text-body"
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-body">
          Something not covered?{' '}
          <a href="/#contact" className="link font-semibold">Ask us directly</a> — we answer the
          awkward ones too.
        </p>
      </div>
    </section>
  );
}
