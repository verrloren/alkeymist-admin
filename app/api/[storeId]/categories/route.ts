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

		const { name, billboardId } = body;
		
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		};

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		};

		if (!billboardId) {
			return new NextResponse('Billboard url is required', { status: 404 });
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

		const category = await db.category.create({
			data: {
				name,
				billboardId, 
				storeId: params.storeId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORIES_POST	]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
};



//////////////////////////////			GET

export async function GET ( 
	req: Request, 
	{ params } : { params : { storeId: string }} 
) {
	try {

		if(!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const categories = await db.category.findMany({
			where: {
				storeId: params.storeId
			}
		});

		return NextResponse.json(categories);
	} catch (error) {
		console.log('[CATEGORY_GET	]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
};

