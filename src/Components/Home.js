import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline'

const Home = ()=>{
    let image = ['https://vnit.ac.in/cse/wp-content/uploads/2018/10/Campus-Pics-img37.jpg','https://vnit.ac.in/cvip2022/assets/img/vnit/Night-Photo.jpg','https://vnit.ac.in/cvip2022/assets/img/vnit/Main_Bldg_Final_1.jpg','https://vnit.ac.in/wp-content/uploads/2020/09/new.jpg']
    const [currIndex,setCurrIndex] = useState(0)
    
    useEffect(()=>{
        const ref = setInterval(()=>{
            setCurrIndex((prevState)=>prevState+1)
        },3000)
        return ()=>{
            clearInterval(ref)
        }
    })
    document.title = 'Home'
return (
    <>
    <div className="mx-auto max-w-2xl py-32  ">
        <div className="relative -mt-10  sm:h-[280px] h-[180px] mx-auto justify-center sm:w-2/3 mb-10">
            <img alt='' src={image[currIndex%image.length]} className="rounded-md align-middle  w-full "/>
        </div>
        <div className="mb-8 flex justify-center">
            <div>
                <div className="relative sm:w-96 mt-2 rounded-md shadow-sm">
                    <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                    <div className="h-full rounded-md border-0 bg-transparent py-2 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                        <MagnifyingGlassIcon className="h-5 w-5"/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            3D Model Sharing and Collabration Platform
            </h1>
            <div></div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
                to="/department"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Get started
            </Link>
            <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
            </Link>
            </div>
        </div>
    </div>
    {/* <div
    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    aria-hidden="true"
    >
    <div
        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style={{
        clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
    />
    </div> */}
    </>
  )
}


export default Home

