import { DownloadCloud, FullscreenIcon, Menu, Printer } from 'lucide-react'
import 'react-social-icons/twitter';
import 'react-social-icons/facebook';
import 'react-social-icons/youtube';
import 'react-social-icons/instagram';
export default function Home() {
  return (
    <>

      <div className='grid grid-cols-2'>

        <div style={{ borderRight: '1px solid grey' }} className='h-screen'>
          <div className='w-full bg-[#F7DFB9] py-3 flex items-center'>

            <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[80px] items-center justify-center px-3 py-2">
              <Printer />
              <h1 className="text-white text-sm">Print</h1>
            </div>

            <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
              <DownloadCloud />
              <h1 className="text-white text-sm">Image</h1>
            </div>

            <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[130px] items-center justify-center px-3 py-2">
              <FullscreenIcon />
              <h1 className="text-white text-sm">Full View</h1>
            </div>

            <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
              <DownloadCloud />
              <h1 className="text-white text-sm">Pdf</h1>
            </div>
          </div>

        </div>

        <div className='h-screen'>

          <div className='w-full bg-[#D9D9D9] py-3 flex items-center justify-between'>
            <div className='flex'>
              <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[80px] items-center justify-center px-3 py-2">
                <Printer className='text-white' />
                <h1 className="text-white text-sm text-white">Print</h1>
              </div>

              <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                <DownloadCloud className='text-white' />
                <h1 className="text-white text-sm text-white">Image</h1>
              </div>

              <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[130px] items-center justify-center px-3 py-2">
                <FullscreenIcon className='text-white' />
                <h1 className="text-white text-sm text-white">Full View</h1>
              </div>

              <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                <DownloadCloud className='text-white' />
                <h1 className="text-white text-sm text-white">Pdf</h1>
              </div>
            </div>

            <div className='flex gap-x-2 items-center'>
              <h1 className='text-xl text-white'>Share</h1>
              <div className="flex gap-x-3 mt-3">

              </div>
            </div>

          </div>
        </div>

      </div>

      <div style={{ borderTop: '1px solid grey', borderBottom: '1px solid grey' }} className="py-6">
      </div>

    </>
  );
}
