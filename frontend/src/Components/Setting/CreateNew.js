import React, { useRef, useState } from "react";
import {motion} from 'framer-motion'
import ReCAPTCHA from "react-google-recaptcha";
import config from "../../config";
import { registerApi,checkAvailability } from "../../api/user";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userDetailAction } from "../../Redux/action";
let id = null
const exitOut ={
    initial:{
        top:0
    },
    animate:{
        top:0
    },
    exit:{
        height:0,
        top:'-500px'
    }
}
export default function CreateNew(){
    const {TOAST_UI,SET_COOKIEE,RECAPTCHA_KEY} = config
    const [ input,setInput] = useState({})    
    const [error,setError] = useState({})  
    const captchaRef = useRef(null)  
    const dispatch = useDispatch()
    const formInput =[
        {name:'name',content:'Full Name',placeholder:'Enter Name',error:error.name,type:'text'},
        {name:'username',content:'Username',placeholder:'Enter Preferred Username',error:error.username,type:'text'},
        {name:'email',content:'Email Address',placeholder:'Enter Email',error:error.email,type:'email'},
        {name:'password',content:'Password',placeholder:'Enter Password',error:error.password,type:'password'},
        {name:'confirm',content:'Confirm Password',placeholder:'Confirm Password',error:error.confirm,type:'password'},
    ]
    function checkUsername(username){
        clearTimeout(id)
        id = setTimeout(() => {
            checkAvailability(username)
            .then((res)=>{
                if(res.data?.isAvailable){
                    setError({
                        ...error,
                        username:false
                    })
                }else{
                    setError({
                        ...error,
                        username:res.data?.result
                    })
                }
            })
        }, 1000);
    }
    function createAccount(e){
        e.preventDefault()
        let flag = false
        formInput.forEach((item)=>{
            if(item.error){
                flag=true
            }
        })
        if(flag){
            toast.error('All conditions not met',TOAST_UI)
            return
        }
        captchaRef.current.executeAsync()
        .then((tokenRecaptcha)=>{
            registerApi(input.name,input.email,input.password,input.username,tokenRecaptcha)
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
    function onChangeInput(e){
        const value = e.target.value
        let text = error.password||''
        switch (e.target.name) {
            case 'username':
                checkUsername(value)
                
                break;
            case 'password':
                if(value.length<8)
                    text='Minimum 8 characters'
                else
                    text=''
            case 'confirm':
                if(input.password!==value){
                    setError({
                        ...error,
                        'confirm':"Password doesn't match",
                        password:text
                    })  
                }
                else{
                    setError({
                        ...error,
                        'confirm':"",
                        password:text
                    })
                }
                break;
            default:
                break;
        }
        setInput({
            ...input,
            [e.target.name]:value
        })
    }
    return <motion.div key='new' variants={exitOut} initial='initial' animate='animate' exit='exit' transition={{duration:.7}} className="border-2 rounded-lg bg-slate-100 md:w-2/3 border-slate-300 p-3 py-4 md:x-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-10 lg:px-8">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Account
          </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={createAccount}>
            {
                formInput.map((item)=>{
                    return(
                    <div key={item.name}>
                        <div className="flex items-center justify-between">
                            <label htmlFor={item.name} className="block text-start text-sm font-medium leading-6 text-gray-900">
                                {item.content}
                            </label>
                            <div className="text-sm">
                                {item.error===false?<p className="font-semibold transition-all text-green-600 hover:text-green-500">
                                    Available
                                </p>:<p className="font-semibold transition-all text-red-600 hover:text-red-500">
                                    {item.error}
                                </p>
                                }
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                            id={item.name}
                            name={item.name}
                            type={item.type}
                            autoComplete={item.name}
                            onChange={onChangeInput}
                            required
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    )
                })
            }

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create 
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center">
            <ReCAPTCHA
            sitekey={RECAPTCHA_KEY}
            ref={captchaRef}
            size="invisible"
            />
        </div>
    </motion.div>
}
    // <motion.div className="border-2 rounded-lg bg-slate-200 md:w-2/3 border-slate-300 p-3 py-4 md:x-10 flex flex-col ">
    //     <p className="text-xl font-semibold">Create New Account</p>
    //     <form className="mt-2 flex  flex-col items-center ">
    //         {formInput.map((item=>{
    //             return <div className="flex flex-col">
    //             <label className="text-lg mb-3">
    //                 {item.name}
    //             </label>
    //             <input name={item.name} type={item.type} placeholder={item.placeholder} className="p-2 h-8 mx-2 "/>
    //             <p className="text-sm text-red-600 mt-1">{item.error}</p>
    //         </div>
    //         }))}
            
    //     </form>
    // </motion.div>