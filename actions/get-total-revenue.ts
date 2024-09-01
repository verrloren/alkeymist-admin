import { db } from "@/lib/db"

export const getTotalRevenue = async (storeId: string) => {

	const paidOrders = await db.order.findMany({
		where: {
			storeId,
			isPaid: true
		},
		include: {
			orderItems: {
				include: {
					product: true
				}
			}
		}
	});

	// iterate over all paid orders and sum the total revenue
	const totalRevenue = paidOrders.reduce((total, order) => {
		const orderTotal = order.orderItems.reduce((orderSum, item) => {

			const newPrise = item?.product?.newprice?.toNumber() ?? 0;

			if (item.product.newprice?.toNumber() !== 0) {
				return orderSum + newPrise;
			} else {
				return orderSum + item.product.price.toNumber();
			}	
		}, 0);

		return total + orderTotal;
	}, 0);

	return totalRevenue;
}
