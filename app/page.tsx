"use client";
import { useEffect } from "react";

const CSS = `
  :root{
    --bg:#FFFFFF; --ink:#1F2421; --ink-soft:#51564F; --green:#2B4D3B; --green-mid:#3A6650;
    --line:rgba(31,36,33,0.12); --wash:#FFFFFF; --gold:#E0B53D; --gold-deep:#B07F12;
    --serif:"Cormorant Garamond", Georgia, serif; --sans:"Montserrat", -apple-system, sans-serif;
  }
  .gfw *{ margin:0; padding:0; box-sizing:border-box; }
  .gfw{ background:var(--bg); color:var(--ink); font-family:var(--sans); font-weight:400; line-height:1.65; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
  .gfw ::selection{ background:var(--green); color:#fff; }
  .gfw .wrap{ width:90%; max-width:1140px; margin:0 auto; }
  .gfw h1,.gfw h2,.gfw h3{ font-family:var(--serif); font-weight:500; line-height:1.06; letter-spacing:-0.005em; color:var(--ink); }
  .gfw .em{ font-style:italic; color:#88A892; }
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
  .gfw section{ padding:110px 0; border-top:1px solid var(--line); }
  .gfw .label{ font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold-deep); font-weight:600; margin-bottom:24px; }
  .gfw .vision-grid{ display:grid; grid-template-columns:0.85fr 1.15fr; gap:64px; align-items:start; }
  .gfw .vision h2{ font-size:clamp(2.2rem,4.4vw,3.4rem); }
  .gfw .vision-body p{ font-size:1.18rem; color:var(--ink-soft); font-weight:300; margin-bottom:22px; }
  .gfw .vision-body p:last-child{ margin-bottom:0; font-family:var(--serif); font-style:italic; font-size:1.5rem; color:var(--green); }
  .gfw .serves{ background:var(--wash); text-align:center; }
  .gfw .serves h2{ font-size:clamp(2rem,4vw,3rem); max-width:20ch; margin:0 auto 40px; }
  .gfw .serves p{ max-width:60ch; margin:0 auto 18px; color:var(--ink-soft); font-weight:300; font-size:1.16rem; }
  .gfw .serves p:last-child{ margin-bottom:0; font-family:var(--serif); font-style:italic; font-size:1.4rem; color:var(--green); }
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
  .gfw .prac p{ font-size:.93rem; color:var(--ink-soft); font-weight:300; line-height:1.55; margin-bottom:10px; }
  .gfw .prac p:last-child{ margin-bottom:0; }
  .gfw .prac.lead p{ color:rgba(255,255,255,0.82); }
  .gfw .culture{ text-align:center; background:#2B4D3B; }
  .gfw .culture .label{ color:#C9B26A; }
  .gfw .culture h2{ font-size:clamp(2rem,4.2vw,3.2rem); max-width:18ch; margin:0 auto 22px; color:#FFFFFF; }
  .gfw .culture > .wrap > p{ max-width:56ch; margin:0 auto 46px; color:rgba(255,255,255,0.78); font-weight:300; font-size:1.16rem; }
  .gfw .traditions{ display:flex; flex-wrap:wrap; justify-content:center; gap:12px; max-width:860px; margin:0 auto; }
  .gfw .trad{ border:1px solid rgba(255,255,255,0.25); border-radius:40px; padding:10px 22px; font-size:.93rem; color:rgba(255,255,255,0.85); transition:all .35s ease; cursor:default; }
  .gfw .trad:hover{ background:#FFFFFF; color:var(--green); border-color:#FFFFFF; }
  .gfw .culture small{ display:block; margin-top:40px; letter-spacing:.16em; text-transform:uppercase; font-size:12px; color:#C9B26A; }
  .gfw .forms{ background:var(--wash); }
  .gfw .forms-head{ text-align:center; margin-bottom:64px; }
  .gfw .forms-head h2{ font-size:clamp(2.2rem,4.6vw,3.4rem); }
  .gfw .forms-head p{ color:var(--ink-soft); font-weight:300; font-size:1.14rem; max-width:50ch; margin:14px auto 0; }
  .gfw .form-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:24px; align-items:start; max-width:820px; margin:0 auto; }
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
  .gfw .form-note{ font-size:.8rem; color:var(--ink-soft); margin-top:16px; text-align:center; }
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
    fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@200;300;400;500;600;700&display=swap";
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
          <p className="eyebrow rise">For the Women Who Carry It All</p>
          <h1 className="rise"><span style={{ color: "#2B4D3B" }}>The Global Flow</span> <span className="em">Wellness</span></h1>
          <p className="hero-sub rise">The global wellness platform for women at every stage of life. We integrate advanced nutrition, gut health, and hormone optimization with integrative psychology and ancient healing traditions to deliver true holistic care.</p>
          <div className="hero-rule rise"></div>
          <p className="tag rise"><span className="dot"></span> Coming Soon</p>
        </div>
      </header>

      <section className="vision">
        <div className="wrap vision-grid">
          <div className="rise">
            <p className="label">The Vision</p>
            <h2>The care you give everyone else is now yours.</h2>
          </div>
          <div className="vision-body rise">
            <p>You carry more than most people see, the work, the responsibilities, and the silent weight you never set down. While your mind, discipline, and heart have built something remarkable, your body has been running on fumes, operating without the same care, investment, and attention you give to everyone else.</p>
            <p>Global Flow Wellness is a curated network of the world&apos;s most trusted practitioners, united under one seamless platform. We speak your language, honor your culture, and adapt completely to the life you actually lead.</p>
            <p>It is time your body received the same exceptional care you give to the rest of your world.</p>
          </div>
        </div>
      </section>

      <section className="serves" id="serves">
        <div className="wrap">
          <p className="label rise" style={{ textAlign: "center" }}>Built For</p>
          <h2 className="rise">This was built for all women looking for a more natural way to care for their bodies.</h2>
          <p className="rise">This was created for women seeking a more natural way to care for their bodies. Whether she feels it in her energy, gut health, hormones, sleep, or mood, or simply knows she doesn&apos;t feel like herself anymore, she is searching for an intuitive, trustworthy path to wellness. She is tired of sorting through the digital noise to find real answers.</p>
          <p className="rise">This platform was built specifically for her.</p>
        </div>
      </section>

      <section className="pillars" id="pillars">
        <div className="wrap">
          <p className="label rise">What We Cover</p>
          <h2 className="rise">Eight pillars of care, under one platform.</h2>
          <p className="pillars-intro rise">Each pillar is led by a vetted practitioner and built around the reality of your days, your travel, and the body you bring to all of it.</p>
          <div className="pillar-grid">
            <div className="pillar rise"><span className="pillar-num">01</span><h3>Nutrition for Women</h3><p>We design nutrition strategies around your unique schedule, travel demands, body, and daily pressures. Learn exactly what to eat before a day that asks everything of you, how to fuel through long, demanding hours, and what your body needs to recover when you haven&apos;t slept properly in a week.</p></div>
            <div className="pillar rise"><span className="pillar-num">02</span><h3>Gut Health</h3><p>Your gut is your second brain; when it is out of balance, your entire body feels it. Issues like bloating, inflammation, brain fog, anxiety, and weakened immunity are often warning signs. We address the root causes of these disruptions rather than just treating the symptoms, creating a plan tailored to the reality of how and when you actually eat.</p></div>
            <div className="pillar rise"><span className="pillar-num">03</span><h3>Hormone Health at Every Stage</h3><p>Your hormones shift through every chapter of life, yet few women are prepared for how deeply those changes impact sleep, mood, energy, and focus. From your twenties through menopause and beyond, we design targeted protocols that honor exactly where your body is right now.</p></div>
            <div className="pillar rise"><span className="pillar-num">04</span><h3>Somatic &amp; Relational Therapy</h3><p>Your body stores everything your mind tries to push through: chronic tension patterns, nervous system stress responses, and the relational dynamics that shape how you connect, communicate, and protect yourself. This is deeply restorative, body-based healing designed to meet you exactly where you are.</p></div>
            <div className="pillar rise"><span className="pillar-num">05</span><h3>Integrative Psychology</h3><p>The heavy emotional burdens you carry are entirely real, yet they are rarely addressed. From the silent pressures of leadership to chronic decision fatigue and the unique loneliness that comes with holding everything together. We see you. We integrate evidence-based psychological methods seamlessly into the fast-paced reality of your daily life.</p></div>
            <div className="pillar rise"><span className="pillar-num">06</span><h3>Narrative &amp; Inner Work</h3><p>The stories you carry quietly shape how you live, make decisions, and recover. We help you uncover the inherited and unconscious narratives running beneath your choices, empowering you to rewrite the scripts that no longer serve the woman you have become.</p></div>
            <div className="pillar rise"><span className="pillar-num">07</span><h3>Mindfulness &amp; Yoga</h3><p>Mindfulness and movement practices designed for women who have only five minutes, and need them to count. We deliver grounding breathwork you can use anywhere and intentional yoga that adapts seamlessly to a demanding schedule.</p></div>
            <div className="pillar rise"><span className="pillar-num">08</span><h3>Travel &amp; Stress Recovery</h3><p>Jet lag protocols, sleep optimization across time zones, targeted hydration, and recovery methods designed specifically for women who move through the world at pace. Learn how to travel internationally without letting it deplete your vital energy, and discover how to return home feeling genuinely restored.</p></div>
          </div>
        </div>
      </section>

      <section className="net">
        <div className="wrap">
          <p className="label rise">The Practitioner Network</p>
          <h2 className="rise">One platform. The world&apos;s best practitioners.</h2>
          <p className="net-sub rise">Every practitioner on this platform is personally vetted and aligned with the Global Flow philosophy: holistic, evidence-informed, culturally fluent, and built for women who carry it all.</p>
          <div className="net-grid">
            <div className="prac lead rise">
              <div className="prac-mono">S</div>
              <span className="prac-status">Founder</span>
              <h3>Sarah DeSouza</h3>
              <p>Master of Science in Integrative Psychology, specializing in Relational Intelligence &amp; Narrative Therapy; IIN Holistic Nutrition Certification, specializing in Gut &amp; Hormonal Health.</p>
              <p>Bridging the gap between physiological data and psychological depth, Sarah designs frameworks that heal both the body&apos;s systems and the mind&apos;s internal narratives.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">A</div>
              <span className="prac-status">Announced Soon</span>
              <h3>Ayurvedic Practitioner</h3>
              <p>Specialization: Ancient Indian healing traditions adapted for high-performance, modern life.</p>
              <p>Utilizing personalized, dosha-based nutrition, precise herbal protocols, and seasonal wellness rhythms to restore baseline vitality.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">M</div>
              <span className="prac-status">Announced Soon</span>
              <h3>Menopause &amp; Lifespan Therapist</h3>
              <p>Specialization: Perimenopause, menopause, and post-menopausal longevity.</p>
              <p>Providing holistic hormone balancing alongside dedicated emotional support and lifestyle protocols engineered for every biological milestone.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">G</div>
              <span className="prac-status">Announced Soon</span>
              <h3>Holistic Gut Health Specialist</h3>
              <p>Specialization: Women-focused gastrointestinal restoration and microbiome analysis.</p>
              <p>Designing highly effective elimination protocols and nutrition plans built to work efficiently around demanding schedules and frequent travel.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">H</div>
              <span className="prac-status">Announced Soon</span>
              <h3>Hormone Health Practitioner</h3>
              <p>Specialization: Endocrine optimization through non-invasive, natural protocols.</p>
              <p>Supporting systemic hormone balance across life&apos;s chapters, from early adulthood through post-menopause and beyond.</p>
            </div>
            <div className="prac rise">
              <div className="prac-mono">Y</div>
              <span className="prac-status">Confirmed</span>
              <h3>Mindfulness &amp; Yoga Instructor</h3>
              <p>Specialization: Breathwork, somatic movement, and secular mindfulness practices.</p>
              <p>Delivering functional yoga that fits into a real, high-pressure workday and high-utility meditation protocols that deliver results in under five minutes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="culture">
        <div className="wrap">
          <p className="label rise" style={{ textAlign: "center" }}>Rooted in Every Culture</p>
          <h2 className="rise">Wellness has never been one-size-fits-all.</h2>
          <p className="rise">Every culture carries its own profound healing wisdom, and Global Flow honors that heritage. Our practitioners draw from time-tested traditions across the globe, because whether you are a woman in São Paulo or a woman in Seoul, you deserve wellness that speaks to your roots, your culture, and who you truly are.</p>
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
            <h2>Two ways to begin.</h2>
            <p>Whether you are joining for yourself or partnering as a practitioner.</p>
          </div>
          <div className="form-grid">

            <div className="card featured rise">
              <p className="label">For Women</p>
              <h3>Stay in the Know</h3>
              <p>Be the first to know when Global Flow Wellness launches. Leave your details and we will reach out when we are ready for you.</p>
              <form id="womenForm" noValidate>
                <div className="field"><input type="text" name="name" placeholder="Your name" required /></div>
                <div className="field"><input type="email" name="email" placeholder="Email address" required /></div>
                <div className="field">
                  <label>What interests you most</label>
                  <select name="interest">
                    <option>Nutrition &amp; Gut Health</option>
                    <option>Hormone Health</option>
                    <option>Integrative Psychology</option>
                    <option>Somatic Therapy</option>
                    <option>Narrative &amp; Inner Work</option>
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

            <div className="card rise">
              <p className="label">For Practitioners</p>
              <h3>Partner With Us</h3>
              <p>Are you a holistic health practitioner who works with women? We are building a global network and would love to hear from you.</p>
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
              </form>
            </div>

          </div>
          <p className="form-note">All inquiries are confidential. You&apos;ll hear from Sarah within 48 hours.</p>
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
