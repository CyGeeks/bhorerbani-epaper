import { SocialIcon } from "react-social-icons/component";
import 'react-social-icons/twitter';
import 'react-social-icons/facebook';
import 'react-social-icons/youtube';
import 'react-social-icons/instagram';
import Link from "next/link";


const Footer = () => {

    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center my-4 py-4 bg-[#FBF4F4]">
            <div className="mt-2 ml-4 gap-y-2 flex flex-col">

                <Link href={'/'}>
                    <div className="">
                        <img className="w-[200px]" src="/bhorerbani-logo-new.png" />
                    </div>
                </Link>
                
                <h1 className='text-md text-black'>সম্পাদক: আলমগীর হোসেন । প্রকাশক: আবুল কালাম আজাদ</h1>

                <h1 className='text-sm text-gray-500'>ঠিকানা: টাইমস মিডিয়া ভবন (৫ম তলা) | ৩৮৭ তেজগাঁও শিল্প এলাকা, ঢাকা - ১২০৮ । ফোন: ৫৫০২৯৮৩২-৩৮</h1>

                <h1 className='text-sm text-gray-500'>বিজ্ঞাপন : ৫৫০২৯৮৪২, ৫৫০২৯৮৪৩, +৮৮০১৭১৪০৮০৩৭৮ । সার্কুলেশন : ৫৫০২৯৮২৯, ৫৫০২৯৮৪১</h1>

                <h1 className="text-sm text-gray-500">স্বত্ব © ২০২৪ ভরেরবানী</h1>
            </div>

            <div className="mr-4" >
                <h1 className="flex justify-center">ফলো করুনঃ</h1>

                <div className="flex gap-x-3 mt-3">
                    <SocialIcon url="https://twitter.com" />
                    <SocialIcon url="https://facebook.com" />
                    <SocialIcon url="https://instagram.com" />
                    <SocialIcon url="https://youtube.com" />

                </div>
            </div>
        </div>
    );
}

export default Footer;