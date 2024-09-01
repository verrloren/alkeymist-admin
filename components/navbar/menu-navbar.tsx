"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { Button } from "../ui/button";
import useMenuModal from "@/hooks/use-menu-modal";
import { useParams, usePathname } from "next/navigation";

export function MenuNavbar() {
  const [open, setOpen] = useState(false);

  const menuModal = useMenuModal();

  const onMenuOpen: MouseEventHandler = (e) => {
    e.stopPropagation();

    menuModal.onOpen();
  };

  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <div className="">
      <Button
        onClick={onMenuOpen}
        className="flex items-center rounded-md 
				 bg-transparent shadow-none text-neutral-900 hover:bg-transparent
				px-4 py-1 transition-colors dark:bg-transparent 
				dark:text-neutral-200 dark:shadow-none dark:hover:bg-transparent 
				dark:hover:text-neutral-50"
      >
        <Menu size={18} className="cursor-pointer" />
      </Button>

      {open && (
        <div className="absolute right-0 top-20 rounded-md border border-neutral-200 bg-white p-4 dark:border-neutral-900 dark:bg-[#070707]">
          <div className="flex flex-col gap-y-2">
            {routes.map((route) => (
              <Link
                className="transition-colors dark:text-neutral-300 dark:hover:text-neutral-100"
                key={route.label}
                href={route.href}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
