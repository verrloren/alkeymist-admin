import { format } from "date-fns";
import { db } from "@/lib/db";
import { OrderClient } from "./components/client";
import { OrdersColumn } from "./components/columns";
import { formatter } from "@/lib/utils";


export default async function OrdersPage({
	params
}: {
	params: { storeId: string }
}) {
	const orders = await db.order.findMany({
		where: {
			storeId: params.storeId
		},
		include: {
			orderItems:{
				include: {
					product: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	const formattedOrders: OrdersColumn[] = orders.map((item) => ({
		id: item.id,
		phone: item.phone,
		address: item.address,
		isPaid : item.isPaid,
		products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
		totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
			if (item.product.newprice) {
				return total + Number(item.product.newprice)
				
			} else {
				return total + Number(item.product.price)
			}
		}, 0)),
		createdAt: format(item.createdAt, 'MMMM do, yyyy')
	}))

	return (
		<div className="flex-col dark:bg-[#030303]">
			<div className="flex-1 space-g-4 p-8 pt-6">
				<OrderClient data={formattedOrders} />
			</div>
		</div>
	)
}
