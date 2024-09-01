"use client";

import useMenuModal from "@/hooks/use-menu-modal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MenuModalComponent from "./menu-modal-component";
import { useParams, usePathname } from "next/navigation";
import { Socials } from "../socials";


export function MenuModal() {

  const menuModal = useMenuModal();

	const pathname = usePathname();
	const params = useParams();

	const routes = [
		{
			href: `/${params.storeId}/billboards`,
			label: 'Billboards',
			active: pathname === `/${params.storeId}/billboards`
		},
		{
			href: `/${params.storeId}/categories`,
			label: 'Categories',
			active: pathname === `/${params.storeId}/categories`
		},
		{
			href: `/${params.storeId}/sizes`,
			label: 'Sizes',
			active: pathname === `/${params.storeId}/sizes`
		},
		{
			href: `/${params.storeId}/products`,
			label: 'Products',
			active: pathname === `/${params.storeId}/products`
		},
		{
			href: `/${params.storeId}/orders`,
			label: 'Orders',
			active: pathname === `/${params.storeId}/orders`
		},
		{
			href: `/${params.storeId}/settings`,
			label: 'Settings',
			active: pathname === `/${params.storeId}/settings`
		}
	];

  return (
    <MenuModalComponent open={menuModal.isOpen} onClose={menuModal.onClose}>
      <div className="mx-4 flex w-full flex-col justify-start">
        <div className="flex w-full flex-col items-start justify-center gap-y-4 pt-4">

          {routes.map((route) => (
            <div
              className="group flex w-1/3 items-center justify-between"
              key={route.label}
            >
              <Link
                className="text-3xl font-semibold text-neutral-900 
								transition-colors hover:text-neutral-800 
								dark:text-neutral-200 dark:hover:text-neutral-50"
								key={route.label} 
								onClick={menuModal.onClose}
								href={route.href}>
									{route.label}
								</Link>


              <div className="flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all group-hover:translate-x-4 group-hover:opacity-100">
                <ArrowRight />
              </div>
            </div>
          ))}
        </div>


        {/* SOCIALS */}
        <div className="mt-44 flex w-1/3 flex-col">
          <div className="mt-2 flex flex-row items-center justify-between gap-x-4">
            <Socials />
          </div>
        </div>

      </div>
    </MenuModalComponent>
  );
}
