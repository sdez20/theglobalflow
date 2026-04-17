"use client";
import Link from "next/link";

const C = {
  bg: "#FEFCF9",
  bone: "#F2EAD7",
  sand: "#E7B88D",
  teak: "#B08968",
  fawn: "#6A4F2E",
  sage: "#88856A",
  dark: "#3A2E1F",
};

export default function ThankYou() {
  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.dark, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px clamp(20px,5vw,60px)", textAlign: "center" }}>
      <style>{`
        *{box-sizing:border-box}
        a{text-decoration:none;color:inherit}
        .tracked{letter-spacing:0.35em;text-transform:uppercase}
        .btn:hover{opacity:.88;transform:translateY(-1px)}
      `}</style>

      <Link href="/" className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak, marginBottom: 80 }}>The Global Flow</Link>

      <div style={{ width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${C.sand}, ${C.teak})`, margin: "0 auto 36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 36, color: C.bg }}>✓</span>
      </div>

      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: C.dark, margin: "0 0 24px" }}>
        You're in. Welcome.
      </h1>

      <p style={{ fontSize: 16, lineHeight: 1.8, color: C.fawn, maxWidth: 460, margin: "0 auto 16px", fontWeight: 300 }}>
        We will review your info and be in touch.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.8, color: C.fawn, maxWidth: 460, margin: "0 auto 44px", fontWeight: 300 }}>
        Keep an eye on your inbox.
      </p>

      <Link href="/" className="btn tracked" style={{ display: "inline-block", background: C.fawn, color: C.bg, padding: "16px 36px", borderRadius: 50, fontSize: 11, fontWeight: 500, transition: "all .3s", fontFamily: "'Montserrat',sans-serif" }}>Back to Home</Link>
    </div>
  );
}
