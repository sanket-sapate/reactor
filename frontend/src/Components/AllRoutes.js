import React,{Suspense,lazy} from "react";
import { Route, Routes } from "react-router-dom";
import LoadingComp from "./LoadingComp";
const Home = lazy( ()=>import  ('./Home'))
const Model = lazy( ()=>import  ('./Model'))
const Navbar = lazy( ()=>import  ("./Navbar"))
const Topic = lazy( ()=>import  ('./Topic'))
const About = lazy( ()=>import  ('./About'))
const Footer = lazy( ()=>import  ("./Footer"))
const Campus = lazy( ()=>import  ("./Campus"))
const Contribute = lazy( ()=>import  ("./Contribute"))
const IsNotLogged = lazy( ()=>import  ('./PrivateRoutes/IsNotLogged'))
const Account = lazy( ()=>import  ('./Account'))
const ResetPassword = lazy( ()=>import  ('./ResetPassword'))
function AllRoutes (){
    return (<>
        <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <Navbar/>
        <Suspense fallback={<LoadingComp/>}>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/department" element={<Topic/>}/>
            <Route path="/department/:department/" element={<Topic/>} />
            <Route path="/department/:department/:subject" element={<Topic/>} />
            <Route path="/department/:department/:subject/:topic" element={<Model/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/campus" element={<Campus/>}/>
            <Route path='/contribute' element={<Contribute/>} />
            <Route path='/account' element={<IsNotLogged to='/'><Account/></IsNotLogged>} />
            <Route path='/loading' element={<LoadingComp/>} />
            <Route path='/reset-password/:token' element={<ResetPassword/>} />
            <Route path='*' element={<div>Not found</div>}/>
        </Routes>
        </Suspense>
      </div>
    </div>
    <Footer/>
    </>)
}

export default AllRoutes