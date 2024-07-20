"use client";
import { Disclosure, DisclosureButton, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PiBowlFoodBold } from "react-icons/pi";
import NavLink from "./NavLink";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Meals", href: "/meals", current: false },
  { name: "Share", href: "/meals/share", current: false },
  { name: "About", href: "/about", current: false },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <Disclosure as="nav" className="">
      <div className="mx-auto md:fixed w-full md:left-1/2 md:bg-red-600/40 md:z-[200] md:backdrop-blur-2xl md:-translate-x-1/2 max-w-7xl flex items-center justify-between px-2 sm:px-6 lg:px-8">
        <div className="z-[120]  fixed md:static top-0 pl-4 md:pl-0 bg-red-600 md:bg-transparent left-0 right-0 flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center ">
            <PiBowlFoodBold size={32} className="text-white" />
          </div>
          <div className="absolute inset-y-0 right-4  flex items-center sm:hidden">
            <DisclosureButton className="inline-flex  items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-red-500 ">
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon
                  onClick={() => setOpen(false)}
                  className="block h-6 w-6"
                  aria-hidden="true"
                />
              ) : (
                <Bars3Icon
                  onClick={() => setOpen(true)}
                  className="block h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </DisclosureButton>
          </div>
        </div>
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4 lg:space-x-8 xl:space-x-12">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <Transition show={open}>
        <div className="px-4 inset-0  z-[80] min-h-screen fixed bg-red-600/60 backdrop-blur-[100px] max-h-screen py-16 transition duration-500  ease-in flex data-[closed]:opacity-0 space-y-4 flex-col items-center justify-center ">
          <div className="absolute top-[60%] opacity-30 w-full h-full z-[100]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
              <rect fill="#58FF91" />
              <polygon fill="#7375ce" points="957 450 539 900 1396 900" />
              <polygon fill="#ad7276" points="957 450 872.9 900 1396 900" />
              <polygon fill="#175ee7" points="-60 900 398 662 816 900" />
              <polygon fill="#a04152" points="337 900 398 662 816 900" />
              <polygon fill="#5688ce" points="1203 546 1552 900 876 900" />
              <polygon fill="#a16574" points="1203 546 1552 900 1162 900" />
              <polygon fill="#4095ab" points="641 695 886 900 367 900" />
              <polygon fill="#874b61" points="587 900 641 695 886 900" />
              <polygon fill="#4b9177" points="1710 900 1401 632 1096 900" />
              <polygon fill="#a98094" points="1710 900 1401 632 1365 900" />
              <polygon fill="#83b881" points="1210 900 971 687 725 900" />
              <polygon fill="#885278" points="943 900 1210 900 971 687" />
            </svg>
          </div>
          <div className="absolute inset-[15%] block rounded-full z-10 bg-red-100/20 blur-[100px]"></div>
          <div className="absolute left-1/3 top-1/2 w-12 h-12  block rounded-full z-10 bg-red-100/20 blur-[10px]"></div>
          <div className="absolute left-[10%] top-[30%] w-14 h-14  block rounded-full z-10 bg-red-100/20 blur-[10px]"></div>
          <div className="absolute left-1/3 top-1/4 w-8 h-8  block rounded-full z-10 bg-red-100/20 blur-[10px]"></div>
          <div className="absolute left-[35%] bottom-1/4 w-16 h-16 block rounded-full z-10 bg-red-100/20 blur-[10px]"></div>
          <div className="absolute right-[15%] bottom-[10%] w-20 h-20  block rounded-full z-10 bg-red-100/20 blur-[10px]"></div>
          <div className="absolute left-[10%] top-[10%] w-24 h-24  block rounded-full z-10 bg-red-100/20 blur-[10px]"></div>
          <div className="absolute right-[10%] top-[40%] w-6 h-6  block rounded-full z-10 bg-red-100/20 blur-[10px]"></div>
          <div className="absolute right-[10%] top-[15%] w-8 h-8  block rounded-full z-10 bg-red-100/20 blur-[10px]"></div>
          {navigation.map((item) => (
            <NavLink
              closeMenu={closeMenu}
              key={item.name}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </Transition>
    </Disclosure>
  );
}
