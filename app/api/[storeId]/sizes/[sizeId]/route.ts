import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

///////////////////////////////////////GET

export async function GET ( 
	req: Request, 
	{ params } : { params : { sizeId: string  }} 
) {
	try {
		
		if (!params.sizeId) {
			return new NextResponse('Size id is required', { status: 404 });
		};

		const size = await db.size.findUnique({
			where: {
				id: params.sizeId,
			}
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_GET]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}


/////////////////////////////////////PATCH

export async function PATCH ( 
	req: Request, 
	{ params } : { params : { storeId: string, sizeId: string }} 
) {
	try {

		const session = await auth();
		const userId = session?.user?.id;

		const body = await req.json();
		const { name, value } = body;
		
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		};

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		};

		if (!value) {
			return new NextResponse('Value is required', { status: 400 });
		};

		if (!params.sizeId) {
			return new NextResponse('Size Id not found', { status: 404 });
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

		const size = await db.size.updateMany({
			where: {
				id: params.sizeId,
			},
			data: {
				name,
				value
			}
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZES_PATCH]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}


////////////////////////////////DELETE


export async function DELETE ( 
	req: Request, 
	{ params } : { params : { storeId: string, sizeId: string  }} 
) {
	try {

		const session = await auth();
		const userId = session?.user?.id;
		
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		};

		if (!params.sizeId) {
			return new NextResponse('Size Id not found', { status: 404 });
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

		const size = await db.size.deleteMany({
			where: {
				id: params.sizeId,
			}
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZES_DELETE]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}

