import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Topic = ()=>{
    const {department} = useParams()
    const data = useSelector((storeData)=>storeData)
    document.title = 'Choose Topic'
    return <div className="min-h-[88vh]">
        <div className="pt-10 font-semibold text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat asperiores ea recusandae quaerat explicabo dolor tempora quod, blanditiis ratione animi autem eius neque minus excepturi doloribus! Harum, rem ipsum? In.
        </div>
        <div className="py-5">
            <div className="text-lg font-bold">
                Choose Department :
            </div>
            <div className="my-5 grid gap-y-6 grid-cols-2 sm:flex ">
                {
                    Object.keys(data).map((e,i)=>{
                        return <Link key={e} to={"/department/"+e+'/3d'} className="">
                        <span className="w-full flex justify-center sm:mr-7" >
                        {department===e?<button
                          type="button"
                          className="inline-flex items-center min-w-[70px] justify-center capitalize rounded-md bg-indigo-600 text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {e}
                        </button>:<button
                          type="button"
                          className="rounded-md capitalize justify-center min-w-[70px] bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          {e}
                        </button>}
                      </span></Link>
                    })
                }
            </div>
        </div>

        {department && Object.keys(data).length?<div className="py-5">
            <div className="text-lg font-bold">
                Choose Topic :
            </div>
            <div className="my-5 grid gap-y-6 grid-cols-2 sm:flex ">
                {
                    Object.keys(data[department]?.model3d).map((e,i)=>{
                        let obj = data[department]?.model3d
                        return <Link key={e} to={"/department/"+department+"/3d/"+e} className="">
                        <span className="w-full flex justify-center sm:mr-7" >
                        <button
                          type="button"
                          className="rounded-md capitalize justify-center min-w-[70px] bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          {obj[e].title}
                        </button>
                      </span></Link>
                    })
                }
            </div>
        </div>: ''}
    </div>
}

export default Topic