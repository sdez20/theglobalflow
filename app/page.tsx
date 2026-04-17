"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const C = {
  bg: "#FEFCF9",
  bone: "#F2EAD7",
  sand: "#E7B88D",
  teak: "#B08968",
  fawn: "#6A4F2E",
  sage: "#88856A",
  dark: "#3A2E1F",
  charcoal: "#474747",
  white: "#FEFCF9",
  border: "rgba(176,137,104,0.12)",
  borderLight: "rgba(176,137,104,0.15)",
};

const FORMSPREE_URL = "https://formspree.io/f/xkokrjzv";

const Chev = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>;
const Star = () => <svg width="14" height="14" viewBox="0 0 24 24" fill={C.sand}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

function FAQ({ q, a }: { q: string; a: string }) {
  const [o, so] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.borderLight}` }}>
      <button onClick={() => so(!o)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", cursor: "pointer", fontSize: 17, fontWeight: 600, color: C.dark, textAlign: "left", lineHeight: 1.45, fontFamily: "'Montserrat',sans-serif" }}>
        {q}
        <span style={{ transform: o ? "rotate(180deg)" : "", transition: "transform .3s", marginLeft: 14, flexShrink: 0, color: C.teak }}><Chev /></span>
      </button>
      <div style={{ maxHeight: o ? 600 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <p style={{ padding: "0 0 24px", margin: 0, fontSize: 15, lineHeight: 1.8, color: C.sage }}>{a}</p>
      </div>
    </div>
  );
}

const Sec = ({ children, bg = C.bg, id, py = 100 }: { children: React.ReactNode; bg?: string; id?: string; py?: number }) => (
  <section id={id} style={{ background: bg, padding: `${py}px clamp(20px, 5vw, 60px)` }}>
    <div style={{ maxWidth: 720, margin: "0 auto" }}>{children}</div>
  </section>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 400, lineHeight: 1.2, color: C.dark, textAlign: "center", margin: "0 0 20px" }}>{children}</h2>
);

const Body = ({ children, center = true }: { children: React.ReactNode; center?: boolean }) => (
  <p style={{ fontSize: 16, lineHeight: 1.8, color: C.fawn, textAlign: center ? "center" : "left", margin: "0 0 16px", maxWidth: 560, marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0, fontWeight: 300 }}>{children}</p>
);

const Divider = () => (
  <div style={{ width: 40, height: 1, background: C.teak, margin: "32px auto", opacity: 0.4 }} />
);

function FadeIn({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
      {children}
    </div>
  );
}

export default function GlobalFlow() {
  const [dropdown, setDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", role: "", source: "" });
  const router = useRouter();

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setDropdown(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          role: form.role,
          source: form.source,
          _subject: "New Global Flow Waitlist Signup!",
        }),
      });
      router.push("/thankyou");
    } catch (err) {
      alert("Something went wrong — please try again!");
      setSubmitting(false);
    }
  };

  const inputStyle = { width: "100%", padding: "16px 20px", marginBottom: 14, background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" };

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.charcoal, background: C.bg, minHeight: "100vh" }}>
      <style>{`
        *{box-sizing:border-box}
        a{text-decoration:none}
        .btn:hover{opacity:.88;transform:translateY(-1px)}
        .tracked{letter-spacing:0.35em;text-transform:uppercase}
      `}</style>

      {/* NAV — DROPDOWN */}
      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ position: "relative" }}>
            <span onClick={() => setDropdown(!dropdown)} className="tracked" style={{ cursor: "pointer", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>
              The Global Flow <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.5 }}>▾</span>
            </span>
            {dropdown && (
              <div style={{ position: "absolute", top: 44, left: 0, background: C.bg, border: `1px solid ${C.borderLight}`, padding: "16px 28px", zIndex: 100, minWidth: 180 }}>
                {[["top","Home"],["about","About"],["get","For You"],["join","Join"]].map(([id,l]) => (
                  <button key={id} onClick={() => go(id)} className="tracked" style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: `1px solid ${C.border}`, padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>{l}</button>
                ))}
                <a href="/community" className="tracked" style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, fontFamily: "'Montserrat',sans-serif", textDecoration: "none", borderBottom: `1px solid ${C.border}` }}>Community</a>
                <a href="/blog" className="tracked" style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, fontFamily: "'Montserrat',sans-serif", textDecoration: "none" }}>Blog</a>
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="/login" style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .3s" }} title="Member Login">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.sage} strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </a>
            <button onClick={() => go("join")} className="btn tracked" style={{ background: "transparent", color: C.fawn, border: `1px solid ${C.fawn}`, padding: "10px 24px", borderRadius: 50, cursor: "pointer", fontSize: 10, fontWeight: 500, transition: "all .3s", fontFamily: "'Montserrat',sans-serif" }}>Join the Waitlist</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <Sec id="top" py={120}>
        <div style={{ textAlign: "center" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 40, fontWeight: 500, letterSpacing: "0.4em" }}>For EAs who are done being "just an assistant"</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.12, color: C.dark, margin: "0 0 10px" }}>
            The only transformation of its kind, built for EAs around the globe.
          </h1>
          <Divider />
          <Body><em>Bring your laptop. And maybe a margarita.</em></Body>
          <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("join")} className="btn tracked" style={{ background: C.fawn, color: C.bg, border: "none", padding: "14px 32px", borderRadius: 50, cursor: "pointer", fontSize: 11, fontWeight: 400, transition: "all .3s", fontFamily: "'Montserrat',sans-serif" }}>Join the Waitlist</button>
            <button onClick={() => go("get")} className="btn tracked" style={{ background: "transparent", color: C.fawn, border: `1px solid ${C.fawn}`, padding: "14px 32px", borderRadius: 50, cursor: "pointer", fontSize: 11, fontWeight: 400, transition: "all .3s", fontFamily: "'Montserrat',sans-serif" }}>For You</button>
          </div>
        </div>
      </Sec>

      {/* VIBE */}
      <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <Sec py={80}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px, 4.5vw, 42px)", fontWeight: 400, lineHeight: 1.3, color: C.dark, textAlign: "center", margin: "0 0 20px" }}>
              You run someone else's world every single day.<br />
              <em style={{ color: C.teak }}>Now we've built something for yours.</em>
            </h2>
            <Divider />
            <Body>You see everything, carry everything, and make it look effortless, now you have a space where someone truly understands what that takes.</Body>
          </div>
        </Sec>
      </div>

      {/* FOR YOU — FLIPPED */}
      <Sec id="get" py={100}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.4em" }}>For You</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px, 4.5vw, 42px)", fontWeight: 400, lineHeight: 1.2, color: C.sage, textAlign: "center", margin: "0 0 18px" }}>Systems. Community. And the Occasional Meme.</h2>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: C.dark, textAlign: "center", maxWidth: 480, margin: "0 auto", fontWeight: 400 }}>Real tools for EAs. No fluff. No motivational posters. Let's make your job (and life) a little better.</p>
        </div>
        <div style={{ textAlign: "left" }}>
          {[
            { title: "15 Modules Unlike Anything That's Been Done Before", desc: "A complete transformation curriculum covering identity, systems, cultural intelligence, crisis prevention, revenue recognition, and more." },
            { title: "200+ Automation Templates", desc: "Email templates, calendar systems, crisis dashboards, stakeholder trackers. Copy, paste, customize, done. Your exec will think you're a wizard." },
            { title: "Culture Codes for 50+ Countries", desc: "Stop Googling \"how to email someone in Japan.\" We've built the cheat sheet for global communication. You're welcome." },
            { title: "Shadow AI Playbook", desc: "Learn to predict what your exec needs before they need it. It's not mind-reading. It's a system. (OK fine, it's a little like mind-reading.)" },
            { title: "Calendar Crime Scene Kit", desc: "Audit your exec's calendar. Identify the crimes. Calculate the cost. Present the evidence. Watch their face when they see the number." },
            { title: "Live 6 Week Group Coaching Sessions", desc: "A 6 week coaching with EAs who get it. Q&A and occasional therapy vibes. Bring coffee. Or wine. We don't judge." },
            { title: "The Private Community", desc: "The best (and most fun) private EA network you'll find. Ask anything. Vent safely. Share wins. Get real answers from people who live this every day." },
            { title: "Session Replays", desc: "Whether you're working, napping, or in a time zone that doesn't cooperate, you'll have access to every session on-demand." },
            { title: "Templates, Guides & Cheat Sheets", desc: "Workbooks for Before the Title, The Crime Scene, Know the Room, Read Their Mind, Speak Their World, Play the Game, and more. All downloadable. All yours." },
          ].map((x, i) => (
            <div key={i} style={{ padding: "28px 0", borderBottom: i < 8 ? `1px solid ${C.borderLight}` : "none" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 500, color: C.sage, margin: "0 0 6px" }}>{x.title}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: C.dark, margin: 0, fontWeight: 400 }}>{x.desc}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* QUOTE */}
      <section style={{ background: C.bg, padding: "80px clamp(20px,5vw,60px)", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400, color: C.sand, lineHeight: 1.4, maxWidth: 620, margin: "0 auto", fontStyle: "italic" }}>
          "Sometimes you need to be around people who <em>just get it.</em>"
        </p>
      </section>

      {/* TESTIMONIALS */}
      <Sec id="vibes" py={100}>
        <p className="tracked" style={{ fontSize: 10, color: C.charcoal, textAlign: "center", marginBottom: 16, letterSpacing: "0.4em" }}>What members are saying</p>
        <H2>Don't take our word for it. Take theirs.</H2>
        <div style={{ height: 32 }} />
        {[
          { name: "Priya M.", q: "I joined looking for templates and found my people. The community alone is worth it — I've never been in a space where everyone just GETS what this job is like. Also, Sarah is hilarious. That helps.", color: C.sand },
          { name: "Katherine D.", q: "The Shadow AI framework changed my entire relationship with my exec. He went from micromanaging to trusting me with real decisions. Three months in, he told the board I was his 'secret weapon.' I cried in the car.", color: C.sage },
          { name: "Rachel S.", q: "I tracked $680K in revenue opportunities using the Recognition framework. When I showed my exec the number, she was speechless. I got promoted two months later. This isn't training — it's a career accelerator.", color: C.teak },
          { name: "Jasmine T.", q: "Sarah knows what this job costs you because she LIVED it. This isn't some consultant who read about EAs. I've never felt more seen or more prepared. 10/10, no notes.", color: C.sand },
          { name: "Elena K.", q: "We put three EAs through the program. The culture shift was immediate. Less chaos, less turnover, better communication. Our principals asked what happened. We just smiled.", color: C.sage },
        ].map((t, i) => (
          <div key={i} style={{ padding: "32px 0", borderBottom: i < 4 ? `1px solid ${C.borderLight}` : "none", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 14 }}>{[1,2,3,4,5].map(j => <Star key={j} />)}</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, fontStyle: "italic", lineHeight: 1.7, color: C.dark, margin: "0 0 16px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>"{t.q}"</p>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: C.bg }}>{t.name[0]}</div>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: 0 }}>{t.name}</p>
          </div>
        ))}
      </Sec>

      {/* ABOUT SARAH */}
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <Sec id="about" py={100}>
          <FadeIn>
            <p className="tracked" style={{ fontSize: 12, fontWeight: 500, color: C.sage, textAlign: "center", marginBottom: 20, letterSpacing: "0.4em" }}>Built by an EA, for an EA.</p>
            <div style={{ width: 120, height: 120, borderRadius: "50%", background: `linear-gradient(135deg, ${C.sand}, ${C.teak})`, margin: "32px auto", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 300, color: C.bg }}>S</div>
            <Body>Island girl turned Manhattan EA turned lifestyle curator. I spent over a decade supporting C-suite executives in corporate New York, and before that I was an artist who somehow ended up in boardrooms. Life has a sense of humor.</Body>
            <Body>I'm well traveled in a way that changed how I see people, not just places. I understand cultural norms because I've lived them, and that perspective is woven into everything I teach.</Body>
            <Body>Today I am the founder of The Global Flow, mental health and wellbeing in the workplace advocate, a book lover, a wife, mom, certified nutritionist, and a soon-to-be Pilates instructor. I believe in constantly evolving, feeding your passions, leaning into the things that come easy to you, and love a good challenge.</Body>
          </FadeIn>
        </Sec>
      </div>

      {/* WHAT'S INSIDE */}
      <section style={{ background: C.bone, padding: "80px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <H2>What's inside The Global Flow?</H2>
          <div style={{ height: 12 }} />
          <Body>The Global Flow is a <strong style={{ color: C.dark, fontWeight: 500 }}>free community</strong> for Executive Assistants, Chiefs of Staff, Personal Assistants, and anyone in the business of running someone else's world while quietly losing their own. Inside, you'll find paid transformations, live programs, and resources designed to change how you work.</Body>
          <div style={{ height: 12 }} />
          <div style={{ textAlign: "left", maxWidth: 600, margin: "0 auto" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Free Community Membership</p>
            <p style={{ fontSize: 14, color: C.fawn, lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>Access to the community, introductory templates like Before the Title, and a space where EAs connect and support each other.</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>The Live 6-Week Transformation</p>
            <p style={{ fontSize: 14, color: C.fawn, lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>Six modules delivered live in a group cohort. Full access to all replays, every template from that transformation, and lifetime access to the community and materials.</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>The Self-Guided Transformation</p>
            <p style={{ fontSize: 14, color: C.fawn, lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>All 15 modules at your own pace, including bonuses. Lifetime access to everything.</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>1-on-1 Coaching</p>
            <p style={{ fontSize: 14, color: C.fawn, lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>12 weeks of private, intensive coaching with Sarah. Personalized systems, identity work, and a complete playbook built around you and your executive.</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>The Community</p>
            <p style={{ fontSize: 14, color: C.fawn, lineHeight: 1.7, marginBottom: 28, fontWeight: 300 }}>A private network of EAs from around the globe who get it. Ask anything, share wins, vent safely, and never feel alone in your role again.</p>
            <div style={{ background: "rgba(136,133,106,0.1)", borderRadius: 12, padding: 24, border: "1px solid rgba(136,133,106,0.2)" }}>
              <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 8, letterSpacing: "0.3em" }}>Coming Soon</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Your Wellbeing, Non-Negotiable</p>
              <p style={{ fontSize: 14, color: C.fawn, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>A specialized module on mental health and wellbeing in the workplace, developed from Sarah's diploma studies at the Oxford School of Learning. Designed as an advanced add-on for Chiefs of Staff, senior PAs, and high-level EAs who carry more than anyone talks about.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST FORM */}
      <Sec id="join" py={100}>
        <p className="tracked" style={{ fontSize: 11, color: C.teak, textAlign: "center", marginBottom: 16, letterSpacing: "0.4em" }}>Come find your people</p>
        <H2>Join Our Waitlist</H2>
        <Body>Our next intake for members will be coming soon. We bring new members in through cohorts so everyone gets a proper welcome and the community stays exceptional.</Body>
        <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "32px auto 0" }}>
          <input required placeholder="First Name" value={form.firstName} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({...form, firstName: e.target.value})} style={inputStyle} />
          <input required placeholder="Last Name" value={form.lastName} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({...form, lastName: e.target.value})} style={inputStyle} />
          <input required type="email" placeholder="Email Address" value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({...form, email: e.target.value})} style={inputStyle} />
          <input placeholder="Your Role (EA, CoS, PA, etc.)" value={form.role} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({...form, role: e.target.value})} style={inputStyle} />
          <select value={form.source} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({...form, source: e.target.value})} style={{...inputStyle, color: form.source ? C.dark : C.sage, appearance: "none"}}>
            <option value="">How did you hear about us?</option>
            <option value="Another EA told me">Another EA told me (love that)</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Conference / Event">Conference / Event</option>
            <option value="Just appeared in my feed">Just appeared in my feed like magic</option>
          </select>
          <button type="submit" disabled={submitting} className="btn tracked" style={{ width: "100%", padding: 16, marginTop: 8, background: submitting ? C.sage : C.fawn, color: C.bg, border: "none", borderRadius: 50, fontSize: 15, fontWeight: 700, cursor: submitting ? "wait" : "pointer", transition: "all .2s", fontFamily: "'Montserrat',sans-serif" }}>{submitting ? "Sending..." : "I Want In"}</button>
          <p style={{ fontSize: 12, color: C.sage, textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>No spam and no sales calls. Just a warm welcome and next steps.</p>
        </form>
        <div style={{ textAlign: "center", marginTop: 40, padding: 28, background: C.bone, borderRadius: 12 }}>
          <p style={{ fontSize: 16, color: C.dark, margin: "0 0 12px", fontWeight: 600 }}>Ready to jump in right now?</p>
          <p style={{ fontSize: 14, color: C.fawn, margin: "0 0 20px", fontWeight: 300 }}>Join the community for free and start connecting with EAs around the globe today.</p>
          <a href="/community" className="btn tracked" style={{ display: "inline-block", background: C.sage, color: C.bg, padding: "14px 36px", borderRadius: 50, fontSize: 11, fontWeight: 500, transition: "all .2s", textDecoration: "none", fontFamily: "'Montserrat',sans-serif" }}>Join Free</a>
        </div>
      </Sec>

      {/* FAQ */}
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <Sec py={100}>
          <H2>Got Questions? We've Got Answers.</H2>
          <div style={{ height: 20 }} />
          <FAQ q="Do I need my executive's permission to join?" a="Nope! This is built for YOU. Your exec doesn't need to be involved (though they'll definitely notice the difference). We do have an Executive-EA Partnership program coming soon where both people participate — but start with your own transformation first." />
          <FAQ q="I'm a new EA. Is this too advanced?" a="Not even a little. If anything, you'll skip years of figuring things out the hard way. New EAs get the foundations. Senior EAs get the strategic frameworks. Everyone gets the community. And everyone gets the memes." />
          <FAQ q="Can my company pay for this?" a="Yes! Most memberships are company-sponsored as professional development. We'll give you a business case template that makes your L&D team say yes immediately. Corporate invoicing available." />
          <FAQ q="What if I'm not in the US?" a="We're global! Members from 20+ countries and counting. Sessions accommodate multiple time zones, and the Culture Codes training literally covers 50+ countries. International EAs aren't an afterthought here — they're the point." />
          <FAQ q="Is this like other EA communities?" a="Honestly? No. Other communities are great for networking. We're great for networking AND installing 200+ systems that change how you work. Plus our community is genuinely funny, which is rare for professional development." />
          <FAQ q="What's the waitlist about?" a="We bring new members in through cohort intakes so everyone gets a proper welcome and onboarding. It keeps the community tight and the experience personal. Referrals from existing members get priority." />
          <FAQ q="Do you offer 1-on-1 training?" a="Yes! We offer private 1-on-1 training with Sarah for EAs who want an intensive, personalized experience. Details are shared once you're on the waitlist. Members get priority access to all future programs." />
        </Sec>
      </div>

      {/* FINAL CTA */}
      <section style={{ background: C.bg, padding: "70px clamp(20px,5vw,60px)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, color: C.dark, lineHeight: 1.3, margin: "0 0 24px" }}>Ready to stop feeling alone in your role?</p>
          <p style={{ fontSize: 15, color: C.sage, lineHeight: 1.7, margin: "0 0 28px", fontWeight: 300 }}>500+ EAs already found their people. You're next.</p>
          <button onClick={() => go("join")} className="btn tracked" style={{ background: C.sage, color: C.bg, border: "none", padding: "16px 40px", borderRadius: 50, cursor: "pointer", fontSize: 11, fontWeight: 500, transition: "all .2s", fontFamily: "'Montserrat',sans-serif" }}>Join the Waitlist</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "36px clamp(20px,5vw,60px)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 500, color: C.teak }}>The Global Flow</span>
            <p style={{ fontSize: 12, color: C.sage, marginTop: 4 }}>Be yourself everywhere, succeed everywhere.</p>
          </div>
          <p style={{ fontSize: 11, color: C.sage }}>© 2026 The Global Flow™</p>
        </div>
      </footer>
    </div>
  );
}
