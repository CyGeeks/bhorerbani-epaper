import { Menu } from "lucide-react";
import Link from "next/link";

const Navigation = () => {

    return(
        <div style={{borderTop:'1px solid grey', borderBottom:'1px solid grey'}} className="py-2 px-4 flex items-center gap-x-2 text-md">

        <Menu style={{color:'#E18B20'}} />

        <Link style={{borderRight:'1px solid grey'}} className='px-4' href=''>হোম</Link>

        <Link style={{borderRight:'1px solid grey'}} className='px-4' href=''>০৯ আগস্ট ২০২৪</Link>

        <Link style={{borderRight:'1px solid grey'}} className='px-4' href=''>নগর সংস্করণ</Link>

        <Link style={{borderRight:'1px solid grey'}} className='px-4' href=''>প্রথম পাতা</Link>

        <Link className='px-4' href=''>সব পাতা</Link>
        
      </div>

    );
}


export default Navigation