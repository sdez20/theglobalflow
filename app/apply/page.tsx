"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const C = {
  bg: "#FEFCF9", bone: "#F2EAD7", sand: "#E7B88D", teak: "#B08968",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F",
  border: "rgba(176,137,104,0.12)", borderLight: "rgba(176,137,104,0.15)",
};

export default function Apply() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", location: "", linkedin: "", title: "", company: "", execTitle: "", timeInRole: "", timeWithExec: "", totalYears: "", whyNow: "", whatChanges: "", weighsOnYou: "", anythingElse: "", source: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("https://formspree.io/f/xkokrjzv", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: "New 1 on 1 Coaching Application!",
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          location: form.location,
          linkedin: form.linkedin,
          title: form.title,
          company: form.company,
          executive_title: form.execTitle,
          time_in_role: form.timeInRole,
          time_with_exec: form.timeWithExec,
          total_ea_years: form.totalYears,
          why_coaching_now: form.whyNow,
          what_would_change: form.whatChanges,
          biggest_weight: form.weighsOnYou,
          anything_else: form.anythingElse,
          how_found_us: form.source,
        }),
      });
      router.push("/thankyou");
    } catch {
      alert("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const inputStyle: any = { width: "100%", padding: "16px 20px", marginBottom: 14, background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" };
  const textareaStyle: any = { ...inputStyle, resize: "vertical", minHeight: 100 };
  const selectStyle: any = { ...inputStyle, appearance: "none", color: C.sage };
  const labelStyle: any = { display: "block", fontSize: 12, fontWeight: 500, color: C.fawn, marginBottom: 6, letterSpacing: "0.05em" };

  const set = (key: string) => (e: any) => setForm({ ...form, [key]: e.target.value });

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.charcoal, background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}a{text-decoration:none;color:inherit}.btn:hover{opacity:.88;transform:translateY(-1px)}.tracked{letter-spacing:0.35em;text-transform:uppercase}`}</style>

      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <Link href="/" className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>The Global Flow</Link>
          <Link href="/pricing" className="btn tracked" style={{ background: "transparent", color: C.fawn, border: `1px solid ${C.fawn}`, padding: "10px 24px", borderRadius: 50, fontSize: 10, fontWeight: 500, fontFamily: "'Montserrat',sans-serif" }}>Back to Pricing</Link>
        </div>
      </nav>

      <section style={{ padding: "100px clamp(20px,5vw,60px) 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${C.sand}, ${C.teak})`, margin: "0 auto 28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: C.bg, fontWeight: 300 }}>S</span>
          </div>
          <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.4em", fontWeight: 500 }}>Private Coaching Application</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 400, lineHeight: 1.2, color: C.dark, margin: "0 0 20px" }}>Private Coaching with Sarah</h1>
          <div style={{ width: 40, height: 1, background: C.teak, margin: "24px auto", opacity: 0.4 }} />
          <p style={{ fontSize: 15, lineHeight: 1.8, color: C.fawn, maxWidth: 460, margin: "0 auto", fontWeight: 300 }}>This application helps me understand where you are, where you want to be, and whether we're the right fit to work together. Take your time. Be honest.</p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(20px,5vw,60px) 100px" }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: 520, margin: "0 auto" }}>

          <p className="tracked" style={{ fontSize: 10, color: C.teak, marginBottom: 20, letterSpacing: "0.3em", fontWeight: 500 }}>About You</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label style={labelStyle}>First Name</label><input required placeholder="First Name" value={form.firstName} onChange={set("firstName")} style={inputStyle} /></div>
            <div><label style={labelStyle}>Last Name</label><input required placeholder="Last Name" value={form.lastName} onChange={set("lastName")} style={inputStyle} /></div>
          </div>
          <label style={labelStyle}>Email Address</label>
          <input required type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} style={inputStyle} />
          <label style={labelStyle}>Phone Number</label>
          <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")} style={inputStyle} />
          <label style={labelStyle}>Where are you based?</label>
          <input placeholder="City, Country" value={form.location} onChange={set("location")} style={inputStyle} />
          <label style={labelStyle}>LinkedIn Profile</label>
          <input placeholder="https://linkedin.com/in/yourname" value={form.linkedin} onChange={set("linkedin")} style={inputStyle} />

          <p className="tracked" style={{ fontSize: 10, color: C.teak, margin: "32px 0 20px", letterSpacing: "0.3em", fontWeight: 500 }}>Your Role</p>
          <label style={labelStyle}>Your Current Title</label>
          <input placeholder="Executive Assistant, Chief of Staff, Personal Assistant, etc." value={form.title} onChange={set("title")} style={inputStyle} />
          <label style={labelStyle}>Company Name</label>
          <input placeholder="Where do you work?" value={form.company} onChange={set("company")} style={inputStyle} />
          <label style={labelStyle}>Who do you support?</label>
          <input placeholder="Their title (CEO, CFO, Founder, etc.)" value={form.execTitle} onChange={set("execTitle")} style={inputStyle} />
          <label style={labelStyle}>How long have you been in your current role?</label>
          <select value={form.timeInRole} onChange={set("timeInRole")} style={selectStyle}>
            <option value="">Select one</option>
            <option>Less than 6 months</option><option>6 months to 1 year</option><option>1 to 3 years</option><option>3 to 5 years</option><option>5 to 10 years</option><option>10+ years</option>
          </select>
          <label style={labelStyle}>How long have you been supporting this executive?</label>
          <select value={form.timeWithExec} onChange={set("timeWithExec")} style={selectStyle}>
            <option value="">Select one</option>
            <option>Less than 6 months</option><option>6 months to 1 year</option><option>1 to 3 years</option><option>3 to 5 years</option><option>5+ years</option>
          </select>
          <label style={labelStyle}>How many years have you been an EA total?</label>
          <select value={form.totalYears} onChange={set("totalYears")} style={selectStyle}>
            <option value="">Select one</option>
            <option>This is my first EA role</option><option>1 to 3 years</option><option>3 to 5 years</option><option>5 to 10 years</option><option>10+ years</option>
          </select>

          <p className="tracked" style={{ fontSize: 10, color: C.teak, margin: "32px 0 20px", letterSpacing: "0.3em", fontWeight: 500 }}>The Real Stuff</p>
          <label style={labelStyle}>What made you consider private coaching right now?</label>
          <textarea placeholder="What's happening in your role or career that brought you here?" value={form.whyNow} onChange={set("whyNow")} style={textareaStyle} />
          <label style={labelStyle}>If we worked together for 12 weeks, what would be different for you on the other side?</label>
          <textarea placeholder="What does success look like for you?" value={form.whatChanges} onChange={set("whatChanges")} style={textareaStyle} />
          <label style={labelStyle}>What's the one thing about your role that weighs on you the most?</label>
          <textarea placeholder="The thing you carry that no one else sees." value={form.weighsOnYou} onChange={set("weighsOnYou")} style={textareaStyle} />
          <label style={labelStyle}>Is there anything else you'd like me to know?</label>
          <textarea placeholder="Anything at all. This is your space." value={form.anythingElse} onChange={set("anythingElse")} style={{ ...textareaStyle, minHeight: 80 }} />

          <p className="tracked" style={{ fontSize: 10, color: C.teak, margin: "32px 0 20px", letterSpacing: "0.3em", fontWeight: 500 }}>One Last Thing</p>
          <label style={labelStyle}>How did you hear about The Global Flow?</label>
          <select value={form.source} onChange={set("source")} style={selectStyle}>
            <option value="">Select one</option>
            <option>Another EA told me</option><option>LinkedIn</option><option>Conference or Event</option><option>The Community</option><option>Google Search</option><option>Other</option>
          </select>

          <button type="submit" disabled={submitting} className="btn tracked" style={{ width: "100%", marginTop: 28, background: submitting ? C.sage : C.fawn, color: C.bg, border: "none", padding: 18, fontSize: 11, fontWeight: 500, borderRadius: 50, cursor: submitting ? "wait" : "pointer", fontFamily: "'Montserrat',sans-serif" }}>{submitting ? "Submitting..." : "Submit Application"}</button>
          <p style={{ fontSize: 12, color: C.sage, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>Applications are reviewed personally by Sarah. You'll hear back within 48 hours.</p>
        </form>
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
