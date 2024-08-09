"use client";

import { DownloadCloud, FullscreenIcon, Menu, Printer } from 'lucide-react'
import 'react-social-icons/twitter';
import 'react-social-icons/facebook';
import 'react-social-icons/youtube';
import 'react-social-icons/instagram';
import SinglePaper from '@/myComponents/SinglePaper/index';
import React, { useEffect, useState } from "react";
import ImageMapper from "react-img-mapper";

const URL = "/papers/page11.jpg";

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
}



export default function Home() {

  const [state, setState] = useState<AppState>({
    color: 0,
    colors: ["yellow", "orange", "purple"],
    map: {
      name: "my-map",
      areas:
        [
          {
            name: "1",
            shape: AreaShape.Rect,
            coords: [14, 14, 687, 229],
            lineWidth: 1,
            center: [350.5, 121.5]
          },
          {
            name: "2",
            shape: AreaShape.Rect,
            coords: [12, 241, 343, 381],
            center: [177.5, 311]
          },
          {
            name: "3",
            shape: AreaShape.Rect,
            coords: [11, 391, 347, 618],
            center: [179, 504.5]
          },
          {
            name: "4",
            shape: AreaShape.Rect,
            coords: [11, 624, 345, 873],
            center: [178, 748.5]
          },
          {
            name: "5",
            shape: AreaShape.Rect,
            coords: [351, 238, 571, 478],
            center: [461, 358]
          },
          {
            name: "6",
            shape: AreaShape.Rect,
            coords: [351, 482, 569, 874],
            center: [460, 678]
          },
          {
            name: "7",
            shape: AreaShape.Rect,
            coords: [577, 237, 687, 886],
            center: [632, 561.5]
          }
        ],

    },
    hoveredArea: null,
    msg: null,
    moveMsg: null,
  });

  useEffect(() => {

    console.log(state.map.areas, "James");

  }, [state]);


  const load = () => {
    setState({ ...state, msg: "Interact with image !" });
  };

  const clicked = (area: AreaType) => {
    setState({
      ...state,
      msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
        area.coords
      )} !`,
    });
  };

  return (
    <>

      <div className='grid grid-cols-2'>

        <div style={{ borderRight: '1px solid grey' }} className=''>
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

          <div className="grid">
            <div className="presenter">
              <div style={{ position: "relative" }}>
                <ImageMapper
                  src={URL}
                  map={state.map}
                  width={700}
                  onLoad={load}
                  onClick={(area: any) => clicked(area)}
                />
              </div>
            </div>
          </div>


        </div>

        <div className=''>

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
