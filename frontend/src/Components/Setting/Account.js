import React from "react";
import {useSelector} from 'react-redux'
import config from "../../config";
import { toast } from "react-toastify";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  export default function Account(){    
      const user = useSelector((store)=>store.user)
      function copyUsername(){
        if(!user?.username){ 
            toast.error('Username not available',config.TOAST_UI)    
            return
        }
        navigator.clipboard.writeText(`${config.APP_URL}/u/${user?.username}`)
        toast.success('Link copied successfully',config.TOAST_UI)
      }
    return <div className="border-2 rounded-lg align-middle items-center border-slate-300 p-3 py-4 flex">
        <div className={classNames("h-28 z-10 w-28 overflow-hidden ",user?'':'border-2 border-indigo-400')}>
            <img alt='avatar' src={user?.image||config.DEFAULT_AVATAR} className="h-28 transition-transform hover:scale-110 z-10 w-28"/>
        </div>
        <div className=" pl-5 h-28 flex-grow">
            <p className="font-semibold text-lg">{user?.name||'Full Name'}</p>
            <p className="font-semibold text-sm cursor-pointer" onClick={copyUsername} >@{user?.username||'username'}</p>
            <div className="flex bg-slate-200 mt-2 rounded-md p-2">
                <div className="flex flex-col items-center">
                    <p>Models</p>
                    <p>{user?.models||0}</p>
                </div>
            </div>
        </div>
    </div>
}