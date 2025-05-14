"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar() {
  const pathname = usePathname(); // ✅ Get current path

  const linkClass = (path: string) =>
    `flex items-center cursor-pointer p-2 rounded font-semibold ${
      pathname.includes(path) ? "bg-blue-100 text-blue-800 " : "text-gray-700"
    }`;

  return (
    <div>
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="mb-10">
            <Image src="/assets/images/Final Logo 1.png" alt="Logo" width={500} height={500} className="mt-20" layout="intrinsic" />
          </div>
          <nav className="space-y-4 flex flex-col">
            <Link href="/userDashboard" className={linkClass("/dashboard")}>
              <Image src="/assets/icons/Component 4.png" alt="Dashboard Icon" width={18} height={18} className="mr-2" layout="intrinsic" />
              Dashboard
            </Link>

            <Link href="quizHistory" className={linkClass("/quizHistory")}>
              <Image
                src="/assets/icons/ic_twotone-history.png"
                alt="History Icon"
                width={18}
                height={18}
                className="mr-2"
                layout="intrinsic"
              />
              Quiz History
            </Link>

            <div onClick={() => signOut()} className="flex items-center cursor-pointer p-2  font-semibold">
              <Image src="/assets/icons/Vector.png" alt="Logout Icon" width={18} height={18} className="mr-2" layout="intrinsic" />
              Log Out
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}
