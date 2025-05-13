import React, { ReactNode } from 'react'
import Image from "next/image";
import SideBar from './sideBar';

export default function layout({children}:{children:ReactNode}) {

  
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
     
{/* sideBar */}
<SideBar></SideBar>
      {/* Main content with top bar and children */}
      <main className="flex-1 p-8">
        {/* TopBar */}
        <div className="flex justify-between items-center ">
          <input
            type="text"
            placeholder="Search Quiz"
            className="border px-4 py-3 rounded-2xl w-3/4"
          />
          <div className="flex items-center ">
            <button className="bg-blue-600 text-white px-9 py-3 rounded-2xl ">
              add diplomas
            </button>
            <Image
              src="/assets/images/Rectangle 289@2x.png"
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full mt-4"
            />
          </div>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
