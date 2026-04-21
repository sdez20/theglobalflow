"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../supabase";

const C = {
  bg: "#FEFCF9", bone: "#F2EAD7", teak: "#B08968",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F",
  border: "rgba(176,137,104,0.12)", borderLight: "rgba(176,137,104,0.15)",
};

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    async function checkToken() {
      if (!token) { setLoading(false); return; }
      const { data } = await supabase.from("reset_tokens").select("*").eq("token", token).eq("used", false).limit(1);
      if (data && data.length > 0) {
        const created = new Date(data[0].created_at);
        const now = new Date();
        const hoursDiff = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
        if (hoursDiff < 24) {
          setValid(true);
          setMemberId(data[0].member_id);
        }
      }
      setLoading(false);
    }
    checkToken();
  }, [token]);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    await supabase.from("members").update({ password_hash: newPassword }).eq("id", memberId);
    await supabase.from("reset_tokens").update({ used: true }).eq("token", token);
    setSuccess(true);
    setTimeout(() => router.push("/login"), 3000);
  }

  const inputStyle: any = { width: "100%", padding: "16px 20px", marginBottom: 14, background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" };

  if (loading) return <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: C.sage }}>Loading...</div>;

  if (!token || !valid) return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: C.dark, marginBottom: 12 }}>This reset link is invalid or has expired.</p>
      <p style={{ fontSize: 14, color: C.sage, marginBottom: 28, fontWeight: 300 }}>Please request a new password reset.</p>
      <Link href="/login" style={{ fontSize: 14, color: C.teak, fontWeight: 500, textDecoration: "none" }}>Back to Login</Link>
    </div>
  );

  if (success) return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg, ${C.bone}, ${C.teak})`, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: C.bg }}>✓</div>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: C.dark, marginBottom: 12 }}>Password updated.</p>
      <p style={{ fontSize: 14, color: C.sage, fontWeight: 300 }}>Redirecting you to login...</p>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.dark, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px clamp(20px,5vw,60px)" }}>
      <Link href="/" className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak, marginBottom: 60, textDecoration: "none", letterSpacing: "0.35em", textTransform: "uppercase" as const }}>The Global Flow</Link>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Set Your New Password</h2>
      <p style={{ fontSize: 14, color: C.sage, marginBottom: 32, fontWeight: 300 }}>Enter a new password below.</p>
      <form onSubmit={handleReset} style={{ maxWidth: 400, width: "100%" }}>
        {error && <p style={{ color: "#c44", fontSize: 13, textAlign: "center", marginBottom: 14 }}>{error}</p>}
        <input required type="password" placeholder="New Password" value={newPassword} onChange={(e: any) => setNewPassword(e.target.value)} style={inputStyle} />
        <input required type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} style={inputStyle} />
        <button type="submit" style={{ width: "100%", padding: 16, background: C.fawn, color: C.bg, border: "none", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", marginTop: 10 }}>Update Password</button>
        <p style={{ fontSize: 12, color: C.sage, textAlign: "center", marginTop: 14 }}>After updating, you'll be redirected to log in.</p>
      </form>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div style={{ fontFamily: "'Montserrat',sans-serif", background: "#FEFCF9", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#88856A" }}>Loading...</div>}>
      <ResetForm />
    </Suspense>
  );
}
