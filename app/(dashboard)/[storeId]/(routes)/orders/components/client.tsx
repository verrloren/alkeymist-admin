'use client'

import { Heading } from "@/components/ui/heading"
import { OrdersColumn, columns } from './columns';
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

interface OrderClientProps {
	data: OrdersColumn[]
}

export function OrderClient({ data }: OrderClientProps) {

	return (
		<>
			<Heading
				title={`Orders ${data.length}`}
			/>
			<DataTable searchKey="products" categoryPath="orders" columns={columns} data={data} />
		</>
	)
}
