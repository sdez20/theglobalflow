"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../supabase";

const C = {
  bg: "#FEFCF9", bone: "#F2EAD7", sand: "#E7B88D", teak: "#B08968",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F", charcoal: "#474747",
  border: "rgba(176,137,104,0.12)", borderLight: "rgba(176,137,104,0.15)",
};

const allModules = [
  { num: "01", name: "Before the Title", desc: "Identity work that reconnects you to your core.", phase: 1 },
  { num: "02", name: "The Crime Scene", desc: "Audit the calendar. Calculate the cost.", phase: 1 },
  { num: "03", name: "Know the Room", desc: "Stakeholder intelligence.", phase: 1 },
  { num: "04", name: "Before It Blows Up", desc: "Crisis prevention. The 5 Signal Dashboard.", phase: 1 },
  { num: "05", name: "The Vow", desc: "The Partnership Covenant.", phase: 1 },
  { num: "06", name: "Read Their Mind", desc: "The Shadow AI Playbook.", phase: 2 },
  { num: "07", name: "Follow the Money", desc: "Revenue Recognition.", phase: 2 },
  { num: "08", name: "Run the Business", desc: "Business acumen for EAs.", phase: 2 },
  { num: "09", name: "Play the Game", desc: "Office politics and strategic positioning.", phase: 2 },
  { num: "10", name: "Speak Their World", desc: "Culture Codes for 50+ countries.", phase: 2 },
  { num: "11", name: "Build the Machine", desc: "200+ automations installed.", phase: 3 },
  { num: "12", name: "Every Room, Every City", desc: "Travel, events, global logistics.", phase: 3 },
  { num: "13", name: "Nothing Stops", desc: "Absence and continuity planning.", phase: 3 },
  { num: "14", name: "The Architecture", desc: "Systems design and infrastructure.", phase: 3 },
  { num: "15", name: "The Legacy", desc: "Your career roadmap. The launchpad.", phase: 3 },
];

const liveModules = [0,1,2,5,9,8]; // Before the Title, Crime Scene, Know the Room, Read Their Mind, Speak Their World, Play the Game

const bonuses = [
  { name: "Own the Room, Run the World", desc: "The complete global operations playbook." },
  { name: "Generational Fluency", desc: "Same core. Different codes." },
  { name: "Relocation Support Module", desc: "Where logistics meets emotional intelligence." },
  { name: "Absence Operations Protocol", desc: "8 automations for seamless coverage." },
];

const dripSchedule: Record<number, number[]> = {
  1: [0, 1],
  2: [2, 3],
  3: [4, 5],
  4: [6, 7],
  5: [8, 9],
  6: [10, 11],
  7: [12, 13],
  8: [14],
};

function getDripMonth(createdAt: string) {
  const start = new Date(createdAt);
  const now = new Date();
  const diff = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return Math.max(1, diff + 1);
}

function getUnlockedDripModules(month: number) {
  const unlocked: number[] = [];
  for (let m = 1; m <= month; m++) {
    if (dripSchedule[m]) unlocked.push(...dripSchedule[m]);
  }
  return unlocked;
}

function getDripMonthForModule(moduleIndex: number) {
  for (const [month, modules] of Object.entries(dripSchedule)) {
    if (modules.includes(moduleIndex)) return parseInt(month);
  }
  return 9;
}

