"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface MenuModalComponentProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MenuModalComponent({
  open,
  onClose,
  children,
}: MenuModalComponentProps) {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 "
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 "
          leaveTo="opacity-0"
        >
          <div className="flex fixed  inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed w-full lg:bottom-3 bottom-0 left-0 overflow-y-auto z-50">
          <div className="flex min-h-[70dvh] items-center  justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-3xl
							rounded-lg text-left align-middle"
              >
                <div
                  className="relative flex w-full min-h-[55dvh] lg:min-h-[80dvh] overflow-hidden
								bg-white/90 dark:bg-[#070707]/90 backdrop-blur-md px-4 pb-8 pt-14 
								shadow-2xl sm:px-6 sm:pt-9 md:p-6 lg:p-8 rounded-lg border border-neutral-50 dark:border-neutral-800"
                >
                  <div className="absolute right-4 top-4">
                    <Button 
											onClick={onClose}
											className="w-8 h-8 p-0
											rounded-full dark:bg-neutral-200 hover:bg-neutral-100
											 dark:hover:bg-neutral-300"
										>
                      <X className="" size={18} />
                    </Button>
                  </div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default MenuModalComponent;
