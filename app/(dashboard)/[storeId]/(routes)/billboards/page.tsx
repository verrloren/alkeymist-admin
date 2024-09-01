import { format } from "date-fns";
import { db } from "@/lib/db";
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";


export default async function BillboardsPage({
	params
}: {
	params: { storeId: string }
}) {
	const billboard = await db.billboard.findMany({
		where: {
			storeId: params.storeId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	const formattedBillboards: BillboardColumn[] = billboard.map((item) => ({
		id: item.id,
		label: item.label,
		createdAt: format(item.createdAt, 'MMMM do, yyyy')
	}))

	return (
		<div className="flex-col dark:bg-darker">
			<div className="flex-1 space-g-4 p-8 pt-6">
				<BillboardClient data={formattedBillboards} />
			</div>
		</div>
	)
}
