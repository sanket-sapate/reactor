import React, { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import { loginApi,registerApi } from "../api/user";
import {toast} from 'react-toastify'
import config from '../config'
function Register() {
    const [user,setUser] = useState({
        email:'',
        password:''
    })
    const {TOAST_UI} = config
    function onChangeInput(e){
        setUser({
            [e.target.name]:e.target.value
        })
    }
    function loginBtn(){
        loginApi(user.email,user.password)
        .then((res)=>{
            toast.success(res.data.message,TOAST_UI)
            const {token} = res.data.data;
            localStorage.setItem('auth-token', token);
        })
        .catch((res)=>{
            toast.error(res.data.error,TOAST_UI)
        })
    }
    function registerBtn() {
        registerApi(user.email,user.password)
        .then((res)=>{
            toast.success(res.data.message,TOAST_UI)
            const {token} = res.data.data;
            localStorage.setItem('auth-token', token);
        })
        .catch((res)=>{
            toast.error(res.data.error,TOAST_UI)
        })
    }
    return <><div className="sm:w-1/3  mx-auto pt-2 pb-6 mt-8 sm:px-10 rounded-md sm:bg-gray-100 sm:shadow-sm sm:ring-1 sm:ring-inset sm:ring-gray-300">
        <div className="sm:mt-5  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                        onChange={onChangeInput}
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter Email"
                        />
                    </div>
                </div>
            </div>
            <div className="sm:col-span-4">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                        onChange={onChangeInput}
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter Password"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-6 sm:flex items-center justify-end gap-x-6">
            <button
            onClick={loginBtn} 
            className="rounded-md mb-4 sm:mb-0 w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
            </button>
            <button
            onClick={registerBtn} 
            className="text-center rounded-md mb-4 sm:mb-0 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full leading-6">
            Register
            </button>
        </div>
        <div  className="mt-6  flex items-center justify-center gap-x-6">
            <GoogleAuth />
        </div>
    </div>
    <div className="sm:h-[40vh] "></div>
    </>
}

export default Register