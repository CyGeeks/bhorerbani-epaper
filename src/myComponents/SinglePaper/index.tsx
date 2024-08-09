"use client";
import React, { useState } from "react";
import ImageMapper from "react-img-mapper";

const URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg";

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
      areas: [
        {
          name: "1",
          shape: AreaShape.Poly,
          coords: [25, 33, 27, 300, 128, 240, 128, 94],
          preFillColor: "#5da0d02e",
          lineWidth: 5,
          lineColor: "red",
          center: [76, 167],
        },
        {
          name: "2",
          shape: AreaShape.Poly,
          coords: [219, 118, 220, 210, 283, 210, 284, 119],
          lineWidth: 2,
          preFillColor: "#d05db74d",
          fillColor: "yellow",
          center: [251, 164],
        },
        {
          name: "3",
          shape: AreaShape.Poly,
          coords: [381, 241, 383, 94, 462, 53, 457, 282],
          fillColor: "yellow",
          center: [422, 168],
        },
        {
          name: "4",
          shape: AreaShape.Poly,
          coords: [245, 285, 290, 285, 274, 239, 249, 238],
          preFillColor: "red",
          center: [269, 262],
        },
        {
          name: "5",
          shape: AreaShape.Circle,
          coords: [170, 100, 25],
          center: [170, 100],
        },
      ],
    },
    hoveredArea: null,
    msg: null,
    moveMsg: null,
  });

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

  const clickedOutside = (evt: React.MouseEvent<HTMLImageElement>) => {
    const coords = { x: evt.nativeEvent.clientX, y: evt.nativeEvent.clientY };
    setState({
      ...state,
      msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`,
    });
  };

  const moveOnImage = (evt: React.MouseEvent<HTMLImageElement>) => {
    const coords = { x: evt.nativeEvent.clientX, y: evt.nativeEvent.clientY };
    setState({
      ...state,
      moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`,
    });
  };

  const enterArea = (area: AreaType) => {
    setState({
      ...state,
      hoveredArea: area,
      msg: `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
        area.coords
      )} !`,
    });
  };

  const leaveArea = (area: AreaType) => {
    setState({
      ...state,
      hoveredArea: null,
      msg: `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
        area.coords
      )} !`,
    });
  };

  const moveOnArea = (area: AreaType, evt: React.MouseEvent) => {
    const coords = { x: evt.nativeEvent.clientX, y: evt.nativeEvent.clientY };
    setState({
      ...state,
      moveMsg: `You moved on ${area.shape} ${
        area.name
      } at coords ${JSON.stringify(coords)} !`,
    });
  };
  

  const getTipPosition = (area: AreaType) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };

  return (
    <div className="grid">
      <div className="presenter">
        <div style={{ position: "relative" }}>
          <ImageMapper
            src={URL}
            map={state.map}
            width={500}
            onLoad={load}
            onClick={(area : any) => clicked(area)}
            onMouseEnter={(area : any) => enterArea(area)}
            onMouseLeave={(area : any) => leaveArea(area)}
            onMouseMove={(area : any, _, evt) => moveOnArea(area, evt)}
            onImageClick={(evt) => clickedOutside(evt)}
            onImageMouseMove={(evt) => moveOnImage(evt)}
          />
          {state.hoveredArea && (
            <span
              className="tooltip"
              style={{ ...getTipPosition(state.hoveredArea) }}
            >
              {state.hoveredArea && state.hoveredArea.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePaper;