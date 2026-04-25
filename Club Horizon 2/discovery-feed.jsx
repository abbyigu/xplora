// Xplora — Discovery Feed
// Editorial mobile feed: hero question, mood rail, hidden gem hero card,
// 2-col local picks, flash deals strip, Meet & Xplora rail, locals quote,
// curated spots, bottom tab bar. Tappable nav between feed and a detail view.

const X = {
  forest: 'oklch(0.32 0.05 155)',     // deep forest green
  forestDeep: 'oklch(0.22 0.04 155)',
  terracotta: 'oklch(0.62 0.13 40)',  // warm terracotta
  terracottaDeep: 'oklch(0.48 0.13 40)',
  beige: 'oklch(0.96 0.012 80)',      // soft beige bg
  beigeDeep: 'oklch(0.92 0.018 80)',
  ink: 'oklch(0.20 0.012 60)',
  ink2: 'oklch(0.42 0.012 60)',
  ink3: 'oklch(0.62 0.012 60)',
  hairline: 'oklch(0.86 0.014 80)',
  paper: 'oklch(0.985 0.008 80)',
};

const fontDisplay = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";
const fontUI = "'Geist', 'Söhne', system-ui, -apple-system, sans-serif";
const fontMono = "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace";

// ─── Striped placeholder image ───────────────────────────────────────────
function Placeholder({ label, h, tone = 'forest', radius = 0, ratio }) {
  const stripe = tone === 'forest' ? X.forest
    : tone === 'terracotta' ? X.terracotta
    : tone === 'ink' ? X.ink : X.forest;
  const bg = tone === 'forest' ? 'oklch(0.42 0.045 155)'
    : tone === 'terracotta' ? 'oklch(0.72 0.10 40)'
    : tone === 'ink' ? 'oklch(0.32 0.012 60)' : 'oklch(0.42 0.045 155)';
  const style = {
    width: '100%',
    aspectRatio: ratio,
    height: h,
    borderRadius: radius,
    background: bg,
    backgroundImage: `repeating-linear-gradient(135deg, transparent 0 9px, ${stripe} 9px 10px)`,
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
  };
  return (
    <div style={style}>
      <div style={{
        position: 'absolute', left: 12, bottom: 10,
        fontFamily: fontMono, fontSize: 10.5, letterSpacing: 0.4,
        color: 'rgba(255,255,255,0.92)', textTransform: 'lowercase',
      }}>
        {label}
      </div>
    </div>
  );
}

// ─── Tiny inline icons ───────────────────────────────────────────────────
const I = {
  search: (c = X.ink) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke={c} strokeWidth="1.4"/><path d="M11 11l3 3" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
  pin: (c = X.ink, s = 12) => <svg width={s} height={s} viewBox="0 0 12 12" fill="none"><path d="M6 11s3.5-3.2 3.5-6.2A3.5 3.5 0 1 0 2.5 4.8C2.5 7.8 6 11 6 11Z" stroke={c} strokeWidth="1.2"/><circle cx="6" cy="4.7" r="1.1" fill={c}/></svg>,
  bookmark: (c = X.ink) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 1.5h7v11l-3.5-2.3L3.5 12.5v-11Z" stroke={c} strokeWidth="1.2" strokeLinejoin="round"/></svg>,
  clock: (c = X.ink, s = 12) => <svg width={s} height={s} viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke={c} strokeWidth="1.1"/><path d="M6 3.6V6l1.6 1" stroke={c} strokeWidth="1.1" strokeLinecap="round"/></svg>,
  arrow: (c = X.ink, s = 14) => <svg width={s} height={s} viewBox="0 0 14 14" fill="none"><path d="M3 7h8m-3-3 3 3-3 3" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  back: (c = X.ink) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2 4 7l5 5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  heart: (c = X.ink, fill = 'none') => <svg width="16" height="16" viewBox="0 0 16 16" fill={fill}><path d="M8 13.5S2 10 2 5.8a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 4.2-6 7.7-6 7.7Z" stroke={c} strokeWidth="1.3"/></svg>,
  share: (c = X.ink) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7v4.5h8V7M7 9V2m0 0L4.5 4.5M7 2l2.5 2.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // tab bar
  tabFeed: (c) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke={c} strokeWidth="1.4"/><circle cx="11" cy="11" r="2.2" fill={c}/></svg>,
  tabMap: (c) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 5.5 8 4l6 2 5-1.5v12L14 18l-6-2-5 1.5v-12Z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 4v12M14 6v12" stroke={c} strokeWidth="1.4"/></svg>,
  tabMeet: (c) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="8" cy="9" r="3" stroke={c} strokeWidth="1.4"/><circle cx="15" cy="10" r="2.4" stroke={c} strokeWidth="1.4"/><path d="M3 18c.6-2.4 2.6-4 5-4s4.4 1.6 5 4M13 18c.4-1.7 1.7-2.8 3.4-2.8 1.6 0 2.8 1.1 3.2 2.8" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
  tabSaved: (c) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 3h12v17l-6-4-6 4V3Z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  tabMe: (c) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.5" stroke={c} strokeWidth="1.4"/><path d="M3.5 19c1.2-3.4 4.2-5.5 7.5-5.5s6.3 2.1 7.5 5.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
};

