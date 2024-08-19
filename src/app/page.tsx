"use client";

import {Image, MoveLeftIcon, MoveRightIcon, Printer, FileTextIcon } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageMapper from "react-img-mapper";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullViewImage from '@/myComponents/FullView';
import { AreaShape } from '@/lib/enums';
import { AppState, AreaType } from '@/lib/interfaces';
import ReactToPrint from 'react-to-print';
import handlePrint from '@/lib/print';
import { usePDF } from 'react-to-pdf';
import GeneratePDFButton from '@/lib/downloadpdf';
import AllPages from '@/myComponents/AllPages';


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
  const { toPDF, targetRef } = usePDF({ filename: `${state.imageToShow}.pdf` });

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
              shape: AreaShape.Rect // Convert string to enum
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
          <div style={{ borderBottom: '1px solid grey', }} className='md:border-r md:border-gray-500'>
            <div className='w-full md:bg-[#F7DFB9] py-3 flex items-center justify-between'>
              <div className='flex items-center'>
                <div onClick={() => handlePrint(imageUrl)} style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[40px] py-2 md:w-[80px] items-center justify-center md:px-3 md:py-2">
                  <Printer />
                  <h1 className="text-white text-sm hidden md:block">Print</h1>
                </div>

                <a download href={`${imageUrl}`} style={{ borderRadius: '5px' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[40px] py-2 md:w-[90px] items-center justify-center md:px-3 md:py-2">
                  <Image size={25} />
                  <h1 className="text-white text-sm hidden md:block">Image</h1> {/* Download Image when clicking this button */}
                </a>

                <FullViewImage className="bg-[#C99F5D]" imageUrl={`${imageUrl}`} />

                <GeneratePDFButton imageUrl={`${imageUrl}`} />
              </div>

              <div className='flex md:mr-3 gap-x-4 ml-2'>
                <div style={{ cursor: 'pointer' }} className='flex gap-x-1' onClick={goToPreviousPage}>
                  <MoveLeftIcon />
                  <span className='hidden md:block'>পূর্ববর্তী পৃষ্ঠা</span>
                  <span className='md:hidden'>Next</span>
                </div>

                <div style={{ cursor: 'pointer' }} className='flex gap-x-1' onClick={goToNextPage}>
                  <span className='hidden md:block'>পরবর্তী পৃষ্ঠা</span>
                  <span className='md:hidden'>Prev</span>
                  <MoveRightIcon />
                </div>
              </div>
            </div>

            <div className="grid">
              <div className="presenter">
                <div className='flex items-center justify-center hidden md:block' style={{ position: "relative" }}>
                  <ImageMapper
                    src={imageUrl || ""}
                    map={state.map}
                    width={700}
                    onLoad={load}
                    onClick={(area: any) => clicked(area)}
                  />
                </div>
                <div className='flex items-center justify-center md:hidden' style={{ position: "relative" }}>
                  <ImageMapper
                    src={imageUrl || ""}
                    map={state.map}
                    width={375}
                    onLoad={load}
                    onClick={(area: any) => clicked(area)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid grey' }} className='hidden md:block'>
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
                    <Image className='text-white' />
                    <h1 className="text-white text-sm text-white">Image</h1>
                  </a>

                  <FullViewImage className={'bg-[#505050] text-white'} imageUrl={`${state.imageToShow}`} />

                  <div onClick={() => toPDF()} style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                    <FileTextIcon size={25} className='text-white' />
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
      
      <AllPages />

    </>
  );
}
