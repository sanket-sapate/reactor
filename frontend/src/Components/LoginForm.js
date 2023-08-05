import React,{useState} from "react";
import GoogleAuth from "./GoogleAuth";
import config from "../config.js";
import { loginApi } from "../api/user";
import {toast} from 'react-toastify'
import { userDetailAction } from '../Redux/action'
import { useDispatch } from 'react-redux'
import {motion} from 'framer-motion'
function LoginForm({setIsForget,captchaRef}){
    const {TOAST_UI,SET_COOKIEE} = config;
    const dispatch = useDispatch();
    
    const [user,setUser] = useState({
        email:'',
        password:''
    })
    document.title = 'Login'
    function onChangeInput(e){
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    function loginBtn(e){
        e.preventDefault();
        captchaRef.current.executeAsync()
        .then((tokenRecaptcha)=>{
            loginApi(user.email,user.password,tokenRecaptcha)
            .then((res)=>{
                toast.success(res.data.message,TOAST_UI)
                const {token,user} = res.data.data;
                SET_COOKIEE('auth-token',token,15)
                dispatch(userDetailAction(user))
                captchaRef.current.reset();
            })
            .catch((res)=>{
                toast.error(res.response.data.error,TOAST_UI)
                captchaRef.current.reset();
            })
        })
        .catch((err)=>{
            toast.error(err,TOAST_UI)
            captchaRef.current.reset();
        })
    }
    const anime = {
        enter :{
            right:'50vw'
        },
        present:{
            right:0
        },
        exit:{
            right:'50vw'
        }
    }
    return (<>
    <motion.div className="absolute isolate pt-[calc(50vh+10vw)] sm:pt-0 lg:px-8" variants={anime}
        exit='exit' animate='present' initial='enter' transition={{duration:1}}
    >
        
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                className="mx-auto h-10 w-auto"
                src="https://upload.wikimedia.org/wikipedia/en/3/36/VNIT_logo.jpeg?20210930001635"
                alt="VNIT"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
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
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                    </label>
                    <div className="text-sm">
                    <p onClick={()=>setIsForget(true)} className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </p>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={onChangeInput}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>
                <div>
                <button
                    type="submit"
                    onClick={loginBtn}
                    className="g-recaptcha flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign in
                </button>
                </div>
                <div className="flex justify-center w-full items-center">
                    <GoogleAuth />
                </div>
            </form>


            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a href="/profile" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register Now!
                </a>
            </p>
            </div>
        </div>
    </motion.div>
    </>)

}

export default LoginForm