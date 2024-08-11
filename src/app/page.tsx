"use client";

import { DownloadCloud, FullscreenIcon, MoveLeftIcon, MoveRightIcon, Printer } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageMapper from "react-img-mapper";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullViewImage from '@/myComponents/FullView';
import { AreaShape } from '@/lib/enums';
import { AppState, AreaType } from '@/lib/interfaces';
import ReactToPrint from 'react-to-print';
import handlePrint from '@/lib/print';
import { usePDF } from 'react-to-pdf';


const TOTAL_PAGES = 3; // Adjust according to the number of pages in your data

const useCombinedRefs = (...refs) => {
  return useCallback(
    (node) => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      });
    },
    [refs]
  );
};

export default function Home() {
  const [state, setState] = useState<AppState>({
    color: 0,
    colors: [],
    map: {
      name: "",
      areas: []
    },
    hoveredArea: null,
    msg: null,
    moveMsg: null,
    imageToShow: null,
  });

  const [fullScreenHandle, setFullScreenHandle] = useState<any>(useFullScreenHandle());
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const printRef = useRef();
  const { toPDF, targetRef } = usePDF({filename: `${state.imageToShow}.pdf`});

  const combinedRef = useCombinedRefs(printRef, targetRef);

  useEffect(() => {
    // Fetch JSON data
    fetch('/data.json')
      .then(response => response.json())
      .then((data: any[]) => {
        const pageData = data[currentPage];
        setState(prevState => ({
          ...prevState,
          colors: pageData.colors,
          map: {
            name: "my-map",
            areas: pageData.areas.map((area: any) => ({
              ...area,
              shape: AreaShape[area.shape as keyof typeof AreaShape] // Convert string to enum
            }))
          }
        }));
        setImageUrl(pageData.imageUrl);
      });
  }, [currentPage]);

  const load = () => {
    setState({ ...state, msg: "Interact with image !" });
  };

  const clicked = (area: AreaType) => {
    const imagePath = `/papers/sections/${area.name}.jpg`;
    setState({
      ...state,
      msg: `You clicked on ${area.shape} at coords ${JSON.stringify(area.coords)} !`,
      imageToShow: imagePath
    });
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <>
      <FullScreen handle={fullScreenHandle}>
        <div className='grid grid-cols-2'>
          <div style={{ borderRight: '1px solid grey', borderBottom: '1px solid grey', }} className=''>
            <div className='w-full bg-[#F7DFB9] py-3 flex items-center justify-between'>
              <div className='flex items-center'>
                <div onClick={()=>handlePrint(imageUrl)} style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[80px] items-center justify-center px-3 py-2">
                  <Printer />
                  <h1 className="text-white text-sm">Print</h1>
                </div>

                <a download href={`${imageUrl}`} style={{ borderRadius: '5px' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                  <DownloadCloud />
                  <h1 className="text-white text-sm">Image</h1> {/* Download Image when clicking this button */}
                </a>

                <FullViewImage className="bg-[#C99F5D]" imageUrl={`${imageUrl}`} />

                <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                  <DownloadCloud />
                  <h1 className="text-white text-sm">Pdf</h1>
                </div>
              </div>

              <div className='flex mr-3 gap-x-4'>
                <div style={{ cursor: 'pointer' }} className='flex gap-x-1' onClick={goToPreviousPage}>
                  <MoveLeftIcon />
                  <span>পূর্ববর্তী পৃষ্ঠা</span>
                </div>

                <div style={{ cursor: 'pointer' }} className='flex gap-x-1' onClick={goToNextPage}>
                  <span>পরবর্তী পৃষ্ঠা</span>
                  <MoveRightIcon />
                </div>
              </div>
            </div>

            <div className="grid">
              <div className="presenter">
                <div className='flex items-center justify-center' style={{ position: "relative" }}>
                  <ImageMapper
                    src={imageUrl || ""}
                    map={state.map}
                    width={700}
                    onLoad={load}
                    onClick={(area: any) => clicked(area)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid grey' }} className=''>
            <div className='w-full bg-[#D9D9D9] py-3 flex items-center justify-between'>
              <div className='w-full flex items-center justify-between'>
                <div className='flex'>
                  <ReactToPrint
                    trigger={() =>

                      <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[80px] items-center justify-center px-3 py-2">
                        <Printer className='text-white' />
                        <h1 className="text-white text-sm text-white">Print</h1>
                      </div>
                    }
                    content={() => printRef.current}

                  />
                  <a download href={`${state.imageToShow}`} style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                    <DownloadCloud className='text-white' />
                    <h1 className="text-white text-sm text-white">Image</h1>
                  </a>

                  <FullViewImage className={'bg-[#505050]'} imageUrl={`${state.imageToShow}`} />

                  <div onClick={() => toPDF()} style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                    <DownloadCloud className='text-white' />
                    <h1 className="text-white text-sm text-white">Pdf</h1>
                  </div>
                </div>

                <div style={{ borderRadius: '5px', cursor: 'pointer' }} onClick={fullScreenHandle.enter} className='bg-black p-2 mr-3'>
                  <p className='text-white'>সম্পূর্ণ ফুল স্ক্রিনে পড়ুন</p>
                </div>
              </div>
            </div>
            <div
              style={{
                maxHeight: '880px',
                overflowY: 'auto',
              }}
            >
              {state.imageToShow && (
                <img className='p-4'
                  ref={combinedRef}
                  style={{ height: '100%', width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}
                  src={state.imageToShow}
                  alt={`Section ${state.imageToShow.split('/').pop()}`}
                />
              )}
            </div>
          </div>
        </div>
      </FullScreen>
    </>
  );
}
