import React, { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";

const Loading = ({ message = "Loading, please wait..." }) => {

    const {navigate} = useAppContext();
    let {search} = useLocation();
    const query = new URLSearchParams(search);
    const nextUrl = query.get("next")


    useEffect(() => {
        if(nextUrl){
            setTimeout(() => {
                navigate(`/${nextUrl}`);
            }, 2000)
        }
    }, [nextUrl]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-8 border-t-8 border-gray-300 border-t-blue-600 animate-spin shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 font-bold text-sm">
          🌀
        </div>
      </div>
      <p className="mt-6 text-gray-600 text-lg animate-pulse">{message}</p>
    </div>
  );
};

export default Loading;
