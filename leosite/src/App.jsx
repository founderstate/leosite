import { useState, useEffect, useRef } from "react";

const ACCENT = "#2D8C3C";
const ACCENT_LIGHT = "#E8F5E9";
const DARK = "#111111";
const GRAY = "#666666";
const LIGHT_GRAY = "#F5F5F5";
const WHITE = "#FFFFFF";
const BORDER = "#E0E0E0";

function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, isInView];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, isInView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── ACCORDION ─────────────────────────────────────────── */
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: `1px solid ${BORDER}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(15px, 1.7vw, 17px)",
          fontWeight: 600,
          color: DARK,
          textAlign: "left",
          lineHeight: 1.4,
        }}
      >
        <span>{title}</span>
        <span style={{
          fontSize: "20px",
          fontWeight: 300,
          color: ACCENT,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
          flexShrink: 0,
          marginLeft: "16px",
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? "4000px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.5s ease",
      }}>
        <div style={{ paddingBottom: "24px" }}>{children}</div>
      </div>
    </div>
  );
}

function PhaseLabel({ children }) {
  return (
    <div style={{
      fontSize: "clamp(10px, 1.1vw, 11px)",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: ACCENT,
      fontWeight: 600,
      fontFamily: "'DM Sans', sans-serif",
      marginTop: "16px",
      marginBottom: "8px",
    }}>{children}</div>
  );
}

function CapItem({ cap, detail }) {
  return (
    <div style={{
      padding: "10px 0 10px 16px",
      borderLeft: `2px solid ${BORDER}`,
      marginBottom: "8px",
    }}>
      <div style={{
        fontSize: "clamp(13px, 1.4vw, 15px)",
        fontWeight: 600,
        color: DARK,
        fontFamily: "'DM Sans', sans-serif",
      }}>{cap}</div>
      <div style={{
        fontSize: "clamp(12px, 1.3vw, 14px)",
        color: GRAY,
        marginTop: "3px",
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.55,
      }}>{detail}</div>
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "clamp(24px, 6vw, 80px)",
      background: WHITE,
    }}>
      <FadeIn>
        <div style={{
          fontSize: "clamp(11px, 1.4vw, 13px)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: ACCENT,
          fontWeight: 600,
          marginBottom: "clamp(16px, 3vw, 32px)",
          fontFamily: "'DM Sans', sans-serif",
        }}>Pretty Well Fit</div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontSize: "clamp(36px, 7vw, 72px)",
          fontWeight: 300,
          lineHeight: 1.1,
          color: DARK,
          margin: 0,
          fontFamily: "'Instrument Serif', Georgia, serif",
          maxWidth: "800px",
        }}>Leo Raderman</h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{
          fontSize: "clamp(16px, 2.2vw, 22px)",
          fontWeight: 500,
          color: DARK,
          margin: "clamp(12px, 2vw, 20px) 0 0 0",
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: "600px",
          lineHeight: 1.4,
        }}>Category Creator</p>
      </FadeIn>
      <FadeIn delay={0.25}>
        <h2 style={{
          fontSize: "clamp(22px, 3.5vw, 36px)",
          fontWeight: 300,
          lineHeight: 1.2,
          color: DARK,
          margin: "clamp(20px, 3vw, 32px) 0 0 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          maxWidth: "600px",
          fontStyle: "italic",
        }}>Five companies that defined their categories {"—"} before the categories existed.</h2>
      </FadeIn>
      <FadeIn delay={0.35}>
        <p style={{
          fontSize: "clamp(15px, 1.8vw, 18px)",
          color: GRAY,
          margin: "clamp(16px, 3vw, 28px) 0 0 0",
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: "580px",
          lineHeight: 1.65,
          fontWeight: 400,
        }}>
          $100M+ largest exit. 5,000+ retail locations. $65M+ raised across
          internet video, immersive technology, mobile communication,
          physical-digital toys, and global healthcare.
        </p>
      </FadeIn>
      <FadeIn delay={0.45}>
        <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
          <a href="#pattern" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: ACCENT,
            textDecoration: "none",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
          }}>See the pattern {"\u2193"}</a>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── NUMBERS BAR ───────────────────────────────────────── */
function NumbersBar() {
  const stats = [
    { number: "5", label: "Companies Founded" },
    { number: "$100M+", label: "Largest Exit" },
    { number: "$65M+", label: "Capital Raised" },
    { number: "5,000+", label: "Retail Locations" },
  ];
  return (
    <section id="pattern" style={{
      background: DARK,
      padding: "clamp(40px, 6vw, 64px) clamp(24px, 6vw, 80px)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "clamp(24px, 4vw, 40px)",
        maxWidth: "900px",
        margin: "0 auto",
      }}>
        {stats.map((s, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 300,
                color: WHITE,
                fontFamily: "'Instrument Serif', Georgia, serif",
                lineHeight: 1.1,
              }}>{s.number}</div>
              <div style={{
                fontSize: "clamp(10px, 1.2vw, 12px)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginTop: "8px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}>{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── MERGED PATTERN + TRACK RECORD ─────────────────────── */
function PatternSection() {
  const items = [
    {
      year: "1998\u20132005",
      question: "“What’s internet video?”",
      company: "IFILM",
      role: "Founder, CEO",
      industry: "Internet video / digital media",
      outcome: "First major user-generated video platform on the internet — six years before YouTube. Pioneered online video distribution and advertising-supported free streaming when the industry said bandwidth couldn’t support it. Viacom acquired IFILM.com for $49M. Total IFILM enterprise asset sales exceeded $100M.",
      video: "https://vimeo.com/79609746",
      press: { label: "The New York Times", url: "https://www.nytimes.com/1999/12/20/movies/technology-media-film-s-digital-potential-has-hollywood-on-edge.html" },
    },
    {
      year: "2000\u20132017",
      question: "“What’s architectural projection mapping?”",
      company: "Obscura Digital",
      role: "Co-Founder, CEO",
      industry: "Immersive video / experiential technology",
      outcome: "Pioneered immersive architectural projection mapping — projecting onto the Empire State Building, the Vatican, and Fortune 500 stages worldwide. Company later acquired by Madison Square Garden Company. Core technology inspired and now powers The Sphere, Las Vegas.",
      video: "https://vimeo.com/260863020",
      press: { label: "Variety", url: "https://variety.com/2002/digital/markets-festivals/you-are-surrounded-by-obscura-1117868217/" },
    },
    {
      year: "2006\u20132008",
      question: "“What’s mobile video communication?”",
      company: "Veeker",
      role: "Co-Founder, Chief Market & Product Officer",
      industry: "Cell phone photo and video platform",
      outcome: "Enabled mobile video and photo sharing pre-iPhone, pre-Instagram. First to deliver user-generated video clips to NBC News. TechCrunch wrote: 'Critics contend that mass market extensive use of mobile video is unlikely. Obviously Veeker is a company betting otherwise.'",
      video: "https://youtu.be/wSWtwIAzuyA",
      press: { label: "TechCrunch", url: "https://techcrunch.com/2006/10/25/veeker-an-embedded-player-for-mobile-video/" },
    },
    {
      year: "2008\u20132013",
      question: "“What’s a physical-digital play pattern?”",
      company: "Nukotoys",
      role: "Co-Founder, Co-CEO",
      industry: "Apps/video game and physical toys integration",
      outcome: "Created collectible trading cards that activated in-game characters with a tap on the screen — bridging physical toys and digital play. Licensed with Animal Planet and Ology Books. 5,000+ retail locations including Apple, Walmart, Target, Toys-R-Us, Barnes & Noble. VentureBeat Best Mobile App 2012. Parenting Magazine Best Toy 2012.",
      video: "https://vimeo.com/42738280",
      press: { label: "GamesBeat", url: "https://gamesbeat.com/nukotoys-aims-to-be-silicon-valleys-toy-company/" },
      extraVideos: [
        { url: "https://vimeo.com/36580567", label: "Learn" },
        { url: "https://vimeo.com/47917689", label: "Gameplay" },
      ],
    },
    {
      year: "2010\u2013Present",
      question: "“How can kids in developing countries be cured of clubfoot?”",
      company: "MiracleFeet",
      role: "Co-Founder, Board Member",
      industry: "Non-profit / global healthcare",
      outcome: "Brought low-cost clubfoot treatment to the developing world. Co-developed a transformative medical device with Stanford d.school. $500 transforms a life. 130,000+ children treated across 37 countries.",
      video: "https://youtu.be/cnZV21navZc",
      press: { label: "PBS NewsHour", url: "https://www.pbs.org/newshour/world/correcting-clubfoot" },
    },
  ];

  return (
    <section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)",
      background: WHITE,
    }}>
      <FadeIn>
        <div style={{
          fontSize: "clamp(10px, 1.2vw, 12px)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: ACCENT,
          fontWeight: 600,
          marginBottom: "12px",
          fontFamily: "'DM Sans', sans-serif",
        }}>The Pattern</div>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 300,
          color: DARK,
          margin: "0 0 clamp(40px, 6vw, 64px) 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          maxWidth: "640px",
          lineHeight: 1.2,
        }}>Questioning what’s possible before it became probable.</h2>
      </FadeIn>
      <div style={{ maxWidth: "680px" }}>
        {items.map((item, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{
              display: "flex",
              gap: "clamp(16px, 3vw, 32px)",
              paddingBottom: "clamp(28px, 4vw, 40px)",
              marginBottom: i < items.length - 1 ? "clamp(28px, 4vw, 40px)" : 0,
              borderBottom: i < items.length - 1 ? `1px solid ${BORDER}` : "none",
              alignItems: "flex-start",
            }}>
              <div style={{
                fontSize: "clamp(12px, 1.6vw, 14px)",
                fontWeight: 600,
                color: ACCENT,
                fontFamily: "'DM Sans', sans-serif",
                minWidth: "clamp(80px, 10vw, 110px)",
                paddingTop: "4px",
                letterSpacing: "0.02em",
              }}>{item.year}</div>
              <div>
                <div style={{
                  fontSize: "clamp(18px, 2.8vw, 24px)",
                  fontWeight: 300,
                  color: DARK,
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  lineHeight: 1.3,
                  fontStyle: "italic",
                }}>{item.question}</div>
                <div style={{
                  fontSize: "clamp(15px, 1.7vw, 17px)",
                  color: DARK,
                  fontWeight: 600,
                  marginTop: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{item.company}</div>
                <div style={{
                  fontSize: "clamp(12px, 1.3vw, 13px)",
                  color: ACCENT,
                  fontWeight: 600,
                  marginTop: "2px",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{item.role}</div>
                <div style={{
                  fontSize: "clamp(13px, 1.4vw, 14px)",
                  color: GRAY,
                  marginTop: "2px",
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.5,
                }}>{item.industry}</div>
                <div style={{
                  fontSize: "clamp(13px, 1.4vw, 14px)",
                  color: GRAY,
                  marginTop: "4px",
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.5,
                }}>{item.outcome}</div>
                {item.video && (
                  <div style={{
                    marginTop: "8px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    alignItems: "center",
                  }}>
                    <a href={item.video} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: "clamp(11px, 1.2vw, 13px)",
                      color: ACCENT,
                      textDecoration: "none",
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.05em",
                    }}>Watch {"→"}</a>
                    {item.extraVideos && item.extraVideos.map((ev, j) => (
                      <a key={j} href={ev.url} target="_blank" rel="noopener noreferrer" style={{
                        fontSize: "clamp(11px, 1.2vw, 13px)",
                        color: ACCENT,
                        textDecoration: "none",
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: "0.05em",
                      }}>{ev.label} {"→"}</a>
                    ))}
                    {item.press && (
                      <a href={item.press.url} target="_blank" rel="noopener noreferrer" style={{
                        fontSize: "clamp(11px, 1.2vw, 13px)",
                        color: GRAY,
                        textDecoration: "none",
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: "0.05em",
                        borderLeft: `1px solid ${BORDER}`,
                        paddingLeft: "12px",
                      }}>{item.press.label} {"→"}</a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Additional */}
      <FadeIn delay={0.5}>
        <div style={{
          marginTop: "clamp(28px, 4vw, 40px)",
          paddingTop: "clamp(28px, 4vw, 40px)",
          borderTop: `1px solid ${BORDER}`,
          maxWidth: "680px",
        }}>
          <div style={{
            fontSize: "clamp(10px, 1.1vw, 11px)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: GRAY,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "16px",
          }}>Additional</div>
          {[
            {
              company: "Saatchi & Saatchi Darwin Digital",
              role: "Managing Director & Creative Director",
              question: "“How does a leading global advertising agency go digital?”",
              detail: "Employee #3 in the New York office. Established digital teams in New Zealand and San Francisco.",
              years: "1997\u20131999",
            },
            {
              company: "Pretty Well Fit",
              role: "Managing Partner",
              question: "“What does it take to move from vision to reality?”",
              detail: "From strategy through implementation — advisory and agency services for founders building what comes next",
              years: "2023\u2013Present",
            },
          ].map((item, i) => (
            <div key={i} style={{
              paddingBottom: "12px",
              marginBottom: "12px",
              borderBottom: i === 0 ? `1px solid ${BORDER}` : "none",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: "4px 16px",
              }}>
                <span style={{
                  fontSize: "clamp(14px, 1.6vw, 16px)",
                  fontWeight: 600,
                  color: DARK,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{item.company}</span>
                <span style={{
                  fontSize: "clamp(12px, 1.3vw, 13px)",
                  color: ACCENT,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{item.role}</span>
              </div>
              {item.question && (
                <div style={{
                  fontSize: "clamp(14px, 1.6vw, 16px)",
                  fontWeight: 300,
                  color: DARK,
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  marginTop: "4px",
                }}>{item.question}</div>
              )}
              <div style={{
                fontSize: "clamp(13px, 1.4vw, 14px)",
                color: GRAY,
                marginTop: "4px",
                fontFamily: "'DM Sans', sans-serif",
              }}>{item.detail}</div>
              {item.years && (
                <div style={{
                  fontSize: "clamp(11px, 1.2vw, 12px)",
                  color: ACCENT,
                  marginTop: "4px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}>{item.years}</div>
              )}
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── CAPITAL SECTION ───────────────────────────────────── */
function CapitalSection() {
  const investors = [
    "Sony Corporation", "Yahoo!", "Independent Film Channel",
    "Roy Disney’s Steamboat Ventures",
    "Eastman Kodak", "Rainbow Media (AMC Networks)", "Liberty Digital",
    "Axiom Venture Partners", "Meritage Funds", "OddLot Entertainment",
  ];
  return (
    <section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)",
      background: LIGHT_GRAY,
    }}>
      <FadeIn>
        <div style={{
          fontSize: "clamp(10px, 1.2vw, 12px)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: ACCENT,
          fontWeight: 600,
          marginBottom: "12px",
          fontFamily: "'DM Sans', sans-serif",
        }}>Capital Formation</div>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 300,
          color: DARK,
          margin: "0 0 16px 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          lineHeight: 1.2,
        }}>$65M+ raised from institutional and strategic investors.</h2>
        <p style={{
          fontSize: "clamp(14px, 1.6vw, 16px)",
          color: GRAY,
          margin: "0 0 clamp(32px, 5vw, 48px) 0",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.6,
          maxWidth: "580px",
        }}>
          The full capital formation lifecycle {"—"} friends and family through VC,
          strategic/corporate investors, term sheet negotiation, and exit.
          Presented to the full partnership at Kleiner Perkins. Pitched Sequoia,
          Benchmark, Andreessen Horowitz, Accel, NEA, DFJ, Bessemer, and nearly
          every major fund on Sand Hill Road. Closed John Malone{"’"}s Liberty Digital,
          Roy Disney{"’"}s Steamboat Ventures, Axiom Venture Partners, and Meritage Funds.
          Strategic investments from Sony, Yahoo!, Eastman Kodak, Independent Film
          Channel, Rainbow Media.
        </p>
      </FadeIn>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        maxWidth: "680px",
      }}>
        {investors.map((inv, i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <span style={{
              display: "inline-block",
              padding: "8px 16px",
              border: `1px solid ${BORDER}`,
              borderRadius: "4px",
              fontSize: "clamp(12px, 1.3vw, 14px)",
              color: DARK,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
            }}>{inv}</span>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── CAPABILITIES (ACCORDION) ──────────────────────────── */
function CapabilitiesSection() {
  return (
    <section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)",
      background: WHITE,
    }}>
      <FadeIn>
        <div style={{
          fontSize: "clamp(10px, 1.2vw, 12px)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: ACCENT,
          fontWeight: 600,
          marginBottom: "12px",
          fontFamily: "'DM Sans', sans-serif",
        }}>Areas of Expertise</div>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 300,
          color: DARK,
          margin: "0 0 clamp(32px, 5vw, 48px) 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          lineHeight: 1.2,
        }}>What you get, specifically.</h2>
      </FadeIn>

      <div style={{ maxWidth: "740px" }}>
        {/* ── FUNDRAISING & CAPITAL FORMATION ── */}
        <Accordion title="Fundraising & Capital Formation">
          <PhaseLabel>Structure & Strategy</PhaseLabel>
          <CapItem cap="Capital Strategy & Staging" detail="Right-sizing raises, staging capital deployment, and matching capital strategy to business phase. Bootstrapped through $65M+ in raised capital across all ventures." />
          <CapItem cap="Company / Round Structuring" detail="Entity selection, SAFE/convertible note guidance, and round documentation. Demonstrated at IFILM (initial capital structure) and Nukotoys (OddLot JV structure)." />
          <CapItem cap="Investor Deck Creation" detail="Institutional-grade pitch materials for every stage. Pitched Sony, Yahoo!, Paul Allen’s fund, Toy Fair audiences, and VC full partnerships." />

          <PhaseLabel>Build the Room</PhaseLabel>
          <CapItem cap="Angel Investor Identification & Pitch" detail="High-net-worth investor targeting and warm introduction strategy. IFILM angel round included Kevin Wendle (co-founder of FOX cable network and C|Net) via Morgan Stanley Private Wealth Management. Additional angels included Steven Spielberg, producing partner Kathleen Kennedy, and heads of major Hollywood talent agencies." />
          <CapItem cap="VC Targeting & Sequencing" detail="Full VC fundraising process — data room, meeting sequencing, partner meetings through full partnership presentations. Presented to the full partnership at Kleiner Perkins. Pitched Sequoia, Benchmark, Andreessen Horowitz, Accel, NEA, DFJ, Bessemer, and nearly every major fund on Sand Hill Road. IFILM Series A led by Axiom Venture Partners; Veeker funded by Meritage Funds." />
          <CapItem cap="Strategic & Corporate Investor Acquisition" detail="Identifying, pitching, and closing strategic investors who bring capital plus distribution, credibility, or operational value. Closed Sony, Yahoo!, IFC, Roy Disney’s Steamboat Ventures, Eastman Kodak, and Rainbow Media (AMC Networks)." />

          <PhaseLabel>Negotiate & Close</PhaseLabel>
          <CapItem cap="Term Sheet Negotiation" detail="Protecting founder interests across valuation, dilution, control, and liquidation preference terms. Five companies, multiple rounds — seed through growth stages." />
          <CapItem cap="Valuation Negotiation" detail="Stage-appropriate valuation benchmarking, cap table modeling, and negotiation strategy across seed, Series A, and growth rounds. Structured and negotiated valuations at IFILM, Nukotoys, and Veeker." />

          <PhaseLabel>Post-Close</PhaseLabel>
          <CapItem cap="Board Management & Governance" detail="Post-raise governance, board reporting, and investor relationship management. Managed Nukotoys board through growth; navigated complex IFILM investor dynamics." />
          <CapItem cap="Investor Communication & Reporting" detail="Ongoing investor updates, milestone reporting, and relationship management across multiple simultaneous investor groups." />
        </Accordion>

        {/* ── PRODUCT DEVELOPMENT & GO-TO-MARKET ── */}
        <Accordion title="Product Development & Go-to-Market">
          <PhaseLabel>Conceive</PhaseLabel>
          <CapItem cap="New Category Creation" detail="Market education strategy, consumer mental model creation, and category positioning when no benchmarks exist. IFILM (online video before YouTube), Nukotoys (physical-digital play), Obscura (projection mapping)." />
          <CapItem cap="Category Education / Market Creation" detail="Content strategy, media positioning, and messaging for products consumers don’t have a mental model for. IFILM (explaining “internet video” in 1998), Nukotoys (explaining apps/video game and physical toys integration)." />
          <CapItem cap="Hardware / Software Integration" detail="Product strategy for companies combining physical and digital components. Nukotoys (physical cards + camera recognition + app), Obscura (projection hardware + content software)." />
          <CapItem cap="Razor / Razorblade Model Design" detail="Recurring revenue model design — device + consumable, platform + content, or hardware + service. Nukotoys (free app + paid physical cards)." />

          <PhaseLabel>Build</PhaseLabel>
          <CapItem cap="Manufacturing Partner Management" detail="Vendor selection, relationship management, quality control, and cost negotiation. Nukotoys (toy manufacturing, Hong Kong Toy Fair), Obscura (display systems)." />
          <CapItem cap="SKU Strategy & Product Line Architecture" detail="Product line planning, pricing tiers, bundle strategy, and margin optimization. Nukotoys (multiple card series, different price points across five national retailers)." />

          <PhaseLabel>Launch</PhaseLabel>
          <CapItem cap="Pre-Launch Brand Building" detail="Building brand awareness and credibility before product is available — creating demand before supply. IFILM (brand before platform launched), Nukotoys (Toy Fair before retail)." />
          <CapItem cap="Trade Show Strategy & Execution" detail="Trade show planning, booth strategy, meeting scheduling, and post-show follow-up conversion. Nukotoys (Hong Kong Toy Fair, US Toy Fair)." />
          <CapItem cap="D2C E-Commerce" detail="Direct-to-consumer channel strategy, platform selection, and launch execution. Pretty Well Fit (cannabis wellness D2C)." />
        </Accordion>

        {/* ── MARKETING, SALES & PARTNERSHIPS ── */}
        <Accordion title="Marketing, Sales & Partnerships">
          <PhaseLabel>Brand & Story</PhaseLabel>
          <CapItem cap="Brand Creation & Naming" detail="Brand identity development from naming through visual system and voice. Obscura Digital (from da Vinci), Nukotoys, IFILM, Pretty Well Fit." />
          <CapItem cap="PR & Earned Media" detail="Press strategy, media list development, journalist relationships, and earned media campaigns. Coverage in NYT, WSJ, Variety, Hollywood Reporter, Bloomberg, TechCrunch, Wired, CNET, LA Times, and many more." />
          <CapItem cap="Creative Direction" detail="High-level creative oversight for brand campaigns, product launches, and visual identity. IFILM (Helmut Newton shoot), Obscura (Fortune 500 installations)." />
          <CapItem cap="Content Marketing & SEO" detail="Organic acquisition strategy, content development, and conversion optimization." />

          <PhaseLabel>Sell</PhaseLabel>
          <CapItem cap="Enterprise / B2B Sales" detail="B2B partnership development, enterprise sales process, and account management. Obscura (Fortune 500 clients), Nukotoys (national retail chains)." />
          <CapItem cap="Retail Buyer Relationships" detail="Retail channel entry strategy, buyer pitch development, and ongoing relationship management. Nukotoys achieved simultaneous distribution at Apple Stores, Walmart, Target, Toys-R-Us, Barnes & Noble." />
          <CapItem cap="Channel Conflict Management" detail="Pricing and positioning strategies that protect partners while maintaining direct channels. Nukotoys (five national retail channels simultaneously)." />

          <PhaseLabel>Partner</PhaseLabel>
          <CapItem cap="Strategic Partnership Structuring" detail="Partnership architecture — JVs, licensing, co-marketing, revenue share, and equity structures. Nukotoys/OddLot (JV), Nukotoys/PBS (education grant), IFILM/Sony/Yahoo!." />
          <CapItem cap="Licensing & Revenue Share Models" detail="IP monetization, licensing term negotiation, and revenue share structuring. Nukotoys (licensing IP for physical-digital play)." />
        </Accordion>

        {/* ── LEGAL, OPERATIONS & COMPANY BUILDING ── */}
        <Accordion title="Legal, Operations & Company Building">
          <PhaseLabel>Form</PhaseLabel>
          <CapItem cap="Company Formation & Entity Structuring" detail="Guidance on entity selection, formation, and restructuring as business evolves. Five companies — LLC, C-Corp, JV structures." />
          <CapItem cap="Co-Founder Agreements & Equity Splits" detail="Founder relationship structuring, equity allocation, and role definition. IFILM (with Luke McDonough), Nukotoys (Co-CEO with Doug Penman), Obscura (with Travis Threlkel)." />
          <CapItem cap="Joint Venture Structuring" detail="JV architecture, governance, economics, and exit provisions. Nukotoys/OddLot Entertainment 50/50 JV." />

          <PhaseLabel>Protect</PhaseLabel>
          <CapItem cap="IP Protection Strategy" detail="Patent vs. trade secret analysis, trademark strategy, and IP portfolio management. Obscura (brand naming), Nukotoys (physical-digital play pattern protection)." />

          <PhaseLabel>Scale</PhaseLabel>
          <CapItem cap="Hiring & Team Building" detail="Organizational design, key hire identification, and team scaling strategy. IFILM (grew to 100+ employees), Nukotoys, Obscura, Saatchi & Saatchi." />
          <CapItem cap="Budget Management & Resource Allocation" detail="Capital deployment optimization, burn rate management, and resource prioritization across all ventures — bootstrapped through $65M+ in raised capital." />

          <PhaseLabel>Navigate</PhaseLabel>
          <CapItem cap="Exit Negotiation & M&A" detail="Exit preparation, buyer identification, negotiation strategy, and deal execution. IFILM sale to Viacom ($100M+), Obscura sale to MSG." />
          <CapItem cap="Pivot & Strategic Redirection" detail="Recognizing when to pivot, managing stakeholder communication, and executing strategic shifts. Veeker (pre-smartphone mobile video), Nukotoys (toy → education)." />
        </Accordion>

        {/* ── RETAIL DISTRIBUTION AT SCALE ── */}
        <Accordion title="Retail Distribution at Scale">
          <CapItem cap="Multi-Channel National Distribution" detail="Simultaneous retail distribution across five major national chains: Apple Stores, Walmart, Target, Toys-R-Us, and Barnes & Noble." />
          <CapItem cap="Buyer Relationship Management" detail="Managing fundamentally different buyer relationships, pricing strategies, merchandising requirements, and channel conflict dynamics — simultaneously across all channels." />
          <CapItem cap="Pricing Strategy Across Channels" detail="Maintaining pricing integrity while managing different economics, margin expectations, and competitive dynamics at each retail partner." />
          <CapItem cap="Merchandising & In-Store Execution" detail="Channel-specific merchandising, planogram negotiation, and in-store positioning strategy across mass retail and specialty channels." />
        </Accordion>
      </div>
    </section>
  );
}

/* ─── PRESS & MEDIA ─────────────────────────────────────── */
function PressSection() {
  const press = [
    { name: "The New York Times", url: "https://www.nytimes.com/1999/12/20/movies/technology-media-film-s-digital-potential-has-hollywood-on-edge.html" },
    { name: "The Wall Street Journal", url: null },
    { name: "Variety", url: "https://variety.com/2002/digital/markets-festivals/you-are-surrounded-by-obscura-1117868217/" },
    { name: "The Hollywood Reporter", url: null },
    { name: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2013-05-09/bluescape-the-touchscreen-that-covers-a-wall" },
    { name: "TechCrunch", url: "https://techcrunch.com/2006/10/25/veeker-an-embedded-player-for-mobile-video/" },
    { name: "Wired", url: "https://www.wired.com/story/obscura-digital-protests-projection-mapping-the-vatican/" },
    { name: "CNET", url: "https://www.cnet.com/culture/nukotoys-aims-for-next-generation-toy-empire/" },
    { name: "LA Times", url: "https://www.latimes.com/archives/la-xpm-2000-aug-31-fi-13123-story.html" },
    { name: "PBS", url: "https://www.pbs.org/newshour/world/correcting-clubfoot" },
    { name: "Fox News", url: null },
    { name: "Ad Age", url: "https://adage.com/article/news/coby-o-brien-darwin-digital/65658/" },
    { name: "GamesBeat", url: "https://gamesbeat.com/nukotoys-aims-to-be-silicon-valleys-toy-company/" },
    { name: "Communication Arts", url: "https://www.commarts.com/features/obscura-digital" },
    { name: "GQ", url: null },
  ];
  return (
    <section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)",
      background: LIGHT_GRAY,
    }}>
      <FadeIn>
        <div style={{
          fontSize: "clamp(10px, 1.2vw, 12px)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: ACCENT,
          fontWeight: 600,
          marginBottom: "12px",
          fontFamily: "'DM Sans', sans-serif",
        }}>Press & Media Profile</div>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 300,
          color: DARK,
          margin: "0 0 clamp(32px, 5vw, 48px) 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          lineHeight: 1.2,
        }}>Covered across technology, entertainment, and business media.</h2>
      </FadeIn>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "clamp(24px, 4vw, 36px)",
        maxWidth: "740px",
      }}>
        {press.map((p, i) => (
          <FadeIn key={i} delay={i * 0.03}>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block",
                padding: "9px 18px",
                background: DARK,
                color: WHITE,
                borderRadius: "4px",
                fontSize: "clamp(11px, 1.2vw, 13px)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT}
              onMouseLeave={e => e.currentTarget.style.background = DARK}
              >{p.name}</a>
            ) : (
              <span style={{
                display: "inline-block",
                padding: "9px 18px",
                background: DARK,
                color: WHITE,
                borderRadius: "4px",
                fontSize: "clamp(11px, 1.2vw, 13px)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}>{p.name}</span>
            )}
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div style={{
          marginTop: "clamp(40px, 6vw, 56px)",
          maxWidth: "560px",
        }}>
          <div style={{
            fontSize: "clamp(10px, 1.2vw, 12px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: ACCENT,
            fontWeight: 600,
            marginBottom: "12px",
            fontFamily: "'DM Sans', sans-serif",
          }}>Full Career Documentation</div>
          <a href="https://grokipedia.com/page/rodger_raderman" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "clamp(13px, 1.4vw, 15px)",
            color: ACCENT,
            textDecoration: "none",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            borderBottom: `1px solid ${ACCENT}`,
            paddingBottom: "2px",
          }}>
            40+ citations on Grokipedia {"→"}
          </a>
        </div>
      </FadeIn>

      {/* Honors & Recognition */}
      <FadeIn delay={0.4}>
        <div style={{
          marginTop: "clamp(40px, 6vw, 56px)",
          maxWidth: "560px",
        }}>
          <div style={{
            fontSize: "clamp(10px, 1.2vw, 12px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: ACCENT,
            fontWeight: 600,
            marginBottom: "12px",
            fontFamily: "'DM Sans', sans-serif",
          }}>Honors & Recognition</div>
          {[
            { label: "Hollywood Reporter", detail: "“35 Under 35”" },
            { label: "GQ", detail: "“Man of the Month”" },
            { label: "Red Herring", detail: "Cover — photographed by Helmut Newton" },
            { label: "City of Los Angeles", detail: "Mayor Riordan declared “IFILM Day”" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              flexWrap: "wrap",
              gap: "4px 16px",
              padding: "12px 0",
              borderTop: `1px solid ${BORDER}`,
            }}>
              <span style={{
                fontSize: "clamp(13px, 1.4vw, 15px)",
                fontWeight: 600,
                color: DARK,
                fontFamily: "'DM Sans', sans-serif",
              }}>{item.label}</span>
              <span style={{
                fontSize: "clamp(13px, 1.4vw, 14px)",
                color: GRAY,
                fontFamily: "'DM Sans', sans-serif",
              }}>{item.detail}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── THE DIFFERENCE ────────────────────────────────────── */
function WhySection() {
  const reasons = [
    {
      number: "01",
      title: "Cross-Industry Range",
      text: "Internet video, immersive technology, toys, mobile communications, cannabis, advertising, non-profit healthcare. Working from first principles that transfer across domains — not pattern-matching to one industry’s playbook.",
    },
    {
      number: "02",
      title: "Formation to Exit",
      text: "Formation, capital structure, fundraising, product development, go-to-market, PR, retail distribution at national scale. The full lifecycle completed multiple times — not expertise in one phase.",
    },
    {
      number: "03",
      title: "Category Creation",
      text: "The rarest capability. Building categories that don’t exist yet requires educating consumers before selling to them, creating mental models where none exist, and building infrastructure without benchmarks. Executed five times over twenty-five years.",
    },
  ];
  return (
    <section style={{
      padding: "clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)",
      background: DARK,
    }}>
      <FadeIn>
        <div style={{
          fontSize: "clamp(10px, 1.2vw, 12px)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: ACCENT,
          fontWeight: 600,
          marginBottom: "12px",
          fontFamily: "'DM Sans', sans-serif",
        }}>The Difference</div>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 300,
          color: WHITE,
          margin: "0 0 clamp(40px, 6vw, 64px) 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          lineHeight: 1.2,
          maxWidth: "500px",
        }}>Rare in pieces. Singular in combination.</h2>
      </FadeIn>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "clamp(24px, 4vw, 40px)",
        maxWidth: "960px",
      }}>
        {reasons.map((r, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{
              padding: "clamp(20px, 3vw, 32px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "6px",
            }}>
              <div style={{
                fontSize: "clamp(32px, 5vw, 40px)",
                fontWeight: 300,
                color: ACCENT,
                fontFamily: "'Instrument Serif', Georgia, serif",
                marginBottom: "12px",
              }}>{r.number}</div>
              <div style={{
                fontSize: "clamp(16px, 1.8vw, 18px)",
                fontWeight: 600,
                color: WHITE,
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: "12px",
              }}>{r.title}</div>
              <div style={{
                fontSize: "clamp(13px, 1.4vw, 14px)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
              }}>{r.text}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── CONTACT / FOOTER ──────────────────────────────────── */
function ContactSection() {
  return (
    <section style={{
      padding: "clamp(60px, 10vw, 100px) clamp(24px, 6vw, 80px)",
      borderTop: `1px solid ${BORDER}`,
      background: WHITE,
    }}>
      <FadeIn>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 300,
          color: DARK,
          margin: "0 0 16px 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          lineHeight: 1.2,
        }}>Let{"’"}s talk about what you{"’"}re building.</h2>
        <p style={{
          fontSize: "clamp(14px, 1.6vw, 16px)",
          color: GRAY,
          margin: "0 0 clamp(24px, 4vw, 36px) 0",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.6,
          maxWidth: "480px",
        }}>
          Available for strategic advisory engagements, fractional leadership,
          and project-based consulting.
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <a href="mailto:leo@prettywellfit.com" style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "14px 32px",
          background: ACCENT,
          color: WHITE,
          borderRadius: "4px",
          fontSize: "clamp(13px, 1.4vw, 15px)",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "0.02em",
          transition: "opacity 0.2s ease",
        }}>leo@prettywellfit.com</a>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div style={{
          marginTop: "clamp(48px, 8vw, 80px)",
          paddingTop: "24px",
          borderTop: `1px solid ${BORDER}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <span style={{
            fontSize: "12px",
            color: GRAY,
            fontFamily: "'DM Sans', sans-serif",
          }}>Pretty Well Fit {"—"} Leo Raderman</span>
          <span style={{
            fontSize: "12px",
            color: GRAY,
            fontFamily: "'DM Sans', sans-serif",
          }}>Category Creator</span>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── APP ────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap'); *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } body { background: ${WHITE}; color: ${DARK}; overflow-x: hidden; } button { border: none; outline: none; } a:hover { opacity: 0.85; } button:hover { opacity: 0.9; } ::selection { background: ${ACCENT_LIGHT}; color: ${DARK}; }`}</style>
      <div style={{ background: WHITE, minHeight: "100vh", width: "100%" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Hero />
          <NumbersBar />
          <PatternSection />
          <CapitalSection />
          <CapabilitiesSection />
          <PressSection />
          <WhySection />
          <ContactSection />
        </div>
      </div>
    </>
  );
}
