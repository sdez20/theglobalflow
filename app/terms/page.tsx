"use client";
import Link from "next/link";

const C = {
  bg: "#FEFCF9", bone: "#F2EAD7", sand: "#E7B88D", teak: "#B08968",
  fawn: "#6A4F2E", sage: "#88856A", dark: "#3A2E1F",
  border: "rgba(176,137,104,0.12)", borderLight: "rgba(176,137,104,0.15)",
};

const h3Style: any = { fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 400, color: C.dark, margin: "40px 0 12px" };
const pStyle: any = { fontSize: 14, lineHeight: 1.8, color: C.fawn, fontWeight: 300, marginBottom: 12 };
const liStyle: any = { fontSize: 14, lineHeight: 1.8, color: C.fawn, fontWeight: 300, marginBottom: 6 };

export default function Terms() {
  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", color: "#474747", background: C.bg, minHeight: "100vh" }}>
      <style>{`*{box-sizing:border-box}a{text-decoration:none;color:#B08968}.tracked{letter-spacing:0.35em;text-transform:uppercase}ul{padding-left:20px;margin-bottom:16px}`}</style>

      <nav style={{ borderBottom: `1px solid ${C.border}`, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <Link href="/" className="tracked" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: C.teak }}>The Global Flow</Link>
          <Link href="/" style={{ fontSize: 12, color: C.fawn, fontWeight: 500 }}>Back to Home</Link>
        </div>
      </nav>

      <section style={{ padding: "80px clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p className="tracked" style={{ fontSize: 10, color: C.sage, marginBottom: 24, letterSpacing: "0.4em", fontWeight: 500 }}>Legal</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Terms of Service</h1>
          <p style={{ fontSize: 13, color: C.sage, marginBottom: 40 }}>Last updated: April 20, 2026</p>

          <p style={pStyle}>Welcome to The Global Flow™. By accessing or using our website at theglobalflow.co, creating an account, purchasing any program, or participating in our community, you agree to be bound by these Terms of Service. Please read them carefully.</p>

          <h3 style={h3Style}>1. Acceptance of Terms</h3>
          <p style={pStyle}>By using our services, you confirm that you are at least 18 years old and agree to comply with these terms. If you do not agree, please do not use our services.</p>

          <h3 style={h3Style}>2. Account Registration</h3>
          <p style={pStyle}>To access certain features, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</p>

          <h3 style={h3Style}>3. Intellectual Property</h3>
          <p style={pStyle}>All content on The Global Flow™ is the exclusive intellectual property of Sarah DeSouza and The Global Flow™, including but not limited to:</p>
          <ul>{["All 15 module curricula and training materials","The Global Flow™ methodology, frameworks, and systems","Templates, workbooks, cheat sheets, and automation libraries","The Shadow AI Playbook, Calendar Crime Scene Kit, Culture Codes, Revenue Recognition Framework, and all named frameworks","Bonus content including Own the Room Run the World, Generational Fluency, Relocation Support Module, and Absence Operations Protocol","Video content, session recordings, and replays","Website design, branding, and written content","Community discussions initiated by The Global Flow™ team"].map((t,i) => <li key={i} style={liStyle}>{t}</li>)}</ul>
          <p style={pStyle}>You may not copy, reproduce, distribute, transmit, display, sell, license, or otherwise exploit any content from The Global Flow™ without our prior written consent. This includes sharing login credentials, screenshots of paid content, downloading and redistributing materials, or recreating our frameworks under a different name.</p>
          <p style={pStyle}>Violation of our intellectual property rights may result in immediate account termination, legal action, and claims for damages.</p>

          <h3 style={h3Style}>4. Membership and Access</h3>
          <p style={pStyle}>Access to programs and content is granted based on the tier you have purchased:</p>
          <ul>{["Free Community Membership: Access to the community chat, network, and Ask Sarah features only.","The Live 6 Week Transformation ($1,497): Access to 6 live modules, session replays, associated templates, and community access. Lifetime access to purchased materials.","The Self Guided Transformation ($997 or $99/month): Access to all 15 modules. Full payment unlocks everything immediately. Monthly payment unlocks 1 to 2 modules per month.","1 on 1 Coaching with Sarah ($5,000): 12 weeks of private coaching, all 15 modules, all bonuses, and lifetime community access."].map((t,i) => <li key={i} style={liStyle}>{t}</li>)}</ul>
          <p style={pStyle}>Membership access is personal and non transferable. Sharing your account with others is prohibited and may result in termination.</p>

          <h3 style={h3Style}>5. Payments and Billing</h3>
          <p style={pStyle}>All payments are processed securely through Stripe. By making a purchase, you agree to Stripe's terms of service. Prices are in USD unless otherwise stated. For monthly subscriptions, your card will be charged automatically each month until you cancel.</p>

          <h3 style={h3Style}>6. Refund Policy</h3>
          <p style={pStyle}>Due to the digital nature of our content and immediate access provided upon purchase:</p>
          <ul>{["Self Guided Transformation (one time payment): Refund requests may be made within 14 days of purchase if fewer than 3 modules have been accessed. No refunds after 14 days or if more than 2 modules have been opened.","Self Guided Transformation (monthly): You may cancel your subscription at any time. No refunds for the current billing period. Access continues until the end of your paid period.","Live 6 Week Transformation: Refund requests may be made before the second live session. No refunds after the second session has occurred.","1 on 1 Coaching: Refund requests may be made before the second coaching session. No refunds after the second session."].map((t,i) => <li key={i} style={liStyle}>{t}</li>)}</ul>
          <p style={pStyle}>To request a refund, contact <a href="mailto:sd@theglobalflow.co">sd@theglobalflow.co</a>.</p>

          <h3 style={h3Style}>7. Community Guidelines</h3>
          <p style={pStyle}>Our community is a safe, professional space. By participating, you agree to:</p>
          <ul>{["Treat all members with respect and professionalism","Maintain confidentiality of discussions shared within the community","Refrain from sharing proprietary content, templates, or materials outside the platform","Not use the community for solicitation, spam, or self promotion without approval","Not engage in harassment, discrimination, or bullying of any kind"].map((t,i) => <li key={i} style={liStyle}>{t}</li>)}</ul>
          <p style={pStyle}>We reserve the right to remove any member who violates these guidelines without a refund.</p>

          <h3 style={h3Style}>8. Coaching Application</h3>
          <p style={pStyle}>Submitting an application for 1 on 1 coaching does not guarantee acceptance. Sarah reserves the right to accept or decline any application at her discretion. Application information is kept confidential and is used solely for the purpose of evaluating fit.</p>

          <h3 style={h3Style}>9. Disclaimers</h3>
          <p style={pStyle}>The Global Flow™ provides educational content and professional development resources. Our programs are not a substitute for professional legal, financial, medical, or psychological advice. Results may vary based on individual effort, circumstances, and commitment. We do not guarantee specific career outcomes, promotions, salary increases, or business results.</p>

          <h3 style={h3Style}>10. Limitation of Liability</h3>
          <p style={pStyle}>To the fullest extent permitted by law, The Global Flow™ and Sarah DeSouza shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, including but not limited to loss of revenue, data, or business opportunities.</p>

          <h3 style={h3Style}>11. Indemnification</h3>
          <p style={pStyle}>You agree to indemnify and hold harmless The Global Flow™ and Sarah DeSouza from any claims, damages, losses, or expenses arising from your violation of these terms or misuse of our services.</p>

          <h3 style={h3Style}>12. Termination</h3>
          <p style={pStyle}>We reserve the right to suspend or terminate your account at any time for violation of these terms, including but not limited to sharing paid content, misuse of the community, or fraudulent activity. Upon termination, your access to all content will be revoked.</p>

          <h3 style={h3Style}>13. Governing Law</h3>
          <p style={pStyle}>These Terms of Service are governed by the laws of the State of New York, United States. Any disputes shall be resolved in the courts of New York County, New York.</p>

          <h3 style={h3Style}>14. Changes to These Terms</h3>
          <p style={pStyle}>We may update these terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the revised terms. We will make reasonable efforts to notify members of significant changes.</p>

          <h3 style={h3Style}>15. Contact</h3>
          <p style={pStyle}>For questions about these Terms of Service, contact us at: <a href="mailto:sd@theglobalflow.co">sd@theglobalflow.co</a></p>

          <div style={{ marginTop: 60, paddingTop: 20, borderTop: `1px solid ${C.borderLight}` }}>
            <p style={{ fontSize: 12, color: C.sage }}>© 2026 The Global Flow™. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
