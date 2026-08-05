/**
 * The artifacts.
 *
 * Everything a restaurant owner already recognises — the Google listing, the
 * review-request email, the Facebook ad — rebuilt as live markup rather than
 * screenshots. Real markup stays sharp on any display, resizes down to a
 * phone, and can be re-pointed at new content without opening Photoshop.
 *
 * These deliberately do NOT use the site's design tokens. A mockup of Google
 * has to be Google's colours or it stops being convincing, so the palettes
 * below are hard-coded to each platform and are the one place in the codebase
 * where raw hex is correct.
 */
import { Star, Navigation, Bookmark, Compass, Smartphone, Share2, MapPin,
         Clock, Phone, Globe, ChevronDown, BadgeCheck, MoreHorizontal,
         Printer, Reply, Star as StarOutline } from 'lucide-react';
import type { AdSample, Case, EmailSample, Listing, Review } from '../data/site';

/* ── Star row ───────────────────────────────────────────────────────────
   Google renders a true fractional star — 4.7 shows seven tenths of the
   fifth. Two stacked rows with the gold one clipped gets that exactly. */
export function Stars({ value, size = 13 }: { value: number; size?: number }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const row = (color: string, fill: string) => (
    <span className="flex" style={{ gap: 1 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} width={size} height={size} strokeWidth={0} color={color} fill={fill} />
      ))}
    </span>
  );
  return (
    <span
      className="relative inline-flex shrink-0"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {row('#dadce0', '#dadce0')}
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        {row('#fbbc04', '#fbbc04')}
      </span>
    </span>
  );
}

/* ── Mini map ───────────────────────────────────────────────────────────
   The map tile beside the hero photo. Drawn rather than fetched: no API
   key, no tile bill, no request that fails behind a corporate proxy. */
function MiniMap({ streets }: { streets: [string, string] }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: '#e8eaed' }}>
      {/* park block */}
      <div className="absolute" style={{ background: '#cfe8d3', inset: '52% -10% -10% 46%' }} />
      {/* road grid */}
      <div className="absolute" style={{ background: '#fff', left: '-10%', right: '-10%', top: '38%', height: 9 }} />
      <div className="absolute" style={{ background: '#fff', top: '-10%', bottom: '-10%', left: '30%', width: 7 }} />
      <div className="absolute" style={{ background: '#fdf3c8', top: '-20%', bottom: '-20%', left: '68%', width: 12, transform: 'rotate(14deg)' }} />
      <div className="absolute" style={{ background: '#fff', left: '-10%', right: '-10%', top: '76%', height: 5 }} />
      {/* street names */}
      <span
        className="absolute select-none"
        style={{ top: '30%', left: '6%', fontSize: 6.5, color: '#5f6368', letterSpacing: 0.2 }}
      >
        {streets[0]}
      </span>
      <span
        className="absolute origin-left select-none"
        style={{ top: '12%', left: '72%', fontSize: 6.5, color: '#5f6368', transform: 'rotate(74deg)' }}
      >
        {streets[1]}
      </span>
      {/* pin */}
      <span
        className="absolute"
        style={{
          top: '30%', left: '46%', width: 15, height: 15, background: '#ea4335',
          borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)',
          boxShadow: '0 1px 3px rgb(0 0 0 / 0.35)',
        }}
      >
        <span
          className="absolute"
          style={{ inset: 4.5, background: '#a8271b', borderRadius: '50%' }}
        />
      </span>
    </div>
  );
}

const actions = [
  { icon: Navigation, label: 'Directions' },
  { icon: Bookmark,   label: 'Save' },
  { icon: Compass,    label: 'Nearby' },
  { icon: Smartphone, label: 'Send to\nphone' },
  { icon: Share2,     label: 'Share' },
];

