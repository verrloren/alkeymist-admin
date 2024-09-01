import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

///////////////////////////////////////GET

export async function GET ( 
	req: Request, 
	{ params } : { params : { billboardId: string  }} 
) {
	try {
		
		if (!params.billboardId) {
			return new NextResponse('Billboard not found', { status: 404 });
		};

		const billboard = await db.billboard.findUnique({
			where: {
				id: params.billboardId,
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_GET]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}


/////////////////////////////////////PATCH

export async function PATCH ( 
	req: Request, 
	{ params } : { params : { storeId: string, billboardId: string }} 
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
			return new NextResponse('Name is required', { status: 400 });
		};

		if (!imageUrl) {
			return new NextResponse('Image url is required', { status: 400 });
		};

		if (!params.billboardId) {
			return new NextResponse('BillboardId not found', { status: 404 });
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

		const billboard = await db.billboard.updateMany({
			where: {
				id: params.billboardId,
			},
			data: {
				label,
				imageUrl
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_PATCH]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}


////////////////////////////////DELETE


export async function DELETE ( 
	req: Request, 
	{ params } : { params : { storeId: string, billboardId: string  }} 
) {
	try {

		const session = await auth();
		const userId = session?.user?.id;
		
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		};

		if (!params.billboardId) {
			return new NextResponse('Billboard not found', { status: 404 });
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

		const billboard = await db.billboard.deleteMany({
			where: {
				id: params.billboardId,
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_DELETE]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}

