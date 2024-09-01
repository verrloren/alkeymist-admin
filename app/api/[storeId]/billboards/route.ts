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

		const { label, imageUrl } = body;
		
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		};

		if (!label) {
			return new NextResponse('Label is required', { status: 400 });
		};

		if (!imageUrl) {
			return new NextResponse('Image url is required', { status: 404 });
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

		const billboard = await db.billboard.create({
			data: {
				label,
				imageUrl, 
				storeId: params.storeId
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_POST	]', error);
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

		const billboards = await db.billboard.findMany({
			where: {
				storeId: params.storeId
			}
		});

		return NextResponse.json(billboards);
	} catch (error) {
		console.log('[BILLBOARD_POST	]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
};

