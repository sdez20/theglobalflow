"use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  bg: "#FEFCF9",
  bone: "#F2EAD7",
  sand: "#E7B88D",
  teak: "#B08968",
  fawn: "#6A4F2E",
  sage: "#88856A",
  dark: "#3A2E1F",
  charcoal: "#474747",
  border: "rgba(176,137,104,0.12)",
  borderLight: "rgba(176,137,104,0.15)",
};

const sanctuaryPosts = [
  { title: "The Tea Shop That Feels Like Someone's Living Room", desc: "No Wi-Fi password on the wall. No laptop warriors. Just loose leaf tea, soft light, and the kind of quiet that makes you wonder why you were rushing.", hood: "West Village", date: "Apr 8, 2026", time: "3 min read", grad: "linear-gradient(135deg, #88856A, #3A2E1F)" },
  { title: "The Rooftop Nobody Knows About (Yet)", desc: "Thirty-two floors up, no reservations required, and a view that makes your entire commute feel worth it. This one's for the EAs who need to exhale between meetings.", hood: "Midtown East", date: "Apr 1, 2026", time: "4 min read", grad: "linear-gradient(135deg, #B08968, #88856A)" },
  { title: "The Spa That Doesn't Feel Like a Spa", desc: "No cucumber water. No whale music. Just clean lines, warm stone, and ninety minutes where nobody needs anything from you.", hood: "SoHo", date: "Mar 24, 2026", time: "5 min read", grad: "linear-gradient(135deg, #E7B88D, #B08968)" },
];

const blogPosts = [
  { num: "01", title: "Stop Googling \"How to Email Someone in Japan\"", desc: "The 5 Culture Codes that change how you communicate across borders, and why most EAs get Code 5 wrong first.", tag: "Culture", date: "Apr 2, 2026", time: "4 min read", grad: "linear-gradient(135deg, #88856A, #6A4F2E)" },
  { num: "02", title: "A Chameleon Changes Its Colors, Not Its DNA", desc: "How to adapt to every room, every executive, every culture without losing yourself in the process.", tag: "Mindset", date: "Mar 26, 2026", time: "6 min read", grad: "linear-gradient(135deg, #E7B88D, #B08968)" },
  { num: "03", title: "I Tracked $680K My Exec Didn't Know She Was Losing", desc: "Revenue Recognition isn't just for finance teams. Here's how EAs can spot money hiding in plain sight.", tag: "Career", date: "Mar 18, 2026", time: "5 min read", grad: "linear-gradient(135deg, #B08968, #88856A)" },
  { num: "04", title: "The Shadow AI Framework: Predicting Before They Ask", desc: "The system that turns reactive EAs into predictive strategists. Observe, document, anticipate, act.", tag: "Systems", date: "Mar 10, 2026", time: "7 min read", grad: "linear-gradient(135deg, #6A4F2E, #3A2E1F)" },
  { num: "05", title: "Your Wellbeing Is Not a Reward for Finishing Your To-Do List", desc: "Why the EA role quietly destroys the people who are best at it, and what to do about it before it's too late.", tag: "Wellbeing", date: "Mar 3, 2026", time: "4 min read", grad: "linear-gradient(135deg, #88856A, #E7B88D)" },
  { num: "06", title: "Island Girl to Manhattan EA: How I Got Here", desc: "The unfiltered story of how an artist from an island ended up supporting two C-suite executives in one of the most intense companies in the world.", tag: "Behind the Scenes", date: "Feb 24, 2026", time: "8 min read", grad: "linear-gradient(135deg, #B08968, #E7B88D)" },
];

const tags = ["All", "Systems", "Culture", "Mindset", "Career", "Wellbeing", "Sanctuary", "Behind the Scenes"];

