import React from "react";
import useDocumentTitle from "../customHooks/documentTitle";


export default function Loading(){
  useDocumentTitle("Loading");
    return(
        <div className="flex items-center justify-center  bg-transparent mt-9">
      <div className="flex flex-col items-center space-y-6">
        <span className="text-4xl md:text-7xl font-bold text-[#FFB640] dark:text-white">
          Loading
        </span>
        <div className="flex space-x-3">
          <span className="w-5 h-5 md:w-7 md:h-7 bg-[#FFB640] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-5 h-5 md:w-7 md:h-7 bg-[#FFB640] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-5 h-5 md:w-7 md:h-7 bg-[#FFB640] rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
    )
}