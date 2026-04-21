"use client";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const C = {
  bg: "#FEFCF9", bone: "#F2EAD7", sand: "#E7B88D", teak: "#B08968",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F", charcoal: "#474747",
  border: "rgba(176,137,104,0.12)", borderLight: "rgba(176,137,104,0.15)",
};

const ADMIN_EMAIL = "sarahdez2525@gmail.com";
const ADMIN_PASS = "Howeverdoyouwantit12!";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("members");
  const [members, setMembers] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [searchEmail, setSearchEmail] = useState("");
  const [foundMember, setFoundMember] = useState<any>(null);
  const [newPw, setNewPw] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) { setAuthed(true); setError(""); }
    else setError("Invalid admin credentials.");
  }

  useEffect(() => { if (authed) { loadMembers(); loadQuestions(); } }, [authed, tab]);

  async function loadMembers() {
    const { data } = await supabase.from("members").select("*").order("created_at", { ascending: false });
    if (data) setMembers(data);
  }

  async function loadQuestions() {
    const { data } = await supabase.from("ask_sarah").select("*, members(first_name, last_name, email, title)").order("created_at", { ascending: false });
    if (data) setQuestions(data);
  }

  async function changeTier(id: string, tier: string) {
    await supabase.from("members").update({ tier }).eq("id", id);
    loadMembers();
  }

  async function replySarah(questionId: string) {
    const reply = replyText[questionId];
    if (!reply?.trim()) return;
    await supabase.from("ask_sarah").update({ sarah_reply: reply }).eq("id", questionId);
    setReplyText({ ...replyText, [questionId]: "" });
    loadQuestions();
  }

  async function searchMember() {
    if (!searchEmail.trim()) return;
    const { data } = await supabase.from("members").select("*").eq("email", searchEmail.trim()).limit(1);
    if (data && data.length > 0) { setFoundMember(data[0]); setResetMsg(""); }
    else { setFoundMember(null); setResetMsg("No member found with that email."); }
  }

  async function manualReset() {
    if (!newPw.trim() || !foundMember) return;
    await supabase.from("members").update({ password_hash: newPw }).eq("id", foundMember.id);
    setResetMsg("Password updated.");
    setNewPw("");
  }

  async function sendResetLink() {
    if (!foundMember) return;
    const token = crypto.randomUUID();
    await supabase.from("reset_tokens").insert({ member_id: foundMember.id, token });
    const link = `https://theglobalflow.co/reset-password?token=${token}`;
    await fetch("https://formspree.io/f/xkokrjzv", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email: foundMember.email, _subject: "Reset Your Password — The Global Flow", message: `Hi ${foundMember.first_name}! Here is your password reset link: ${link}\n\nThis link will expire after one use. If you didn't request this, please ignore this email.` }),
    });
    setResetMsg(`Reset link sent to ${foundMember.email}`);
  }

  function timeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  const inputStyle: any = { width: "100%", padding: "16px 20px", marginBottom: 14, background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" };

  if (!authed) return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.dark, background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}.tracked{letter-spacing:0.35em;text-transform:uppercase}`}</style>
      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", height: 68 }}>
          <span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>The Global Flow · Admin</span>
        </div>
      </nav>
      <section style={{ padding: "100px clamp(20px,5vw,60px)", textAlign: "center" }}>
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg, ${C.sand}, ${C.teak})`, margin: "0 auto 28px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🔐</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Admin Access</h1>
          <p style={{ fontSize: 14, color: C.sage, marginBottom: 40, fontWeight: 300 }}>Enter your admin credentials to continue.</p>
          <form onSubmit={handleLogin}>
            {error && <p style={{ color: "#c44", fontSize: 13, marginBottom: 14 }}>{error}</p>}
            <input required placeholder="Admin Email" value={email} onChange={(e: any) => setEmail(e.target.value)} style={inputStyle} />
            <input required type="password" placeholder="Admin Password" value={password} onChange={(e: any) => setPassword(e.target.value)} style={inputStyle} />
            <button type="submit" style={{ width: "100%", padding: 16, background: C.fawn, color: C.bg, border: "none", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Log In to Admin</button>
          </form>
        </div>
      </section>
    </div>
  );

  const paidCount = members.filter(m => m.tier !== "free").length;
  const oneOnOneCount = members.filter(m => m.tier === "one-on-one").length;
  const pendingCount = questions.filter(q => !q.sarah_reply).length;

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.charcoal, background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}.tracked{letter-spacing:0.35em;text-transform:uppercase}.tab{padding:14px 28px;font-size:12px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;border:none;background:none;color:#88856A;font-family:'Montserrat',sans-serif;border-bottom:2px solid transparent;transition:all 0.3s}.tab.active{color:#3A2E1F;border-bottom-color:#B08968}.tab:hover{color:#3A2E1F}table{width:100%;border-collapse:collapse}th{font-size:10px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#88856A;text-align:left;padding:12px 16px;border-bottom:1px solid rgba(176,137,104,0.15)}td{font-size:13px;color:#3A2E1F;padding:14px 16px;border-bottom:1px solid rgba(176,137,104,0.08);font-weight:300}`}</style>

      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>The Global Flow · Admin</span>
          <button onClick={() => setAuthed(false)} style={{ background: "none", border: "none", fontSize: 11, color: C.sage, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Log out</button>
        </div>
      </nav>

      <section style={{ padding: "32px clamp(20px,5vw,60px)", background: C.bone }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 32, flexWrap: "wrap" }}>
          {[["Total Members", members.length, C.dark], ["Free", members.filter(m => m.tier === "free").length, C.dark], ["Paid", paidCount, C.teak], ["1 on 1", oneOnOneCount, C.sand], ["Pending Questions", pendingCount, C.fawn]].map(([label, count, color], i) => (
            <div key={i} style={{ flex: 1, minWidth: 140, textAlign: "center" }}>
              <p style={{ fontSize: 32, fontWeight: 600, color: color as string }}>{count as number}</p>
              <p style={{ fontSize: 11, color: C.sage, fontWeight: 300 }}>{label as string}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 8 }}>
          {["members", "sarah", "reset"].map(t => (
            <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t === "members" ? "Members" : t === "sarah" ? "Ask Sarah" : "Reset Password"}
            </button>
          ))}
        </div>
      </div>

      {/* MEMBERS TAB */}
      {tab === "members" && (
        <section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", overflowX: "auto" }}>
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Title</th><th>Tier</th><th>Joined</th></tr></thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 500 }}>{m.first_name} {m.last_name?.charAt(0)}.</td>
                    <td>{m.email}</td>
                    <td>{m.title || ""}</td>
                    <td>
                      <select value={m.tier} onChange={(e: any) => changeTier(m.id, e.target.value)} style={{ padding: "6px 12px", fontSize: 12, border: `1px solid ${C.borderLight}`, borderRadius: 6, background: C.bone, color: C.dark, fontFamily: "'Montserrat',sans-serif", outline: "none" }}>
                        {["free","live-6-week","self-guided-monthly","self-guided-full","one-on-one"].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </td>
                    <td>{new Date(m.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {members.length === 0 && <p style={{ textAlign: "center", color: C.sage, padding: "40px 0" }}>No members yet.</p>}
          </div>
        </section>
      )}

      {/* ASK SARAH TAB */}
      {tab === "sarah" && (
        <section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {questions.length === 0 && <p style={{ textAlign: "center", color: C.sage, padding: "40px 0" }}>No questions yet.</p>}
            {questions.map(q => (
              <div key={q.id} style={{ padding: "20px 0", borderBottom: `1px solid rgba(176,137,104,0.1)` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{q.members?.first_name} {q.members?.last_name?.charAt(0)}.</span>
                    <span style={{ fontSize: 11, color: C.sage, marginLeft: 8 }}>{q.members?.email}</span>
                    <span style={{ fontSize: 11, color: C.teak, marginLeft: 8 }}>{timeAgo(q.created_at)}</span>
                  </div>
                  <span className="tracked" style={{ fontSize: 9, fontWeight: 600, padding: "4px 12px", borderRadius: 50, background: q.sarah_reply ? "rgba(176,137,104,0.1)" : "rgba(231,184,141,0.15)", color: q.sarah_reply ? C.teak : C.sand }}>{q.sarah_reply ? "Answered" : "Awaiting Reply"}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: C.fawn, fontWeight: 300, marginBottom: 12 }}>{q.question}</p>
                {q.sarah_reply ? (
                  <div style={{ padding: "14px 18px", background: C.bone, borderRadius: 10, borderLeft: `3px solid ${C.teak}` }}>
                    <p style={{ fontSize: 13, color: C.fawn, lineHeight: 1.7, fontWeight: 300 }}>{q.sarah_reply}</p>
                  </div>
                ) : (
                  <>
                    <textarea value={replyText[q.id] || ""} onChange={(e: any) => setReplyText({ ...replyText, [q.id]: e.target.value })} placeholder="Type your reply..." style={{ width: "100%", padding: "12px 16px", minHeight: 80, background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif", resize: "vertical" }} />
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                      <button onClick={() => replySarah(q.id)} style={{ padding: "10px 24px", background: C.fawn, color: C.bg, border: "none", borderRadius: 50, fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" as const, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Send Reply</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RESET PASSWORD TAB */}
      {tab === "reset" && (
        <section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}>
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <p style={{ fontSize: 14, color: C.fawn, fontWeight: 300, marginBottom: 24, lineHeight: 1.7 }}>Search for a member by email, then reset their password manually or send them a self service reset link.</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <input value={searchEmail} onChange={(e: any) => setSearchEmail(e.target.value)} placeholder="Search member by email..." style={{ flex: 1, padding: "14px 16px", background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" }} />
              <button onClick={searchMember} style={{ padding: "14px 20px", background: C.fawn, color: C.bg, border: "none", borderRadius: 8, fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Search</button>
            </div>

            {resetMsg && <p style={{ fontSize: 13, color: C.teak, marginBottom: 16 }}>{resetMsg}</p>}

            {foundMember && (
              <div style={{ border: `1px solid ${C.borderLight}`, borderRadius: 12, padding: 24, background: C.bg }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 4 }}>{foundMember.first_name} {foundMember.last_name}</p>
                <p style={{ fontSize: 12, color: C.sage, marginBottom: 16 }}>{foundMember.email} · {foundMember.tier}</p>

                <p style={{ fontSize: 12, fontWeight: 500, color: C.fawn, marginBottom: 8 }}>Option 1: Set new password manually</p>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  <input value={newPw} onChange={(e: any) => setNewPw(e.target.value)} placeholder="New password" style={{ flex: 1, padding: "12px 16px", background: C.bone, border: `1px solid ${C.borderLight}`, borderRadius: 8, fontSize: 13, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" }} />
                  <button onClick={manualReset} style={{ padding: "12px 20px", background: C.fawn, color: C.bg, border: "none", borderRadius: 8, fontSize: 10, fontWeight: 500, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Update</button>
                </div>

                <p style={{ fontSize: 12, fontWeight: 500, color: C.fawn, marginBottom: 8 }}>Option 2: Send self service reset link</p>
                <button onClick={sendResetLink} style={{ padding: "12px 20px", background: "rgba(176,137,104,0.1)", color: C.fawn, border: "none", borderRadius: 8, fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Send Reset Link to {foundMember.email}</button>
                <p style={{ fontSize: 12, color: C.teak, marginTop: 12, fontStyle: "italic" }}>Member will receive an email with a one time reset link.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <footer style={{ padding: "36px clamp(20px,5vw,60px)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 500, color: C.teak }}>The Global Flow</span>
          <p style={{ fontSize: 11, color: C.sage }}>© 2026 The Global Flow™</p>
        </div>
      </footer>
    </div>
  );
}
