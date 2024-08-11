"use client";

import { DownloadCloud, FullscreenIcon, MoveLeftIcon, MoveRightIcon, Printer } from 'lucide-react';
import React, { useEffect, useState } from "react";
import ImageMapper from "react-img-mapper";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

enum AreaShape {
  Circle = "circle",
  Rect = "rect",
  Poly = "poly",
}

interface AreaType {
  name: string;
  shape: AreaShape;
  coords: number[];
  preFillColor?: string;
  lineWidth?: number;
  lineColor?: string;
  fillColor?: string;
  center: number[];
}

interface AppState {
  color: number;
  colors: string[];
  map: {
    name: string;
    areas: AreaType[];
  };
  hoveredArea: AreaType | null;
  msg: string | null;
  moveMsg: string | null;
  imageToShow: string | null;
}

const TOTAL_PAGES = 3; // Adjust according to the number of pages in your data

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
                <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[80px] items-center justify-center px-3 py-2">
                  <Printer />
                  <h1 className="text-white text-sm">Print</h1>
                </div>

                <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                  <DownloadCloud />
                  <h1 className="text-white text-sm">Image</h1> {/* Download Image when clicking this button */}
                </div>

                <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[130px] items-center justify-center px-3 py-2" onClick={fullScreenHandle.enter}>
                  <FullscreenIcon />
                  <h1 className="text-white text-sm">Full View</h1>
                </div>

                <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                  <DownloadCloud />
                  <h1 className="text-white text-sm">Pdf</h1>
                </div>
              </div>

              <div className='flex mr-3 gap-x-4'>
                <div style={{ cursor: 'pointer' }} className='flex gap-x-1' onClick={goToPreviousPage}>
                  <MoveLeftIcon />
                  <span>Previous Page</span>
                </div>

                <div style={{ cursor: 'pointer' }} className='flex gap-x-1' onClick={goToNextPage}>
                  <span>Next Page</span>
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
              <div className='flex'>
                <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[80px] items-center justify-center px-3 py-2">
                  <Printer className='text-white' />
                  <h1 className="text-white text-sm text-white">Print</h1>
                </div>

                <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                  <DownloadCloud className='text-white' />
                  <h1 className="text-white text-sm text-white">Image</h1>
                </div>

                <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[130px] items-center justify-center px-3 py-2" onClick={fullScreenHandle.enter}>
                  <FullscreenIcon className='text-white' />
                  <h1 className="text-white text-sm text-white">Full View</h1>
                </div>

                <div style={{ borderRadius: '5px', cursor: 'pointer' }} className="bg-[#505050] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2">
                  <DownloadCloud className='text-white' />
                  <h1 className="text-white text-sm text-white">Pdf</h1>
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
