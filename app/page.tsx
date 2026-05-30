"use client";
import { useEffect } from "react";

const CSS = `
  :root{
    --bg:#FFFFFF; --ink:#1F2421; --ink-soft:#51564F; --green:#2B4D3B; --green-mid:#3A6650;
    --line:rgba(31,36,33,0.12); --wash:#F7F8F6; --gold:#BFA06A; --gold-deep:#8C7333;
    --serif:"Cormorant Garamond", Georgia, serif; --sans:"Figtree", -apple-system, sans-serif;
  }
  .gfw *{ margin:0; padding:0; box-sizing:border-box; }
  .gfw{ background:var(--bg); color:var(--ink); font-family:var(--sans); font-weight:400; line-height:1.65; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
  .gfw ::selection{ background:var(--green); color:#fff; }
  .gfw .wrap{ width:90%; max-width:1140px; margin:0 auto; }
  .gfw h1,.gfw h2,.gfw h3{ font-family:var(--serif); font-weight:500; line-height:1.06; letter-spacing:-0.005em; color:var(--ink); }
  .gfw .em{ font-style:italic; color:var(--green); }
  .gfw .rise{ opacity:0; transform:translateY(22px); transition:opacity 1s ease, transform 1s ease; }
  .gfw .rise.in{ opacity:1; transform:none; }
  .gfw nav{ position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:22px 5%; transition:all .45s ease; }
  .gfw nav.docked{ background:rgba(255,255,255,0.9); backdrop-filter:blur(10px); padding:14px 5%; box-shadow:0 1px 0 var(--line); }
  .gfw .brand{ font-family:var(--serif); font-size:23px; letter-spacing:.01em; color:var(--ink); text-decoration:none; }
  .gfw .brand span{ font-style:italic; color:var(--green); }
  .gfw .navlinks{ display:flex; align-items:center; gap:32px; }
  .gfw .navlinks a{ color:var(--ink-soft); text-decoration:none; font-size:13px; letter-spacing:.14em; text-transform:uppercase; position:relative; padding:4px 0; }
  .gfw .navlinks a::after{ content:""; position:absolute; left:0; bottom:0; height:1px; width:0; background:var(--green); transition:width .4s ease; }
  .gfw .navlinks a:hover::after, .gfw .navlinks a.active::after{ width:100%; }
  .gfw .navlinks a.active{ color:var(--green); }
  .gfw .nav-cta{ border:1px solid var(--green); border-radius:40px; padding:9px 20px !important; color:var(--green) !important; transition:all .35s ease; }
  .gfw .nav-cta::after{ display:none; }
  .gfw .nav-cta:hover{ background:var(--green); color:#fff !important; }
  .gfw .menu-btn{ display:none; }
  .gfw header.hero{ min-height:96vh; display:flex; flex-direction:column; justify-content:center; text-align:center; padding:150px 0 90px; }
  .gfw .eyebrow{ font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:var(--gold-deep); font-weight:600; margin-bottom:30px; }
  .gfw .hero h1{ font-size:clamp(3.2rem,9vw,7.4rem); line-height:0.96; }
  .gfw .hero-sub{ margin:34px auto 0; max-width:60ch; font-size:clamp(1.05rem,1.5vw,1.28rem); color:var(--ink-soft); font-weight:300; }
  .gfw .hero-rule{ width:60px; height:2px; background:var(--gold); margin:30px auto 0; }
  .gfw .tag{ display:inline-flex; align-items:center; gap:10px; margin-top:30px; font-size:13px; letter-spacing:.18em; text-transform:uppercase; color:var(--gold-deep); }
  .gfw .dot{ width:7px; height:7px; border-radius:50%; background:var(--gold); animation:gfwpulse 2.6s infinite; }
  @keyframes gfwpulse{ 0%{box-shadow:0 0 0 0 rgba(191,160,106,.5);} 70%{box-shadow:0 0 0 11px rgba(191,160,106,0);} 100%{box-shadow:0 0 0 0 rgba(191,160,106,0);} }
  .gfw .btn{ display:inline-block; background:var(--green); color:#fff; text-decoration:none; padding:16px 38px; border-radius:46px; font-size:13px; letter-spacing:.1em; text-transform:uppercase; font-weight:600; border:none; cursor:pointer; transition:all .35s ease; margin-top:36px; }
  .gfw .btn:hover{ background:var(--green-mid); transform:translateY(-2px); }
  .gfw section{ padding:110px 0; }
  .gfw .label{ font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold-deep); font-weight:600; margin-bottom:24px; }
  .gfw .vision-grid{ display:grid; grid-template-columns:0.85fr 1.15fr; gap:64px; align-items:start; }
  .gfw .vision h2{ font-size:clamp(2.2rem,4.4vw,3.4rem); }
  .gfw .vision-body p{ font-size:1.18rem; color:var(--ink-soft); font-weight:300; margin-bottom:22px; }
  .gfw .vision-body p:last-child{ margin-bottom:0; font-family:var(--serif); font-style:italic; font-size:1.5rem; color:var(--green); }
  .gfw .serves{ background:var(--wash); text-align:center; }
  .gfw .serves h2{ font-size:clamp(2rem,4vw,3rem); max-width:18ch; margin:0 auto 40px; }
  .gfw .roles{ display:flex; flex-wrap:wrap; justify-content:center; gap:12px; max-width:880px; margin:0 auto 44px; }
  .gfw .role{ border:1px solid var(--line); border-radius:40px; padding:11px 26px; font-size:.96rem; color:var(--ink); transition:all .35s ease; cursor:default; background:#fff; }
  .gfw .role:hover{ background:var(--green); color:#fff; border-color:var(--green); transform:translateY(-2px); }
  .gfw .serves p{ max-width:60ch; margin:0 auto; color:var(--ink-soft); font-weight:300; font-size:1.16rem; }
  .gfw .pillars h2{ font-size:clamp(2.2rem,4.6vw,3.6rem); max-width:16ch; margin-bottom:18px; }
  .gfw .pillars-intro{ color:var(--ink-soft); font-weight:300; font-size:1.14rem; max-width:54ch; margin-bottom:56px; }
  .gfw .pillar-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--line); border:1px solid var(--line); }
  .gfw .pillar{ background:#fff; padding:42px 38px; transition:background .4s ease; }
  .gfw .pillar:hover{ background:var(--wash); }
  .gfw .pillar-num{ font-family:var(--serif); font-style:italic; font-size:1.1rem; color:var(--gold); }
  .gfw .pillar h3{ font-size:1.7rem; margin:8px 0 14px; }
  .gfw .pillar p{ font-size:1rem; color:var(--ink-soft); font-weight:300; line-height:1.6; }
  .gfw .net{ background:var(--wash); }
  .gfw .net h2{ font-size:clamp(2.2rem,4.6vw,3.6rem); max-width:14ch; margin-bottom:14px; }
  .gfw .net-sub{ max-width:56ch; color:var(--ink-soft); font-weight:300; font-size:1.14rem; margin-bottom:56px; }
  .gfw .net-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); }
  .gfw .prac{ background:#fff; padding:38px 32px; min-height:250px; display:flex; flex-direction:column; transition:background .4s ease; }
  .gfw .prac:hover{ background:var(--wash); }
  .gfw .prac.lead{ background:var(--green); color:#fff; }
  .gfw .prac.lead:hover{ background:var(--green-mid); }
  .gfw .prac-mono{ font-family:var(--serif); font-style:italic; font-size:2.6rem; color:var(--gold); margin-bottom:auto; }
  .gfw .prac.lead .prac-mono{ color:#fff; }
  .gfw .prac-status{ font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--gold-deep); margin-bottom:12px; }
  .gfw .prac.lead .prac-status{ color:rgba(255,255,255,0.8); }
  .gfw .prac h3{ font-size:1.45rem; margin-bottom:9px; }
  .gfw .prac.lead h3{ color:#fff; }
  .gfw .prac p{ font-size:.93rem; color:var(--ink-soft); font-weight:300; line-height:1.55; }
  .gfw .prac.lead p{ color:rgba(255,255,255,0.82); }
  .gfw .culture{ text-align:center; }
  .gfw .culture h2{ font-size:clamp(2rem,4.2vw,3.2rem); max-width:18ch; margin:0 auto 22px; }
  .gfw .culture > .wrap > p{ max-width:56ch; margin:0 auto 46px; color:var(--ink-soft); font-weight:300; font-size:1.16rem; }
  .gfw .traditions{ display:flex; flex-wrap:wrap; justify-content:center; gap:12px; max-width:860px; margin:0 auto; }
  .gfw .trad{ border:1px solid var(--line); border-radius:40px; padding:10px 22px; font-size:.93rem; color:var(--ink-soft); transition:all .35s ease; cursor:default; }
  .gfw .trad:hover{ background:var(--green); color:#fff; border-color:var(--green); }
  .gfw .culture small{ display:block; margin-top:40px; letter-spacing:.16em; text-transform:uppercase; font-size:12px; color:var(--gold-deep); }
  .gfw .forms{ background:var(--wash); }
  .gfw .forms-head{ text-align:center; margin-bottom:64px; }
  .gfw .forms-head h2{ font-size:clamp(2.2rem,4.6vw,3.4rem); }
  .gfw .forms-head p{ color:var(--ink-soft); font-weight:300; font-size:1.14rem; max-width:50ch; margin:14px auto 0; }
  .gfw .form-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:start; }
  .gfw .card{ background:#fff; border:1px solid var(--line); border-radius:6px; padding:40px 34px; }
  .gfw .card .label{ margin-bottom:14px; }
  .gfw .card h3{ font-size:1.8rem; margin-bottom:12px; }
  .gfw .card > p{ color:var(--ink-soft); font-weight:300; font-size:.98rem; margin-bottom:28px; }
  .gfw .field{ margin-bottom:16px; }
  .gfw .field label{ display:block; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--gold-deep); margin-bottom:6px; }
  .gfw .field input, .gfw .field select, .gfw .field textarea{ width:100%; background:#fff; border:1px solid var(--line); border-radius:4px; color:var(--ink); font-family:var(--sans); font-size:.96rem; padding:12px 13px; outline:none; transition:border-color .3s ease; }
  .gfw .field input::placeholder, .gfw .field textarea::placeholder{ color:#a7aaa4; }
  .gfw .field input:focus, .gfw .field select:focus, .gfw .field textarea:focus{ border-color:var(--green); }
  .gfw .field select{ -webkit-appearance:none; appearance:none; cursor:pointer; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232B4D3B' fill='none' stroke-width='1.5'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; }
  .gfw .field textarea{ resize:vertical; min-height:70px; }
  .gfw .card .btn{ width:100%; margin-top:10px; }
  .gfw .card.featured{ border-color:var(--green); box-shadow:0 14px 40px rgba(43,77,59,0.1); }
  .gfw .form-ok{ color:var(--green); font-family:var(--serif); font-style:italic; font-size:1.05rem; margin-top:16px; min-height:1.3em; }
  .gfw .form-note{ font-size:.8rem; color:var(--ink-soft); margin-top:16px; }
  .gfw footer{ background:#fff; padding:64px 0 48px; border-top:1px solid var(--line); }
  .gfw .foot-grid{ display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:26px; }
  .gfw .foot-brand{ font-family:var(--serif); font-size:1.9rem; }
  .gfw .foot-brand span{ font-style:italic; color:var(--green); }
  .gfw .foot-links{ display:flex; gap:24px; }
  .gfw .foot-links a{ color:var(--ink-soft); text-decoration:none; font-size:14px; transition:color .3s ease; }
  .gfw .foot-links a:hover{ color:var(--green); }
  .gfw .copy{ margin-top:36px; font-size:13px; color:var(--green-mid); letter-spacing:.04em; }
  @media(max-width:900px){
    .gfw .navlinks{ position:fixed; inset:0; background:#fff; flex-direction:column; justify-content:center; gap:28px; transform:translateX(100%); transition:transform .5s ease; z-index:90; }
    .gfw .navlinks.open{ transform:none; }
    .gfw .navlinks a{ font-size:18px; }
    .gfw .menu-btn{ display:flex; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; z-index:95; }
    .gfw .menu-btn span{ width:26px; height:2px; background:var(--ink); transition:.3s; }
    .gfw .menu-btn.x span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
    .gfw .menu-btn.x span:nth-child(2){ opacity:0; }
    .gfw .menu-btn.x span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }
    .gfw .vision-grid, .gfw .pillar-grid, .gfw .net-grid, .gfw .form-grid{ grid-template-columns:1fr; }
    .gfw section{ padding:74px 0; }
  }
`;

