import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fvyxptkuhnvabsxqsktk.supabase.co",
  "sb_publishable_Q0MU1xBQNIHIG-YbjR_uMA_SUaeALSl"
);

const tierMap: Record<string, string> = {
  "price_1TOL0YAca0elMraMeRYjMwgR": "live-6-week",
  "price_1TOL4CAca0elMraM7NiMjY6x": "self-guided-full",
  "price_1TOL5oAca0elMraMffZCesw2": "self-guided-monthly",
  "price_1TOL89Aca0elMraMIwqQmD4r": "one-on-one",
};

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    // Payment completed — set tier
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const memberId = session.metadata?.memberId;
      const priceId = session.metadata?.priceId;
      const customerEmail = session.customer_email;

      if (memberId && priceId) {
        const tier = tierMap[priceId] || "paid";
        await supabase.from("members").update({ tier }).eq("id", memberId);
      } else if (customerEmail && priceId) {
        // Fallback: find member by email if memberId missing
        const tier = tierMap[priceId] || "paid";
        await supabase.from("members").update({ tier }).eq("email", customerEmail);
      }

      // Notify Sarah
      await fetch("https://formspree.io/f/xkokrjzv", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: "New Payment Received!",
          email: customerEmail || "unknown",
          tier: tierMap[priceId || ""] || "unknown",
          amount: session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : "unknown",
        }),
      }).catch(() => {});
    }

    // Subscription cancelled — downgrade to free
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const customerEmail = subscription.customer_email;
      if (customerEmail) {
        await supabase.from("members").update({ tier: "free" }).eq("email", customerEmail);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
