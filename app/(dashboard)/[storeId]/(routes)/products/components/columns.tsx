"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
	price: string;
	newprice?: string;
	size: string;
	category:  string;
	isFeatured: boolean;
	onCarousel:	boolean;
	onSale:	boolean;
	isArchived: boolean;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
	{
		accessorKey: "onCarousel",
		header: "Carousel"
	},
	{
		accessorKey: "onSale",
		header: "Sale"
	},
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "newprice",
    header: "New Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
]
