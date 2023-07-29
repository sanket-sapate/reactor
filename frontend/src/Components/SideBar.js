import React from "react";
import { useSelector } from "react-redux";

export default function SideBar({className}) {
    const user = useSelector((storeData)=>storeData.user)
    return (<div className={className}>
        <div className="flex justify-center">
            <img className="rounded-full h-32 w-32" alt="avatar" src={user?.image||'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'} />
        </div>
        <div className="">
            <div className="text-center text-xl font-bold p-3 border-opacity-70 m-2 mx-10 border-indigo-400 border-b-2">{user?.name||'Full Name'}</div>
            <div className="text-center text-lg font-bold p-3 border-opacity-70 m-2 mx-10 border-indigo-400 border-b-2">{user?.email||'Email ID'}</div>
        </div>
        <br/>
        <div className="border-t-2 border-gray-300" />
        <br/>
        <div className="flex flex-col items-center">
            <div className="text-xl hover:text-indigo-500 font-bold">
                Dashboard
            </div>
        </div>
    </div>)
}
