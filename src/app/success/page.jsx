// app/payment/success/page.jsx
import { redirect } from "next/navigation";
import { CheckCircle2, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { stripe } from "../../lib/stripe";
import { createPayment } from "@/lib/actions/payment";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "LegalEase | Payment Successful",
};

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const user = await getUserSession();
    const paymentData = {
      sessionId: session_id,
      userId: metadata?.userId,
      lawyerId: metadata?.lawyerId,
      price: Number(metadata?.price),
      paymentAccountId: metadata?.paymentAccountId,
    };

    try {
      // console.log("Sending data to DB:", paymentData);
      await createPayment(paymentData);
      // console.log("Database insertion successful!");
    } catch (error) {
      console.error("Database Insertion Failed Error:", error);
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground transition-colors duration-300">
        {/* মেইন কন্টেইনার কার্ড */}
        <div
          className="w-full max-w-md p-8 rounded-2xl border bg-card text-card-foreground shadow-xl relative overflow-hidden transition-all"
          style={{
            borderColor: "var(--border, #E5D4B6)",
          }}
        >
          {/* টপ ডেকোরেশন লাইন - আপনার দেওয়া #E5D4B6 কালার */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: "#E5D4B6" }}
          />

          {/* সাকসেস আইকন ও হেডার */}
          <div className="flex flex-col items-center text-center mb-6">
            <div
              className="p-4 rounded-full mb-4 animate-in fade-in zoom-in duration-300"
              style={{ backgroundColor: "rgba(229, 212, 182, 0.15)" }}
            >
              <CheckCircle2
                className="w-12 h-12"
                style={{ color: "#E5D4B6" }}
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Thank you for your trust and business.
            </p>
          </div>

          {/* পেমেন্ট সামারি সেকশন */}
          <div
            className="rounded-lg p-4 mb-6 border text-sm space-y-3 bg-muted/20"
            style={{ borderColor: "rgba(229, 212, 182, 0.3)" }}
          >
            <div className="flex justify-between items-center pb-2 border-b border-dashed border-muted-foreground/20">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-semibold text-base">
                ${paymentData.price}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Session ID</span>
              <span className="font-mono text-muted-foreground truncate max-w-[180px]">
                {paymentData.sessionId}
              </span>
            </div>
          </div>

          {/* ইনফরমেশন মেসেজ */}
          <div className="space-y-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
              <Mail
                className="w-5 h-5 mt-0.5 shrink-0"
                style={{ color: "#E5D4B6" }}
              />
              <p>
                A confirmation email has been sent to{" "}
                <span className="font-medium text-foreground">
                  {customerEmail}
                </span>{" "}
                with your receipt details.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
              <ShieldCheck
                className="w-5 h-5 mt-0.5 shrink-0"
                style={{ color: "#E5D4B6" }}
              />
              <p>
                Your consultation request is secured. For assistance, reach out
                at{" "}
                <a
                  href="mailto:orders@example.com"
                  className="font-medium underline hover:text-foreground transition-colors"
                >
                  orders@example.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* অ্যাকশন বাটনস */}
          <div className="space-y-2.5">
            {/* ড্যাশবোর্ড বাটন - আপনার থিম অনুযায়ী ব্যাকগ্রাউন্ড #E5D4B6 এবং টেক্সট ডার্ক #1d1d1d */}
            <Link
              href={`/dashboard/${user?.role}`}
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-10 px-4 py-2 hover:opacity-90 shadow active:scale-[0.98]"
              style={{ backgroundColor: "#E5D4B6", color: "#1d1d1d" }}
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 active:scale-[0.98]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
