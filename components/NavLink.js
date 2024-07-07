"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, children, closeMenu }) {
  const path = usePathname();

  return (
    <Link
      onClick={closeMenu}
      href={href}
      className={`capitalize z-[120] font-semibold text-lg text-red-100 hover:text-red-200 ${
        path === href ? " underline decoration-red-100 underline-offset-8" : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
