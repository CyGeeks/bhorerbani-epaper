"use client";
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

const SinglePaper: React.FC = () => {
  const [state, setState] = useState<AppState>({
    color: 0,
    colors: ["yellow", "orange", "purple"],
    map: {
      name: "my-map",
      areas: 
      [
        {
          name: "rectangleArea1",
          shape: AreaShape.Rect,
          coords: [14, 14, 687, 229],
          lineWidth: 1,
          center: [350.5, 121.5]
        },
        {
          name: "area1",
          shape: AreaShape.Rect,
          coords: [12, 241, 343, 381],
          center: [177.5, 311]
        },
        {
          name: "area2",
          shape: AreaShape.Rect,
          coords: [11, 391, 347, 618],
          center: [179, 504.5]
        },
        {
          name: "area3",
          shape: AreaShape.Rect,
          coords: [11, 624, 345, 873],
          center: [178, 748.5]
        },
        {
          name: "area4",
          shape: AreaShape.Rect,
          coords: [351, 238, 571, 478],
          center: [461, 358]
        },
        {
          name: "area5",
          shape: AreaShape.Rect,
          coords: [351, 482, 569, 874],
          center: [460, 678]
        },
        {
          name: "area6",
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

  useEffect(()=>{

    console.log(state.map.areas,"James");

  },[state]);


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
    <div className="grid">
      <div className="presenter">
        <div style={{ position: "relative" }}>
          <ImageMapper
            src={URL}
            map={state.map}
            width={700}
            onLoad={load}
            onClick={(area : any) => clicked(area)}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePaper;