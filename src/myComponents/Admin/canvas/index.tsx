'use client';
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

// Define the types for props
interface ImageCanvasProps {
  imageUrl: string;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasHeight, setCanvasHeight] = useState<number>(600); // Initial height

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create a fabric canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 700, // Fixed canvas width
    });

    // Ensure canvas is initialized before setting height
    canvas.setHeight(canvasHeight);

    const handleImageLoad = (img: fabric.Image) => {
      // Calculate the new height based on the fixed width and aspect ratio
      const scale = 700 / img.width!; // Scale factor to fit the width
      const newHeight = img.height! * scale; // Calculate new height
      console.log(newHeight, "james");

      // Update canvas dimensions
      canvas.setHeight(newHeight);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: scale,
        scaleY: scale,
      });
    };

    // Load the image onto the canvas
    fabric.Image.fromURL(imageUrl, (img: string) => {
      handleImageLoad(img);
    });

    let rect: fabric.Rect | undefined;
    let isDown = false;
    let origX = 0;
    let origY = 0;

    // Mouse down event
    const onMouseDown = (o: fabric.IEvent) => {
      const activeObject = canvas.getActiveObject();

      // If an object is active, do not create a new rectangle
      if (activeObject) {
        if (activeObject.type === 'rect') {
          // If the active object is a rectangle, we are resizing it
          return;
        }
      }

      // No active object, create a new rectangle
      isDown = true;
      const pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;

      rect = new fabric.Rect({
        left: origX,
        top: origY,
        width: 0,
        height: 0,
        fill: 'rgba(255, 99, 71, 0.2)',
        stroke: 'red',
        strokeWidth: 2,
        selectable: true,
      });
      canvas.add(rect);
    };

    // Mouse move event
    const onMouseMove = (o: fabric.IEvent) => {
      if (!isDown || !rect) return;
      const pointer = canvas.getPointer(o.e);
      const width = Math.abs(pointer.x - origX);
      const height = Math.abs(pointer.y - origY);
      rect.set({
        left: Math.min(origX, pointer.x),
        top: Math.min(origY, pointer.y),
        width: width,
        height: height,
      });
      canvas.renderAll();
    };

    // Mouse up event
    const onMouseUp = () => {
      isDown = false;
      if (rect) {
        console.log('Rectangle Coordinates:', rect.getCoords());
      }
    };

    // Keydown event to delete selected rectangle
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete') {
        console.log('Delete me now'); // Print the message to the console
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'rect') {
          canvas.remove(activeObject);
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      }
    };

    // Attach event listeners
    canvas.on('mouse:down', onMouseDown);
    canvas.on('mouse:move', onMouseMove);
    canvas.on('mouse:up', onMouseUp);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      // Clean up the canvas and event listeners
      canvas.off('mouse:down', onMouseDown);
      canvas.off('mouse:move', onMouseMove);
      canvas.off('mouse:up', onMouseUp);
      canvas.dispose();
    };
  }, [imageUrl]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageCanvas;
