"use client";
import Link from "next/link";
import Header from "@/components/Header";
import DishCard from "@/components/DishCard";
import { useState } from "react";
import NavLink from "@/components/NavLink";
import { Disclosure, DisclosurePanel, Transition } from "@headlessui/react";
function page() {
  const [value, setValue] = useState("VALUE HERE");
  const clicker = () => {
    setValue((cur) => !cur);
    console.log(value);
  };
  return (
    <>
      <Header></Header>
      <div>
        {/* <DishCard clicker={() => clicker(value)} /> */}
        <button className="mt-24 text-3xl" onClick={clicker}>
          ORIGINAL
        </button>
        <Transition show={value}>
          <div className="transition duration-300 ease-in data-[closed]:opacity-0">
            <div className="px-4 mt-12 transition duration-300 ease-in flex space-y-4 flex-col ">
              <NavLink href={"/"}>one</NavLink>
              <NavLink href={"/"}>two</NavLink>
              <NavLink href={"/"}>three</NavLink>
              <NavLink href={"/"}>onefour</NavLink>
            </div>
          </div>
        </Transition>
        <Disclosure>
          <DisclosurePanel>
            <Transition>
              <div className="px-4 bg-red-100 transition duration-300 ease-in flex space-y-4 flex-col -mt-4">
                <NavLink href={"/"}>one</NavLink>
                <NavLink href={"/"}>two</NavLink>
                <NavLink href={"/"}>three</NavLink>
                <NavLink href={"/"}>onefour</NavLink>
              </div>
            </Transition>
          </DisclosurePanel>
        </Disclosure>
        <Link href={"/"}>Home</Link>
      </div>
    </>
  );
}

export default page;
