import ImageCanvas from "@/myComponents/Admin/canvas";

export default function Admin() {
  return (
    <div className="flex items-center justify-center flex-col py-6">
      <h1>Draw Rectangles on the Image</h1>
      <ImageCanvas imageUrl="/papers/page2.jpg" />
    </div>
  );
}
