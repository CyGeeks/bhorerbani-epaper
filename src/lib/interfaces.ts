import { AreaShape } from "./enums";

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

  
  export type {AppState, AreaType};