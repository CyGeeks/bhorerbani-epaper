const coordinates = [
    { x1: 56, y1: 55, x2: 2952, y2: 993 },
    { x1: 58, y1: 1019, x2: 1475, y2: 1633 },
    { x1: 56, y1: 1661, x2: 1491, y2: 2641 },
    { x1: 50, y1: 2674, x2: 1477, y2: 3753 },
    { x1: 1507, y1: 1012, x2: 2452, y2: 3807 },
    { x1: 2468, y1: 1009, x2: 2939, y2: 3799 },
  ];
  
  const areaObjects = coordinates.map((coord) => {
    // Calculate center coordinates
    const centerX = Math.floor((coord.x1 + coord.x2) / 2);
    const centerY = Math.floor((coord.y1 + coord.y2) / 2);
  
    return {
      name: "rectangleArea",
      shape: "Rect", // Assuming you have an AreaShape enum with a value "Rect"
      coords: [coord.x1, coord.y1, coord.x2, coord.y2],
      lineWidth: 1, // Optional, adjust as needed
      center: [centerX, centerY],
    };
  });
  
  console.log(areaObjects);
  