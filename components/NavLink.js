'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"

function NavLink({ href, children }) {
    const path = usePathname();

    return (
        <Link href={href} className={`capitalize font-semibold text-lg text-red-100 hover:text-red-200 ${path === href ? ' underline decoration-red-100 underline-offset-8' : ''}`}>
            {children}
        </Link>
    )
}

export default NavLink
