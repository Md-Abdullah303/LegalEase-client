import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const user = await getUserSession();
    const formData = await request.formData();
    const price = formData.get("price");
    const lawyerId = formData.get("lawyerId");
    const userId = formData.get("userId");
    const lawyerName = formData.get("lawyerName");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              name: lawyerName,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
        lawyerId,
        price: Number(price),
        paymentAccountId: user?.id,
        userEmail: user?.email,
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
