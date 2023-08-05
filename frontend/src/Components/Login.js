import Spline from "@splinetool/react-spline";
import ReCAPTCHA from "react-google-recaptcha";
import React,{useRef} from "react";
import {useNavigate} from 'react-router-dom'
import LoginForm from "./LoginForm";
import ForgetPass from "./ForgetPass";
import {AnimatePresence, motion} from 'framer-motion'
import config from "../config";
function Login() {
    const navigate = useNavigate()
    const {RECAPTCHA_KEY} = config
    const captchaRef = useRef(null);
    const [isForget,setIsForget] = React.useState(false)
    const screen = window.screen.width
    return <motion.div
    initial={{opacity:1}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
    {/* // return <> */}
        <div className="h-12 sm:z-20 flex z-20 justify-start place-content-center" style={{alignItems:'center'}}>
            <img onClick={()=>navigate(-1)}  src="https://cdn-icons-png.flaticon.com/512/545/545680.png" alt="back-button" className="ml-6 cursor-pointer z-20 h-10 w-10"/>
        </div>
        <div className="flex absolute top-0 flex-col w-full h-[30vh] sm:h-[100vh] sm:flex-row justify-center items-center">
            {screen>640?<div className="flex-grow hidden sm:flex h-full">
                {/* <Spline style={{width:'100%',height:'100%',zIndex:10}} scene="https://prod.spline.design/TI8n8xQ3KxjXRev1/scene.splinecode"/> */}
            </div>:<></>}
            <div className=" min-w-[70vw] sm:min-w-[40vw] sm:w-[40vw]">
                <div
            className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
        >
            <div
                className="relative -m-1 left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%)] sm:w-[72.1875rem]"
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
        </div>
                <AnimatePresence>
                    {
                        !isForget?<LoginForm key={'login'} captchaRef={captchaRef} setIsForget={setIsForget}/>:
                        <ForgetPass key={'forget'} captchaRef={captchaRef} setIsForget={setIsForget}/>
                    }
                    <ForgetPass key={'forget'} captchaRef={captchaRef} setIsForget={setIsForget}/>
                </AnimatePresence>
            </div>
            <div className="flex items-center justify-center" style={{alignItems:'center'}}>
                    <ReCAPTCHA
                    sitekey={RECAPTCHA_KEY}
                    ref={captchaRef}
                    size="invisible"
                    />
                </div>
        </div>
    {/* </> */}
    </motion.div>
}

export default Login