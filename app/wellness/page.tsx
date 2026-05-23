"use client";
import Link from "next/link";

const C = {
  bg: "#FFFFFF", bone: "#F5F7F0", input: "#F8FAF5", teak: "#B08968", green: "#9CAF88",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F", sand: "#E7B88D",
  border: "rgba(156,175,136,0.15)", borderLight: "rgba(156,175,136,0.25)",
};

const inputStyle = { width: "100%", padding: "16px 20px", marginBottom: 14, background: C.input, border: "1px solid " + C.borderLight, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" };
const selectStyle = { ...inputStyle, appearance: "none" as const, color: C.sage };

export default function Wellness() {
  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: "#474747", background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}a{text-decoration:none;color:inherit}.tracked{letter-spacing:0.35em;text-transform:uppercase}`}</style>

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
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 24, letterSpacing: "0.5em", fontWeight: 500 }}>For the Women Who Run Everything</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(38px, 5.5vw, 56px)", fontWeight: 300, lineHeight: 1.1, color: C.dark, margin: "0 0 20px" }}>The Global Flow <em style={{ color: C.green }}>Wellness</em></h1>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, " + C.green + ", transparent)", margin: "28px auto" }} />
          <p style={{ fontSize: 16, lineHeight: 1.9, color: C.fawn, maxWidth: 540, margin: "0 auto", fontWeight: 300 }}>A global wellness platform bringing together nutrition, gut health, hormone optimization, integrative psychology, and ancient healing traditions for women operating at the highest levels of leadership.</p>
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "0 20px 60px" }}>
        <span className="tracked" style={{ display: "inline-block", fontSize: 10, color: C.green, fontWeight: 500, padding: "8px 24px", border: "1px solid rgba(156,175,136,0.3)", borderRadius: 50, letterSpacing: "0.4em" }}>Coming Soon</span>
      </section>

      <section style={{ padding: "60px clamp(20px,5vw,60px)", background: C.bg }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 20, letterSpacing: "0.3em", fontWeight: 500 }}>The Vision</p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300, marginBottom: 20 }}>You run boardrooms, law firms, entire organizations. You make decisions that affect hundreds of people before most of them have had their morning coffee. You've built something remarkable with your mind, your discipline, and your drive.</p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300, marginBottom: 20 }}>And your body has been keeping up with all of it without getting the same level of strategy, investment, or attention that you give to everything else in your life.</p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300, marginBottom: 20 }}>Global Flow Wellness is not another wellness app. It is a curated network of the world's most trusted practitioners, brought together under one platform, speaking your language, honoring your culture, and built around the demands of the life you lead.</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: C.green, fontStyle: "italic", lineHeight: 1.6, margin: "32px 0" }}>You wouldn't run your business without a strategy. Why are you running your body without one?</p>
        </div>
      </section>

      <section style={{ padding: "60px clamp(20px,5vw,60px)", background: C.input }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 28, letterSpacing: "0.3em", fontWeight: 500 }}>Built For</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
            {["CEOs", "Founders", "C-Suite Executives", "Attorneys", "Executive Assistants", "Chiefs of Staff", "Managing Directors", "Partners", "Board Members"].map(t => (
              <span key={t} style={{ fontSize: 12, color: C.fawn, padding: "8px 18px", border: "1px solid rgba(156,175,136,0.25)", borderRadius: 50, fontWeight: 300 }}>{t}</span>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300 }}>Every woman who has earned her seat at the table and is quietly wondering why her body isn't keeping up with the pace her mind set years ago.</p>
        </div>
      </section>

      <section style={{ padding: "60px clamp(20px,5vw,60px)", background: C.bg }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 28, letterSpacing: "0.3em", fontWeight: 500 }}>What We Cover</p>
          {[
            { t: "Nutrition for High-Performing Women", d: "Nutrition strategies designed around your schedule, your travel, your body, and the demands you face daily. What to eat before a board meeting. How to fuel through a 14-hour day. What your body needs when you haven't slept properly in a week." },
            { t: "Gut Health", d: "Your gut is your second brain, and when it's off, everything is off. Bloating, inflammation, brain fog, anxiety, immune issues. We address the root causes, not the symptoms. Built around the reality that you eat in airports, at your desk, and between meetings." },
            { t: "Hormone Health at Every Stage", d: "Your hormones shift through every chapter of your life, and nobody told you how that would affect your performance, your sleep, your mood, your energy, or your decision-making. From your twenties through menopause and beyond, we build protocols that honor where your body is right now." },
            { t: "Somatic & Relational Therapy", d: "Your body stores everything your mind tries to push through. Tension patterns, stress responses, and the relational dynamics that shape how you lead, communicate, and protect yourself. Body-based healing that meets you where you are." },
            { t: "Integrative Psychology", d: "The emotional weight of leadership is real and rarely addressed. Imposter syndrome at the executive level. Decision fatigue. The loneliness of being the only woman in the room. Evidence-based methods integrated with the reality of your daily life." },
            { t: "Mindfulness & Yoga", d: "Not the kind you scroll past on Instagram. Mindfulness and movement practices designed for women who have five minutes between meetings and need them to count. Breathwork for the boardroom. Yoga that fits a real schedule." },
            { t: "Travel & Stress Recovery", d: "Jet lag protocols, sleep optimization across time zones, hydration strategies, and recovery methods for women who live in transit. How to land in a new city and perform at your peak. How to come home and recover instead of collapse." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "24px 0", borderBottom: i < 6 ? "1px solid rgba(156,175,136,0.2)" : "none" }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: C.dark, marginBottom: 8 }}>{item.t}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: C.sage, fontWeight: 300 }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px clamp(20px,5vw,60px)", background: C.bone }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 20, letterSpacing: "0.3em", fontWeight: 500, textAlign: "center" }}>The Practitioner Network</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, color: C.dark, marginBottom: 12, textAlign: "center" }}>One platform. The world's best practitioners.</h2>
          <p style={{ fontSize: 14, color: C.sage, fontWeight: 300, marginBottom: 40, textAlign: "center", lineHeight: 1.7, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>Every practitioner on this platform is personally vetted and aligned with the Global Flow philosophy: holistic, evidence-informed, culturally fluent, and built for women who lead.</p>

          <div style={{ background: C.input, borderRadius: 12, padding: 28, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, " + C.sand + ", " + C.teak + ")", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#FEFCF9", fontWeight: 300 }}>S</span></div>
              <div>
                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, color: C.dark, marginBottom: 4 }}>Sarah DeSouza</h4>
                <p style={{ margin: 0, fontSize: 11, color: C.green }}>Founder · MS Integrative Psychology, specializing in Relational & Somatic Therapy · IIN Holistic Nutrition Certification, specializing in Gut & Hormonal Health</p>
              </div>
            </div>
          </div>

          {[
            { name: "Ayurvedic Practitioner", desc: "Ancient Indian healing traditions adapted for modern executive life. Dosha-based nutrition, herbal protocols, and seasonal wellness rhythms.", status: "Practitioner Announced Soon" },
            { name: "Holistic Menopause & Lifespan Therapist", desc: "Specialized in perimenopause, menopause, and post-menopausal wellness. Holistic hormone balancing, emotional support, and lifestyle protocols for every stage.", status: "Practitioner Announced Soon" },
            { name: "Holistic Gut Health Specialist", desc: "Women-focused gut health restoration. Microbiome analysis, elimination protocols, and nutrition plans that work around high-pressure schedules and international travel.", status: "Practitioner Announced Soon" },
            { name: "Hormone Health Practitioner", desc: "Holistic hormone optimization through nutrition, lifestyle, and natural protocols. Supporting women from their twenties through menopause and beyond without compromising their careers.", status: "Practitioner Announced Soon" },
          ].map((p, i) => (
            <div key={i} style={{ background: C.input, borderRadius: 12, padding: 28, marginBottom: 16, opacity: 0.7 }}>
              <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, color: C.dark, marginBottom: 6 }}>{p.name}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: C.sage, fontWeight: 300 }}>{p.desc}</p>
              <span className="tracked" style={{ fontSize: 9, color: C.green, marginTop: 10, display: "inline-block" }}>{p.status}</span>
            </div>
          ))}

          <div style={{ background: C.input, borderRadius: 12, padding: 28, marginBottom: 16 }}>
            <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, color: C.dark, marginBottom: 6 }}>Mindfulness & Yoga Instructor</h4>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: C.sage, fontWeight: 300 }}>Breathwork, movement, and mindfulness practices designed for women who lead. Functional yoga that fits between meetings. Meditation that works in five minutes.</p>
            <span className="tracked" style={{ fontSize: 9, color: C.teak, marginTop: 10, display: "inline-block" }}>Confirmed</span>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px clamp(20px,5vw,60px)", background: C.bg }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 20, letterSpacing: "0.3em", fontWeight: 500 }}>Rooted in Every Culture</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Wellness has never been one-size-fits-all.</h2>
          <p style={{ fontSize: 14, color: C.sage, fontWeight: 300, marginBottom: 36, lineHeight: 1.7, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>Every culture has its own healing wisdom. This platform honors that. Our practitioners draw from traditions across the globe, because a woman in São Paulo and a woman in Seoul deserve wellness that speaks to who they are, not just what Western medicine tells them.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
            {["Caribbean", "Indian & Ayurvedic", "Traditional Chinese Medicine", "African Healing Traditions", "Middle Eastern", "Latin American & Brazilian", "Greek & Mediterranean", "Italian", "French", "South American", "Eastern European", "Japanese", "Korean"].map(t => (
              <span key={t} style={{ fontSize: 11, color: C.fawn, padding: "6px 16px", border: "1px solid rgba(156,175,136,0.2)", borderRadius: 50, fontWeight: 300, display: "inline-block", margin: 4 }}>{t}</span>
            ))}
          </div>
          <p style={{ fontSize: 14, color: C.sage, fontWeight: 300, lineHeight: 1.7 }}>Available in multiple major languages as the platform grows.</p>
        </div>
      </section>

      <section style={{ padding: "60px clamp(20px,5vw,60px)", background: C.bone, textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 400, color: C.green, lineHeight: 1.5, fontStyle: "italic" }}>"She built the career. She earned the title. Now it's time to build the body and mind that can sustain it all."</p>
        </div>
      </section>

      <section style={{ padding: "80px clamp(20px,5vw,60px)", background: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 40 }}>
          <div>
            <p className="tracked" style={{ fontSize: 10, color: C.green, marginBottom: 16, letterSpacing: "0.3em", fontWeight: 500 }}>For Women</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 400, color: C.dark, marginBottom: 10 }}>Stay in the Know</h3>
            <p style={{ fontSize: 13, color: C.sage, fontWeight: 300, marginBottom: 28, lineHeight: 1.7 }}>Be the first to know when Global Flow Wellness launches. Leave your details and we'll reach out when we're ready for you.</p>
            <form action="https://formspree.io/f/xkokrjzv" method="POST">
              <input type="hidden" name="_subject" value="New Wellness Client Interest" />
              <input required name="name" placeholder="Full Name" style={inputStyle} />
              <input required type="email" name="email" placeholder="Email Address" style={inputStyle} />
              <input name="role" placeholder="Your Role (optional)" style={inputStyle} />
              <select name="interest" style={selectStyle}>
                <option value="">What interests you most?</option>
                <option>Nutrition & Gut Health</option>
                <option>Hormone Health</option>
                <option>Integrative Psychology</option>
                <option>Somatic Therapy</option>
                <option>Mindfulness & Yoga</option>
                <option>All of the Above</option>
              </select>
              <textarea name="message" placeholder="Anything you'd like us to know... (optional)" style={{ ...inputStyle, resize: "vertical" as const, minHeight: 100 }} />
              <button type="submit" className="tracked" style={{ width: "100%", padding: 16, background: C.dark, color: "#FFFFFF", border: "none", borderRadius: 50, fontSize: 11, fontWeight: 500, letterSpacing: "0.35em", cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Notify Me</button>
            </form>
          </div>
          <div>
            <p className="tracked" style={{ fontSize: 10, color: C.teak, marginBottom: 16, letterSpacing: "0.3em", fontWeight: 500 }}>For Practitioners</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 400, color: C.dark, marginBottom: 10 }}>Partner With Us</h3>
            <p style={{ fontSize: 13, color: C.sage, fontWeight: 300, marginBottom: 28, lineHeight: 1.7 }}>Are you a holistic health practitioner who works with women in leadership? We're building a global network and would love to hear from you.</p>
            <form action="https://formspree.io/f/xkokrjzv" method="POST">
              <input type="hidden" name="_subject" value="New Wellness Practitioner Application" />
              <input required name="name" placeholder="Full Name" style={inputStyle} />
              <input required type="email" name="email" placeholder="Email Address" style={inputStyle} />
              <input name="practice" placeholder="Your Practice / Specialty" style={inputStyle} />
              <input name="location" placeholder="Where are you based?" style={inputStyle} />
              <select name="specialty" style={selectStyle}>
                <option value="">Your area of expertise</option>
                <option>Ayurvedic Medicine</option>
                <option>Nutrition & Gut Health</option>
                <option>Hormone Health</option>
                <option>Menopause & Lifespan Wellness</option>
                <option>Somatic / Body-Based Therapy</option>
                <option>Integrative Psychology</option>
                <option>Mindfulness & Yoga</option>
                <option>Traditional / Cultural Healing</option>
                <option>Other</option>
              </select>
              <textarea name="message" placeholder="Tell us about your practice, your approach, and why you'd be a good fit for this platform..." style={{ ...inputStyle, resize: "vertical" as const, minHeight: 100 }} />
              <button type="submit" className="tracked" style={{ width: "100%", padding: 16, background: C.teak, color: "#FFFFFF", border: "none", borderRadius: 50, fontSize: 11, fontWeight: 500, letterSpacing: "0.35em", cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Apply to Partner</button>
            </form>
          </div>
        </div>
        <p style={{ fontSize: 12, color: C.sage, marginTop: 28, textAlign: "center" }}>All inquiries are confidential. You'll hear from Sarah within 48 hours.</p>
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
