import Stripe from 'stripe'
import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { GSP_NO_RETURNED_VALUE } from 'next/dist/lib/constants'

// cross origin headers for cross origin requests
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
// OPTIONS method for preflight requests
export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {

	// getting product ids that were added to cart
	const { productIds } = await req.json();

	// if no product ids are provided, return an error
	if (!productIds || productIds.length === 0) {
		return new NextResponse('Product ids are required', { status: 400 });
	}
	
	// getting products that were added to cart
	const products = await db.product.findMany({
		where: {
			id: {
				in: productIds
			}
		}
	})

	// 
	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

	products.forEach((product) => {
		line_items.push({
			quantity: 1,
			price_data: {
				currency: 'USD',
				product_data: {
					name: product.name
				},
				// unit_amount: Number(product.price) * 100
				unit_amount: (product.newprice?.toNumber() === 0 ? Number(product.newprice) * 100 : Number(product.price)) * 100
				
			}
		})
	});
	
	const order = await db.order.create({
		data: {
			storeId: params.storeId,
			isPaid: false,
			orderItems: {
				create: productIds.map((productId: string) => ({
					product: {
						connect: {
							id: productId
						}
					}
				}))
			}
		}
	})

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: "payment",
		billing_address_collection: 'required',
		phone_number_collection: {
			enabled: true
		},
		success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
		cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
		metadata: {
			orderId: order.id
		}
	});

	return NextResponse.json({ url: session.url }, { headers: corsHeaders })

}