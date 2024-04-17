'use client'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ProductColumn, columns } from './columns';
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ProductClientProps { 
	data: ProductColumn[]
}

export function ProductClient({ data }: ProductClientProps) {

	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Products ${data.length}`}
					description="Manage your products here."
				/>	

				<Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
					<Plus className="mr-2 h-4 w-4" />
					Add new
				</Button>
			</div>

			<Separator />

			<DataTable searchKey="name" columns={columns} data={data} />

			<Heading 
				title="API"
				description="API calls for Products"
			/>
			<Separator />
			<ApiList entityName="products" entityIdName="productId" />
		</>
	)
}
