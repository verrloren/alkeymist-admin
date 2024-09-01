import { db } from "@/lib/db"
import { SizesForm } from "./components/sizes-form"


export default async function SizesPage(
	{ params }: { params: { sizeId: string } }
) {

	const size = await db.size.findUnique({
		where: {
			id: params.sizeId
		}
	})

	return (
		<div className="flex-col dark:bg-[#030303] min-h-[90dvh]">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SizesForm
					initialData={size}
				/>
			</div>
		</div>
	)
}
