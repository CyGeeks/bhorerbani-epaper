import { FullscreenIcon } from 'lucide-react';
import React from 'react';


const CustomPopup = ({ imageUrl, onClose }) => {
  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative max-w-screen max-h-screen p-4 bg-white rounded-lg shadow-lg overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2"
          style={{ cursor: 'pointer' }}
        >
          X
        </button>
        <img 
          src={imageUrl} 
          alt="Full view" 
          style={{ height:'100%', width:'auto' }} 
          className="block mx-auto my-auto"
        />
      </div>
    </div>
  );
};

const FullViewImage = ({ className, imageUrl }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <div 
        style={{ borderRadius: '5px', cursor: 'pointer' }} 
        className={`ml-3 flex gap-x-1 md:w-[130px] w-[50px] items-center justify-center px-3 py-2 ${className}`} 
        onClick={openPopup}
      >
        <FullscreenIcon />
        <h1 className="text-white text-sm hidden md:block">Full View</h1>
      </div>
      {isOpen && <CustomPopup imageUrl={imageUrl} onClose={closePopup} />}
    </>
  );
};

export default FullViewImage;

