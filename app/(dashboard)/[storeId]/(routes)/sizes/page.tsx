import { format } from "date-fns";
import { db } from "@/lib/db";
import { SizesColumn } from "./components/columns";
import { SizesClient } from "./components/client";


export default async function SizesPage({
	params
}: {
	params: { storeId: string }
}) {
	const sizes = await db.size.findMany({
		where: {
			storeId: params.storeId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	const formattedSizes: SizesColumn[] = sizes.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy')
	}))

	return (
		<div className="dark:bg-[#030303] flex-col">
			<div className="flex-1 space-g-4 p-8 pt-6">
				<SizesClient data={formattedSizes} />
			</div>
		</div>
	)
}