export default function Home() {
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Figtree:wght@300;400;500;600&display=swap";
    document.head.appendChild(fontLink);

    const nav = document.getElementById("gfwnav");
    const onScroll = () => nav && nav.classList.toggle("docked", window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const menuBtn = document.getElementById("gfwMenuBtn");
    const navlinks = document.getElementById("gfwnavlinks");
    const toggleMenu = () => { menuBtn?.classList.toggle("x"); navlinks?.classList.toggle("open"); };
    menuBtn?.addEventListener("click", toggleMenu);
    const linkEls = navlinks ? Array.from(navlinks.querySelectorAll("a")) : [];
    const closeMenu = () => { menuBtn?.classList.remove("x"); navlinks?.classList.remove("open"); };
    linkEls.forEach(a => a.addEventListener("click", closeMenu));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const parent = e.target.parentElement;
          const sibs = parent ? Array.from(parent.querySelectorAll(".rise")) : [];
          (e.target as HTMLElement).style.transitionDelay = Math.min(sibs.indexOf(e.target as Element), 6) * 0.06 + "s";
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".gfw .rise").forEach(el => io.observe(el));

    document.querySelectorAll(".gfw .hero .rise").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = i * 0.12 + "s";
      el.classList.add("in");
    });

    function handle(formId: string, okId: string, subject: string, msg: string) {
      const form = document.getElementById(formId) as HTMLFormElement | null;
      if (!form) return;
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const emailEl = form.querySelector('input[name="email"]') as HTMLInputElement | null;
        const email = emailEl ? emailEl.value.trim() : "";
        const ok = document.getElementById(okId);
        if (!email || !email.includes("@")) { if (ok) ok.textContent = "Please add a valid email."; return; }
        const data = new FormData(form);
        data.append("_subject", subject);
        fetch("https://formspree.io/f/xkokrjzv", { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(() => { if (ok) ok.textContent = msg; form.reset(); })
          .catch(() => { if (ok) ok.textContent = msg; form.reset(); });
      });
    }
    handle("womenForm", "womenOk", "New Wellness — Woman Interested", "Thank you. You are on the list.");
    handle("corpForm", "corpOk", "New Wellness — Corporate Inquiry", "Received. Sarah will be in touch within 48 hours.");
    handle("pracForm", "pracOk", "New Wellness — Practitioner Application", "Received. Sarah will be in touch within 48 hours.");

    return () => { window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div className="gfw">
      <style>{CSS}</style>

      <nav id="gfwnav">
        <a href="#top" className="brand">The Global <span>Flow</span></a>
        <div className="navlinks" id="gfwnavlinks">
          <a href="#top" className="active">Wellness</a>
          <a href="#connect" className="nav-cta">Get in Touch</a>
        </div>
        <button className="menu-btn" id="gfwMenuBtn" aria-label="Menu"><span></span><span></span><span></span></button>
      </nav>

      <header className="hero" id="top">
        <div className="wrap">
          <p className="eyebrow rise">For the Women Who Run Everything</p>
          <h1 className="rise">The Global Flow <span className="em">Wellness</span></h1>
          <p className="hero-sub rise">A global wellness platform bringing together nutrition, gut health, hormone optimization, integrative psychology, and ancient healing traditions for women operating at the highest levels of leadership.</p>
          <div className="hero-rule rise"></div>
          <p className="tag rise"><span className="dot"></span> Coming Soon</p>
        </div>
      </header>

      <section className="vision">
        <div className="wrap vision-grid">
          <div className="rise">
            <p className="label">The Vision</p>
            <h2>You wouldn&apos;t run your business without a strategy.</h2>
          </div>
          <div className="vision-body rise">
            <p>You run boardrooms, law firms, entire organizations. You make decisions that affect hundreds of people before most of them have had their morning coffee. You&apos;ve built something remarkable with your mind, your discipline, and your drive.</p>
            <p>And your body has been keeping up with all of it without getting the same level of strategy, investment, or attention that you give to everything else in your life.</p>
            <p>Global Flow Wellness is a curated network of the world&apos;s most trusted practitioners, brought together under one platform, speaking your language, honoring your culture, and built around the demands of the life you lead.</p>
            <p>Why are you running your body without one?</p>
          </div>
        </div>
      </section>

      <section className="serves" id="serves">
        <div className="wrap">
          <p className="label rise" style={{ textAlign: "center" }}>Built For</p>
          <h2 className="rise">The women who have earned their seat at the table.</h2>
          <div className="roles rise">
            <span className="role">CEOs</span>
            <span className="role">Founders</span>
            <span className="role">C-Suite Executives</span>
            <span className="role">Attorneys</span>
            <span className="role">Executive Assistants</span>
            <span className="role">Chiefs of Staff</span>
            <span className="role">Managing Directors</span>
            <span className="role">Partners</span>
            <span className="role">Board Members</span>
          </div>
          <p className="rise">Every woman who has earned her seat at the table and is quietly wondering why her body isn&apos;t keeping up with the pace her mind set years ago.</p>
        </div>
      </section>

      <section className="pillars" id="pillars">
        <div className="wrap">
          <p className="label rise">What We Cover</p>
          <h2 className="rise">Eight pillars of care, under one platform.</h2>
          <p className="pillars-intro rise">Each pillar is led by a vetted practitioner and built around the reality of your schedule, your travel, and the body you bring to all of it.</p>
          <div className="pillar-grid">
            <div className="pillar rise"><span className="pillar-num">01</span><h3>Nutrition for High-Performing Women</h3><p>Nutrition strategies designed around your schedule, your travel, your body, and the demands you face daily. What to eat before a board meeting. How to fuel through a 14-hour day. What your body needs when you haven&apos;t slept properly in a week.</p></div>
            <div className="pillar rise"><span className="pillar-num">02</span><h3>Gut Health</h3><p>Your gut is your second brain, and when it&apos;s off, everything is off. Bloating, inflammation, brain fog, anxiety, immune issues. We address the root causes, not the symptoms. Built around the reality that you eat in airports, at your desk, and between meetings.</p></div>
            <div className="pillar rise"><span className="pillar-num">03</span><h3>Hormone Health at Every Stage</h3><p>Your hormones shift through every chapter of your life, and nobody told you how that would affect your performance, your sleep, your mood, your energy, or your decision-making. From your twenties through menopause and beyond, we build protocols that honor where your body is right now.</p></div>
            <div className="pillar rise"><span className="pillar-num">04</span><h3>Somatic &amp; Relational Therapy</h3><p>Your body stores everything your mind tries to push through. Tension patterns, stress responses, and the relational dynamics that shape how you lead, communicate, and protect yourself. Body-based healing that meets you where you are.</p></div>
            <div className="pillar rise"><span className="pillar-num">05</span><h3>Integrative Psychology</h3><p>The emotional weight of leadership is real and rarely addressed. Imposter syndrome at the executive level. Decision fatigue. The loneliness of being the only woman in the room. Evidence-based methods integrated with the reality of your daily life.</p></div>
            <div className="pillar rise"><span className="pillar-num">06</span><h3>Narrative &amp; Inner Work</h3><p>The stories you carry shape how you lead, decide, and recover. We help you recognize the inherited and unconscious narratives running underneath your choices, and rewrite the ones that no longer serve the woman you&apos;ve become.</p></div>
            <div className="pillar rise"><span className="pillar-num">07</span><h3>Mindfulness &amp; Yoga</h3><p>Mindfulness and movement practices designed for women who have five minutes between meetings and need them to count. Breathwork for the boardroom. Yoga that fits a real schedule.</p></div>
            <div className="pillar rise"><span className="pillar-num">08</span><h3>Travel &amp; Stress Recovery</h3><p>Jet lag protocols, sleep optimization across time zones, hydration strategies, and recovery methods for women who live in transit. How to land in a new city and perform at your peak. How to come home and recover instead of collapse.</p></div>
          </div>
        </div>
      </section>

      <section className="net">
        <div className="wrap">
          <p className="label rise">The Practitioner Network</p>
          <h2 className="rise">One platform. The world&apos;s best practitioners.</h2>
          <p className="net-sub rise">Every practitioner on this platform is personally vetted and aligned with the Global Flow philosophy: holistic, evidence-informed, culturally fluent, and built for women who lead.</p>
          <div className="net-grid">
            <div className="prac lead rise">
              <div className="prac-mono">S</div>
              <span className="prac-status">Founder</span>
              <h3>Sarah DeSouza</h3>
              <p>MS Integrative Psychology, specializing in Relational Intelligence &amp; Narrative Therapy. IIN Holistic Nutrition Certification, specializing in Gut &amp; Hormonal Health.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">A</div>
              <span className="prac-status">Announced Soon</span>
              <h3>Ayurvedic Practitioner</h3>
              <p>Ancient Indian healing traditions adapted for modern executive life. Dosha-based nutrition, herbal protocols, and seasonal wellness rhythms.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">M</div>
              <span className="prac-status">Announced Soon</span>
              <h3>Menopause &amp; Lifespan Therapist</h3>
              <p>Specialized in perimenopause, menopause, and post-menopausal wellness. Holistic hormone balancing, emotional support, and lifestyle protocols for every stage.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">G</div>
              <span className="prac-status">Announced Soon</span>
              <h3>Holistic Gut Health Specialist</h3>
              <p>Women-focused gut health restoration. Microbiome analysis, elimination protocols, and nutrition plans that work around high-pressure schedules and international travel.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">H</div>
              <span className="prac-status">Announced Soon</span>
              <h3>Hormone Health Practitioner</h3>
              <p>Holistic hormone optimization through nutrition, lifestyle, and natural protocols. Supporting women from their twenties through menopause and beyond.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">Y</div>
              <span className="prac-status">Confirmed</span>
              <h3>Mindfulness &amp; Yoga Instructor</h3>
              <p>Breathwork, movement, and mindfulness practices designed for women who lead. Functional yoga that fits between meetings. Meditation that works in five minutes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="culture">
        <div className="wrap">
          <p className="label rise" style={{ textAlign: "center" }}>Rooted in Every Culture</p>
          <h2 className="rise">Wellness has never been one-size-fits-all.</h2>
          <p className="rise">Every culture has its own healing wisdom, and this platform honors that. Our practitioners draw from traditions across the globe, because a woman in São Paulo and a woman in Seoul deserve wellness that speaks to who they are.</p>
          <div className="traditions rise">
            <span className="trad">Caribbean</span><span className="trad">Indian &amp; Ayurvedic</span><span className="trad">Traditional Chinese Medicine</span>
            <span className="trad">African Healing Traditions</span><span className="trad">Middle Eastern</span><span className="trad">Latin American &amp; Brazilian</span>
            <span className="trad">Greek &amp; Mediterranean</span><span className="trad">Italian</span><span className="trad">French</span>
            <span className="trad">South American</span><span className="trad">Eastern European</span><span className="trad">Japanese</span><span className="trad">Korean</span>
          </div>
          <small className="rise">Available in multiple major languages as the platform grows</small>
        </div>
      </section>

      <section className="forms" id="connect">
        <div className="wrap">
          <div className="forms-head rise">
            <p className="label" style={{ textAlign: "center" }}>Get in Touch</p>
            <h2>Three ways to begin.</h2>
            <p>Whether you are joining for yourself, bringing this to your organization, or partnering as a practitioner.</p>
          </div>
          <div className="form-grid">

            <div className="card rise">
              <p className="label">For Women</p>
              <h3>Stay in the Know</h3>
              <p>Be the first to know when Global Flow Wellness launches. Leave your details and we&apos;ll reach out when we&apos;re ready for you.</p>
              <form id="womenForm" noValidate>
                <div className="field"><input type="text" name="name" placeholder="Your name" required /></div>
                <div className="field"><input type="email" name="email" placeholder="Email address" required /></div>
                <div className="field"><input type="text" name="title" placeholder="Your title (CEO, EA, Attorney, etc.)" /></div>
                <div className="field">
                  <label>What interests you most</label>
                  <select name="interest">
                    <option>Nutrition &amp; Gut Health</option>
                    <option>Hormone Health</option>
                    <option>Integrative Psychology</option>
                    <option>Somatic Therapy</option>
                    <option>Mindfulness &amp; Yoga</option>
                    <option>All of the Above</option>
                  </select>
                </div>
                <div className="field">
                  <label>Would you be interested in a paid Founding Cohort</label>
                  <select name="founding_interest">
                    <option>Yes, I&apos;d pay for early access</option>
                    <option>Maybe, tell me more</option>
                    <option>Not yet, just want to stay informed</option>
                  </select>
                </div>
                <button type="submit" className="btn">Notify Me</button>
                <p className="form-ok" id="womenOk"></p>
              </form>
            </div>

            <div className="card featured rise">
              <p className="label">For Organizations</p>
              <h3>Bring Global Flow to Your Team</h3>
              <p>Executive wellness programs for firms, funds, and companies investing in the women who lead them.</p>
              <form id="corpForm" noValidate>
                <div className="field"><input type="text" name="company" placeholder="Organization name" required /></div>
                <div className="field"><input type="text" name="name" placeholder="Your name &amp; role" required /></div>
                <div className="field"><input type="email" name="email" placeholder="Work email" required /></div>
                <div className="field">
                  <label>How many people would this support</label>
                  <select name="size">
                    <option>1 to 10 leaders</option>
                    <option>10 to 50</option>
                    <option>50 to 200</option>
                    <option>200+</option>
                  </select>
                </div>
                <div className="field">
                  <label>What are you exploring</label>
                  <select name="interest">
                    <option>Executive wellness program</option>
                    <option>Group workshops &amp; retreats</option>
                    <option>1:1 practitioner access for leadership</option>
                    <option>Speaking &amp; events</option>
                    <option>Custom program</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="field"><textarea name="message" placeholder="Anything you'd like us to know (optional)"></textarea></div>
                <button type="submit" className="btn">Start the Conversation</button>
                <p className="form-ok" id="corpOk"></p>
                <p className="form-note">All inquiries are confidential. You&apos;ll hear from Sarah within 48 hours.</p>
              </form>
            </div>

            <div className="card rise">
              <p className="label">For Practitioners</p>
              <h3>Partner With Us</h3>
              <p>Are you a holistic health practitioner who works with women in leadership? We&apos;re building a global network and would love to hear from you.</p>
              <form id="pracForm" noValidate>
                <div className="field"><input type="text" name="name" placeholder="Your name" required /></div>
                <div className="field"><input type="email" name="email" placeholder="Email address" required /></div>
                <div className="field"><input type="text" name="location" placeholder="Where are you based?" /></div>
                <div className="field">
                  <label>Your area of expertise</label>
                  <select name="expertise">
                    <option>Ayurvedic Medicine</option>
                    <option>Nutrition &amp; Gut Health</option>
                    <option>Hormone Health</option>
                    <option>Menopause &amp; Lifespan Wellness</option>
                    <option>Somatic / Body-Based Therapy</option>
                    <option>Integrative Psychology</option>
                    <option>Mindfulness &amp; Yoga</option>
                    <option>Traditional / Cultural Healing</option>
                    <option>Other</option>
                  </select>
                </div>
                <button type="submit" className="btn">Apply to Partner</button>
                <p className="form-ok" id="pracOk"></p>
                <p className="form-note">All inquiries are confidential. You&apos;ll hear from Sarah within 48 hours.</p>
              </form>
            </div>

          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">The Global <span>Flow</span></div>
            <div className="foot-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
          <p className="copy">© 2026 The Global Flow™</p>
        </div>
      </footer>
    </div>
  );
}
