"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const C = {
  bg: "#FEFCF9", bone: "#F2EAD7", sand: "#E7B88D", teak: "#B08968",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F",
  border: "rgba(176,137,104,0.12)", borderLight: "rgba(176,137,104,0.15)",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just redirect to community
    // Real auth will be added when we build the database
    router.push("/community");
  };

  const inputStyle = { width: "100%", padding: "16px 20px", marginBottom: 14, background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" };

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.dark, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px clamp(20px,5vw,60px)" }}>
      <style>{`
        *{box-sizing:border-box}
        a{text-decoration:none;color:inherit}
        .btn:hover{opacity:.88;transform:translateY(-1px)}
        .tracked{letter-spacing:0.35em;text-transform:uppercase}
      `}</style>

      <Link href="/" className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak, marginBottom: 80 }}>The Global Flow</Link>

      <div style={{ width: 60, height: 60, borderRadius: "50%", border: `1px solid ${C.borderLight}`, margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.teak} strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>

      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.15, color: C.dark, margin: "0 0 12px", textAlign: "center" }}>Welcome Back</h1>
      <p style={{ fontSize: 14, color: C.sage, marginBottom: 40, fontWeight: 300 }}>Log in to access your community and modules.</p>

      <form onSubmit={handleLogin} style={{ maxWidth: 400, width: "100%" }}>
        <input required type="email" placeholder="Email Address" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} style={inputStyle} />
        <input required type="password" placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} style={inputStyle} />
        <button type="submit" className="btn tracked" style={{ width: "100%", background: C.fawn, color: C.bg, border: "none", padding: 16, fontSize: 13, fontWeight: 600, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", marginTop: 10 }}>Log In</button>
      </form>

      <div style={{ marginTop: 28, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: C.sage, marginBottom: 8 }}>
          <a href="#" style={{ color: C.teak, fontWeight: 500 }}>Forgot your password?</a>
        </p>
        <p style={{ fontSize: 13, color: C.sage }}>
          Don't have an account? <a href="/community" style={{ color: C.teak, fontWeight: 500 }}>Join free</a>
        </p>
      </div>
    </div>
  );
}