/* ── Google Business Profile ─────────────────────────────────────────── */
export function ProfileCard({
  c,
  state,
  compact = false,
  rating,
  count,
}: {
  c: Case;
  state: 'before' | 'after';
  compact?: boolean;
  /** Override the printed figures so a caller can tween them mid-transition. */
  rating?: number;
  count?: number;
}) {
  const base: Listing = state === 'after' ? c.after : c.before;
  const l: Listing = {
    ...base,
    rating: rating ?? base.rating,
    count: count ?? base.count,
  };

  // Every photo box carries an explicit pixel height. Percentage heights
  // against a stretched grid item are the kind of thing that resolves
  // differently once this card sits inside someone else's layout.
  const strip = compact ? 128 : 168;
  const half = Math.round((strip - 1) / 2);
  const cover: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };
  const chip: React.CSSProperties = {
    position: 'absolute', right: 6, bottom: 6, fontSize: 10,
    background: 'rgb(0 0 0 / 0.55)', color: '#fff', borderRadius: 3, padding: '1px 5px',
  };

  return (
    <div className="mock w-full self-start" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {/* photo strip */}
      <div className="grid" style={{ gridTemplateColumns: '1.62fr 1fr', gap: 1, background: '#fff' }}>
        <div className="relative" style={{ height: strip }}>
          <img
            src={l.photo}
            alt={`${c.name} — ${state === 'after' ? 'current' : 'previous'} listing photo`}
            loading="lazy"
            style={cover}
          />
          <span style={chip}>See photos</span>
        </div>
        <div className="grid" style={{ gap: 1 }}>
          <div style={{ height: half }}>
            <MiniMap streets={c.streets} />
          </div>
          <div className="relative" style={{ height: strip - half - 1 }}>
            <img src={l.inside} alt="" loading="lazy" style={cover} />
            <span style={chip}>See inside</span>
          </div>
        </div>
      </div>

      {/* identity */}
      <div style={{ padding: compact ? '12px 14px 10px' : '16px 18px 12px' }}>
        <div className="flex items-center gap-1.5">
          <h3
            className="truncate font-normal"
            style={{ fontSize: compact ? 17 : 21, color: '#202124', letterSpacing: '-0.01em' }}
          >
            {c.name}
          </h3>
          <BadgeCheck width={14} height={14} color="#1a73e8" strokeWidth={2.4} className="shrink-0" />
        </div>

        <div className="mt-1 flex items-center gap-1.5" style={{ fontSize: 13, color: '#70757a' }}>
          <span className="figure font-medium" style={{ color: '#202124' }}>
            {l.rating.toFixed(1)}
          </span>
          <Stars value={l.rating} />
          <span className="figure">({l.count.toLocaleString()})</span>
        </div>

        <div className="mt-0.5" style={{ fontSize: 13, color: '#70757a' }}>
          {c.category} · {c.price}
        </div>
      </div>

      {/* action rail */}
      <div
        className="flex items-start justify-around"
        style={{ borderTop: '1px solid #e8eaed', borderBottom: '1px solid #e8eaed', padding: '10px 6px' }}
      >
        {actions.map((a) => (
          <span key={a.label} className="flex w-14 flex-col items-center gap-1">
            <span
              className="grid place-items-center rounded-full"
              style={{ width: 26, height: 26, border: '1px solid #1a73e8' }}
            >
              <a.icon width={13} height={13} color="#1a73e8" strokeWidth={2} />
            </span>
            <span
              className="whitespace-pre text-center leading-tight"
              style={{ fontSize: 9.5, color: '#1a73e8' }}
            >
              {a.label}
            </span>
          </span>
        ))}
      </div>

      {/* detail rows */}
      <div className="grid gap-2.5" style={{ padding: compact ? '11px 14px 14px' : '14px 18px 18px' }}>
        {[
          { icon: MapPin, node: <span style={{ color: '#3c4043' }}>{c.address}</span> },
          {
            icon: Clock,
            node: (
              <span className="flex items-center gap-1">
                <span style={{ color: l.open ? '#137333' : '#c5221f', fontWeight: 500 }}>
                  {l.open ? 'Open' : 'Closed'}
                </span>
                <span style={{ color: '#3c4043' }}>· {l.hours}</span>
                <ChevronDown width={12} height={12} color="#70757a" />
              </span>
            ),
          },
          { icon: Phone, node: <span className="figure" style={{ color: '#3c4043' }}>{c.phone}</span> },
          { icon: Globe, node: <span style={{ color: '#3c4043' }}>{c.site}</span> },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-2.5" style={{ fontSize: 12.5 }}>
            <r.icon width={13} height={13} color="#1a73e8" strokeWidth={2} className="shrink-0" />
            <span className="truncate">{r.node}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── A single Google review card ─────────────────────────────────────── */
export function ReviewCard({ r }: { r: Review }) {
  return (
    <div
      className="mock"
      style={{ fontFamily: 'Roboto, Arial, sans-serif', padding: '11px 13px', borderRadius: 8 }}
    >
      <div className="flex items-center gap-2">
        <span
          className="grid shrink-0 place-items-center rounded-full font-medium text-white"
          style={{ width: 24, height: 24, background: r.tint, fontSize: 12 }}
          aria-hidden="true"
        >
          {r.initial}
        </span>
        <span className="truncate font-medium" style={{ fontSize: 12.5, color: '#202124' }}>
          {r.name}
        </span>
      </div>
      <div className="mt-1.5">
        <Stars value={5} size={12} />
      </div>
      <p className="mt-1.5 leading-snug" style={{ fontSize: 12, color: '#3c4043' }}>
        {r.text}
      </p>
      <p className="mt-1.5" style={{ fontSize: 11, color: '#70757a' }}>{r.when}</p>
    </div>
  );
}

/* ── Review-request email ────────────────────────────────────────────── */
export function EmailCard({ e }: { e: EmailSample }) {
  const serif = e.serif ? 'Georgia, "Times New Roman", serif' : 'Arial, Helvetica, sans-serif';

  return (
    <div className="mock w-full" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {/* Gmail chrome */}
      <div className="flex items-center justify-between gap-2 px-3.5 pt-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate" style={{ fontSize: 13.5, color: '#202124' }}>{e.subject}</span>
          <span
            className="shrink-0 rounded px-1.5"
            style={{ fontSize: 10, color: '#5f6368', background: '#f1f3f4' }}
          >
            Inbox
          </span>
        </div>
        <Printer width={13} height={13} color="#5f6368" className="shrink-0" />
      </div>

      <div className="flex items-center gap-2 px-3.5 pb-2.5 pt-2">
        <span
          className="grid shrink-0 place-items-center rounded-full text-white"
          style={{ width: 22, height: 22, background: e.accent, fontSize: 9, fontWeight: 700 }}
          aria-hidden="true"
        >
          {e.brand.replace(/^The\s+/, '').slice(0, 1)}
        </span>
        <span className="truncate font-medium" style={{ fontSize: 12, color: '#202124' }}>
          {e.brand}
        </span>
        <span className="truncate" style={{ fontSize: 11, color: '#5f6368' }}>&lt;{e.from}&gt;</span>
        <span className="ml-auto flex shrink-0 items-center gap-2" style={{ fontSize: 11, color: '#5f6368' }}>
          <span className="figure hidden sm:inline">{e.received}</span>
          <StarOutline width={12} height={12} />
          <Reply width={12} height={12} />
        </span>
      </div>

      {/* the email itself */}
      <div style={{ background: e.paper, borderTop: '1px solid #e8eaed' }}>
        <div style={{ padding: '20px 20px 16px' }}>
          <div className="text-center">
            <div
              style={{
                fontFamily: serif, fontSize: 17, fontWeight: 700, letterSpacing: '0.06em',
                color: e.accent, textTransform: 'uppercase',
              }}
            >
              {e.brand}
            </div>
            <div
              className="mx-auto mt-1.5"
              style={{ height: 1, width: 44, background: e.accent, opacity: 0.55 }}
            />
            <div
              className="mt-1.5"
              style={{ fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: e.accent, opacity: 0.8 }}
            >
              {e.kicker}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[1.35fr_1fr] sm:items-start">
            <div>
              <h4 style={{ fontFamily: serif, fontSize: 19, color: '#1f2937', lineHeight: 1.2 }}>
                {e.heading}
              </h4>
              <p className="mt-2.5" style={{ fontSize: 11.5, color: '#4b5563' }}>Hi there,</p>
              {e.body.map((line) => (
                <p key={line} className="mt-1.5 leading-relaxed" style={{ fontSize: 11.5, color: '#4b5563' }}>
                  {line}
                </p>
              ))}
            </div>
            <img
              src={e.photo}
              alt=""
              loading="lazy"
              className="h-28 w-full rounded object-cover sm:h-32"
            />
          </div>

          {/* the ask */}
          <div
            className="mt-5 rounded text-center"
            style={{ border: `1px solid ${e.accent}33`, background: `${e.accent}0d`, padding: '14px 16px' }}
          >
            <div style={{ fontFamily: serif, fontSize: 13.5, fontWeight: 700, color: e.accent }}>
              {e.prompt}
            </div>
            <div className="mt-1" style={{ fontSize: 11, color: '#4b5563' }}>{e.promptSub}</div>
            <span
              className="mt-3 inline-flex items-center gap-1.5 rounded px-4 py-2"
              style={{ background: e.accent, color: e.onAccent, fontSize: 11.5, fontWeight: 700 }}
            >
              <Star width={11} height={11} fill="currentColor" strokeWidth={0} />
              {e.cta}
            </span>
            <div className="mt-2.5" style={{ fontSize: 10, color: '#6b7280' }}>{e.fine}</div>
          </div>
        </div>

        <div
          className="flex items-center justify-between gap-3 px-5 py-3"
          style={{ background: e.foot, color: e.footInk }}
        >
          <span style={{ fontFamily: serif, fontSize: 11 }}>{e.signoff}</span>
          <span className="flex shrink-0 items-center gap-1.5 opacity-70">
            {['f', '⦿', 'G'].map((g) => (
              <span
                key={g}
                className="grid place-items-center rounded-full"
                style={{ width: 16, height: 16, border: '1px solid currentColor', fontSize: 8.5 }}
                aria-hidden="true"
              >
                {g}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Meta ad ─────────────────────────────────────────────────────────── */
export function AdCard({ a }: { a: AdSample }) {
  return (
    <div
      className="mock flex w-full flex-col"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', borderRadius: 8 }}
    >
      <div className="flex items-center gap-2 px-3 pb-2 pt-3">
        <img
          src={a.photo}
          alt=""
          loading="lazy"
          className="h-8 w-8 shrink-0 rounded-full object-cover"
        />
        <span className="min-w-0">
          <span className="block truncate font-semibold" style={{ fontSize: 12.5, color: '#050505' }}>
            {a.page}
          </span>
          <span className="block" style={{ fontSize: 11, color: '#65676b' }}>
            {a.handle} · <span aria-hidden="true">🌐</span>
          </span>
        </span>
        <MoreHorizontal width={16} height={16} color="#65676b" className="ml-auto shrink-0" />
      </div>

      <div className="px-3 pb-2.5">
        {a.copy.map((line) => (
          <p key={line} className="mb-1.5 leading-snug" style={{ fontSize: 12, color: '#050505' }}>
            {line}
          </p>
        ))}
      </div>

      <div className="relative">
        <img src={a.photo} alt="" loading="lazy" className="h-44 w-full object-cover" />
        {a.overlay && (
          <span
            className="absolute left-0 flex flex-col px-3 py-1.5"
            style={{ bottom: 12, background: '#c5221f', color: '#fff' }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              {a.overlay}
            </span>
            {a.overlaySub && (
              <span style={{ fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
                {a.overlaySub}
              </span>
            )}
          </span>
        )}
      </div>

      <div
        className="flex items-center gap-3 px-3 py-2.5"
        style={{ background: '#f0f2f5', borderTop: '1px solid #dadde1' }}
      >
        <span className="min-w-0 flex-1">
          <span className="block" style={{ fontSize: 10, letterSpacing: '0.03em', color: '#65676b' }}>
            {a.domain}
          </span>
          <span className="block truncate font-semibold" style={{ fontSize: 12.5, color: '#050505' }}>
            {a.linkTitle}
          </span>
          {a.linkSub && (
            <span className="block truncate" style={{ fontSize: 11, color: '#65676b' }}>
              {a.linkSub}
            </span>
          )}
        </span>
        <span
          className="shrink-0 rounded px-3 py-1.5 font-semibold"
          style={{ background: '#e4e6eb', color: '#050505', fontSize: 11.5 }}
        >
          {a.button}
        </span>
      </div>
    </div>
  );
}
