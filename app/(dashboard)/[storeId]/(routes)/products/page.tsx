import { format } from "date-fns";
import { db } from "@/lib/db";
import { ProductClient } from "./components/client";
import { formatter } from "@/lib/utils";
import { ProductColumn } from "./components/columns";


export default async function ProductsPage({
	params
}: {
	params: { productId: string }
}) {
	const products = await db.product.findMany({
		where: {
			storeId: params.productId
		},
		include: {
			category: true,
			size: true,
		},
		orderBy: {
			createdAt: 'desc'
		},
	});

	const formattedProducts: ProductColumn[] = products.map((item) => ({
		id: item.id,
		name: item.name,
		isFeatured: item.isFeatured,
		onCarousel: item.onCarousel,
		onSale: item.onSale,
		isArchived: item.isArchived,
		price: formatter.format(item.price.toNumber()),
		newprice: item.newprice ? formatter.format(item.newprice.toNumber()) : undefined,
		category: item.category.name,
		size: item.size.name ? item.size.name :  "",
		createdAt: format(item.createdAt, 'MMMM do, yyyy')
	}))

	return (
		<div className="flex-col">
			<div className="flex-1 space-g-4 p-8 pt-6">
				<ProductClient data={formattedProducts} />
			</div>
		</div>
	)
}
