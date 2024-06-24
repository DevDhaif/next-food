
import { PiBowlFoodBold } from "react-icons/pi";
import NavLink from './NavLink';

function Header() {
    return (
        <nav className=' fixed left-0  z-50 top-0  w-full border-b border-red-300/50 bg-red-600/10 pb-6 pt-8 backdrop-blur-3xl  px-4  '>
            <div className=' container max-w-6xl mx-auto flex items-center justify-between space-x-4'>
                <NavLink href={'/'}> <PiBowlFoodBold size={55} className='shadow-lg rounded-full text-red-200' /> </NavLink>

                <div className='flex space-x-8'>
                    <NavLink href={'/'}> home </NavLink>
                    <NavLink href={'/meals'}> meals </NavLink>
                    <NavLink href={'/meals/share'}> share </NavLink>
                    <NavLink href={'/about'}> about </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Header;