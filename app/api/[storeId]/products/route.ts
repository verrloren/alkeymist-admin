import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST ( 
	req: Request, 
	{ params } : { params : { storeId: string }} 
) {
	try {

		const session = await auth();
		const userId = session?.user?.id;
		const body = await req.json();

		const { 
			name,
			price,
			newprice,
			categoryId,
			sizeId,
			images,
			isFeatured,
			onCarousel,
			onSale,
			isArchived
		 } = body;

		 
		

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		};
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		};
		if (!images || !images.length) {
			return new NextResponse('images are required', { status: 400 });
		};
		if (!price) {
			return new NextResponse('Price is required', { status: 404 });
		};
		if (!categoryId) {
			return new NextResponse('Category Id is required', { status: 404 });
		};
		
		if (!sizeId) {
			return new NextResponse('Size Id is required', { status: 404 });
		};

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}


		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if(!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}


		const product = await db.product.create({
			data: {
				name,
				price,
				newprice,
				isFeatured,
				onCarousel,
				onSale,
				isArchived,
				categoryId,
				sizeId,
				storeId: params.storeId,
				images: {
					createMany: {
						data: [
							...images.map((image: { url: string }) => image)
						]
					}
				}
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_POST	]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
};



//////////////////////////////			GET

export async function GET ( 
	req: Request, 
	{ params } : { params : { storeId: string }} 
) {
	try {

		const { searchParams } = new URL(req.url)
		const categoryId = searchParams.get("categoryId") || undefined;
		const sizeId = searchParams.get("sizeId") || undefined;
		const isFeatured = searchParams.get("isFeatured");
		const onCarouse = searchParams.get("onCarousel");
		const onSale = searchParams.get("onSale");
		const newprice = searchParams.get("newprice") || undefined;

		if(!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const product = await db.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				sizeId: sizeId ? sizeId : undefined,
				isFeatured: isFeatured ? true : undefined,
				onCarousel: onCarouse ? true : undefined,
				onSale: onSale ? true : undefined,
				newprice: newprice ? newprice :  undefined,
				isArchived: false,	
			},
			include: {
				images: true,
				category: true,
				size: true
			},
			orderBy: {
				//loading newest ones
				createdAt: 'desc'
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_POST	]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
};

