import { ads } from '../data/site';
import { AdCard } from './mockups';
import { SectionHead } from './Section';

/**
 * Meta creative. Each card carries the objective it was built for — an ad
 * without a stated job is just a photograph of food.
 */
export default function Ads() {
  return (
    <section id="ads" className="section section-band">
      <div className="shell">
        <SectionHead
          marker="Meta ads"
          aside="Facebook & Instagram"
          title="An offer worth driving fifteen minutes for."
          lede="Aimed at people within a few miles who have never eaten with you. We write it,
                shoot it, run it, and report what it cost per voucher actually redeemed —
                not per impression, which is a number nobody has ever eaten."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {ads.map((a) => (
            <figure key={a.id} className="flex flex-col">
              <AdCard a={a} />
              <figcaption className="label mt-3">{a.objective}</figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-12 max-w-2xl border-t border-rule pt-5 text-xs leading-relaxed text-muted">
          Sample creative for illustrative restaurants. Ad spend is billed by Meta directly to
          your account — we never mark it up and we never hold the ad account.
        </p>
      </div>
    </section>
  );
}
