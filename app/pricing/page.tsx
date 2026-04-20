"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const C = {
  bg: "#FEFCF9", bone: "#F2EAD7", sand: "#E7B88D", teak: "#B08968",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F", charcoal: "#474747",
  border: "rgba(176,137,104,0.12)", borderLight: "rgba(176,137,104,0.15)",
};

export default function Pricing() {
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState("");
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tgf_member") : null;
    if (saved) setMember(JSON.parse(saved));
  }, []);

  async function handleCheckout(priceId: string) {
    if (!member) { window.location.href = "/community"; return; }
    setLoading(priceId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, email: member.email, memberId: member.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else { alert("Something went wrong. Please try again."); setLoading(""); }
    } catch { alert("Something went wrong. Please try again."); setLoading(""); }
  }

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.charcoal, background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}a{text-decoration:none;color:inherit}.btn:hover{opacity:.88;transform:translateY(-1px)}.tracked{letter-spacing:0.35em;text-transform:uppercase}`}</style>

      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ position: "relative" }}>
            <span onClick={() => setDropdown(!dropdown)} className="tracked" style={{ cursor: "pointer", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>The Global Flow <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.5 }}>▾</span></span>
            {dropdown && (<div style={{ position: "absolute", top: 44, left: 0, background: C.bg, border: `1px solid ${C.borderLight}`, padding: "16px 28px", zIndex: 100, minWidth: 180 }}>{[["/ ","Home"],["/#about","About"],["/#get","For You"],["/community","Community"],["/#join","Join"],["/blog","Blog"],["/pricing","Pricing"]].map(([href,l],i) => (<Link key={i} href={href.trim()} className="tracked" style={{ display: "block", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}>{l}</Link>))}</div>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/login" style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.sage} strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>
            <Link href="/#join" className="btn tracked" style={{ background: "transparent", color: C.fawn, border: `1px solid ${C.fawn}`, padding: "10px 24px", borderRadius: 50, fontSize: 10, fontWeight: 500, fontFamily: "'Montserrat',sans-serif" }}>Join the Waitlist</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "120px clamp(20px,5vw,60px) 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 28, letterSpacing: "0.4em", fontWeight: 500 }}>Your Transformation Starts Here</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: C.dark, margin: "0 0 28px" }}>What happens when the person who runs everything finally gets the tools to match?</h1>
          <div style={{ width: 40, height: 1, background: C.teak, margin: "28px auto", opacity: 0.4 }} />
          <p style={{ fontSize: 16, lineHeight: 1.9, color: C.fawn, maxWidth: 520, margin: "0 auto", fontWeight: 300 }}>Every executive who's ever relied on you knows the truth: you're the reason things work. You deserve the tools, systems and support you've been giving everyone else, AND it's here, waiting for you...</p>
        </div>
      </section>

      {/* THE PROMISE */}
      <section style={{ padding: "80px clamp(20px,5vw,60px)", background: C.bone, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 400, color: C.dark, lineHeight: 1.3, marginBottom: 20 }}>This is not a course. This is not a certification.<br /><em style={{ color: C.teak }}>This is the moment everything shifts.</em></h2>
          <div style={{ width: 40, height: 1, background: C.teak, margin: "24px auto", opacity: 0.4 }} />
        </div>
      </section>

      {/* WHAT EVERY MEMBER GETS */}
      <section style={{ padding: "100px clamp(20px,5vw,60px) 60px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.4em", fontWeight: 500 }}>Every Paid Member Gets</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, color: C.dark, marginBottom: 40 }}>The foundation that changes everything.</h2>
        </div>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {[
            { t: "200+ Automation Templates", d: "Email systems, calendar frameworks, crisis dashboards, stakeholder trackers. The kind of tools that make your exec say \"how did you do that so fast?\"" },
            { t: "Culture Codes for 50+ Countries", d: "The cheat sheet that stops you from sending the wrong email to Tokyo or offending a VP in São Paulo. Global fluency, installed." },
            { t: "The Shadow AI Playbook", d: "The system that teaches you to predict what your exec needs before they know they need it. Observe. Document. Anticipate. Act. This is what separates good EAs from the ones executives call their \"secret weapon.\"" },
            { t: "The Calendar Crime Scene Kit", d: "Audit the calendar. Calculate the cost of every unnecessary meeting. Present the evidence. Watch your exec's face when they see the number. Then watch them hand you the keys." },
            { t: "Lifetime Community Access", d: "The private network of EAs who get it. The group chat that saves your Monday. The people who understand why you cried in the car after a win." },
            { t: "Revenue Recognition Framework", d: "You see everything. That means you can spot everything. Including the thousands (or more) in revenue your exec doesn't even know is slipping through the cracks. This framework teaches you how to find it, track it, and present it. That's how you go from \"assistant\" to \"irreplaceable.\"" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "20px 0", borderBottom: i < 5 ? `1px solid ${C.borderLight}` : "none" }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: C.dark, marginBottom: 6 }}>{item.t}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: C.sage, fontWeight: 300 }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BONUSES */}
      <section style={{ padding: "80px clamp(20px,5vw,60px)", background: C.bone }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.teak, marginBottom: 24, letterSpacing: "0.4em", fontWeight: 500 }}>Special Bonuses</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 400, color: C.dark, marginBottom: 48 }}>You deserve more than the bare minimum.</h2>
        </div>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          {[
            { num: "1", name: "Own the Room, Run the World", desc: "The complete global operations playbook. Multi-continent calendars across 12+ time zones. High stakes relocations. Crisis management at 3 AM. Vendor negotiations. Environment stabilization before your principal even lands. A command level operating system for EAs who run it all.", inc: "Included with: Self Guided (paid in full) and 1 on 1 Coaching" },
            { num: "2", name: "Generational Fluency", desc: "Same core. Different codes. How to communicate, manage, and build trust across Boomers, Gen X, Millennials, and Gen Z without losing yourself in the translation. Includes generational tracking systems and communication style automation.", inc: "Included with: 1 on 1 Coaching and Live Transformation (first 2 weeks enrollment)" },
            { num: "3", name: "Relocation Support Module", desc: "Where logistics meets emotional intelligence. Whether your executive is moving, a new hire is arriving, or you're the one relocating, this module covers the project management of someone's entire life with empathy, precision, and zero dropped balls.", inc: "Included with: 1 on 1 Coaching and Live Transformation (first 2 weeks enrollment)" },
            { num: "4", name: "Absence Operations Protocol", desc: "What happens when you're out? Or when your exec is? This protocol includes 8 automations that keep operations running seamlessly: Absence Mode Activator, Daily Summary Generator, Return Briefing Compiler, Calendar Protection, and more. Your absence becomes invisible. Your value becomes undeniable.", inc: "Included with: 1 on 1 Coaching and Live Transformation (first 2 weeks enrollment)" },
          ].map((b, i) => (
            <div key={i} style={{ background: C.bg, borderRadius: 12, padding: 32, marginBottom: 20 }}>
              <p className="tracked" style={{ fontSize: 9, color: C.teak, marginBottom: 10, letterSpacing: "0.3em" }}>Bonus {b.num}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: C.dark, marginBottom: 10, fontWeight: 400 }}>{b.name}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: C.fawn, fontWeight: 300 }}>{b.desc}</p>
              <p style={{ fontSize: 12, color: C.sage, marginTop: 14, fontWeight: 300, fontStyle: "italic" }}>{b.inc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ padding: "80px clamp(20px,5vw,60px)", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 400, color: C.sand, lineHeight: 1.5, maxWidth: 580, margin: "0 auto", fontStyle: "italic" }}>"I didn't just learn systems. I remembered who I was before this job made me forget."</p>
        <p style={{ fontSize: 13, color: C.sage, marginTop: 20, fontWeight: 300 }}>Katherine D., EA to CEO</p>
      </section>

      {/* THREE TIERS */}
      <section style={{ padding: "60px clamp(20px,5vw,60px) 100px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.4em", fontWeight: 500 }}>Choose Your Path</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, color: C.dark, marginBottom: 60 }}>Three ways in. One destination.</h2>
        </div>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>

          {/* LIVE 6 WEEK */}
          <div style={{ background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 16, padding: "44px 32px", position: "relative" }}>
            <span className="tracked" style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.fawn, color: C.bg, fontSize: 9, fontWeight: 500, padding: "4px 16px", borderRadius: 50 }}>Most Popular</span>
            <p className="tracked" style={{ fontSize: 9, color: C.sage, marginBottom: 12, letterSpacing: "0.3em" }}>Live Cohort</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 400, color: C.dark, lineHeight: 1.3, marginBottom: 20 }}>The Live 6 Week Transformation</h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 400, color: C.dark, marginBottom: 4 }}>$1,497</p>
            <p style={{ fontSize: 12, color: C.sage, marginBottom: 28, fontWeight: 300 }}>one time payment</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: C.fawn, fontWeight: 300, marginBottom: 24 }}>Six weeks of live sessions with a group of EAs who are ready to level up together. The walls come down, the systems go in, and you never have to figure this out alone again.</p>
            <div style={{ borderTop: `1px solid rgba(176,137,104,0.2)`, paddingTop: 20 }}>
              <p style={{ fontSize: 13, color: C.dark, marginBottom: 10, fontWeight: 500 }}>6 Live Modules:</p>
              {["Before the Title","The Crime Scene","Know the Room","Read Their Mind","Speak Their World","Play the Game"].map((m,i) => <p key={i} style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300, marginBottom: 6 }}>✓ {m}</p>)}
              <p style={{ fontSize: 13, color: C.dark, marginBottom: 10, marginTop: 16, fontWeight: 500 }}>Plus:</p>
              {["Full session replays, forever","Every template and workbook from your modules","Group Q&A with Sarah","Lifetime access to community and materials"].map((m,i) => <p key={i} style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300, marginBottom: 6 }}>✓ {m}</p>)}
            </div>
            <div style={{ borderTop: `1px solid rgba(176,137,104,0.2)`, marginTop: 20, paddingTop: 20 }}>
              <p style={{ fontSize: 13, color: C.teak, marginBottom: 10, fontWeight: 500 }}>Enroll in the first 2 weeks and unlock:</p>
              {["Own the Room, Run the World","Generational Fluency","Relocation Support Module","Absence Operations Protocol"].map((m,i) => <p key={i} style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300, marginBottom: 6 }}>✓ {m}</p>)}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: C.teak, fontStyle: "italic", marginTop: 24, lineHeight: 1.6 }}>"The live sessions changed me. Hearing other EAs say the exact thing I've been feeling for years. I wasn't alone anymore."</p>
            <button onClick={() => handleCheckout("price_1TOL0YAca0elMraMeRYjMwgR")} disabled={loading === "price_1TOL0YAca0elMraMeRYjMwgR"} className="btn tracked" style={{ width: "100%", marginTop: 28, background: C.fawn, color: C.bg, border: "none", padding: 16, fontSize: 11, fontWeight: 500, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>{loading === "price_1TOL0YAca0elMraMeRYjMwgR" ? "Loading..." : member ? "Begin Your Transformation" : "Join Free First"}</button>
          </div>

          {/* SELF GUIDED */}
          <div style={{ background: C.bg, border: `1px solid ${C.borderLight}`, borderRadius: 16, padding: "44px 32px" }}>
            <p className="tracked" style={{ fontSize: 9, color: C.sage, marginBottom: 12, letterSpacing: "0.3em" }}>Self Guided</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 400, color: C.dark, lineHeight: 1.3, marginBottom: 20 }}>The Self Guided Transformation</h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 400, color: C.dark, marginBottom: 4 }}>$997</p>
            <p style={{ fontSize: 12, color: C.sage, marginBottom: 4, fontWeight: 300 }}>one time payment, unlock everything</p>
            <div style={{ background: "rgba(176,137,104,0.08)", borderRadius: 8, padding: "14px 18px", margin: "16px 0 28px", textAlign: "center" }}>
              <p style={{ fontSize: 12, color: C.sage, marginBottom: 2 }}>or</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: C.dark }}>$99<span style={{ fontSize: 14, fontWeight: 300, color: C.sage }}>/month</span></p>
              <p style={{ fontSize: 11, color: C.sage, fontWeight: 300 }}>1 to 2 modules unlocked per month</p>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: C.fawn, fontWeight: 300, marginBottom: 24 }}>All 15 modules. Your pace. Your schedule. For the EA who knows what she needs and doesn't wait for permission to go get it. Pay once and get everything immediately, or go month by month.</p>
            <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 20 }}>
              <p style={{ fontSize: 13, color: C.dark, marginBottom: 10, fontWeight: 500 }}>All 15 Modules across 3 Phases:</p>
              <p style={{ fontSize: 11, color: C.teak, marginBottom: 6, fontWeight: 500 }}>Phase 1: Foundation</p>
              <p style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300, marginBottom: 6 }}>✓ Before the Title, The Crime Scene, Know the Room, Before It Blows Up, The Vow</p>
              <p style={{ fontSize: 11, color: C.teak, margin: "10px 0 6px", fontWeight: 500 }}>Phase 2: Integration</p>
              <p style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300, marginBottom: 6 }}>✓ Read Their Mind, Follow the Money, Run the Business, Play the Game, Speak Their World</p>
              <p style={{ fontSize: 11, color: C.teak, margin: "10px 0 6px", fontWeight: 500 }}>Phase 3: Multiplication</p>
              <p style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300, marginBottom: 16 }}>✓ Build the Machine, Every Room Every City, Nothing Stops, The Architecture, The Legacy</p>
              <p style={{ fontSize: 13, color: C.dark, marginBottom: 10, fontWeight: 500 }}>Plus:</p>
              {["200+ automation templates","Calendar Crime Scene Kit","Shadow AI Playbook","Revenue Recognition Framework","Crisis Prevention Dashboard","Lifetime access to community and materials"].map((m,i) => <p key={i} style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300, marginBottom: 6 }}>✓ {m}</p>)}
            </div>
            <div style={{ borderTop: `1px solid ${C.borderLight}`, marginTop: 20, paddingTop: 20 }}>
              <p style={{ fontSize: 13, color: C.teak, marginBottom: 10, fontWeight: 500 }}>Pay in full and unlock:</p>
              <p style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300 }}>✓ Own the Room, Run the World</p>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: C.teak, fontStyle: "italic", marginTop: 24, lineHeight: 1.6 }}>"I went through every module in three weeks. I couldn't stop. It was like someone finally wrote the playbook I've been building in my head for ten years."</p>
            <button onClick={() => handleCheckout("price_1TOL4CAca0elMraM7NiMjY6x")} disabled={loading === "price_1TOL4CAca0elMraM7NiMjY6x"} className="btn tracked" style={{ width: "100%", marginTop: 28, background: "transparent", color: C.fawn, border: `1px solid ${C.fawn}`, padding: 16, fontSize: 11, fontWeight: 500, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>{loading === "price_1TOL4CAca0elMraM7NiMjY6x" ? "Loading..." : member ? "Start at $997" : "Join Free First"}</button>
            <button onClick={() => handleCheckout("price_1TOL5oAca0elMraMffZCesw2")} disabled={loading === "price_1TOL5oAca0elMraMffZCesw2"} className="btn tracked" style={{ width: "100%", marginTop: 12, background: "transparent", color: C.sage, border: `1px solid rgba(176,137,104,0.2)`, padding: "12px 24px", fontSize: 10, fontWeight: 500, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>{loading === "price_1TOL5oAca0elMraMffZCesw2" ? "Loading..." : member ? "Or $99/month" : "Join Free First"}</button>
          </div>

          {/* 1 ON 1 */}
          <div style={{ background: C.bg, border: `1px solid ${C.borderLight}`, borderRadius: 16, padding: "44px 32px" }}>
            <p className="tracked" style={{ fontSize: 9, color: C.teak, marginBottom: 12, letterSpacing: "0.3em" }}>Private</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 400, color: C.dark, lineHeight: 1.3, marginBottom: 20 }}>1 on 1 Coaching with Sarah</h3>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 400, color: C.dark, marginBottom: 4 }}>$5,000</p>
            <p style={{ fontSize: 12, color: C.sage, marginBottom: 28, fontWeight: 300 }}>one time payment</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: C.fawn, fontWeight: 300, marginBottom: 24 }}>Twelve weeks of private, intensive coaching built entirely around you. Your career. Your challenges. Your growth. A complete playbook designed to elevate you in any role, with any executive, at any level.</p>
            <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 20 }}>
              <p style={{ fontSize: 13, color: C.dark, marginBottom: 10, fontWeight: 500 }}>What's included:</p>
              {["12 weeks of private coaching with Sarah","Personalized systems built for your role","Identity work and career playbook","All 15 modules (all 3 phases)","Every template, workbook, and framework","Direct access to Sarah between sessions","Lifetime access to community and all materials"].map((m,i) => <p key={i} style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300, marginBottom: 6 }}>✓ {m}</p>)}
            </div>
            <div style={{ borderTop: `1px solid ${C.borderLight}`, marginTop: 20, paddingTop: 20 }}>
              <p style={{ fontSize: 13, color: C.teak, marginBottom: 10, fontWeight: 500 }}>All bonuses included:</p>
              {["Own the Room, Run the World","Generational Fluency","Relocation Support Module","Absence Operations Protocol"].map((m,i) => <p key={i} style={{ fontSize: 13, color: C.fawn, lineHeight: 1.8, fontWeight: 300, marginBottom: 6 }}>✓ {m}</p>)}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: C.teak, fontStyle: "italic", marginTop: 24, lineHeight: 1.6 }}>"Sarah sees things about your career that you can't see yourself. She helped me understand my value in a way that changed how I negotiate, how I communicate, and how I show up."</p>
            <Link href="/apply" className="btn tracked" style={{ display: "block", width: "100%", marginTop: 28, background: C.fawn, color: C.bg, border: "none", padding: 16, fontSize: 11, fontWeight: 500, borderRadius: 50, textAlign: "center", fontFamily: "'Montserrat',sans-serif" }}>Apply for Private Coaching</Link>
          </div>
        </div>
      </section>

      {/* 15 MODULES */}
      <section style={{ padding: "80px clamp(20px,5vw,60px)", background: C.bone }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.4em", fontWeight: 500 }}>The 15 Modules</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 400, color: C.dark, marginBottom: 16 }}>Built by an EA, for an EA.</h2>
          <p style={{ fontSize: 14, color: C.fawn, fontWeight: 300, marginBottom: 48, lineHeight: 1.8 }}>The Live 6 Week Transformation covers 6 core modules. The Self Guided and 1 on 1 Coaching include all 15 across three phases.</p>
        </div>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          {[
            { phase: "Phase 1: Foundation", modules: [
              { n: "01 Before the Title", d: "Who were you before this role started reshaping you? Identity work that reconnects you to your core so you stop disappearing into the job." },
              { n: "02 The Crime Scene", d: "Your calendar is evidence. We audit it, calculate the cost, and build the case for change. Your exec will never look at a meeting request the same way." },
              { n: "03 Know the Room", d: "Stakeholder intelligence. Who matters, how they think, what they need, and how to manage every relationship in your exec's orbit without a single misstep." },
              { n: "04 Before It Blows Up", d: "Crisis prevention. The 5 Signal Dashboard that lets you see problems before they become emergencies. Your exec will wonder how you always know." },
              { n: "05 The Vow", d: "The Partnership Covenant. A documented agreement between you and your exec about boundaries, expectations, and mutual protection. This is the module that saves relationships." },
            ]},
            { phase: "Phase 2: Integration", modules: [
              { n: "06 Read Their Mind", d: "The Shadow AI Playbook. Learn to predict what your exec needs before they ask. This is the module that gets EAs promoted." },
              { n: "07 Follow the Money", d: "Revenue Recognition. You see every email, every meeting, every missed opportunity. This module teaches you to find the money hiding in plain sight and present it with confidence." },
              { n: "08 Run the Business", d: "Business acumen for EAs. Financial literacy, strategic thinking, and the language of leadership. So you can sit at the table, not just manage it." },
              { n: "09 Play the Game", d: "Office politics, power dynamics, and strategic positioning. How to navigate the unwritten rules without compromising who you are." },
              { n: "10 Speak Their World", d: "Culture Codes for 50+ countries. Communication styles, hierarchy norms, time orientation. Global fluency that turns you into the person who never gets it wrong." },
            ]},
            { phase: "Phase 3: Multiplication", modules: [
              { n: "11 Build the Machine", d: "200+ automations, systems, and workflows installed into your daily operations. The module that gives you back 15+ hours a week and makes you look like a wizard." },
              { n: "12 Every Room, Every City", d: "Advanced travel, event, and logistics management. International protocols, time zone strategy, and the systems that make global operations feel effortless." },
              { n: "13 Nothing Stops", d: "Absence and continuity planning. What happens when you're not there? This module ensures the operation runs with or without you, because your value isn't in being available 24/7." },
              { n: "14 The Architecture", d: "Systems design. Building the infrastructure that holds everything together. The module for EAs who want to architect operations, not just execute tasks." },
              { n: "15 The Legacy", d: "Your career roadmap. Where you go from here. How to leverage everything you've built into the next role, the next level, the next chapter. This isn't an ending. It's a launchpad." },
            ]},
          ].map((phase, pi) => (
            <div key={pi}>
              <p className="tracked" style={{ fontSize: 10, color: C.teak, marginBottom: 20, letterSpacing: "0.3em", fontWeight: 500, paddingTop: pi > 0 ? 32 : 10 }}>{phase.phase}</p>
              {phase.modules.map((m, mi) => (
                <div key={mi} style={{ padding: "20px 0", borderBottom: `1px solid rgba(176,137,104,0.2)` }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: C.sage, marginBottom: 4, fontWeight: 500 }}>{m.n}</p>
                  <p style={{ fontSize: 13, color: C.dark, fontWeight: 300, lineHeight: 1.7 }}>{m.d}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "100px clamp(20px,5vw,60px)", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: C.dark, lineHeight: 1.3, marginBottom: 20 }}>You've been holding everything together for everyone else.</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: C.teak, fontStyle: "italic", marginBottom: 36 }}>Invest in the person who makes everything possible. You.</p>
          <a href="#" onClick={(e: any) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="btn tracked" style={{ background: C.fawn, color: C.bg, border: "none", padding: "18px 44px", fontSize: 12, fontFamily: "'Montserrat',sans-serif" }}>Choose Your Transformation</a>
        </div>
      </section>

      <footer style={{ padding: "36px clamp(20px,5vw,60px)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 500, color: C.teak }}>The Global Flow</span>
          <p style={{ fontSize: 11, color: C.sage }}>© 2026 The Global Flow™</p>
        </div>
      </footer>
    </div>
  );
}
