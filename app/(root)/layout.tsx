import { auth } from '@/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function DashLayout({
	children,
	params }: {
		children: React.ReactNode,
		params: { storeId: string }
	}) {

	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		redirect('/auth/login')
	}


	const store = await db.store.findFirst({
		where: {
			userId
		}
	});

	if (store) {
		redirect(`/${store.id}`)
	};

	return (
		<>
			{children}
		</>
	)
}