// ─── Brand wordmark ──────────────────────────────────────────────────────
function Wordmark({ size = 22, color = X.forestDeep }) {
  return (
    <span style={{
      fontFamily: fontDisplay, fontSize: size, color,
      letterSpacing: -0.5, fontStyle: 'italic', fontWeight: 400,
    }}>
      x<span style={{ fontStyle: 'normal', letterSpacing: 0 }}>plora</span>
    </span>
  );
}

// ─── Reusable header ─────────────────────────────────────────────────────
function FeedHeader({ city }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 20px 14px',
    }}>
      <Wordmark size={24} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 10px', borderRadius: 999,
        border: `1px solid ${X.hairline}`, background: X.paper,
        fontFamily: fontUI, fontSize: 12, color: X.ink2,
      }}>
        {I.pin(X.terracotta, 11)}
        <span style={{ fontVariantCaps: 'all-small-caps', letterSpacing: 0.6 }}>
          {city}
        </span>
      </div>
    </div>
  );
}

// ─── Hero question + mood rail ───────────────────────────────────────────
function Hero({ question }) {
  const moods = [
    { label: 'hidden gems', count: 24 },
    { label: 'quiet', count: 18 },
    { label: 'foodie', count: 41 },
    { label: 'with locals', count: 12 },
    { label: 'after dark', count: 9 },
    { label: 'scenic', count: 33 },
  ];
  return (
    <div style={{ padding: '6px 20px 22px' }}>
      <div style={{
        fontFamily: fontDisplay, fontSize: 34, lineHeight: 1.05,
        color: X.ink, letterSpacing: -0.6, textWrap: 'pretty',
        fontWeight: 400,
      }}>
        {question}
      </div>
      <div style={{
        marginTop: 14,
        display: 'flex', alignItems: 'center', gap: 10,
        background: X.paper, border: `1px solid ${X.hairline}`,
        borderRadius: 14, padding: '11px 14px',
      }}>
        {I.search(X.ink2)}
        <span style={{
          fontFamily: fontUI, fontSize: 14, color: X.ink3, flex: 1,
        }}>a quiet place near the river…</span>
        <span style={{
          fontFamily: fontMono, fontSize: 10, color: X.ink3,
          padding: '2px 6px', border: `1px solid ${X.hairline}`, borderRadius: 4,
        }}>⌘K</span>
      </div>

      {/* mood rail */}
      <div style={{
        marginTop: 16, display: 'flex', gap: 8, overflow: 'hidden',
        flexWrap: 'wrap',
      }}>
        {moods.map((m, i) => (
          <div key={m.label} style={{
            display: 'flex', alignItems: 'baseline', gap: 6,
            padding: '7px 12px', borderRadius: 999,
            background: i === 0 ? X.forestDeep : 'transparent',
            border: i === 0 ? `1px solid ${X.forestDeep}` : `1px solid ${X.hairline}`,
            color: i === 0 ? X.beige : X.ink,
            fontFamily: fontUI, fontSize: 13,
          }}>
            <span>{m.label}</span>
            <span style={{
              fontFamily: fontMono, fontSize: 10,
              color: i === 0 ? 'rgba(255,255,255,0.6)' : X.ink3,
            }}>{m.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section header ──────────────────────────────────────────────────────
function SectionHeader({ kicker, title, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '0 20px 12px',
    }}>
      <div>
        <div style={{
          fontFamily: fontMono, fontSize: 10.5, letterSpacing: 1.2,
          textTransform: 'uppercase', color: X.terracotta,
        }}>{kicker}</div>
        <div style={{
          fontFamily: fontDisplay, fontSize: 24, color: X.ink,
          letterSpacing: -0.4, marginTop: 2, fontWeight: 400,
        }}>{title}</div>
      </div>
      {action && (
        <div style={{
          fontFamily: fontUI, fontSize: 12, color: X.ink2,
          display: 'flex', alignItems: 'center', gap: 4, paddingBottom: 4,
        }}>
          {action} {I.arrow(X.ink2, 12)}
        </div>
      )}
    </div>
  );
}

// ─── Hero card (hidden gem) ──────────────────────────────────────────────
function HiddenGemCard({ onTap }) {
  return (
    <div onClick={onTap} style={{
      margin: '0 20px 28px', cursor: 'pointer',
    }}>
      <div style={{ position: 'relative' }}>
        <Placeholder label="café perché — basse-ville" h={300} radius={18} tone="forest" />
        {/* tag */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 999,
          background: 'rgba(20,28,22,0.78)',
          backdropFilter: 'blur(8px)',
          color: X.beige, fontFamily: fontMono, fontSize: 10, letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: X.terracotta }} />
          hidden gem
        </div>
        <div style={{
          position: 'absolute', top: 14, right: 14,
          width: 36, height: 36, borderRadius: 999,
          background: 'rgba(255,255,255,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{I.bookmark(X.ink)}</div>

        {/* number badge */}
        <div style={{
          position: 'absolute', bottom: -1, left: 18,
          background: X.beige, padding: '6px 10px 0',
          borderTopLeftRadius: 8, borderTopRightRadius: 8,
          fontFamily: fontMono, fontSize: 10, color: X.ink2,
          letterSpacing: 1,
        }}>nº 01 · today's pick</div>
      </div>

      <div style={{ paddingTop: 14 }}>
        <div style={{
          fontFamily: fontDisplay, fontSize: 26, color: X.ink,
          letterSpacing: -0.4, lineHeight: 1.1, fontWeight: 400,
        }}>
          A second-floor café where the
          <span style={{ fontStyle: 'italic' }}> regulars never look up</span>
        </div>
        <div style={{
          marginTop: 10, fontFamily: fontUI, fontSize: 13.5, color: X.ink2,
          lineHeight: 1.55, textWrap: 'pretty',
        }}>
          A worn wooden staircase. Strong filter coffee. The owner roasts beans on
          Wednesdays. Locals don't talk about this place — and we asked nicely
          before listing it.
        </div>
        <div style={{
          marginTop: 14, display: 'flex', alignItems: 'center', gap: 14,
          fontFamily: fontUI, fontSize: 12, color: X.ink2,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {I.pin(X.ink2, 11)} 8 min · saint-jean-baptiste
          </span>
          <span style={{ width: 3, height: 3, borderRadius: 99, background: X.ink3 }} />
          <span>quiet · foodie</span>
        </div>
      </div>
    </div>
  );
}

// ─── 2-col grid of local picks ───────────────────────────────────────────
function LocalPicks({ onTap }) {
  const items = [
    { label: 'sunset kayak', title: 'Cap-Rouge bay at golden hour', meta: 'tonight · 19:40', tone: 'terracotta', tag: 'scenic' },
    { label: 'cidre & vinyl', title: 'Listening room above the cidery', meta: 'fri · 21:00', tone: 'forest', tag: 'after dark' },
    { label: 'sugar shack walk', title: 'Trail with Édouard, 3rd-gen sugarman', meta: 'sat · 09:30', tone: 'forest', tag: 'with locals' },
    { label: 'secret chef table', title: 'Six seats. One menu. No phone signal.', meta: 'wed · 19:00', tone: 'ink', tag: 'foodie' },
  ];
  return (
    <div style={{ padding: '0 20px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {items.map((it, i) => (
          <div key={i} onClick={onTap} style={{ cursor: 'pointer' }}>
            <Placeholder label={it.label} h={170} radius={12} tone={it.tone} />
            <div style={{
              fontFamily: fontMono, fontSize: 9.5, color: X.terracotta,
              letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 8,
            }}>{it.tag}</div>
            <div style={{
              fontFamily: fontDisplay, fontSize: 17, color: X.ink,
              lineHeight: 1.15, marginTop: 2, letterSpacing: -0.2,
              textWrap: 'pretty', fontWeight: 400,
            }}>{it.title}</div>
            <div style={{
              fontFamily: fontUI, fontSize: 11, color: X.ink3,
              marginTop: 4, fontVariantCaps: 'all-small-caps', letterSpacing: 0.5,
            }}>{it.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Flash deals strip ───────────────────────────────────────────────────
function FlashDeals() {
  const deals = [
    { title: 'sunset kayak', off: '40', when: 'tonight', count: '4 left' },
    { title: 'secret chef dinner', off: '25', when: 'wed only', count: '2 left' },
    { title: 'spa des chutes', off: '30', when: 'mon–thu', count: '12 left' },
    { title: 'observatoire night', off: '50', when: 'tonight', count: '6 left' },
  ];
  return (
    <div style={{ marginBottom: 30 }}>
      <SectionHeader kicker="flash · ends in 6h" title="Slow tourism, fast deals." action="all deals" />
      <div style={{
        display: 'flex', gap: 12, padding: '0 20px',
        overflowX: 'auto', scrollSnapType: 'x mandatory',
      }}>
        {deals.map((d, i) => (
          <div key={i} style={{
            minWidth: 220, scrollSnapAlign: 'start',
            background: X.forestDeep, color: X.beige,
            borderRadius: 16, padding: 16,
            display: 'flex', flexDirection: 'column', gap: 8,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* corner stripe */}
            <div style={{
              position: 'absolute', top: -10, right: -10, width: 70, height: 70,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${X.terracotta} 0%, transparent 70%)`,
              opacity: 0.5,
            }} />
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 4,
              fontFamily: fontDisplay,
            }}>
              <span style={{ fontSize: 44, lineHeight: 1, letterSpacing: -1 }}>−{d.off}</span>
              <span style={{ fontSize: 18, opacity: 0.7 }}>%</span>
            </div>
            <div style={{
              fontFamily: fontUI, fontSize: 14, color: X.beige,
              letterSpacing: 0.2, textTransform: 'lowercase',
            }}>{d.title}</div>
            <div style={{
              marginTop: 'auto', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.16)',
              fontFamily: fontMono, fontSize: 10, opacity: 0.85,
              letterSpacing: 0.5,
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {I.clock('rgba(255,255,255,0.8)', 11)} {d.when}
              </span>
              <span style={{ color: X.terracotta }}>{d.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Meet & Xplora rail ──────────────────────────────────────────────────
function MeetRail() {
  const groups = [
    { who: 'Léa, Marc & 1 other', what: 'hike Montmorency Falls', when: 'tomorrow · 08:30', size: 4, joined: 3 },
    { who: 'Camille', what: 'gallery hop in Saint-Roch', when: 'thu · 18:00', size: 6, joined: 2 },
    { who: 'Aiden & Theo', what: 'morning run, plains of Abraham', when: 'sun · 07:00', size: 5, joined: 2 },
  ];
  return (
    <div style={{ marginBottom: 30 }}>
      <SectionHeader
        kicker="meet & xplora"
        title="Find your people."
        action="see all" />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {groups.map((g, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: X.paper, border: `1px solid ${X.hairline}`,
            borderRadius: 14, padding: '12px 14px',
          }}>
            {/* avatar stack */}
            <div style={{ display: 'flex', flexShrink: 0 }}>
              {Array.from({ length: g.joined }).map((_, k) => (
                <div key={k} style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: ['oklch(0.62 0.13 40)', 'oklch(0.42 0.045 155)', 'oklch(0.32 0.012 60)'][k % 3],
                  border: `2px solid ${X.beige}`,
                  marginLeft: k === 0 ? 0 : -10,
                  fontFamily: fontUI, fontSize: 11, fontWeight: 500, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{['L','M','C','A'][k % 4]}</div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: fontUI, fontSize: 13, color: X.ink,
                lineHeight: 1.3,
              }}>
                <span style={{ color: X.ink2 }}>{g.who} want to </span>
                <span style={{ fontStyle: 'italic', fontFamily: fontDisplay, fontSize: 16, letterSpacing: -0.2 }}>
                  {g.what}
                </span>
              </div>
              <div style={{
                fontFamily: fontMono, fontSize: 10, color: X.ink3,
                letterSpacing: 0.5, marginTop: 4,
              }}>{g.when} · {g.joined}/{g.size} joined</div>
            </div>
            <div style={{
              padding: '7px 12px', borderRadius: 999,
              border: `1px solid ${X.forestDeep}`, color: X.forestDeep,
              fontFamily: fontUI, fontSize: 12, fontWeight: 500,
              flexShrink: 0,
            }}>join</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Locals quote band ───────────────────────────────────────────────────
function LocalsQuote() {
  return (
    <div style={{
      margin: '0 0 30px', padding: '36px 28px',
      background: X.terracotta, color: X.beige,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: fontMono, fontSize: 10, letterSpacing: 1.2,
        textTransform: 'uppercase', opacity: 0.75,
      }}>from a local · marie-ève, 32</div>
      <div style={{
        fontFamily: fontDisplay, fontSize: 26, fontWeight: 400,
        lineHeight: 1.15, letterSpacing: -0.4, marginTop: 10,
        textWrap: 'pretty',
      }}>
        “The best things about this city aren't on any list.
        <span style={{ fontStyle: 'italic' }}> Until now.</span>”
      </div>
      <div style={{
        marginTop: 18, fontFamily: fontUI, fontSize: 12,
        opacity: 0.85, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        140 locals are curating Quebec City {I.arrow('rgba(255,255,255,0.85)', 12)}
      </div>
    </div>
  );
}

// ─── Curated venues row ──────────────────────────────────────────────────
function CuratedVenues() {
  const items = [
    { label: 'spa des chutes', name: 'Off-grid spa, no service', dist: '14 km' },
    { label: 'bar à minuit', name: 'Speakeasy behind a bookshop', dist: '0.8 km' },
    { label: 'le belvédère', name: 'Secret viewpoint over the river', dist: '2.1 km' },
  ];
  return (
    <div style={{ marginBottom: 28 }}>
      <SectionHeader
        kicker="xplora-certified"
        title="Places we vouch for."
        action="map" />
      <div style={{
        display: 'flex', gap: 12, padding: '0 20px',
        overflowX: 'auto',
      }}>
        {items.map((it, i) => (
          <div key={i} style={{
            minWidth: 200, display: 'flex', flexDirection: 'column',
          }}>
            <Placeholder label={it.label} h={140} radius={10} tone={i === 1 ? 'ink' : 'forest'} />
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, marginTop: 10,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke={X.forestDeep} strokeWidth="1"/><path d="M4 7l2 2 4-4" stroke={X.forestDeep} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{
                fontFamily: fontMono, fontSize: 9.5, letterSpacing: 0.8,
                textTransform: 'uppercase', color: X.forestDeep,
              }}>certified</span>
            </div>
            <div style={{
              fontFamily: fontDisplay, fontSize: 17, color: X.ink,
              letterSpacing: -0.2, lineHeight: 1.2, marginTop: 4,
              textWrap: 'pretty', fontWeight: 400,
            }}>{it.name}</div>
            <div style={{
              fontFamily: fontUI, fontSize: 11, color: X.ink3, marginTop: 4,
            }}>{it.dist} away</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────
function FeedFooter() {
  return (
    <div style={{
      padding: '8px 20px 28px', textAlign: 'center',
      fontFamily: fontMono, fontSize: 10, color: X.ink3,
      letterSpacing: 1, textTransform: 'uppercase',
    }}>
      discover. connect. experience.
    </div>
  );
}

// ─── Bottom tab bar ──────────────────────────────────────────────────────
function TabBar({ active = 'feed', dark = false, bottomInset = 0 }) {
  const tabs = [
    { id: 'feed', label: 'Discover', icon: I.tabFeed },
    { id: 'map', label: 'Map', icon: I.tabMap },
    { id: 'meet', label: 'Meet', icon: I.tabMeet },
    { id: 'saved', label: 'Saved', icon: I.tabSaved },
    { id: 'me', label: 'Me', icon: I.tabMe },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: bottomInset, background: 'rgba(248,247,242,0.92)',
      backdropFilter: 'blur(14px)',
      borderTop: `1px solid ${X.hairline}`,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        padding: '8px 12px 6px',
      }}>
        {tabs.map(t => (
          <div key={t.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: t.id === active ? X.forestDeep : X.ink3,
            fontFamily: fontUI, fontSize: 10, letterSpacing: 0.3,
          }}>
            {t.icon(t.id === active ? X.forestDeep : X.ink3)}
            <span>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Detail screen ───────────────────────────────────────────────────────
function DetailScreen({ onBack }) {
  return (
    <div style={{ background: X.beige, minHeight: '100%', paddingBottom: 100 }}>
      <div style={{ position: 'relative' }}>
        <Placeholder label="café perché — basse-ville" h={360} radius={0} tone="forest" />
        {/* top bar overlay */}
        <div style={{
          position: 'absolute', top: 14, left: 14, right: 14,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <div onClick={onBack} style={{
            width: 38, height: 38, borderRadius: 99,
            background: 'rgba(255,255,255,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>{I.back()}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[I.share(), I.heart()].map((ic, i) => (
              <div key={i} style={{
                width: 38, height: 38, borderRadius: 99,
                background: 'rgba(255,255,255,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{ic}</div>
            ))}
          </div>
        </div>
        {/* image counter */}
        <div style={{
          position: 'absolute', bottom: 14, right: 14,
          background: 'rgba(20,28,22,0.75)', color: X.beige,
          fontFamily: fontMono, fontSize: 10, letterSpacing: 0.6,
          padding: '4px 8px', borderRadius: 99,
        }}>1 / 7</div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          fontFamily: fontMono, fontSize: 10, letterSpacing: 1.2,
          textTransform: 'uppercase', color: X.terracotta,
        }}>hidden gem · café</div>
        <div style={{
          fontFamily: fontDisplay, fontSize: 30, color: X.ink,
          lineHeight: 1.05, letterSpacing: -0.5, marginTop: 6, fontWeight: 400,
          textWrap: 'pretty',
        }}>
          Café Perché — a second-floor secret in
          <span style={{ fontStyle: 'italic' }}> Basse-Ville</span>
        </div>
        <div style={{
          marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 12,
          fontFamily: fontUI, fontSize: 12, color: X.ink2, alignItems: 'center',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {I.pin(X.ink2, 11)} rue Saint-Joseph · 8 min walk
          </span>
          <span style={{ width: 3, height: 3, borderRadius: 99, background: X.ink3 }} />
          <span>open · 7am – 4pm</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1,
          marginTop: 18, background: X.hairline, border: `1px solid ${X.hairline}`,
          borderRadius: 12, overflow: 'hidden',
        }}>
          {[
            { k: 'vibe', v: 'quiet · slow' },
            { k: 'price', v: '$ · cash ok' },
            { k: 'best for', v: 'morning solo' },
          ].map((s, i) => (
            <div key={i} style={{
              background: X.paper, padding: '14px 12px',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <span style={{
                fontFamily: fontMono, fontSize: 9, letterSpacing: 0.8,
                textTransform: 'uppercase', color: X.ink3,
              }}>{s.k}</span>
              <span style={{
                fontFamily: fontUI, fontSize: 12.5, color: X.ink,
              }}>{s.v}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 22, fontFamily: fontUI, fontSize: 14, color: X.ink2,
          lineHeight: 1.6, textWrap: 'pretty',
        }}>
          A worn wooden staircase leads to one large room with six tables, all
          facing different directions. The owner, Étienne, roasts beans on
          Wednesdays — that's the morning to come. They don't take reservations,
          and they don't have wifi.
        </div>

        {/* curator card */}
        <div style={{
          marginTop: 22, padding: 14,
          background: X.paper, border: `1px solid ${X.hairline}`,
          borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 99,
            background: X.forestDeep,
            fontFamily: fontDisplay, fontSize: 20, color: X.beige,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>M</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: fontUI, fontSize: 12, color: X.ink3 }}>
              curated by
            </div>
            <div style={{
              fontFamily: fontDisplay, fontSize: 17, color: X.ink,
              letterSpacing: -0.2, fontWeight: 400,
            }}>Marie-Ève — local since '94</div>
          </div>
          <div style={{
            padding: '6px 10px', borderRadius: 99,
            border: `1px solid ${X.hairline}`, fontFamily: fontUI, fontSize: 11,
            color: X.ink2,
          }}>follow</div>
        </div>

        {/* meet hook */}
        <div style={{
          marginTop: 18, padding: 16, borderRadius: 14,
          background: X.forestDeep, color: X.beige,
        }}>
          <div style={{
            fontFamily: fontMono, fontSize: 10, letterSpacing: 1,
            textTransform: 'uppercase', opacity: 0.7,
          }}>meet & xplora</div>
          <div style={{
            fontFamily: fontDisplay, fontSize: 19, marginTop: 6, lineHeight: 1.2,
            letterSpacing: -0.2, fontWeight: 400, textWrap: 'pretty',
          }}>
            2 others want to come here this week.
            <span style={{ fontStyle: 'italic', opacity: 0.85 }}> Want to join?</span>
          </div>
          <div style={{
            marginTop: 12, display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: fontUI, fontSize: 12, opacity: 0.85,
          }}>
            <div style={{ display: 'flex' }}>
              {['L','C'].map((l, k) => (
                <div key={k} style={{
                  width: 26, height: 26, borderRadius: 99,
                  background: k === 0 ? X.terracotta : 'oklch(0.32 0.012 60)',
                  border: '2px solid oklch(0.22 0.04 155)',
                  marginLeft: k === 0 ? 0 : -8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: '#fff',
                }}>{l}</div>
              ))}
            </div>
            Léa & Camille · thu morning
          </div>
        </div>
      </div>

      {/* sticky CTA */}
      <div style={{
        position: 'sticky', bottom: 80,
        margin: '24px 20px 0',
        padding: 16, background: X.ink, color: X.beige,
        borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: fontMono, fontSize: 9.5, letterSpacing: 0.8,
            opacity: 0.65, textTransform: 'uppercase',
          }}>flash · tonight only</div>
          <div style={{
            fontFamily: fontDisplay, fontSize: 22, lineHeight: 1, marginTop: 2,
            letterSpacing: -0.4, fontWeight: 400,
          }}>$18 <span style={{ opacity: 0.5, fontSize: 14, textDecoration: 'line-through' }}>$26</span></div>
        </div>
        <div style={{
          padding: '12px 18px', background: X.terracotta, color: X.beige,
          borderRadius: 99, fontFamily: fontUI, fontSize: 14, fontWeight: 500,
        }}>reserve · 4 left</div>
      </div>
    </div>
  );
}

// ─── Top-level Feed (composes everything) ────────────────────────────────
function DiscoveryFeed({ city, question, screen, onNavigate, topInset = 0, bottomInset = 0 }) {
  if (screen === 'detail') {
    return (
      <div style={{
        background: X.beige, height: '100%', overflow: 'auto',
        paddingTop: topInset,
      }}>
        <DetailScreen onBack={() => onNavigate('feed')} />
        <TabBar active="feed" bottomInset={bottomInset} />
      </div>
    );
  }
  return (
    <div style={{
      background: X.beige, height: '100%', overflow: 'auto',
      paddingTop: topInset,
      paddingBottom: 90 + bottomInset,
    }}>
      <FeedHeader city={city} />
      <Hero question={question} />
      <HiddenGemCard onTap={() => onNavigate('detail')} />
      <SectionHeader kicker="local picks" title="Curated for you, today." action="more" />
      <LocalPicks onTap={() => onNavigate('detail')} />
      <FlashDeals />
      <MeetRail />
      <LocalsQuote />
      <CuratedVenues />
      <FeedFooter />
      <TabBar active="feed" bottomInset={bottomInset} />
    </div>
  );
}

Object.assign(window, {
  DiscoveryFeed, DetailScreen, Wordmark,
  XPALETTE: X, fontDisplay, fontUI, fontMono,
});
