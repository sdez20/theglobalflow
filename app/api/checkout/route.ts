import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { priceId, email, memberId } = await req.json();
    const isSubscription = priceId === "price_1TOL5oAca0elMraMffZCesw2";

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://theglobalflow.co"}/thankyou?paid=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://theglobalflow.co"}/pricing`,
      metadata: { memberId, priceId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