export default function Blog() {
  const [active, setActive] = useState("All");
  const [dropdown, setDropdown] = useState(false);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setDropdown(false); };

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.charcoal, background: C.bg, minHeight: "100vh" }}>
      <style>{`
        *{box-sizing:border-box}
        a{text-decoration:none;color:inherit}
        .btn:hover{opacity:.88;transform:translateY(-1px)}
        .tracked{letter-spacing:0.35em;text-transform:uppercase}
        .post-card{transition:transform 0.3s ease;cursor:pointer}
        .post-card:hover{transform:translateY(-4px)}
      `}</style>

      {/* NAV */}
      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ position: "relative" }}>
            <Link href="/" className="tracked" style={{ cursor: "pointer", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak, textDecoration: "none" }}>
              The Global Flow <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.5 }} onClick={(e: React.MouseEvent) => { e.preventDefault(); setDropdown(!dropdown); }}>▾</span>
            </Link>
            {dropdown && (
              <div style={{ position: "absolute", top: 44, left: 0, background: C.bg, border: `1px solid ${C.borderLight}`, padding: "16px 28px", zIndex: 100, minWidth: 180 }}>
                <Link href="/" className="tracked" style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, borderBottom: `1px solid ${C.border}` }}>Home</Link>
                <Link href="/#about" className="tracked" style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, borderBottom: `1px solid ${C.border}` }}>About</Link>
                <Link href="/#get" className="tracked" style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, borderBottom: `1px solid ${C.border}` }}>For You</Link>
                <Link href="/#vibes" className="tracked" style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, borderBottom: `1px solid ${C.border}` }}>Community</Link>
                <Link href="/#join" className="tracked" style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, borderBottom: `1px solid ${C.border}` }}>Join</Link>
                <Link href="/blog" className="tracked" style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn }}>Blog</Link>
              </div>
            )}
          </div>
          <Link href="/#join" className="btn tracked" style={{ background: "transparent", color: C.fawn, border: `1px solid ${C.fawn}`, padding: "10px 24px", borderRadius: 50, fontSize: 10, fontWeight: 500, transition: "all .3s", fontFamily: "'Montserrat',sans-serif" }}>Join the Waitlist</Link>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ padding: "100px clamp(20px,5vw,60px) 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.4em", fontWeight: 500 }}>The Global Flow Blog</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: C.dark, margin: "0 0 20px" }}>For You, From Me</h1>
          <div style={{ width: 40, height: 1, background: C.teak, margin: "28px auto", opacity: 0.4 }} />
          <p style={{ fontSize: 15, lineHeight: 1.8, color: C.fawn, maxWidth: 480, margin: "0 auto", fontWeight: 300 }}>Where strategy meets soul. Written for the EA who wants more from their career and their Monday morning.</p>
        </div>
      </section>

      {/* FILTER TAGS */}
      <section style={{ padding: "0 clamp(20px,5vw,60px) 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {tags.map(t => (
            <button key={t} onClick={() => setActive(t)} style={{
              display: "inline-block", fontSize: 10, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 50,
              border: active === t ? `1px solid ${C.fawn}` : "1px solid rgba(176,137,104,0.2)",
              background: active === t ? C.fawn : "transparent",
              color: active === t ? C.bg : C.sage,
              marginRight: 8, marginBottom: 8, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", transition: "all .2s",
            }}>{t}</button>
          ))}
        </div>
      </section>

      {/* FEATURED — SANCTUARY SERIES */}
      {(active === "All" || active === "Sanctuary") && (
        <section style={{ padding: "0 clamp(20px,5vw,60px) 80px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="post-card" style={{ background: C.bone, borderRadius: 8, overflow: "hidden", display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 400px", minHeight: 320, background: "linear-gradient(135deg, #88856A 0%, #6A4F2E 50%, #3A2E1F 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: "rgba(253,250,245,0.4)", fontWeight: 300, letterSpacing: "0.3em", textTransform: "uppercase" }}>The Sanctuary Series</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 72, color: "rgba(253,250,245,0.15)", fontWeight: 300, fontStyle: "italic" }}>NYC</span>
              </div>
              <div style={{ flex: "1 1 400px", padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p className="tracked" style={{ fontSize: 10, color: C.teak, marginBottom: 16, letterSpacing: "0.3em", fontWeight: 500 }}>Featured Series</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, color: C.dark, lineHeight: 1.3, marginBottom: 16 }}>Hidden Sanctuaries of New York City</h2>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: C.fawn, fontWeight: 300, marginBottom: 24 }}>A curated guide to the quiet corners, wellness hideaways, rooftop escapes, and secret spots where Executives, EAs, Chiefs of Staff, and PAs go to breathe.</p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ display: "inline-block", fontSize: 10, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 50, background: "rgba(136,133,106,0.15)", color: C.sage }}>Sanctuary</span>
                  <span style={{ fontSize: 12, color: C.sage, fontWeight: 300 }}>Recurring Series</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SANCTUARY POSTS */}
      {(active === "All" || active === "Sanctuary") && (
        <section style={{ padding: "0 clamp(20px,5vw,60px) 40px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.3em", fontWeight: 500 }}>Latest from the Sanctuary Series</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 28 }}>
              {sanctuaryPosts.map((p, i) => (
                <div key={i} className="post-card" style={{ background: C.bg, border: `1px solid ${C.borderLight}`, borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ height: 200, background: p.grad, display: "flex", alignItems: "flex-end", padding: 20 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "rgba(253,250,245,0.5)", fontWeight: 300, fontStyle: "italic" }}>{p.hood}</span>
                  </div>
                  <div style={{ padding: "28px 24px" }}>
                    <span style={{ display: "inline-block", fontSize: 10, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 50, border: "1px solid rgba(176,137,104,0.2)", color: C.sage, marginBottom: 4 }}>Sanctuary</span>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 400, color: C.dark, lineHeight: 1.3, margin: "12px 0 10px" }}>{p.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: C.sage, fontWeight: 300, marginBottom: 16 }}>{p.desc}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: C.teak, fontWeight: 300 }}>{p.date}</span>
                      <span style={{ fontSize: 11, color: C.sage, fontWeight: 300 }}>{p.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DIVIDER */}
      {active === "All" && (
        <section style={{ padding: "40px clamp(20px,5vw,60px) 20px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ width: "100%", height: 1, background: C.borderLight }} />
          </div>
        </section>
      )}

      {/* MORE FROM THE BLOG HEADER */}
      {active === "All" && (
        <section style={{ padding: "20px clamp(20px,5vw,60px) 40px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p className="tracked" style={{ fontSize: 10, color: C.sage, letterSpacing: "0.3em", fontWeight: 500 }}>More from The Global Flow</p>
          </div>
        </section>
      )}

      {/* BLOG GRID */}
      <section style={{ padding: "0 clamp(20px,5vw,60px) 100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 28 }}>
          {blogPosts.filter(p => active === "All" || p.tag === active).map((p, i) => (
            <div key={i} className="post-card" style={{ background: C.bg, border: `1px solid ${C.borderLight}`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ height: 200, background: p.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, color: "rgba(253,250,245,0.2)", fontWeight: 300 }}>{p.num}</span>
              </div>
              <div style={{ padding: "28px 24px" }}>
                <span style={{ display: "inline-block", fontSize: 10, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 50, border: "1px solid rgba(176,137,104,0.2)", color: C.sage }}>
                  {p.tag}
                </span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 400, color: C.dark, lineHeight: 1.3, margin: "12px 0 10px" }}>{p.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: C.sage, fontWeight: 300, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: C.teak, fontWeight: 300 }}>{p.date}</span>
                  <span style={{ fontSize: 11, color: C.sage, fontWeight: 300 }}>{p.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.bone, padding: "80px clamp(20px,5vw,60px)", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 400, color: C.dark, lineHeight: 1.3, margin: "0 0 16px" }}>Want these insights in your inbox?</p>
          <p style={{ fontSize: 14, color: C.fawn, lineHeight: 1.7, margin: "0 0 28px", fontWeight: 300 }}>Join the waitlist and be the first to know when new posts drop, new modules launch, and new cohorts open.</p>
          <Link href="/#join" className="btn tracked" style={{ display: "inline-block", padding: "14px 36px", fontSize: 11, background: C.fawn, color: C.bg, border: "none", borderRadius: 50, fontFamily: "'Montserrat',sans-serif", fontWeight: 400 }}>Join the Waitlist</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "36px clamp(20px,5vw,60px)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 500, color: C.teak }}>The Global Flow</span>
          </div>
          <p style={{ fontSize: 11, color: C.sage }}>© 2026 The Global Flow™</p>
        </div>
      </footer>
    </div>
  );
}
