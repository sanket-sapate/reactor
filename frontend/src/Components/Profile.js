import React from "react";
import SideBar from "./SideBar.js";
function Profile() {
    return (<div className="mt-5 flex">
        <SideBar className='w-1/3 shadow-sm'/>
        <div className="w-full">
            <div className="flex flex-col items-center p-4 rounded-md">
                <h1 className="text-2xl font-bold">Account</h1>
                <div className="flex flex-col items-center">
                </div>
            </div>
        </div>
    </div> )
}

export default Profile;