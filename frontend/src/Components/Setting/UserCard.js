import React from "react";
import { toast } from "react-toastify";
import config from "../../config";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function UserCard({user}){
    function copyUsername(){
        if(!user?.username){ 
            toast.error('Username not available',config.TOAST_UI)    
            return
        }
        navigator.clipboard.writeText(`${config.APP_URL}/u/${user?.username}`)
        toast.success('Link copied successfully',config.TOAST_UI)
      }
    return <div className="border-2 mb-3 rounded-lg md:w-2/3 border-slate-300 p-3 py-4 md:x-10 flex flex-col ">
    <div className="flex items-center ">
        <div className={classNames("h-28 z-10 w-28 overflow-hidden rounded-md ",user?'':'border-2 border-indigo-400')}>
            <img alt='avatar' src={user?.image||config.DEFAULT_AVATAR} className="h-28 transition-transform hover:scale-105 z-10 w-28"/>
        </div>
        <div className=" pl-5 h-28 flex flex-col justify-center flex-grow">
            <p className="font-semibold self-center md:self-start text-lg">{user?.name||'Full Name'}</p>
            <div className="md:flex ">
                <p className="font-semibold text-sm cursor-pointer self-center md:self-start" onClick={copyUsername} >@{user?.username||'username'}</p>
                <p className="font-semibold ml-6 text-sm cursor-pointer self-center md:self-start" >{user?.email||'email@xyz.com'}</p>
            </div>
            <div className="md:flex hidden justify-around bg-slate-200 mt-2 rounded-md p-2 w-full font-medium">
                <div className="flex flex-col items-center">
                    <p>Models</p>
                    <p>{user?.models||0}</p>
                </div>
                <div className="flex flex-col items-center">
                    <p>Followers</p>
                    <p>{user?.followers||0}</p>
                </div>
                <div className="flex flex-col items-center">
                    <p>Rating</p>
                    <p>{user?.rating||'4.9'}</p>
                </div>
            </div>
        </div>
    </div>
    <div className="flex md:hidden justify-around bg-slate-200 mt-2 rounded-md p-2 w-full font-medium">
        <div className="flex flex-col items-center">
            <p>Models</p>
            <p>{user?.models||0}</p>
        </div>
        <div className="flex flex-col items-center">
            <p>Followers</p>
            <p>{user?.followers||0}</p>
        </div>
        <div className="flex flex-col items-center">
            <p>Rating</p>
            <p>{user?.rating||'4.9'}</p>
        </div>
    </div>
</div>
}