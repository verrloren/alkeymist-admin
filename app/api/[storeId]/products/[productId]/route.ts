import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

///////////////////////////////////////GET

export async function GET ( 
	req: Request, 
	{ params } : { params : { productId: string  }} 
) {
	try {
		
		if (!params.productId) {
			return new NextResponse('Product not found', { status: 404 });
		};

		const product = await db.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
				category: true,
				size: true,
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_GET]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}


/////////////////////////////////////PATCH

export async function PATCH ( 
	req: Request, 
	{ params } : { params : { storeId: string, productId: string }} 
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
		if (!params.productId) {
			return new NextResponse('Product Id is required', { status: 404 });
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


		await db.product.update({
			where: {
				id: params.productId,
			},
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
					deleteMany: {}
				}
			}
		});

		const product = await db.product.update({
			where: {
				id: params.productId,
			},
			data: {
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
		console.log('[PRODUCT_PATCH]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}


////////////////////////////////DELETE


export async function DELETE ( 
	req: Request, 
	{ params } : { params : { storeId: string, productId: string  }} 
) {
	try {

		const session = await auth();
		const userId = session?.user?.id;
		
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		};

		if (!params.productId) {
			return new NextResponse('Product id not found', { status: 404 });
		};

		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if(!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		const product = await db.product.deleteMany({
			where: {
				id: params.productId,
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_DELETE]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}

