'use client'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { SizesColumn, columns } from './columns';
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface SizesClientProps { 
	data: SizesColumn[]
}

export function SizesClient({ data }: SizesClientProps) {

	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Sizes ${data.length}`}
				/>	

		
			</div>


			<DataTable searchKey="name" categoryPath="sizes" columns={columns} data={data} />

			<Heading 
				title="API"
				description="API calls for Sizes"
			/>
			<ApiList entityName="sizes" entityIdName="sizesId" />
		</>
	)
}
