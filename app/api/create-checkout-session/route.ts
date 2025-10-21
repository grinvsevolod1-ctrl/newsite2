import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, currency, description } = await request.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency || "byn",
            product_data: {
              name: "Заказ разработки",
              description: description,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/order/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${request.nextUrl.origin}/order?canceled=true`,
      metadata: {
        orderId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
