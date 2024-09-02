import ImageCanvas from "@/myComponents/Admin/canvas";
import { ComputerIcon, LinkIcon, SaveIcon, TextCursorInputIcon, TrashIcon, ViewIcon } from "lucide-react";

export default function Admin() {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-black">
      <div className="col-span-2 bg-gradient-to-b from-gray-800 to-black-600 p-6 text-white">
        {/* Sidebar styling */}
        <h2 className="text-xl font-bold mb-6">Welcome Admin !</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="text-xl">🏠</span>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="text-xl">📄</span>
              <span>Create new epaper</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="text-xl">⚙️</span>
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="text-xl">🔍</span>
              <span>Search</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="col-span-8">

        {/* Horizontal Toolbar */}
        <div className="flex items-center justify-between bg-gray-800 pb-4 px-4 text-white space-x-4 pt-12">
          {/* Toolbar Items */}
          <div className="relative group">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <SaveIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Save
            </div>
          </div>

          <div className="relative group">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <LinkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Link
            </div>
          </div>

          <div className="relative group">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <ComputerIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Mobile/Desktop
            </div>
          </div>

          <div className="relative group">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <TrashIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Delete
            </div>
          </div>

          <div className="relative group">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <TextCursorInputIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Select
            </div>
          </div>

          <div className="relative group">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <ViewIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              View All
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col py-6">
          <ImageCanvas imageUrl="/papers/page2.jpg" />
        </div>
      </div>

      <div className="col-span-2 bg-gradient-to-b from-gray-800 to-red-600 p-6 text-white">
        {/* Sidebar styling */}
        <h2 className="text-xl font-bold mb-6">Admin Tools</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="text-xl">🏠</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="text-xl">📄</span>
              <span>Reports</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="text-xl">⚙️</span>
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="text-xl">🔍</span>
              <span>Search</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
