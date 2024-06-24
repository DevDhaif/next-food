import Link from "next/link"
import Header from "@/components/Header"
function page() {
    return (
        <>
            <Header></Header>
            <div>
                <p>About Us </p>
                <Link href={'/'}>Home</Link>
            </div>
        </>
    )
}

export default page