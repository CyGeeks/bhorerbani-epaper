import Link from "next/link";
import Navigation from "../Navigation";

const Header = () => {

    return (
        <>
            <Link href={'/'}>

                <div className="m-2">
                    <img className="w-[400px]" src="/bhorerbani-logo-new.png" />
                </div>
            </Link>
            <Navigation />

        </>
    );
}

export default Header;