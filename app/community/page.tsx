"use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  bg: "#FEFCF9", bone: "#F2EAD7", sand: "#E7B88D", teak: "#B08968",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F", charcoal: "#474747",
  border: "rgba(176,137,104,0.12)", borderLight: "rgba(176,137,104,0.15)",
};

export default function Community() {
  const [view, setView] = useState("signup");
  const [tab, setTab] = useState("chat");
  const [dropdown, setDropdown] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", linkedin: "", title: "" });

  const inputStyle = { width: "100%", padding: "16px 20px", marginBottom: 14, background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" };

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.charcoal, background: C.bg, minHeight: "100vh" }}>
      <style>{`
        *{box-sizing:border-box}
        a{text-decoration:none;color:inherit}
        .btn:hover{opacity:.88;transform:translateY(-1px)}
        .tracked{letter-spacing:0.35em;text-transform:uppercase}
        .tab{padding:14px 28px;font-size:12px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;border:none;background:none;color:#88856A;font-family:'Montserrat',sans-serif;border-bottom:2px solid transparent;transition:all 0.3s}
        .tab.active{color:#3A2E1F;border-bottom-color:#B08968}
        .tab:hover{color:#3A2E1F}
        .msg{padding:20px 0;border-bottom:1px solid rgba(176,137,104,0.1);display:flex;gap:16px;align-items:flex-start}
        .av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;flex-shrink:0}
        .post-card{background:#FEFCF9;border:1px solid rgba(176,137,104,0.15);border-radius:12px;padding:24px;transition:transform 0.3s}
        .post-card:hover{transform:translateY(-2px)}
      `}</style>

      {/* NAV */}
      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ position: "relative" }}>
            <span onClick={() => setDropdown(!dropdown)} className="tracked" style={{ cursor: "pointer", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>
              The Global Flow <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.5 }}>▾</span>
            </span>
            {dropdown && (
              <div style={{ position: "absolute", top: 44, left: 0, background: C.bg, border: `1px solid ${C.borderLight}`, padding: "16px 28px", zIndex: 100, minWidth: 180 }}>
                {[["/ ","Home"],["/#about","About"],["/#get","For You"],["/community","Community"],["/#join","Join"],["/blog","Blog"]].map(([href,l],i) => (
                  <Link key={i} href={href.trim()} className="tracked" style={{ display: "block", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>{l}</Link>
                ))}
              </div>
            )}
          </div>
          {view === "signup" ? (
            <Link href="/" className="btn tracked" style={{ background: "transparent", color: C.fawn, border: `1px solid ${C.fawn}`, padding: "10px 24px", borderRadius: 50, fontSize: 10, fontWeight: 500, fontFamily: "'Montserrat',sans-serif" }}>Back to Home</Link>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="av" style={{ background: C.sand, color: C.fawn, width: 36, height: 36, fontSize: 13 }}>
                {(form.firstName?.[0] || "M").toUpperCase()}{(form.lastName?.[0] || "E").toUpperCase()}
              </div>
              <span style={{ fontSize: 13, color: C.fawn, fontWeight: 500 }}>{form.firstName || "Member"}</span>
            </div>
          )}
        </div>
      </nav>

      {/* ═══════════════════════ */}
      {/* SIGNUP VIEW            */}
      {/* ═══════════════════════ */}
      {view === "signup" && (
        <>
          <section style={{ padding: "100px clamp(20px,5vw,60px) 60px", textAlign: "center" }}>
            <div style={{ maxWidth: 520, margin: "0 auto" }}>
              <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.4em", fontWeight: 500 }}>Join the Community</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px, 5vw, 46px)", fontWeight: 400, lineHeight: 1.15, color: C.dark, margin: "0 0 20px" }}>Your space. Your people.</h1>
              <div style={{ width: 40, height: 1, background: C.teak, margin: "28px auto", opacity: 0.4 }} />
              <p style={{ fontSize: 15, lineHeight: 1.8, color: C.fawn, maxWidth: 420, margin: "0 auto", fontWeight: 300 }}>Connect with EAs around the globe, ask questions, share wins, and never feel alone in your role again. Free to join.</p>
            </div>
          </section>

          <section style={{ padding: "0 clamp(20px,5vw,60px) 100px" }}>
            <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); setView("hub"); }} style={{ maxWidth: 440, margin: "0 auto" }}>
              <input required placeholder="First Name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} style={inputStyle} />
              <input required placeholder="Last Name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} style={inputStyle} />
              <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
              <input required type="password" placeholder="Create Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} />
              <input placeholder="LinkedIn Profile URL" value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} style={inputStyle} />
              <input placeholder="Your Title (EA, CoS, PA, etc.)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={inputStyle} />
              <button type="submit" className="btn tracked" style={{ width: "100%", background: C.fawn, color: C.bg, border: "none", padding: 16, fontSize: 13, fontWeight: 600, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", marginTop: 10 }}>Join Free</button>
              <p style={{ fontSize: 12, color: C.sage, textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>No spam and no sales calls. Just a warm welcome.</p>
            </form>
          </section>
        </>
      )}

      {/* ═══════════════════════ */}
      {/* COMMUNITY HUB VIEW     */}
      {/* ═══════════════════════ */}
      {view === "hub" && (
        <>
          {/* Welcome */}
          <section style={{ padding: "48px clamp(20px,5vw,60px)", background: C.bone, textAlign: "center" }}>
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, color: C.dark, marginBottom: 10 }}>Welcome to The Global Flow Community</h2>
              <p style={{ fontSize: 14, color: C.fawn, fontWeight: 300 }}>This is your space. Connect, share, ask, and grow with EAs around the globe.</p>
            </div>
          </section>

          {/* Tabs */}
          <div style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 8 }}>
              <button className={`tab ${tab === "chat" ? "active" : ""}`} onClick={() => setTab("chat")}>Community Chat</button>
              <button className={`tab ${tab === "network" ? "active" : ""}`} onClick={() => setTab("network")}>Network</button>
              <button className={`tab ${tab === "sarah" ? "active" : ""}`} onClick={() => setTab("sarah")}>Ask Sarah</button>
            </div>
          </div>

          {/* ═══ COMMUNITY CHAT TAB ═══ */}
          {tab === "chat" && (
            <section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}>
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                {/* Post input */}
                <div style={{ background: C.bone, borderRadius: 12, padding: "20px 24px", marginBottom: 32 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div className="av" style={{ background: C.sand, color: C.fawn }}>{(form.firstName?.[0] || "M").toUpperCase()}{(form.lastName?.[0] || "E").toUpperCase()}</div>
                    <div style={{ flex: 1 }}>
                      <textarea placeholder="Share something with the community..." style={{ width: "100%", minHeight: 60, padding: "12px 16px", background: C.bg, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif", resize: "none" }} />
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                        <button className="btn tracked" style={{ background: C.fawn, color: C.bg, border: "none", padding: "10px 24px", fontSize: 10, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Post</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                {[
                  { i: "PM", n: "Priya M.", r: "EA, Global Finance", t: "2 hours ago", txt: "Just used the Calendar Crime Scene Kit on my exec's calendar. Found 12 hours of meetings that could be emails. His face when I showed him the number was priceless. Thank you Sarah!!!", l: 14, rp: 0, c: C.sage },
                  { i: "KD", n: "Katherine D.", r: "EA to CEO, Startup", t: "5 hours ago", txt: "Quick question — does anyone have experience managing a board dinner for 20+ in London? First time doing international event planning and could use some tips on cultural norms for UK dining.", l: 6, rp: 3, c: C.sand },
                  { i: "RS", n: "Rachel S.", r: "EA to CFO, Fortune 500", t: "Yesterday", txt: "WIN: Got promoted to Senior EA today. This community is the reason I had the confidence to ask for it. I used the Revenue Recognition template to show my impact in numbers. My CFO was speechless. I'm crying at my desk right now.", l: 47, rp: 12, c: C.teak },
                  { i: "JT", n: "Jasmine T.", r: "Chief of Staff", t: "2 days ago", txt: "Can we talk about how the Shadow AI Playbook literally changed the way my CEO looks at me? He said \"how did you know I needed that?\" three times this week. THREE TIMES.", l: 31, rp: 8, c: C.sage },
                ].map((m, idx) => (
                  <div key={idx} className="msg">
                    <div className="av" style={{ background: m.c, color: m.c === C.sand ? C.fawn : C.bg }}>{m.i}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{m.n}</span>
                        <span style={{ fontSize: 11, color: C.sage }}>{m.r}</span>
                        <span style={{ fontSize: 11, color: C.teak }}>{m.t}</span>
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}>{m.txt}</p>
                      <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                        <span style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>♡ {m.l}</span>
                        <span style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>Reply{m.rp > 0 ? ` · ${m.rp} replies` : ""}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══ NETWORK TAB ═══ */}
          {tab === "network" && (
            <section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}>
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                {/* Post input */}
                <div style={{ background: C.bone, borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div className="av" style={{ background: C.sand, color: C.fawn }}>{(form.firstName?.[0] || "M").toUpperCase()}{(form.lastName?.[0] || "E").toUpperCase()}</div>
                    <div style={{ flex: 1 }}>
                      <textarea placeholder="Share a job opportunity, event, or meetup..." style={{ width: "100%", minHeight: 60, padding: "12px 16px", background: C.bg, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif", resize: "none" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          {["Job", "Event", "Meetup"].map(t => (
                            <span key={t} style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 50, border: `1px solid ${C.borderLight}`, color: C.sage, cursor: "pointer" }}>{t}</span>
                          ))}
                        </div>
                        <button className="btn tracked" style={{ background: C.fawn, color: C.bg, border: "none", padding: "10px 24px", fontSize: 10, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Post</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter pills */}
                <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                  {["All", "Jobs", "Events", "Meetups"].map((t, i) => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 50, background: i === 0 ? C.fawn : "transparent", color: i === 0 ? C.bg : C.sage, border: i === 0 ? "none" : `1px solid ${C.borderLight}`, cursor: "pointer" }}>{t}</span>
                  ))}
                </div>

                {/* Network posts */}
                {[
                  { type: "Job", color: C.teak, i: "PM", n: "Priya M.", loc: "New York, NY", t: "3 hours ago", title: "EA to CEO — FinTech Startup, NYC", txt: "My company is hiring a senior EA for our CEO. Hybrid role, great culture, competitive comp. If you're in NYC and want details, drop a comment or DM me. Referral from the community goes a long way." },
                  { type: "Event", color: C.sand, i: "KD", n: "Katherine D.", loc: "London, UK", t: "1 day ago", title: "EA Networking Drinks — London, April 28", txt: "Organizing a casual drinks evening for EAs in London. No agenda, no pitch, just good conversation with people who understand what we do. Shoreditch area, 6:30 PM. Comment if you're interested and I'll share the venue." },
                  { type: "Meetup", color: C.sage, i: "RS", n: "Rachel S.", loc: "Dubai, UAE", t: "2 days ago", title: "Dubai EA Coffee Meetup — Monthly", txt: "Starting a monthly coffee meetup for EAs in Dubai. First one is May 5 at a café in DIFC. Bringing my Calendar Crime Scene Kit as a conversation starter. Who's in?" },
                  { type: "Job", color: C.teak, i: "JT", n: "Jasmine T.", loc: "Singapore", t: "3 days ago", title: "Chief of Staff — Family Office, Singapore", txt: "A family office I work closely with is looking for a Chief of Staff. Discreet, high-trust role. Must have 5+ years in executive support. DM me for details — not posted publicly anywhere." },
                  { type: "Event", color: C.sand, i: "EK", n: "Elena K.", loc: "Zurich, CH", t: "4 days ago", title: "Virtual Panel: EAs in Global Organizations", txt: "Hosting a virtual panel next month with three EAs who support executives across 3+ time zones. We'll cover communication systems, cultural intelligence, and how to stay sane. Free for community members." },
                ].map((p, idx) => (
                  <div key={idx} className="post-card" style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div className="av" style={{ background: p.color, color: p.color === C.sand ? C.fawn : C.bg }}>{p.i}</div>
                        <div>
                          <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{p.n}</span>
                          <span style={{ fontSize: 11, color: C.sage, marginLeft: 8 }}>{p.loc}</span>
                          <p style={{ fontSize: 11, color: C.teak, marginTop: 2 }}>{p.t}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 50, background: p.type === "Job" ? "rgba(176,137,104,0.15)" : p.type === "Event" ? "rgba(231,184,141,0.2)" : "rgba(136,133,106,0.15)", color: p.color }}>{p.type}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 500, color: C.dark, marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}>{p.txt}</p>
                    <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
                      <span style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>♡ Interested</span>
                      <span style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>Reply</span>
                      <span style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>Share</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══ ASK SARAH TAB ═══ */}
          {tab === "sarah" && (
            <section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}>
              <div style={{ maxWidth: 700, margin: "0 auto" }}>
                {/* Sarah intro */}
                <div style={{ background: C.bone, borderRadius: 12, padding: 32, textAlign: "center", marginBottom: 32 }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${C.sand}, ${C.teak})`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: C.bg, fontWeight: 300 }}>S</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: C.dark, marginBottom: 10, fontWeight: 400 }}>Ask Sarah Anything</h3>
                  <p style={{ fontSize: 14, color: C.fawn, fontWeight: 300, lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>Have a question about your role, your exec, your career, or your sanity? Ask it here. Sarah answers personally.</p>
                </div>

                {/* Question input */}
                <div style={{ marginBottom: 32 }}>
                  <textarea placeholder="What's on your mind?" style={{ width: "100%", minHeight: 80, padding: "16px 20px", background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif", resize: "none" }} />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                    <button className="btn tracked" style={{ background: C.fawn, color: C.bg, border: "none", padding: "10px 24px", fontSize: 10, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Ask Sarah</button>
                  </div>
                </div>

                {/* Q&A threads */}
                <div className="msg">
                  <div className="av" style={{ background: C.sand, color: C.fawn }}>EK</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>Elena K.</span>
                      <span style={{ fontSize: 11, color: C.teak }}>3 days ago</span>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}>Sarah, how do you handle it when your exec says "take time off" but then emails you at 11 PM? I don't want to seem ungrateful but it's mixed signals.</p>
                    {/* Sarah's reply */}
                    <div style={{ marginTop: 16, padding: "16px 20px", background: C.bone, borderRadius: 10, borderLeft: `3px solid ${C.teak}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.sand}, ${C.teak})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, color: C.bg }}>S</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>Sarah DeSouza</span>
                        <span style={{ fontSize: 11, color: C.teak }}>2 days ago</span>
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}>This is the number one thing I hear from EAs. The answer isn't about the email — it's about the Partnership Covenant. You need a documented agreement about boundaries that both of you sign. I cover this in Module 6 but the short version: schedule a 15-minute conversation, lead with "I want to protect your time AND mine," and set the rule together. It's not ungrateful. It's professional.</p>
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                      <span style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>♡ 23</span>
                      <span style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>Reply · 5 replies</span>
                    </div>
                  </div>
                </div>

                <div className="msg">
                  <div className="av" style={{ background: C.sage, color: C.bg }}>MR</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>Maria R.</span>
                      <span style={{ fontSize: 11, color: C.teak }}>5 days ago</span>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}>How do you deal with a new exec who doesn't trust you yet? I just started supporting a new CEO and he double-checks everything I do. It's exhausting.</p>
                    <div style={{ marginTop: 16, padding: "16px 20px", background: C.bone, borderRadius: 10, borderLeft: `3px solid ${C.teak}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.sand}, ${C.teak})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, color: C.bg }}>S</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>Sarah DeSouza</span>
                        <span style={{ fontSize: 11, color: C.teak }}>4 days ago</span>
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}>Trust is built in the first 90 days with a new exec — that's exactly what the Shadow AI Playbook is for. Start documenting his patterns now. Within 2-3 weeks, you'll start anticipating his needs before he asks. The first time you hand him something he was about to request, that's when the shift happens. Don't fight the double-checking — outrun it.</p>
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                      <span style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>♡ 18</span>
                      <span style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>Reply · 3 replies</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Footer */}
          <footer style={{ padding: "36px clamp(20px,5vw,60px)", borderTop: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 500, color: C.teak }}>The Global Flow</span>
              <p style={{ fontSize: 11, color: C.sage }}>© 2026 The Global Flow™</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
