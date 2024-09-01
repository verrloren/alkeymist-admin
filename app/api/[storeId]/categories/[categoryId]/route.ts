import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

///////////////////////////////////////GET

export async function GET ( 
	req: Request, 
	{ params } : { params : { categoryId: string  }} 
) {
	try {
		
		if (!params.categoryId) {
			return new NextResponse('Category not found', { status: 404 });
		};

		const category = await db.category.findUnique({
			where: {
				id: params.categoryId,
			},
			include: {
				billboard: true
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_GET]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}


/////////////////////////////////////PATCH

export async function PATCH ( 
	req: Request, 
	{ params } : { params : { storeId: string, categoryId: string }} 
) {
	try {

		const session = await auth();
		const userId = session?.user?.id;

		const body = await req.json();
		const { name, billboardId } = body;
		
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		};

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		};

		if (!billboardId) {
			return new NextResponse('Billboard url is required', { status: 400 });
		};

		if (!params.categoryId) {
			return new NextResponse('Category not found', { status: 404 });
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

		const categories = await db.category.updateMany({
			where: {
				id: params.categoryId,
			},
			data: {
				name,
				billboardId
			}
		});

		return NextResponse.json(categories);
	} catch (error) {
		console.log('[CATEGORY_PATCH]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}


////////////////////////////////DELETE


export async function DELETE ( 
	req: Request, 
	{ params } : { params : { storeId: string, categoryId: string  }} 
) {
	try {

		const session = await auth();
		const userId = session?.user?.id;
		
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		};

		if (!params.categoryId) {
			return new NextResponse('Category not found', { status: 404 });
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

		const category = await db.category.deleteMany({
			where: {
				id: params.categoryId,
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_DELETE]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}

