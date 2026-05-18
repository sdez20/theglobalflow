"use client";
import Link from "next/link";

const C = {
  bg: "#FFFFFF", bone: "#F5F7F0", teak: "#B08968", green: "#9CAF88",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F",
  border: "rgba(156,175,136,0.15)", borderLight: "rgba(156,175,136,0.25)",
};

export default function Wellness() {
  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: "#474747", background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}a{text-decoration:none;color:inherit}.tracked{letter-spacing:0.35em;text-transform:uppercase}input,textarea,select{width:100%;padding:16px 20px;margin-bottom:14px;background:#F8FAF5;border:1px solid rgba(156,175,136,0.25);border-radius:8px;font-size:14px;color:#3A2E1F;outline:none;font-family:'Montserrat',sans-serif}textarea{resize:vertical;min-height:100px}select{appearance:none;color:#88856A}`}</style>

      <nav style={{ borderBottom: "1px solid " + C.border, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link href="/" className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>The Global Flow</Link>
            <Link href="/prive" className="tracked" style={{ fontSize: 10, fontWeight: 500, color: "#8FAABE" }}>Privé</Link>
            <Link href="/wellness" className="tracked" style={{ fontSize: 10, fontWeight: 500, color: C.green }}>Wellness</Link>
          </div>
          <Link href="/" style={{ fontSize: 12, color: C.fawn, fontWeight: 500 }}>Back to Home</Link>
        </div>
      </nav>

      <section style={{ padding: "120px clamp(20px,5vw,60px) 80px", textAlign: "center", background: "linear-gradient(180deg, #FFFFFF 0%, #F5F7F0 100%)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 24, letterSpacing: "0.5em", fontWeight: 500 }}>Nourish · Recover · Sustain</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(38px, 5.5vw, 56px)", fontWeight: 300, lineHeight: 1.1, color: C.dark, margin: "0 0 20px" }}>The Global Flow <em style={{ color: C.green }}>Wellness</em></h1>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, " + C.green + ", transparent)", margin: "28px auto" }} />
          <p style={{ fontSize: 16, lineHeight: 1.9, color: C.fawn, maxWidth: 500, margin: "0 auto", fontWeight: 300 }}>Nutrition, integrative psychology, and sustainable wellbeing designed specifically for executives and EAs navigating high-pressure environments.</p>
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "0 20px 60px" }}>
        <span className="tracked" style={{ display: "inline-block", fontSize: 10, color: C.green, fontWeight: 500, padding: "8px 24px", border: "1px solid rgba(156,175,136,0.3)", borderRadius: 50, letterSpacing: "0.4em" }}>Coming Soon</span>
      </section>

      <section style={{ padding: "60px clamp(20px,5vw,60px)", background: C.bg }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 20, letterSpacing: "0.3em", fontWeight: 500 }}>The Approach</p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300, marginBottom: 20 }}>The people who run companies and the people who run the people who run companies share one thing in common: their wellbeing is always the last priority.</p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300, marginBottom: 20 }}>Global Flow Wellness combines nutrition certification with integrative psychology methods built for the realities of executive and EA life. Not generic wellness advice. Not a meditation app. Real, applicable strategies for people who travel constantly, operate under extreme pressure, and rarely have time to eat a proper meal, let alone think about their own health.</p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300, marginBottom: 20 }}>This is a corporate wellness platform built by someone who has lived the schedule, managed the stress, and knows exactly where the cracks form before they become breakdowns.</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: C.green, fontStyle: "italic", lineHeight: 1.6, margin: "32px 0" }}>Sustainable performance starts with the person, not the position.</p>
        </div>
      </section>

      <section style={{ padding: "60px clamp(20px,5vw,60px)", background: "#F8FAF5" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 28, letterSpacing: "0.3em", fontWeight: 500 }}>What's Coming</p>
          {[
            { t: "Nutrition for High-Performance Schedules", d: "Meal strategies that work across time zones, back-to-back meetings, and 14-hour travel days. Designed by someone who has eaten airport food for a decade and found a better way." },
            { t: "Integrative Psychology for Stress Recovery", d: "Evidence-based methods for managing acute stress, emotional regulation, and the invisible weight of supporting someone else's world while carrying your own." },
            { t: "Travel Wellness Protocols", d: "Sleep optimization, hydration systems, and recovery strategies for executives and EAs who cross time zones regularly. Arrive functional, not depleted." },
            { t: "Crisis Energy Management", d: "What to eat, how to breathe, and how to recover when the pressure spikes. The 48-hour sustainability protocol for when everything hits at once." },
            { t: "Corporate Wellness Partnerships", d: "Bespoke wellness programs for organizations that want to invest in the sustainability of their leadership and the people who support them." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "20px 0", borderBottom: i < 4 ? "1px solid rgba(156,175,136,0.2)" : "none" }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: C.dark, marginBottom: 6 }}>{item.t}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: C.sage, fontWeight: 300 }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px clamp(20px,5vw,60px)", background: C.bg }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 20, letterSpacing: "0.4em", fontWeight: 500 }}>Partner With Us</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Interested in a Partnership?</h2>
          <p style={{ fontSize: 14, color: C.sage, fontWeight: 300, marginBottom: 36, lineHeight: 1.7 }}>Whether you're an organization looking to invest in your team's wellbeing, or an individual ready to prioritize your own, I'd love to hear from you.</p>
          <form action="https://formspree.io/f/xkokrjzv" method="POST" style={{ textAlign: "left" }}>
            <input type="hidden" name="_subject" value="New Wellness Partnership Inquiry" />
            <input required name="name" placeholder="Full Name" />
            <input required type="email" name="email" placeholder="Email Address" />
            <input name="company" placeholder="Company or Organization (optional)" />
            <input name="role" placeholder="Your Role (optional)" />
            <select name="interest">
              <option value="">What are you interested in?</option>
              <option>Corporate Wellness Partnership</option>
              <option>Individual Wellness Coaching</option>
              <option>Speaking or Workshop Engagement</option>
              <option>Just want to stay updated</option>
            </select>
            <textarea name="message" placeholder="Tell me more about what you're looking for or any questions you have..." />
            <button type="submit" className="tracked" style={{ width: "100%", padding: 16, background: C.dark, color: "#FFFFFF", border: "none", borderRadius: 50, fontSize: 11, fontWeight: 500, letterSpacing: "0.35em", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", marginTop: 10 }}>Submit Inquiry</button>
          </form>
          <p style={{ fontSize: 12, color: C.sage, marginTop: 16 }}>All inquiries are confidential. You'll hear from me within 48 hours.</p>
        </div>
      </section>

      <footer style={{ padding: "36px clamp(20px,5vw,60px)", borderTop: "1px solid " + C.border }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 500, color: C.teak }}>The Global Flow</span>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 11, color: C.sage }}>© 2026 The Global Flow™</p>
            <div style={{ marginTop: 6, display: "flex", gap: 16, justifyContent: "flex-end" }}>
              <Link href="/privacy" style={{ fontSize: 9, color: C.sage, opacity: 0.6 }}>Privacy Policy</Link>
              <Link href="/terms" style={{ fontSize: 9, color: C.sage, opacity: 0.6 }}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
