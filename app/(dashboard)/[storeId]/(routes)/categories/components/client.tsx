'use client'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from './columns';
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps { 
	data: CategoryColumn[]
}

export function CategoryClient({ data }: CategoryClientProps) {

	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Categories ${data.length}`}
					description=""
				/>	

				{/* <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
					<Plus className="mr-2 h-4 w-4" />
					Add new
				</Button> */}
			</div>


			<DataTable searchKey="name" categoryPath="categories" columns={columns} data={data} />

			<Heading 
				title="API"
				description="API calls for Categories"
			/>
			<Separator />
			<ApiList entityName="categories" entityIdName="categoryId" />
		</>
	)
}
