"use client";
import React from "react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-between">
      <div className="bg-slate-100 w-1/2 pt-20 pl-20  pr-36 rounded-tr-[100px] rounded-br-[100px] min-h-screen ">
        <span className="text-5xl font-bold leading-[1.5]">Welcome to </span>
        <h1 className="text-6xl text-customBlue font-bold leading-[1.5]">
          Elevate
        </h1>
        <p className="text-lg leading-10 font-normal ">
          Quidem autem voluptatibus qui quaerat aspernatur architecto natus
        </p>

        <Image
          src="/assets/images/Group1Exam.png"
          alt="Picture of the author"
          width={500}
          height={500}
          blurDataURL="data:..."
          placeholder="blur"
          className="mt-20 w-80 h-80"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center pt-13 h-min-screen">
        <nav className=" fixed top-11 ml-20 mb-9">
          <a href="" className="ml-6 text-xl">
            English
          </a>
          <a href="" className="text-mainColor ml-6 text-xl font-semibold">
            Sign in
          </a>
          <button className="px-3 py-1 ml-6 bg-white  rounded-lg border transition rounded-3xl text-xl font-light">
            <a href="" className="text-mainColor">
              Register
            </a>
          </button>
        </nav>

        {children}

        <div>
          <p className="relative text-gray-500 text-base text-center mb-4">
            Or Continue with
            <span
              className="before:content-[''] before:block before:w-16 before:h-[1.5px] before:bg-gray-300 before:absolute before:left-[-20px] before:top-1/2 
                   after:content-[''] after:block after:w-16 after:h-[1.5px] after:bg-gray-300 after:absolute after:right-[-20px] after:top-1/2"
            ></span>
          </p>

          <div className="icons flex gap-2.5">
            <span className=" size-14 p-4 border rounded-2xl flex justify-center align-center">
              <Image
                className="w-4 h-4"
                src="/assets/icons/google.svg"
                alt="gogleicon"
                width={500}
                height={500}
                blurDataURL="data:..."
                placeholder="blur"
              />
            </span>
            <span className=" size-14 p-4 border rounded-2xl flex justify-center align-center">
              <Image
                className="w-4 h-4 "
                src="/assets/icons/Logotwi.svg"
                alt="twitterIcon"
                width={500}
                height={500}
                blurDataURL="data:..."
                placeholder="blur"
              />
            </span>
            <span className=" size-14 p-4 border rounded-2xl flex justify-center align-center">
              <Image
                className="w-4 h-4"
                src="/assets/icons/Logo.svg"
                alt="faceBookicon"
                width={500}
                height={500}
                blurDataURL="data:..."
                placeholder="blur"
              />
            </span>
            <span className=" size-14 p-4 border rounded-2xl flex justify-center align-center">
              <Image
                className="w-4 h-4"
                src="/assets/icons/Logof.svg"
                alt="appleIcon"
                width={500}
                height={500}
                blurDataURL="data:..."
                placeholder="blur"
              />
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
