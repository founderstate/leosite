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
          fontSize: "clamp(14px, 1.6vw, 16px)",
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
        maxHeight: open ? "2000px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.5s ease",
      }}>
        <div style={{ paddingBottom: "24px" }}>{children}</div>
      </div>
    </div>
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
        }}>Six companies that defined their categories {"\u2014"} before the categories existed.</h2>
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
    { number: "6", label: "Companies Founded" },
    { number: "$100M+", label: "Largest Exit" },
    { number: "$65M+", label: "Capital Raised" },
    { number: "5,000+", label: "Retail Locations" },
  ];
  return (
    <section style={{
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

/* ─── PATTERN TIMELINE ──────────────────────────────────── */
function PatternTimeline() {
  const items = [
    { year: "1998", question: "\u201CWhat\u2019s internet video?\u201D", company: "IFILM", outcome: "Sold to Viacom for $100M+ \u2014 six years before YouTube existed" },
    { year: "2000", question: "\u201CWhat\u2019s architectural projection mapping?\u201D", company: "Obscura Digital", outcome: "Sold to MSG \u2014 technology now powers The Sphere, Las Vegas" },
    { year: "2005", question: "\u201CWhat\u2019s mobile video communication?\u201D", company: "Veeker", outcome: "First to enable user-generated video clips for NBC News" },
    { year: "2008", question: "\u201CWhat\u2019s a physical-digital play pattern?\u201D", company: "Nukotoys", outcome: "Product in 5,000+ retail locations including Apple, Walmart, Target" },
    { year: "Now", question: "What category doesn\u2019t exist yet?", company: "Pretty Well Fit", outcome: "Strategic advisory for founders building what comes next" },
  ];
  return (
    <section id="pattern" style={{
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
          maxWidth: "600px",
          lineHeight: 1.2,
        }}>Every company entered a category before it existed.</h2>
      </FadeIn>
      <div style={{ maxWidth: "640px" }}>
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
                minWidth: "clamp(36px, 5vw, 48px)",
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
                  fontStyle: item.year !== "Now" ? "italic" : "normal",
                }}>{item.question}</div>
                <div style={{
                  fontSize: "clamp(13px, 1.5vw, 15px)",
                  color: DARK,
                  fontWeight: 600,
                  marginTop: "6px",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{item.company}</div>
                <div style={{
                  fontSize: "clamp(13px, 1.5vw, 15px)",
                  color: GRAY,
                  marginTop: "4px",
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.5,
                }}>{item.outcome}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── COMPANIES TABLE ───────────────────────────────────── */
function CompaniesSection() {
  const companies = [
    { name: "IFILM Corporation", period: "1998\u20132005", role: "Co-Founder", industry: "Internet video / digital media", outcome: "Sold to Viacom for $100M+" },
    { name: "Obscura Digital", period: "2000\u20132016", role: "Co-Founder", industry: "Immersive video / experiential technology", outcome: "Sold to Madison Square Garden Company" },
    { name: "Veeker", period: "", role: "Co-Founder", industry: "Mobile video communication", outcome: "First to enable user-generated video clips for NBC News" },
    { name: "Nukotoys", period: "", role: "Co-Founder, Co-CEO", industry: "Physical-digital toy integration", outcome: "5,000+ retail locations nationwide" },
    { name: "MiracleFeet", period: "", role: "Board Member", industry: "Non-profit / global healthcare", outcome: "100,000+ children treated worldwide" },
    { name: "Pretty Well Fit", period: "", role: "Founder", industry: "Strategic advisory", outcome: "Active" },
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
        }}>Track Record</div>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 300,
          color: DARK,
          margin: "0 0 clamp(40px, 6vw, 56px) 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          lineHeight: 1.2,
        }}>Six companies. Six industries. 25 years.</h2>
      </FadeIn>
      <div style={{ maxWidth: "800px" }}>
        {companies.map((c, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div style={{
              padding: "clamp(16px, 3vw, 24px) 0",
              borderTop: `1px solid ${BORDER}`,
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "4px 16px",
              }}>
                <div>
                  <span style={{
                    fontSize: "clamp(15px, 1.8vw, 17px)",
                    fontWeight: 600,
                    color: DARK,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{c.name}</span>
                  {c.period && (
                    <span style={{
                      fontSize: "clamp(12px, 1.3vw, 13px)",
                      color: GRAY,
                      marginLeft: "8px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{c.period}</span>
                  )}
                </div>
                <span style={{
                  fontSize: "clamp(12px, 1.3vw, 13px)",
                  color: ACCENT,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{c.role}</span>
              </div>
              <div style={{
                fontSize: "clamp(13px, 1.4vw, 14px)",
                color: GRAY,
                marginTop: "4px",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.5,
              }}>{c.industry} {"\u2014"} {c.outcome}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.4}>
        <div style={{
          marginTop: "clamp(20px, 3vw, 32px)",
          padding: "16px 0",
          borderTop: `1px solid ${BORDER}`,
          fontSize: "clamp(13px, 1.4vw, 14px)",
          color: GRAY,
          fontFamily: "'DM Sans', sans-serif",
          fontStyle: "italic",
        }}>
          Additional: Creator/Executive Producer, Mondo Magic {"\u2014"} A&E Networks television series ($250K production deal)
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── CAPITAL SECTION ───────────────────────────────────── */
function CapitalSection() {
  const investors = [
    "Sony Corporation", "Yahoo!", "Independent Film Channel",
    "Roy Disney\u2019s Steamboat Ventures", "Paul Allen\u2019s Vulcan Ventures",
    "Axiom Venture Partners", "Meritage Funds", "OddLot Entertainment",
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
          maxWidth: "560px",
        }}>
          The full capital formation lifecycle {"\u2014"} friends and family through
          institutional VC, strategic/corporate investors, term sheet negotiation,
          and exit {"\u2014"} executed multiple times across multiple industries.
        </p>
      </FadeIn>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        maxWidth: "640px",
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
        <Accordion title="Fundraising & Capital Formation" defaultOpen={true}>
          <CapItem cap="Friends & Family Round Structuring" detail="Structured F&F raises with proper documentation, SAFE/convertible note guidance, and investor communication. Demonstrated at IFILM (initial capital) and Nukotoys (OddLot JV structure)." />
          <CapItem cap="Angel Investor Identification & Pitch" detail="High-net-worth investor targeting, warm introduction strategy, and pitch development. IFILM angel round included Kevin Wendle (co-founder of FOX cable network and C|Net), introduced through Jim Schlueter at Morgan Stanley Private Wealth Management." />
          <CapItem cap="Institutional VC Fundraising" detail="Full VC fundraising process \u2014 deck, data room, meeting sequencing, term sheet negotiation. IFILM Series A led by Axiom Venture Partners; Veeker funded by Meritage Funds." />
          <CapItem cap="Strategic / Corporate Investor Relations" detail="Identifying and cultivating strategic investors who bring capital plus distribution, credibility, or operational value. IFILM attracted Sony, Yahoo!, IFC, Steamboat Ventures, and Vulcan Ventures." />
          <CapItem cap="Term Sheet Negotiation" detail="Protecting founder interests across valuation, dilution, control, and liquidation preference terms. Six companies, multiple rounds \u2014 seed through growth stages." />
          <CapItem cap="Investor Deck Creation & Pitch Delivery" detail="Institutional-grade pitch materials and presentation coaching. Pitched Sony, Yahoo!, Paul Allen\u2019s fund, and Toy Fair / board audiences." />
          <CapItem cap="Board Management & Investor Communication" detail="Post-raise governance, board reporting, and investor relationship management. Managed Nukotoys board through growth; navigated complex IFILM investor dynamics." />
          <CapItem cap="Valuation Negotiation" detail="Stage-appropriate valuation benchmarking and negotiation strategy through exits at IFILM ($100M+ to Viacom) and Obscura Digital (to MSG)." />
          <CapItem cap="Capital Strategy & Staging" detail="Right-sizing raises, staging capital deployment, and matching capital strategy to business phase. Bootstrapped through $65M+ in raised capital across all ventures." />
        </Accordion>

        <Accordion title="Product Development & Go-to-Market">
          <CapItem cap="New Category Creation" detail="Market education strategy, consumer mental model creation, and category positioning when no benchmarks exist. IFILM (online video before YouTube), Nukotoys (physical-digital play), Obscura (projection mapping)." />
          <CapItem cap="Hardware / Software Integration" detail="Product strategy for companies combining physical and digital components. Nukotoys (physical cards + camera recognition + app), Obscura (projection hardware + content software)." />
          <CapItem cap="Manufacturing Partner Management" detail="Vendor selection, relationship management, quality control, and cost negotiation. Nukotoys (toy manufacturing, Hong Kong Toy Fair), Obscura (display systems)." />
          <CapItem cap="Razor / Razorblade Model Design" detail="Recurring revenue model design \u2014 device + consumable, platform + content, or hardware + service. Nukotoys (free app + paid physical cards)." />
          <CapItem cap="SKU Strategy & Product Line Architecture" detail="Product line planning, pricing tiers, bundle strategy, and margin optimization. Nukotoys (multiple card series, different price points)." />
          <CapItem cap="Pre-Launch Brand Building" detail="Building brand awareness and credibility before product is available \u2014 creating demand before supply. IFILM (brand before platform launched), Nukotoys (Toy Fair before retail)." />
          <CapItem cap="Category Education / Market Creation" detail="Content strategy, media positioning, and messaging for products consumers don\u2019t have a mental model for. IFILM (explaining \u201Cinternet video\u201D in 1998), Nukotoys (explaining physical-digital play)." />
          <CapItem cap="Trade Show Strategy & Execution" detail="Trade show planning, booth strategy, meeting scheduling, and post-show follow-up conversion. Nukotoys (Hong Kong Toy Fair, US Toy Fair)." />
          <CapItem cap="D2C E-Commerce" detail="Direct-to-consumer channel strategy, platform selection, and launch execution. Pretty Well Fit (cannabis wellness D2C)." />
        </Accordion>

        <Accordion title="Marketing, Sales & Partnerships">
          <CapItem cap="Brand Creation & Naming" detail="Brand identity development from naming through visual system and voice. Obscura Digital (from da Vinci), Nukotoys, IFILM, Pretty Well Fit." />
          <CapItem cap="PR & Earned Media" detail="Press strategy, media list development, journalist relationships, and earned media campaigns. IFILM coverage in NYT, WSJ, Variety, Hollywood Reporter, PBS, Fox News, GQ." />
          <CapItem cap="Enterprise / B2B Sales" detail="B2B partnership development, enterprise sales process, and account management. Obscura (Fortune 500 clients), Nukotoys (national retail chains)." />
          <CapItem cap="Retail Buyer Relationships" detail="Retail channel entry strategy, buyer pitch development, and ongoing relationship management. Nukotoys achieved simultaneous distribution at Apple Stores, Walmart, Target, Toys-R-Us, Barnes & Noble." />
          <CapItem cap="Strategic Partnership Structuring" detail="Partnership architecture \u2014 JVs, licensing, co-marketing, revenue share, and equity structures. Nukotoys/OddLot (JV), Nukotoys/PBS (education grant), IFILM/Sony/Yahoo!." />
          <CapItem cap="Licensing & Revenue Share Models" detail="IP monetization, licensing term negotiation, and revenue share structuring. Nukotoys (licensing IP for physical-digital play)." />
          <CapItem cap="Channel Conflict Management" detail="Pricing and positioning strategies that protect partners while maintaining direct channels. Nukotoys (five national retail channels simultaneously)." />
          <CapItem cap="Content Marketing & SEO" detail="Organic acquisition strategy, content development, and conversion optimization. Pretty Well Fit and FounderState (landing pages, conversion optimization)." />
          <CapItem cap="Creative Direction" detail="High-level creative oversight for brand campaigns, product launches, and visual identity. IFILM (Helmut Newton shoot), Obscura (Fortune 500 installations), Mondo Magic (A&E series)." />
        </Accordion>

        <Accordion title="Legal, Operations & Company Building">
          <CapItem cap="Company Formation & Entity Structuring" detail="Guidance on entity selection, formation, and restructuring as business evolves. Six companies \u2014 LLC, C-Corp, JV structures." />
          <CapItem cap="Co-Founder Agreements & Equity Splits" detail="Founder relationship structuring, equity allocation, and role definition. IFILM (with Luke McDonough), Nukotoys (Co-CEO with Doug Penman), Obscura (with Travis Threlkel)." />
          <CapItem cap="Joint Venture Structuring" detail="JV architecture, governance, economics, and exit provisions. Nukotoys/OddLot Entertainment 50/50 JV." />
          <CapItem cap="IP Protection Strategy" detail="Patent vs. trade secret analysis, trademark strategy, and IP portfolio management. Obscura (brand naming), Nukotoys (physical-digital play pattern protection)." />
          <CapItem cap="Exit Negotiation & M&A" detail="Exit preparation, buyer identification, negotiation strategy, and deal execution. IFILM sale to Viacom ($100M+), Obscura sale to MSG." />
          <CapItem cap="Hiring & Team Building" detail="Organizational design, key hire identification, and team scaling strategy. IFILM (grew to 100+ employees), Nukotoys, Obscura, Saatchi & Saatchi." />
          <CapItem cap="Pivot & Strategic Redirection" detail="Recognizing when to pivot, managing stakeholder communication, and executing strategic shifts. Veeker (pre-smartphone mobile video), Nukotoys (toy \u2192 education)." />
          <CapItem cap="Budget Management & Resource Allocation" detail="Capital deployment optimization, burn rate management, and resource prioritization across all ventures \u2014 bootstrapped through $65M+ in raised capital." />
        </Accordion>

        <Accordion title="Retail Distribution at Scale">
          <CapItem cap="Multi-Channel National Distribution" detail="Simultaneous retail distribution across five major national chains: Apple Stores, Walmart, Target, Toys-R-Us, and Barnes & Noble." />
          <CapItem cap="Buyer Relationship Management" detail="Managing fundamentally different buyer relationships, pricing strategies, merchandising requirements, and channel conflict dynamics \u2014 simultaneously across all channels." />
          <CapItem cap="Pricing Strategy Across Channels" detail="Maintaining pricing integrity while managing different economics, margin expectations, and competitive dynamics at each retail partner." />
          <CapItem cap="Merchandising & In-Store Execution" detail="Channel-specific merchandising, planogram negotiation, and in-store positioning strategy across mass retail and specialty channels." />
        </Accordion>
      </div>
    </section>
  );
}

/* ─── MEDIA / RECOGNITION ───────────────────────────────── */
function MediaSection() {
  const press = ["The New York Times", "The Wall Street Journal", "Variety", "The Hollywood Reporter", "PBS", "Fox News", "GQ"];
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
        }}>Recognition</div>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 300,
          color: DARK,
          margin: "0 0 clamp(32px, 5vw, 48px) 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          lineHeight: 1.2,
        }}>Press & media profile.</h2>
      </FadeIn>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "clamp(32px, 5vw, 48px)",
      }}>
        {press.map((p, i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <span style={{
              display: "inline-block",
              padding: "10px 20px",
              background: DARK,
              color: WHITE,
              borderRadius: "4px",
              fontSize: "clamp(12px, 1.3vw, 14px)",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
            }}>{p}</span>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div style={{ maxWidth: "560px" }}>
          {[
            { label: "Hollywood Reporter", detail: "\u201C35 Under 35\u201D" },
            { label: "GQ", detail: "\u201CMan of the Month\u201D" },
            { label: "City of Los Angeles", detail: "Mayor Riordan declared \u201CIFILM Day\u201D" },
            { label: "Helmut Newton", detail: "Portrait photography" },
            { label: "Saatchi & Saatchi", detail: "MD / Creative Director, Darwin Digital \u2014 Employee #3" },
            { label: "Grokipedia", detail: "40 citations documenting career across ventures", link: "https://grokipedia.com/wiki/Leo_Raderman" },
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
              }}>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
                    color: DARK,
                    textDecoration: "none",
                    borderBottom: `1px solid ${ACCENT}`,
                    paddingBottom: "1px",
                    transition: "color 0.2s ease",
                  }}>{item.label}</a>
                ) : item.label}
              </span>
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

/* ─── WHY SECTION ───────────────────────────────────────── */
function WhySection() {
  const reasons = [
    {
      number: "01",
      title: "Cross-Industry Range",
      text: "Internet video, immersive technology, toys, mobile communications, television, cannabis, advertising, non-profit healthcare. Working from first principles that transfer across domains \u2014 not pattern-matching to one industry\u2019s playbook.",
    },
    {
      number: "02",
      title: "Full Stack, Formation to Exit",
      text: "Formation, capital structure, fundraising, product development, go-to-market, PR, retail distribution at national scale. The full lifecycle completed multiple times \u2014 not expertise in one phase.",
    },
    {
      number: "03",
      title: "Category Creation",
      text: "The rarest capability. Building categories that don\u2019t exist yet requires educating consumers before selling to them, creating mental models where none exist, and building infrastructure without benchmarks. Executed six times over twenty-five years.",
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
        }}>Why Pretty Well Fit</div>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 300,
          color: WHITE,
          margin: "0 0 clamp(40px, 6vw, 64px) 0",
          fontFamily: "'Instrument Serif', Georgia, serif",
          lineHeight: 1.2,
          maxWidth: "500px",
        }}>Common in pieces. Rare in combination.</h2>
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
        }}>Let{"\u2019"}s talk about what you{"\u2019"}re building.</h2>
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
          }}>Pretty Well Fit {"\u2014"} Leo Raderman</span>
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
          <PatternTimeline />
          <CompaniesSection />
          <CapitalSection />
          <CapabilitiesSection />
          <MediaSection />
          <WhySection />
          <ContactSection />
        </div>
      </div>
    </>
  );
}
