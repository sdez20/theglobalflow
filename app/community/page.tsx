"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../supabase";

const C = {
  bg: "#FEFCF9", bone: "#F2EAD7", sand: "#E7B88D", teak: "#B08968",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F", charcoal: "#474747",
  border: "rgba(176,137,104,0.12)", borderLight: "rgba(176,137,104,0.15)",
};

const avColors = ["#88856A", "#E7B88D", "#B08968"];
const getAvColor = (i) => avColors[i % avColors.length];

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  const days = Math.floor(hrs / 24);
  return days + "d ago";
}

function Linkify({ text }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part)
      ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: C.teak, fontWeight: 500, wordBreak: "break-all" }}>{part}</a>
      : <span key={i}>{part}</span>
  );
}

export default function Community() {
  const [view, setView] = useState("signup");
  const [tab, setTab] = useState("chat");
  const [dropdown, setDropdown] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", linkedin: "", title: "" });
  const [member, setMember] = useState(null);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [networkPosts, setNetworkPosts] = useState([]);
  const [newNetworkPost, setNewNetworkPost] = useState("");
  const [newNetworkTitle, setNewNetworkTitle] = useState("");
  const [newNetworkType, setNewNetworkType] = useState("Job");
  const [networkFilter, setNetworkFilter] = useState("All");
  const [sarahQuestions, setSarahQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [replies, setReplies] = useState({});
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tgf_member") : null;
    if (saved) { const m = JSON.parse(saved); setMember(m); setForm({ firstName: m.first_name, lastName: m.last_name, email: m.email, password: "", linkedin: m.linkedin || "", title: m.title || "" }); setView("hub"); }
  }, []);

  useEffect(() => { if (view === "hub") { loadMessages(); loadNetworkPosts(); loadSarahQuestions(); } }, [view, tab]);

  async function loadMessages() {
    const { data } = await supabase.from("messages").select("*, members(first_name, last_name, title)").order("created_at", { ascending: false }).limit(20);
    if (data) { setMessages(data); data.forEach(m => loadReplies("message", m.id)); }
  }
  async function loadNetworkPosts() {
    const { data } = await supabase.from("network_posts").select("*, members(first_name, last_name, title)").order("created_at", { ascending: false }).limit(20);
    if (data) { setNetworkPosts(data); data.forEach(p => loadReplies("network", p.id)); }
  }
  async function loadSarahQuestions() {
    const { data } = await supabase.from("ask_sarah").select("*, members(first_name, last_name, title)").order("created_at", { ascending: false }).limit(20);
    if (data) { setSarahQuestions(data); data.forEach(q => loadReplies("sarah", q.id)); }
  }
  async function loadReplies(parentType, parentId) {
    const { data } = await supabase.from("replies").select("*, members(first_name, last_name, title)").eq("parent_type", parentType).eq("parent_id", parentId).order("created_at", { ascending: true });
    if (data) setReplies(prev => ({ ...prev, [parentType + "-" + parentId]: data }));
  }

  async function handleSignup(e) {
    e.preventDefault(); setError("");
    const { data: existing } = await supabase.from("members").select("id").eq("email", form.email).limit(1);
    if (existing && existing.length > 0) { setError("This email is already registered. Try logging in."); return; }
    const { data, error: err } = await supabase.from("members").insert({ email: form.email, first_name: form.firstName, last_name: form.lastName, password_hash: form.password, linkedin: form.linkedin, title: form.title, tier: "free" }).select().single();
    if (err) { setError("Something went wrong. Please try again."); return; }
    setMember(data); localStorage.setItem("tgf_member", JSON.stringify(data)); setView("hub");
    fetch("https://formspree.io/f/xkokrjzv", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ name: form.firstName + " " + form.lastName, email: form.email, title: form.title, linkedin: form.linkedin, _subject: "New Community Member Signup!" }) }).catch(() => {});
  }

  async function postMessage() { if (!newMessage.trim() || !member) return; await supabase.from("messages").insert({ member_id: member.id, content: newMessage }); setNewMessage(""); loadMessages(); }
  async function postNetworkItem() { if (!newNetworkTitle.trim() || !newNetworkPost.trim() || !member) return; await supabase.from("network_posts").insert({ member_id: member.id, title: newNetworkTitle, content: newNetworkPost, post_type: newNetworkType, location: "" }); setNewNetworkTitle(""); setNewNetworkPost(""); loadNetworkPosts(); }
  async function askSarah() {
    if (!newQuestion.trim() || !member) return;
    await supabase.from("ask_sarah").insert({ member_id: member.id, question: newQuestion });
    setNewQuestion(""); loadSarahQuestions();
    fetch("https://formspree.io/f/xkokrjzv", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ name: member.first_name + " " + member.last_name, email: member.email, message: newQuestion, _subject: "New Ask Sarah Question!" }) }).catch(() => {});
  }
  async function postReply(parentType, parentId) { if (!replyText.trim() || !member) return; await supabase.from("replies").insert({ member_id: member.id, parent_type: parentType, parent_id: parentId, content: replyText }); setReplyText(""); setReplyOpen(null); loadReplies(parentType, parentId); }
  async function likeMessage(id, current) { await supabase.from("messages").update({ likes: (current || 0) + 1 }).eq("id", id); loadMessages(); }
  async function likeNetwork(id, current) { await supabase.from("network_posts").update({ likes: (current || 0) + 1 }).eq("id", id); loadNetworkPosts(); }
  async function likeSarah(id, current) { await supabase.from("ask_sarah").update({ likes: (current || 0) + 1 }).eq("id", id); loadSarahQuestions(); }
  function logout() { localStorage.removeItem("tgf_member"); setMember(null); setView("signup"); setForm({ firstName: "", lastName: "", email: "", password: "", linkedin: "", title: "" }); }
  function toggleReply(key) { if (replyOpen === key) { setReplyOpen(null); setReplyText(""); } else { setReplyOpen(key); setReplyText(""); } }

  function RepliesBlock({ parentType, parentId }) {
    const key = parentType + "-" + parentId;
    const reps = replies[key] || [];
    return (<>
      {reps.map((r, ri) => (
        <div key={r.id} style={{ marginLeft: 56, padding: "12px 0", borderTop: "1px solid rgba(176,137,104,0.06)", display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div className="av" style={{ background: getAvColor(ri + 3), color: getAvColor(ri + 3) === "#E7B88D" ? C.fawn : C.bg, width: 28, height: 28, fontSize: 10 }}>{(r.members?.first_name?.[0] || "").toUpperCase()}{(r.members?.last_name?.[0] || "").toUpperCase()}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{r.members?.first_name} {r.members?.last_name?.charAt(0)}.</span>
              <span style={{ fontSize: 10, color: C.teak }}>{timeAgo(r.created_at)}</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}><Linkify text={r.content} /></p>
          </div>
        </div>
      ))}
      {replyOpen === key && (
        <div style={{ marginLeft: 56, marginTop: 10, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." style={{ flex: 1, padding: "10px 14px", minHeight: 50, background: C.bone, border: "1px solid " + C.borderLight, borderRadius: 8, fontSize: 13, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif", resize: "none" }} />
          <button onClick={() => postReply(parentType, parentId)} style={{ padding: "10px 16px", background: C.fawn, color: C.bg, border: "none", borderRadius: 8, fontSize: 10, fontWeight: 500, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", alignSelf: "flex-end" }}>Reply</button>
        </div>
      )}
    </>);
  }

  const inputStyle = { width: "100%", padding: "16px 20px", marginBottom: 14, background: C.bone, border: "1px solid " + C.borderLight, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" };
  const initials = member ? ((member.first_name?.[0] || "") + (member.last_name?.[0] || "")).toUpperCase() : "ME";

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.charcoal, background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}a{text-decoration:none;color:inherit}.btn:hover{opacity:.88;transform:translateY(-1px)}.tracked{letter-spacing:0.35em;text-transform:uppercase}.tab{padding:14px 28px;font-size:12px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;border:none;background:none;color:#88856A;font-family:'Montserrat',sans-serif;border-bottom:2px solid transparent;transition:all 0.3s}.tab.active{color:#3A2E1F;border-bottom-color:#B08968}.tab:hover{color:#3A2E1F}.msg{padding:20px 0;border-bottom:1px solid rgba(176,137,104,0.1);display:flex;gap:16px;align-items:flex-start}.av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;flex-shrink:0}.post-card{background:#FEFCF9;border:1px solid rgba(176,137,104,0.15);border-radius:12px;padding:24px;transition:transform 0.3s;margin-bottom:16px}.post-card:hover{transform:translateY(-2px)}`}</style>

      <nav style={{ borderBottom: "1px solid " + C.border, padding: "0 clamp(20px,5vw,60px)", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ position: "relative" }}>
            <span onClick={() => setDropdown(!dropdown)} className="tracked" style={{ cursor: "pointer", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>The Global Flow <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.5 }}>▾</span></span>
            {dropdown && (<div style={{ position: "absolute", top: 44, left: 0, background: C.bg, border: "1px solid " + C.borderLight, padding: "16px 28px", zIndex: 100, minWidth: 180 }}>{[["/ ","Home"],["/#about","About"],["/#get","For You"],["/community","Community"],["/#join","Join"],["/blog","Blog"],["/pricing","Pricing"]].map(([href,l],i) => (<Link key={i} href={href.trim()} className="tracked" style={{ display: "block", padding: "10px 0", fontSize: 11, fontWeight: 500, color: C.fawn, borderBottom: i < 6 ? "1px solid " + C.border : "none" }}>{l}</Link>))}</div>)}
          </div>
          {view === "signup" ? (
            <Link href="/" className="btn tracked" style={{ background: "transparent", color: C.fawn, border: "1px solid " + C.fawn, padding: "10px 24px", borderRadius: 50, fontSize: 10, fontWeight: 500, fontFamily: "'Montserrat',sans-serif" }}>Back to Home</Link>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="av" style={{ background: C.sand, color: C.fawn, width: 36, height: 36, fontSize: 13 }}>{initials}</div>
              <span style={{ fontSize: 13, color: C.fawn, fontWeight: 500 }}>{member?.first_name || "Member"}</span>
              <button onClick={logout} style={{ background: "none", border: "none", fontSize: 11, color: C.sage, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Log out</button>
            </div>
          )}
        </div>
      </nav>

      {view === "signup" && (<>
        <section style={{ padding: "100px clamp(20px,5vw,60px) 60px", textAlign: "center" }}>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.4em", fontWeight: 500 }}>Join the Community</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px, 5vw, 46px)", fontWeight: 400, lineHeight: 1.15, color: C.dark, margin: "0 0 20px" }}>Your space. Your people.</h1>
            <div style={{ width: 40, height: 1, background: C.teak, margin: "28px auto", opacity: 0.4 }} />
            <p style={{ fontSize: 15, lineHeight: 1.8, color: C.fawn, maxWidth: 420, margin: "0 auto", fontWeight: 300 }}>Connect with EAs around the globe, ask questions, share wins, and never feel alone in your role again. Free to join.</p>
          </div>
        </section>
        <section style={{ padding: "0 clamp(20px,5vw,60px) 100px" }}>
          <form onSubmit={handleSignup} style={{ maxWidth: 440, margin: "0 auto" }}>
            {error && <p style={{ color: "#c44", fontSize: 13, textAlign: "center", marginBottom: 14 }}>{error}</p>}
            <input required placeholder="First Name" value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} style={inputStyle} />
            <input required placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} style={inputStyle} />
            <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} style={inputStyle} />
            <input required type="password" placeholder="Create Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} style={inputStyle} />
            <input placeholder="LinkedIn Profile URL" value={form.linkedin} onChange={(e) => setForm({...form, linkedin: e.target.value})} style={inputStyle} />
            <input placeholder="Your Title (EA, CoS, PA, etc.)" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} style={inputStyle} />
            <button type="submit" className="btn tracked" style={{ width: "100%", background: C.fawn, color: C.bg, border: "none", padding: 16, fontSize: 13, fontWeight: 600, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", marginTop: 10 }}>Join Free</button>
            <p style={{ fontSize: 12, color: C.sage, textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>No spam and no sales calls. Just a warm welcome.</p>
            <p style={{ fontSize: 13, color: C.sage, textAlign: "center", marginTop: 20 }}>Already have an account? <Link href="/login" style={{ color: C.teak, fontWeight: 500 }}>Log in</Link></p>
          </form>
        </section>
      </>)}

      {view === "hub" && (<>
        <section style={{ padding: "48px clamp(20px,5vw,60px)", background: C.bone, textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, color: C.dark, marginBottom: 10 }}>Welcome to The Global Flow Community</h2>
            <p style={{ fontSize: 14, color: C.fawn, fontWeight: 300 }}>This is your space. Connect, share, ask, and grow with EAs around the globe.</p>
          </div>
        </section>
        <div style={{ borderBottom: "1px solid " + C.border, padding: "0 clamp(20px,5vw,60px)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 8 }}>
            <button className={"tab " + (tab === "chat" ? "active" : "")} onClick={() => setTab("chat")}>Community Chat</button>
            <button className={"tab " + (tab === "network" ? "active" : "")} onClick={() => setTab("network")}>Network</button>
            <button className={"tab " + (tab === "sarah" ? "active" : "")} onClick={() => setTab("sarah")}>Ask Sarah</button>
          </div>
        </div>

        {tab === "chat" && (<section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}><div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: C.bone, borderRadius: 12, padding: "20px 24px", marginBottom: 32 }}><div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><div className="av" style={{ background: C.sand, color: C.fawn }}>{initials}</div><div style={{ flex: 1 }}><textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Share something with the community... (paste links and they'll be clickable)" style={{ width: "100%", minHeight: 60, padding: "12px 16px", background: C.bg, border: "1px solid " + C.borderLight, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif", resize: "none" }} /><div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}><button onClick={postMessage} className="btn tracked" style={{ background: C.fawn, color: C.bg, border: "none", padding: "10px 24px", fontSize: 10, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Post</button></div></div></div></div>
          {messages.length === 0 && <p style={{ textAlign: "center", color: C.sage, fontSize: 14, padding: "40px 0" }}>No messages yet. Be the first to post!</p>}
          {messages.map((m, idx) => (<div key={m.id}><div className="msg"><div className="av" style={{ background: getAvColor(idx), color: getAvColor(idx) === "#E7B88D" ? C.fawn : C.bg }}>{(m.members?.first_name?.[0] || "").toUpperCase()}{(m.members?.last_name?.[0] || "").toUpperCase()}</div><div style={{ flex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}><span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{m.members?.first_name} {m.members?.last_name?.charAt(0)}.</span><span style={{ fontSize: 11, color: C.sage }}>{m.members?.title || ""}</span><span style={{ fontSize: 11, color: C.teak }}>{timeAgo(m.created_at)}</span></div><p style={{ fontSize: 14, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}><Linkify text={m.content} /></p><div style={{ display: "flex", gap: 16, marginTop: 10 }}><span onClick={() => likeMessage(m.id, m.likes)} style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>♡ {m.likes || 0}</span><span onClick={() => toggleReply("message-" + m.id)} style={{ fontSize: 12, color: replyOpen === "message-" + m.id ? C.teak : C.sage, cursor: "pointer", fontWeight: replyOpen === "message-" + m.id ? 600 : 400 }}>Reply {(replies["message-" + m.id] || []).length > 0 ? "(" + (replies["message-" + m.id] || []).length + ")" : ""}</span></div><RepliesBlock parentType="message" parentId={m.id} /></div></div></div>))}
        </div></section>)}

        {tab === "network" && (<section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}><div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: C.bone, borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}><div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><div className="av" style={{ background: C.sand, color: C.fawn }}>{initials}</div><div style={{ flex: 1 }}><input value={newNetworkTitle} onChange={(e) => setNewNetworkTitle(e.target.value)} placeholder="Title (e.g. EA to CEO — FinTech Startup, NYC)" style={{ width: "100%", padding: "10px 16px", marginBottom: 8, background: C.bg, border: "1px solid " + C.borderLight, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif" }} /><textarea value={newNetworkPost} onChange={(e) => setNewNetworkPost(e.target.value)} placeholder="Share details... paste any links and they'll be clickable" style={{ width: "100%", minHeight: 60, padding: "12px 16px", background: C.bg, border: "1px solid " + C.borderLight, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif", resize: "none" }} /><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}><div style={{ display: "flex", gap: 8 }}>{["Job", "Event", "Meetup"].map((t) => (<span key={t} onClick={() => setNewNetworkType(t)} style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 50, border: newNetworkType === t ? "1px solid " + C.fawn : "1px solid " + C.borderLight, background: newNetworkType === t ? C.fawn : "transparent", color: newNetworkType === t ? C.bg : C.sage, cursor: "pointer" }}>{t}</span>))}</div><button onClick={postNetworkItem} className="btn tracked" style={{ background: C.fawn, color: C.bg, border: "none", padding: "10px 24px", fontSize: 10, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Post</button></div></div></div></div>
          <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>{["All", "Job", "Event", "Meetup"].map((t) => (<span key={t} onClick={() => setNetworkFilter(t)} style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 50, background: networkFilter === t ? C.fawn : "transparent", color: networkFilter === t ? C.bg : C.sage, border: networkFilter === t ? "none" : "1px solid " + C.borderLight, cursor: "pointer" }}>{t === "All" ? "All" : t + "s"}</span>))}</div>
          {networkPosts.filter(p => networkFilter === "All" || p.post_type === networkFilter).length === 0 && <p style={{ textAlign: "center", color: C.sage, fontSize: 14, padding: "40px 0" }}>No posts yet. Share the first opportunity!</p>}
          {networkPosts.filter(p => networkFilter === "All" || p.post_type === networkFilter).map((p, idx) => (<div key={p.id} className="post-card"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}><div style={{ display: "flex", gap: 12, alignItems: "center" }}><div className="av" style={{ background: getAvColor(idx), color: getAvColor(idx) === "#E7B88D" ? C.fawn : C.bg }}>{(p.members?.first_name?.[0] || "").toUpperCase()}{(p.members?.last_name?.[0] || "").toUpperCase()}</div><div><span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{p.members?.first_name} {p.members?.last_name?.charAt(0)}.</span><p style={{ fontSize: 11, color: C.teak, marginTop: 2 }}>{timeAgo(p.created_at)}</p></div></div><span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 50, background: p.post_type === "Job" ? "rgba(176,137,104,0.15)" : p.post_type === "Event" ? "rgba(231,184,141,0.2)" : "rgba(136,133,106,0.15)", color: p.post_type === "Job" ? C.teak : p.post_type === "Event" ? "#C49A6C" : C.sage }}>{p.post_type}</span></div><h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 500, color: C.dark, marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3><p style={{ fontSize: 13, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}><Linkify text={p.content} /></p><div style={{ display: "flex", gap: 16, marginTop: 14 }}><span onClick={() => likeNetwork(p.id, p.likes)} style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>♡ {p.likes || 0}</span><span onClick={() => toggleReply("network-" + p.id)} style={{ fontSize: 12, color: replyOpen === "network-" + p.id ? C.teak : C.sage, cursor: "pointer", fontWeight: replyOpen === "network-" + p.id ? 600 : 400 }}>Reply {(replies["network-" + p.id] || []).length > 0 ? "(" + (replies["network-" + p.id] || []).length + ")" : ""}</span></div><RepliesBlock parentType="network" parentId={p.id} /></div>))}
        </div></section>)}

        {tab === "sarah" && (<section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}><div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: C.bone, borderRadius: 12, padding: 32, textAlign: "center", marginBottom: 32 }}><div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, " + C.sand + ", " + C.teak + ")", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: C.bg, fontWeight: 300 }}>S</span></div><h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: C.dark, marginBottom: 10, fontWeight: 400 }}>Ask Sarah Anything</h3><p style={{ fontSize: 14, color: C.fawn, fontWeight: 300, lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>Have a question about your role, your exec, your career, or your sanity? Ask it here. Sarah answers personally.</p></div>
          <div style={{ marginBottom: 32 }}><textarea value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="What's on your mind?" style={{ width: "100%", minHeight: 80, padding: "16px 20px", background: C.bone, border: "1px solid " + C.borderLight, borderRadius: 8, fontSize: 14, color: C.dark, outline: "none", fontFamily: "'Montserrat',sans-serif", resize: "none" }} /><div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}><button onClick={askSarah} className="btn tracked" style={{ background: C.fawn, color: C.bg, border: "none", padding: "10px 24px", fontSize: 10, borderRadius: 50, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Ask Sarah</button></div></div>
          {sarahQuestions.length === 0 && <p style={{ textAlign: "center", color: C.sage, fontSize: 14, padding: "40px 0" }}>No questions yet. Be the first to ask!</p>}
          {sarahQuestions.map((q, idx) => (<div key={q.id}><div className="msg"><div className="av" style={{ background: getAvColor(idx), color: getAvColor(idx) === "#E7B88D" ? C.fawn : C.bg }}>{(q.members?.first_name?.[0] || "").toUpperCase()}{(q.members?.last_name?.[0] || "").toUpperCase()}</div><div style={{ flex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}><span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{q.members?.first_name} {q.members?.last_name?.charAt(0)}.</span><span style={{ fontSize: 11, color: C.teak }}>{timeAgo(q.created_at)}</span></div><p style={{ fontSize: 14, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}><Linkify text={q.question} /></p>{q.sarah_reply && (<div style={{ marginTop: 16, padding: "16px 20px", background: C.bone, borderRadius: 10, borderLeft: "3px solid " + C.teak }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, " + C.sand + ", " + C.teak + ")", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, color: C.bg }}>S</span></div><span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>Sarah DeSouza</span></div><p style={{ fontSize: 14, lineHeight: 1.7, color: C.fawn, fontWeight: 300 }}><Linkify text={q.sarah_reply} /></p></div>)}<div style={{ display: "flex", gap: 16, marginTop: 10 }}><span onClick={() => likeSarah(q.id, q.likes)} style={{ fontSize: 12, color: C.sage, cursor: "pointer" }}>♡ {q.likes || 0}</span><span onClick={() => toggleReply("sarah-" + q.id)} style={{ fontSize: 12, color: replyOpen === "sarah-" + q.id ? C.teak : C.sage, cursor: "pointer", fontWeight: replyOpen === "sarah-" + q.id ? 600 : 400 }}>Reply {(replies["sarah-" + q.id] || []).length > 0 ? "(" + (replies["sarah-" + q.id] || []).length + ")" : ""}</span></div><RepliesBlock parentType="sarah" parentId={q.id} /></div></div></div>))}
        </div></section>)}

        <footer style={{ padding: "36px clamp(20px,5vw,60px)", borderTop: "1px solid " + C.border }}><div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}><span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 500, color: C.teak }}>The Global Flow</span><p style={{ fontSize: 11, color: C.sage }}>© 2026 The Global Flow™</p></div></footer>
      </>)}
    </div>
  );
}
