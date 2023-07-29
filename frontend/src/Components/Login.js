import Spline from "@splinetool/react-spline";
import React from "react";
import {useNavigate} from 'react-router-dom'
import LoginForm from "./LoginForm";
import ForgetPass from "./ForgetPass";
import {motion} from 'framer-motion'
function Login() {
    const navigate = useNavigate()
    const [isForget,setIsForget] = React.useState(false)
    const screen = window.screen.width
    return <motion.div
    initial={{opacity:1}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
    {/* // return <> */}
        <div className="h-12 sm:z-20 flex justify-start place-content-center" style={{alignItems:'center'}}>
            <img onClick={()=>navigate(-1)}  src="https://cdn-icons-png.flaticon.com/512/545/545680.png" alt="back-button" className="ml-6 cursor-pointer z-10 h-10 w-10"/>
        </div>
        <div className="flex absolute top-0 flex-col w-full h-[30vh] sm:h-[100vh] sm:flex-row justify-center items-center">
            {screen>640?<div className="flex-grow hidden sm:flex h-full">
                <Spline style={{width:'100%',height:'100%'}} scene="https://prod.spline.design/TI8n8xQ3KxjXRev1/scene.splinecode"/>
            </div>:<></>}
            <div className="bg-white min-w-[70vw] sm:min-w-[40vw] sm:w-[40vw]">
                {
                    !isForget?<LoginForm setIsForget={setIsForget}/>:<ForgetPass setIsForget={setIsForget}/>
                }
            </div>
        </div>
    {/* </> */}
    </motion.div>
}

export default Login