
import { Menu } from "lucide-react";
import Link from "next/link";
import {HamburgerMenuSidebar} from '../../components/hamburger-menu-sidebar';
import { DatePicker } from "@/components/DatePicker";

const Navigation = () => {

    return(
        <div style={{borderTop:'1px solid grey', borderBottom:'1px solid grey'}} className="py-2 px-4 flex items-center gap-x-2 text-md">

        <HamburgerMenuSidebar />

        <Link style={{borderRight:'1px solid grey'}} className='px-4' href='/'>হোম</Link>

        <DatePicker />

        <Link style={{borderRight:'1px solid grey'}} className='px-4' href='/'>প্রথম পাতা</Link>

        <Link className='px-4' href=''>সব পাতা</Link>
        
      </div>

    );
}


export default Navigation