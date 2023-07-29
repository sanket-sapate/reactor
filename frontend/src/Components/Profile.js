import React from "react";
import SideBar from "./SideBar.js";
import {motion} from 'framer-motion'
function Profile() {
    return (<div className="mt-5 flex">
        <SideBar className='w-1/3 shadow-2xl pt-5'/>
        <div className="w-full">
            <div className="flex flex-col items-center p-4 rounded-md">
                <motion.h1 
                animate={{scale:1.1}}
                transition={{duration:1}}
                className="text-2xl font-bold">Account</motion.h1>
                <div className="flex flex-col items-center">
                </div>
            </div>
        </div>
    </div> )
}

export default Profile;