"use client";
import Link from "next/link";
import Header from "@/components/Header";
import DishCard from "@/components/DishCard";
import { useState } from "react";
function page() {
  const [value, setValue] = useState("VALUE HERE");
  const clicker = (e) => {
    console.log("WHAT");
    console.log(e);
  };
  return (
    <>
      <Header></Header>
      <div>
        {/* <DishCard clicker={() => clicker(value)} /> */}
        <button onClick={() => clicker(value)}>ORIGINAL</button>
        <p>About Us </p>
        <Link href={"/"}>Home</Link>
      </div>
    </>
  );
}

export default page;
