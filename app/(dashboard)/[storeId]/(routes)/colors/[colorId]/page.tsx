import { db } from "@/lib/db"
import { ColorsForm } from "./components/color-form"


export default async function ColorsPage(
	{ params }: { params: { colorId: string } }
) {

	const color = await db.color.findUnique({
		where: {
			id: params.colorId
		}
	})

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ColorsForm
					initialData={color}
				/>
			</div>
		</div>
	)
}
