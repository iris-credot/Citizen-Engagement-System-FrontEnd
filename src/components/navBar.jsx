import React from "react";
import Icon from "../assets/logo.png";

export default function NavBar() {
  return (
    <div className="flex w-screen py-2 bg-[#E6E5E5] justify-center items-center shadow-md border-b border-gray-300 z-50 dark:bg-black dark:text-white">
      <div className="w-1/2 text-start md:pl-20 pl-9">
          <img src={Icon} alt="Logo" className="h-12 w-auto rounded-full" />
      </div>
      <div className="w-1/2 text-end md:text-3xl font-extrabold md:pr-36 sm:pr-12 pr-8 sm:text-2xl text-xl">
        OpenVoice
      </div>
    </div>
  );
}
