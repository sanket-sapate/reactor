import React, { useEffect, useState,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingComp from "../LoadingComp";
import { checkTokenApi } from "../../api/user";
import config from "../../config";
import ReCAPTCHA from "react-google-recaptcha";
import { resetPasswordApi } from "../../api/user";
import {toast} from 'react-toastify'
import {Helmet } from 'react-helmet'
function ResetPassword() {
    const {token} = useParams();
    const navigate = useNavigate();
    const [user,setUser] = useState({
        password:'',
        confirmPassword:''
    })
    const [error,setError] = useState({
        password:'',
        confirmPassword:''
    })
    const [tokenResponse,setTokenResponse] = useState(null)
    useEffect(  ()=>{
        async function fetchData(){
            const reply = await checkTokenApi(token)
            if(!reply.data.result){
                toast.error(reply.data.message,config.TOAST_UI)
            }
            setTokenResponse(reply.data.result)
        }
        fetchData()
    },[token])
    useEffect(()=>{
        if(tokenResponse===false){
            navigate('/')
        }
    },[tokenResponse,navigate])
    const captchaRef = useRef(null);
    const onChangeInput = (e)=>{
        if(e.target.name==='password'){
            if(e.target.value.length<8){
                setError({
                    ...error,
                    password:'Password must be atleast 8 characters long'
                })
            }else{
                setError({
                    ...error,
                    password:''
                })
            }
        }
        if(e.target.name==='confirmPassword'){
            if(e.target.value!==user.password){
                setError({
                    ...error,
                    confirmPassword:'Password does not match'
                })
            }else{
                setError({
                    ...error,
                    confirmPassword:''
                })
            }
        }
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    function resetPassword(e){
        e.preventDefault();
        if(error.password!=='' || error.confirmPassword!==''){
            return;
        }
        console.log(user)
        captchaRef.current.executeAsync()
        .then((tokenRecaptcha)=>{
            resetPasswordApi(token,user.password,tokenRecaptcha)
            .then((res)=>{
                toast.success(res.data.message,TOAST_UI)
                navigate('/signin')
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
    const {RECAPTCHA_KEY,TOAST_UI} = config;
  return (<>
  <Helmet>
        <title>Reset Password | ConceptLab</title>
        <meta name="description" content="Reset password on ConceptLab"/>
        <meta name="keywords" content="Reset Password"/>
        <meta property="og:title" content="Reset Password | ConceptLab"/>
        <meta property="og:description" content="Reset password on ConceptLab"/>
        <meta name="twitter:title" content="Reset Password | ConceptLab"/>
        <meta name="twitter:description" content="Reset password on ConceptLab"/>
  </Helmet>
   { tokenResponse===null? <LoadingComp/>:
    <div className="mt-5">{
    tokenResponse===false?
        <div>Token is invalid</div>
        :
        <div className="relative isolate sm:pt-0 lg:px-8">
        
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
            <form onSubmit={resetPassword} className="space-y-6" action="#" method="post">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        New Password
                    </label>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type="text"
                        onChange={onChangeInput}
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        {error.password}
                    </p>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Confirm Password
                    </label>
                    <div className="mt-2">
                        <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="text"
                        onChange={onChangeInput}
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        {error.confirmPassword}
                    </p>
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
                    className="g-recaptcha flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Reset Password
                </button>
                </div>
            </form>
            <p className="mt-7 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register Now!
                </a>
            </p>
            </div>
        </div>
    </div>   
        }
  </div>}
  
  </>);
}

export default ResetPassword;