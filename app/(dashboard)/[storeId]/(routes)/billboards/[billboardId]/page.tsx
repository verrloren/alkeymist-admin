import { db } from "@/lib/db"
import { BillboardForm } from "./components/billboard-form"


export default async function BillboardPage(
	{ params }: { params: { billboardId: string } }
) {

	const billboard = await db.billboard.findUnique({
		where: {
			id: params.billboardId
		}
	})

	return (
		<div className="flex-col dark:bg-[#030303] h-[90dvh]">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<BillboardForm
					initialData={billboard}
				/>
			</div>
		</div>
	)
}