export default function Dashboard() {
  const [member, setMember] = useState<any>(null);
  const [tab, setTab] = useState("modules");
  const [progress, setProgress] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tgf_member") : null;
    if (saved) {
      const m = JSON.parse(saved);
      setMember(m);
      // Reload fresh member data from DB
      supabase.from("members").select("*").eq("id", m.id).single().then(({ data }) => {
        if (data) {
          setMember(data);
          localStorage.setItem("tgf_member", JSON.stringify(data));
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
    // Load progress from localStorage
    const savedProgress = typeof window !== "undefined" ? localStorage.getItem("tgf_progress") : null;
    if (savedProgress) setProgress(JSON.parse(savedProgress));
  }, []);

  function toggleProgress(moduleNum: string) {
    const newProgress = { ...progress };
    if (newProgress[moduleNum] === "complete") {
      newProgress[moduleNum] = "not_started";
    } else if (newProgress[moduleNum] === "in_progress") {
      newProgress[moduleNum] = "complete";
    } else {
      newProgress[moduleNum] = "in_progress";
    }
    setProgress(newProgress);
    localStorage.setItem("tgf_progress", JSON.stringify(newProgress));
  }

  function logout() {
    localStorage.removeItem("tgf_member");
    localStorage.removeItem("tgf_progress");
    window.location.href = "/login";
  }

  if (loading) return <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: C.sage }}>Loading...</div>;

  if (!member) return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: C.dark, marginBottom: 20 }}>You need to be logged in to view your dashboard.</p>
      <Link href="/login" className="btn" style={{ background: C.fawn, color: C.bg, border: "none", padding: "14px 32px", borderRadius: 50, fontSize: 11, fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase" as const, fontFamily: "'Montserrat',sans-serif" }}>Log In</Link>
    </div>
  );

  if (member.tier === "free") return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: C.dark, marginBottom: 12 }}>Your transformation is waiting.</p>
      <p style={{ fontSize: 14, color: C.sage, marginBottom: 28, fontWeight: 300 }}>Choose a plan to unlock your modules and start your journey.</p>
      <Link href="/pricing" className="btn" style={{ background: C.fawn, color: C.bg, border: "none", padding: "14px 32px", borderRadius: 50, fontSize: 11, fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase" as const, fontFamily: "'Montserrat',sans-serif" }}>View Plans</Link>
    </div>
  );

  const tier = member.tier;
  const isLive = tier === "live-6-week";
  const isMonthly = tier === "self-guided-monthly";
  const isFull = tier === "self-guided-full";
  const isOneOnOne = tier === "one-on-one";

  const currentMonth = isMonthly ? getDripMonth(member.created_at) : 0;
  const unlockedDrip = isMonthly ? getUnlockedDripModules(currentMonth) : [];

  function isModuleUnlocked(index: number) {
    if (isFull || isOneOnOne) return true;
    if (isLive) return liveModules.includes(index);
    if (isMonthly) return unlockedDrip.includes(index);
    return false;
  }

  function isBonusUnlocked(bonusIndex: number) {
    if (isOneOnOne) return true;
    if (isLive) return true; // early enrollment gets all
    if (isFull && bonusIndex === 0) return true; // Own the Room only
    return false;
  }

  function bonusLockLabel(bonusIndex: number) {
    if (isMonthly) return bonusIndex === 0 ? "Pay in Full" : "1 on 1 Only";
    if (isFull) return "1 on 1 Only";
    return "Upgrade";
  }

  const tierLabel = isLive ? "Live 6 Week Transformation" : isMonthly ? `Self Guided · Monthly · Month ${currentMonth}` : isFull ? "Self Guided Transformation · All Access" : "1 on 1 Coaching with Sarah · All Access";
  const moduleCount = isLive ? 6 : 15;
  const accessibleModules = allModules.filter((_, i) => isModuleUnlocked(i));
  const completedCount = accessibleModules.filter(m => progress[m.num] === "complete").length;

  const initials = `${member.first_name?.[0] || ""}${member.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: C.charcoal, background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}a{text-decoration:none;color:inherit}.btn:hover{opacity:.88;transform:translateY(-1px)}.tracked{letter-spacing:0.35em;text-transform:uppercase}.tab{padding:14px 28px;font-size:12px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;border:none;background:none;color:#88856A;font-family:'Montserrat',sans-serif;border-bottom:2px solid transparent;transition:all 0.3s}.tab.active{color:#3A2E1F;border-bottom-color:#B08968}.tab:hover{color:#3A2E1F}`}</style>

      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <Link href="/" className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>The Global Flow</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.sand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: C.fawn }}>{initials}</div>
            <span style={{ fontSize: 13, color: C.fawn, fontWeight: 500 }}>{member.first_name}</span>
            <button onClick={logout} style={{ background: "none", border: "none", fontSize: 11, color: C.sage, cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>Log out</button>
          </div>
        </div>
      </nav>

      <section style={{ padding: "48px clamp(20px,5vw,60px)", background: C.bone }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, color: C.dark, marginBottom: 6 }}>Welcome back, {member.first_name}.</h1>
            <p style={{ fontSize: 13, color: C.fawn, fontWeight: 300 }}>{tierLabel}</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/community" className="btn" style={{ background: C.fawn, color: C.bg, border: "none", padding: "12px 24px", fontSize: 10, borderRadius: 50, fontFamily: "'Montserrat',sans-serif" }}>Community</Link>
            <Link href="/blog" className="btn" style={{ background: "transparent", color: C.fawn, border: `1px solid ${C.fawn}`, padding: "12px 24px", fontSize: 10, borderRadius: 50, fontFamily: "'Montserrat',sans-serif" }}>Blog</Link>
          </div>
        </div>
      </section>

      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 8 }}>
          <button className={`tab ${tab === "modules" ? "active" : ""}`} onClick={() => setTab("modules")}>My Modules</button>
          <button className={`tab ${tab === "downloads" ? "active" : ""}`} onClick={() => setTab("downloads")}>Downloads</button>
          <button className={`tab ${tab === "bonuses" ? "active" : ""}`} onClick={() => setTab("bonuses")}>Bonuses</button>
        </div>
      </div>

      {/* MODULES TAB */}
      {tab === "modules" && (
        <section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ background: C.bone, borderRadius: 12, padding: "24px 28px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: 13, color: C.sage, fontWeight: 300, marginBottom: 4 }}>Your progress</p>
                <p style={{ fontSize: 20, fontWeight: 600, color: C.dark }}>{completedCount} of {moduleCount} complete</p>
              </div>
              <div style={{ width: 200, height: 6, background: "rgba(176,137,104,0.15)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${(completedCount / moduleCount) * 100}%`, height: "100%", background: C.teak, borderRadius: 3 }} />
              </div>
            </div>

            {isMonthly && (
              <div style={{ background: C.bone, borderRadius: 12, padding: 28, textAlign: "center", marginBottom: 32 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: C.dark, marginBottom: 8 }}>Want everything now?</p>
                <p style={{ fontSize: 13, color: C.fawn, fontWeight: 300, marginBottom: 16, lineHeight: 1.7 }}>Pay the remaining balance and unlock all 15 modules instantly, plus the Own the Room, Run the World bonus.</p>
                <Link href="/pricing" className="btn" style={{ background: C.fawn, color: C.bg, border: "none", padding: "12px 28px", fontSize: 10, borderRadius: 50, fontFamily: "'Montserrat',sans-serif" }}>Unlock Everything Now</Link>
              </div>
            )}

            {[1, 2, 3].map(phase => (
              <div key={phase}>
                <p className="tracked" style={{ fontSize: 10, color: C.teak, marginBottom: 20, marginTop: phase > 1 ? 32 : 0, letterSpacing: "0.3em", fontWeight: 500 }}>
                  Phase {phase}: {phase === 1 ? "Foundation" : phase === 2 ? "Integration" : "Multiplication"}
                </p>
                {allModules.filter(m => m.phase === phase).map((mod, i) => {
                  const globalIndex = allModules.indexOf(mod);
                  const unlocked = isModuleUnlocked(globalIndex);
                  const status = progress[mod.num] || "not_started";
                  const isActive = status === "in_progress";
                  const isComplete = status === "complete";

                  if (!unlocked) {
                    let lockLabel = "Upgrade";
                    if (isLive) lockLabel = "Upgrade";
                    else if (isMonthly) lockLabel = `Unlocks Month ${getDripMonthForModule(globalIndex)}`;
                    return (
                      <div key={mod.num} style={{ border: `1px solid rgba(176,137,104,0.1)`, borderRadius: 12, padding: "24px 28px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, background: C.bg, opacity: 0.5 }}>
                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(176,137,104,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: C.sage }}>🔒</div>
                          <div>
                            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: C.dark, fontWeight: 500 }}>{mod.num} {mod.name}</p>
                            <p style={{ fontSize: 12, color: C.sage, fontWeight: 300 }}>{mod.desc}</p>
                          </div>
                        </div>
                        <span className="tracked" style={{ fontSize: 9, color: C.sage, fontWeight: 500 }}>{lockLabel}</span>
                      </div>
                    );
                  }

                  return (
                    <div key={mod.num} onClick={() => toggleProgress(mod.num)} style={{ border: `1px solid ${isActive ? C.teak : C.borderLight}`, borderRadius: 12, padding: "24px 28px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, background: C.bg, cursor: "pointer" }}>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: isComplete ? C.teak : isActive ? C.sand : "rgba(176,137,104,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: isComplete ? C.bg : isActive ? C.fawn : C.sage }}>
                          {isComplete ? "✓" : isActive ? "▶" : mod.num}
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: C.dark, fontWeight: 500 }}>{mod.num} {mod.name}</p>
                          <p style={{ fontSize: 12, color: C.sage, fontWeight: 300 }}>{mod.desc}</p>
                        </div>
                      </div>
                      <span className="tracked" style={{ fontSize: 9, color: isComplete ? C.teak : isActive ? C.sand : C.sage, fontWeight: 500 }}>
                        {isComplete ? "Complete" : isActive ? "In Progress" : "Start"}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}

            {isLive && (
              <div style={{ background: C.bone, borderRadius: 12, padding: 28, textAlign: "center", marginTop: 32 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: C.dark, marginBottom: 8 }}>Ready for the full transformation?</p>
                <p style={{ fontSize: 13, color: C.fawn, fontWeight: 300, marginBottom: 20, lineHeight: 1.7 }}>Unlock all 15 modules, 200+ templates, and the complete system.</p>
                <Link href="/pricing" className="btn" style={{ background: C.fawn, color: C.bg, border: "none", padding: "14px 32px", fontSize: 11, borderRadius: 50, fontFamily: "'Montserrat',sans-serif" }}>Unlock All 15 Modules</Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* DOWNLOADS TAB */}
      {tab === "downloads" && (
        <section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {[
                { name: "Calendar Crime Scene Kit", mod: "Module 02", type: "PDF", moduleIndex: 1 },
                { name: "Stakeholder Intelligence Database", mod: "Module 03", type: "Excel", moduleIndex: 2 },
                { name: "Partnership Covenant Template", mod: "Module 05", type: "PDF", moduleIndex: 4 },
                { name: "Shadow AI Playbook", mod: "Module 06", type: "PDF", moduleIndex: 5 },
                { name: "Revenue Recognition Template", mod: "Module 07", type: "Excel", moduleIndex: 6 },
                { name: "5 Culture Codes Cheat Sheet", mod: "Module 10", type: "PDF", moduleIndex: 9 },
                { name: "Crisis Prevention Dashboard", mod: "Module 04", type: "Excel", moduleIndex: 3 },
                { name: "200+ Automation Templates", mod: "Module 11", type: "ZIP", moduleIndex: 10 },
              ].map((file, i) => {
                const unlocked = isModuleUnlocked(file.moduleIndex);
                return (
                  <div key={i} style={{ border: `1px solid ${C.borderLight}`, borderRadius: 12, padding: 24, background: C.bg, opacity: unlocked ? 1 : 0.5 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: C.bone, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 18 }}>{unlocked ? "📄" : "🔒"}</div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: C.dark, marginBottom: 4 }}>{file.name}</p>
                    <p style={{ fontSize: 11, color: C.sage, marginBottom: 16, fontWeight: 300 }}>{file.mod} · {file.type}</p>
                    {unlocked ? (
                      <span style={{ fontSize: 11, color: C.teak, fontWeight: 500, cursor: "pointer" }}>Download</span>
                    ) : (
                      <span style={{ fontSize: 11, color: C.sage, fontWeight: 300 }}>Locked</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* BONUSES TAB */}
      {tab === "bonuses" && (
        <section style={{ padding: "40px clamp(20px,5vw,60px) 80px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {bonuses.map((bonus, i) => {
              const unlocked = isBonusUnlocked(i);
              return (
                <div key={i} style={{ border: `1px solid ${unlocked ? C.borderLight : "rgba(176,137,104,0.1)"}`, borderRadius: 12, padding: "24px 28px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, background: C.bg, opacity: unlocked ? 1 : 0.5 }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: unlocked ? C.sand : "rgba(176,137,104,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: unlocked ? C.fawn : C.sage }}>{unlocked ? "★" : "🔒"}</div>
                    <div>
                      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: C.dark, fontWeight: 500 }}>{bonus.name}</p>
                      <p style={{ fontSize: 12, color: C.sage, fontWeight: 300 }}>{bonus.desc}</p>
                    </div>
                  </div>
                  <span className="tracked" style={{ fontSize: 9, color: unlocked ? C.teak : C.sage, fontWeight: 500 }}>{unlocked ? "Unlocked" : bonusLockLabel(i)}</span>
                </div>
              );
            })}

            {!isOneOnOne && (
              <div style={{ background: C.bone, borderRadius: 12, padding: 28, textAlign: "center", marginTop: 24 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: C.dark, marginBottom: 8 }}>Unlock all bonuses</p>
                <p style={{ fontSize: 13, color: C.fawn, fontWeight: 300, marginBottom: 16, lineHeight: 1.7 }}>Upgrade to 1 on 1 Coaching to unlock every bonus module.</p>
                <Link href="/apply" className="btn" style={{ background: C.fawn, color: C.bg, border: "none", padding: "12px 28px", fontSize: 10, borderRadius: 50, fontFamily: "'Montserrat',sans-serif" }}>Apply for 1 on 1 Coaching</Link>
              </div>
            )}
          </div>
        </section>
      )}

      <footer style={{ padding: "36px clamp(20px,5vw,60px)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 500, color: C.teak }}>The Global Flow</span>
          <p style={{ fontSize: 11, color: C.sage }}>© 2026 The Global Flow™</p>
        </div>
      </footer>
    </div>
  );
}
