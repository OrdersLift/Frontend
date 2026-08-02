import { process } from '../data/site';
import { SectionHead } from './Section';

/**
 * Numbered because it genuinely is a sequence — step four does not work
 * until step three has been running for a while, and saying so is the most
 * useful thing on this page.
 */
export default function Process() {
  return (
    <section id="process" className="section">
      <div className="shell">
        <SectionHead
          marker="How it runs"
          aside="Weeks one to twelve"
          title="In this order, for a reason."
          lede="Most agencies sell you the advertising first because that is where the retainer
                is. Advertising a bad listing just buys more people the chance to scroll past it."
        />

        <ol className="mt-14 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-5">
          {process.map((s) => (
            <li key={s.step} className="bg-paper p-6 lg:p-7">
              <span className="figure block text-4xl font-medium text-gold">{s.step}</span>
              <h3 className="display mt-5 text-xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-6">
          <a href="/#contact" className="btn btn-solid">Start with the teardown</a>
          <p className="text-sm text-muted">
            Twenty minutes. You keep the findings whether or not you hire us.
          </p>
        </div>
      </div>
    </section>
  );
}
