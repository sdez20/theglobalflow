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

export default function Privacy() {
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
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 400, color: C.dark, marginBottom: 12 }}>Privacy Policy</h1>
          <p style={{ fontSize: 13, color: C.sage, marginBottom: 40 }}>Last updated: April 20, 2026</p>

          <p style={pStyle}>The Global Flow™ ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website at theglobalflow.co and use our services.</p>

          <h3 style={h3Style}>Information We Collect</h3>
          <p style={pStyle}>We collect information you provide directly to us, including:</p>
          <ul>{["Name, email address, and phone number","LinkedIn profile URL and professional title","Account credentials (email and password)","Information submitted through forms (waitlist, coaching applications, community posts)","Payment information (processed securely by Stripe; we do not store card details)"].map((t,i) => <li key={i} style={liStyle}>{t}</li>)}</ul>

          <h3 style={h3Style}>How We Use Your Information</h3>
          <p style={pStyle}>We use the information we collect to:</p>
          <ul>{["Create and manage your account","Provide access to our community, modules, and resources","Process payments through our secure payment provider, Stripe","Respond to your inquiries, including Ask Sarah submissions","Send you updates about your membership, new content, and program launches","Improve our website and services"].map((t,i) => <li key={i} style={liStyle}>{t}</li>)}</ul>

          <h3 style={h3Style}>Payment Processing</h3>
          <p style={pStyle}>All payment transactions are processed through Stripe, Inc. We do not store, collect, or have access to your full credit card details. Stripe's privacy policy and security practices govern the handling of your payment information. You can review Stripe's privacy policy at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>.</p>

          <h3 style={h3Style}>Data Storage and Security</h3>
          <p style={pStyle}>Your personal data is stored securely using Supabase, a cloud database platform with built in encryption and row level security. We use HTTPS encryption across our entire website to protect data in transit. While we take reasonable measures to protect your information, no method of transmission over the internet is 100% secure.</p>

          <h3 style={h3Style}>Information Sharing</h3>
          <p style={pStyle}>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
          <ul>{["With service providers who help us operate our business (Stripe for payments, Supabase for data storage, Formspree for form submissions, Vercel for hosting)","If required by law or to protect our rights","With your consent"].map((t,i) => <li key={i} style={liStyle}>{t}</li>)}</ul>

          <h3 style={h3Style}>Community Content</h3>
          <p style={pStyle}>When you post in the Community Chat, Network, or Ask Sarah sections, your first name, last initial, and professional title may be visible to other community members. We do not share your email address, password, or other personal details with other members.</p>

          <h3 style={h3Style}>Cookies</h3>
          <p style={pStyle}>We use essential cookies and local storage to keep you logged in and remember your preferences. We do not use tracking cookies or share cookie data with advertisers.</p>

          <h3 style={h3Style}>Your Rights</h3>
          <p style={pStyle}>You have the right to:</p>
          <ul>{["Access the personal information we hold about you","Request correction of inaccurate information","Request deletion of your account and personal data","Opt out of marketing communications at any time"].map((t,i) => <li key={i} style={liStyle}>{t}</li>)}</ul>
          <p style={pStyle}>To exercise any of these rights, contact us at <a href="mailto:sd@theglobalflow.co">sd@theglobalflow.co</a>.</p>

          <h3 style={h3Style}>GDPR Compliance (European Users)</h3>
          <p style={pStyle}>If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR), including the right to data portability and the right to lodge a complaint with a supervisory authority. Our legal basis for processing your data is your consent (when you sign up) and the performance of our contract with you (when you purchase a program).</p>

          <h3 style={h3Style}>CCPA Compliance (California Users)</h3>
          <p style={pStyle}>If you are a California resident, you have the right to know what personal information we collect, request deletion of your data, and opt out of the sale of your personal information. We do not sell your personal information.</p>

          <h3 style={h3Style}>Children's Privacy</h3>
          <p style={pStyle}>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.</p>

          <h3 style={h3Style}>Changes to This Policy</h3>
          <p style={pStyle}>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>

          <h3 style={h3Style}>Contact Us</h3>
          <p style={pStyle}>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:sd@theglobalflow.co">sd@theglobalflow.co</a></p>

          <div style={{ marginTop: 60, paddingTop: 20, borderTop: `1px solid ${C.borderLight}` }}>
            <p style={{ fontSize: 12, color: C.sage }}>© 2026 The Global Flow™. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
