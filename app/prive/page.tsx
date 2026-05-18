"use client";
import Link from "next/link";

const C = {
  bg: "#FFFFFF", bone: "#F0F4F8", teak: "#B08968", blue: "#8FAABE",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F",
  border: "rgba(176,196,222,0.15)", borderLight: "rgba(176,196,222,0.3)",
};

export default function Prive() {
  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: "#474747", background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}a{text-decoration:none;color:inherit}.tracked{letter-spacing:0.35em;text-transform:uppercase}input,textarea{width:100%;padding:16px 20px;margin-bottom:14px;background:#F7F9FC;border:1px solid rgba(176,196,222,0.3);border-radius:8px;font-size:14px;color:#3A2E1F;outline:none;font-family:'Montserrat',sans-serif}textarea{resize:vertical;min-height:100px}`}</style>

      <nav style={{ borderBottom: "1px solid " + C.border, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link href="/" className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>The Global Flow</Link>
            <Link href="/prive" className="tracked" style={{ fontSize: 10, fontWeight: 500, color: C.blue }}>Privé</Link>
            <Link href="/wellness" className="tracked" style={{ fontSize: 10, fontWeight: 500, color: "#9CAF88" }}>Wellness</Link>
          </div>
          <Link href="/" style={{ fontSize: 12, color: C.fawn, fontWeight: 500 }}>Back to Home</Link>
        </div>
      </nav>

      <section style={{ padding: "120px clamp(20px,5vw,60px) 80px", textAlign: "center", background: "linear-gradient(180deg, #FFFFFF 0%, #F0F4F8 100%)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.blue, marginBottom: 24, letterSpacing: "0.5em", fontWeight: 500 }}>Curated Experiences</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(38px, 5.5vw, 56px)", fontWeight: 300, lineHeight: 1.1, color: C.dark, margin: "0 0 20px" }}>The Global Flow <em style={{ color: C.blue }}>Privé</em></h1>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, " + C.blue + ", transparent)", margin: "28px auto" }} />
          <p style={{ fontSize: 16, lineHeight: 1.9, color: C.fawn, maxWidth: 480, margin: "0 auto", fontWeight: 300 }}>Curated travel, residences, and experiences for principals and families who need precision, not just luxury.</p>
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "0 20px 60px" }}>
        <span className="tracked" style={{ display: "inline-block", fontSize: 10, color: C.blue, fontWeight: 500, padding: "8px 24px", border: "1px solid rgba(143,170,190,0.3)", borderRadius: 50, letterSpacing: "0.4em" }}>Coming Soon</span>
      </section>

      <section style={{ padding: "60px clamp(20px,5vw,60px)", background: C.bg }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.blue, marginBottom: 20, letterSpacing: "0.3em", fontWeight: 500 }}>The Philosophy</p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300, marginBottom: 20 }}>Across a decade of executive support, I've worked directly with global teams and clients from more than fifty cultures, lived in five very different places myself, and spent meaningful time in many more.</p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300, marginBottom: 20 }}>Moving through that many cultures teaches you that places are not interchangeable, and neither are the people in them. The same city can be the right answer for one principal and the wrong one for another, depending on the calendar they keep, the company they want to be around, the staff they bring with them, and the version of themselves they need that trip to protect.</p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: C.fawn, fontWeight: 300, marginBottom: 20 }}>When I curate for Privé clients, I'm reading all of that at once. I know which destinations honor a principal's religious or cultural calendar without them having to ask, which residences match how they prefer to host (or not host at all), which cities welcome multi-generational travel and which are quietly built for solo decompression, and which staff cultures will read a family correctly on arrival.</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: C.blue, fontStyle: "italic", lineHeight: 1.6, margin: "32px 0" }}>Curation at this level isn't only about luxury. It's about precision, and precision comes from a decade of paying attention to the details that matter.</p>
        </div>
      </section>

      <section style={{ padding: "60px clamp(20px,5vw,60px)", background: "#F7F9FC" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.blue, marginBottom: 28, letterSpacing: "0.3em", fontWeight: 500 }}>What Privé Covers</p>
          {[
            { t: "Destination Curation", d: "Matched to the principal's cultural calendar, hosting style, and travel rhythm. Not a list. A recommendation with context." },
            { t: "Residence Selection", d: "Private homes, estates, and hotel residences vetted for discretion, accessibility, and how they match the way a family or individual occupies space." },
            { t: "Staff & Service Alignment", d: "Local staff briefed on cultural preferences, dietary needs, and communication styles before arrival. No surprises. No explanations needed." },
            { t: "Multi-Generational Travel", d: "From grandparents to grandchildren, curated to keep everyone comfortable without anyone compromising. Separate spaces, shared moments." },
            { t: "Recovery & Decompression", d: "Solo retreats designed for executives who need to disappear, recover, and return sharper. No itinerary. Just space." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "20px 0", borderBottom: i < 4 ? "1px solid rgba(176,196,222,0.2)" : "none" }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: C.dark, marginBottom: 6 }}>{item.t}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: C.sage, fontWeight: 300 }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px clamp(20px,5vw,60px)", background: C.bg }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.blue, marginBottom: 20, letterSpacing: "0.4em", fontWeight: 500 }}>Request Access</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Interested in Privé?</h2>
          <p style={{ fontSize: 14, color: C.sage, fontWeight: 300, marginBottom: 36, lineHeight: 1.7 }}>Leave your details and a brief note about what you're looking for. I'll personally review every request.</p>
          <form action="https://formspree.io/f/xkokrjzv" method="POST" style={{ textAlign: "left" }}>
            <input type="hidden" name="_subject" value="New Privé Inquiry" />
            <input required name="name" placeholder="Full Name" />
            <input required type="email" name="email" placeholder="Email Address" />
            <input name="phone" placeholder="Phone Number (optional)" />
            <input name="company" placeholder="Company or Family Office (optional)" />
            <textarea required name="message" placeholder="Tell me what you're looking for... (destination, dates, who's traveling, preferences)" />
            <button type="submit" className="tracked" style={{ width: "100%", padding: 16, background: C.dark, color: "#FFFFFF", border: "none", borderRadius: 50, fontSize: 11, fontWeight: 500, letterSpacing: "0.35em", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", marginTop: 10 }}>Submit Request</button>
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
