import React,{useState,useRef} from "react";
import config from "../config";
import ReCAPTCHA from "react-google-recaptcha";
import {toast} from 'react-toastify'
import { forgetPasswordApi } from "../api/user";
function ForgetPass({setIsForget}) {
    const [user,setUser] = useState({
        email:'',
    })
    function onChangeInput(e){
        setUser({
            [e.target.name]:e.target.value
        })
    }
    const captchaRef = useRef(null);
    document.title = 'Forget Password'
    const {RECAPTCHA_KEY,TOAST_UI} = config;
    function forgetPassword(e){
        e.preventDefault();
        captchaRef.current.executeAsync()
        .then((tokenRecaptcha)=>{
            if(user.email===''){
                toast.error('Email is required',TOAST_UI)
                return;
            }
            if(!user.email.includes('@')){
                toast.error('Email is invalid',TOAST_UI)
                return;
            }
            forgetPasswordApi(user.email,tokenRecaptcha)
            .then((res)=>{
                toast.success(res.data.message,TOAST_UI)
                captchaRef.current.reset();
            })
            .catch((res)=>{
                toast.error(res.response.data.error,TOAST_UI)
                captchaRef.current.reset();
            })
        })
        .catch((err)=>{
            toast.error(err,TOAST_UI)

        })
    }
    return <>
    <div className="relative isolate pt-[calc(50vh+10vw)] sm:pt-0 lg:px-8">
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
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                className="mx-auto h-10 w-auto"
                src="https://upload.wikimedia.org/wikipedia/en/3/36/VNIT_logo.jpeg?20210930001635"
                alt="VNIT"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset Password
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="post">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={onChangeInput}
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                
                </div>
                <div className="flex items-center justify-center" style={{alignItems:'center'}}>
                    <ReCAPTCHA
                    sitekey={RECAPTCHA_KEY}
                    ref={captchaRef}
                    size="invisible"
                    />
                </div>
                <div>
                <button
                    type="submit"
                    onClick={forgetPassword}
                    className="g-recaptcha flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Send Password Reset Link
                </button>
                </div>
            </form>
            <p
            onClick={()=>setIsForget(false)} 
             className="mt-7 cursor-pointer text-center text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign in
            </p>
            <p className="mt-7 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register Now!
                </a>
            </p>
            </div>
        </div>
    </div>
    </>
    }

export default ForgetPass;