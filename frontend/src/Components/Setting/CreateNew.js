import React, { useRef, useState } from "react";
import {motion} from 'framer-motion'
import ReCAPTCHA from "react-google-recaptcha";
import config from "../../config";

export default function CreateNew(){
    const [input,setInput] = useState({})    
    const [error,setError] = useState({})  
    const captchaRef = useRef(null)  
    const formInput =[
            {name:'Full Name',placeholder:'Enter Name',error:error.name,type:'text'},
            {name:'UserName',placeholder:'Enter Preferred Username',error:error.username,type:'text'},
            {name:'Email Address',placeholder:'Enter Email',error:error.email,type:'email'},
            {name:'Password',placeholder:'Enter Password',error:error.Password,type:'password'},
            {name:'Confirm Password',placeholder:'Confirm Password',error:error['Confirm Password'],type:'password'},
        ]
    function onChangeInput(e){
        const value = e.target.value
        switch (e.target.name) {
            case 'Password':
                if(value.length<8)
                    setError({
                        ...error,
                        'Password':'Password length should be minimum 8 characters'
                    })
                else
                setError({
                    ...error,
                    'Password':''
                })
                break;
            case 'Confirm Password':

                break;
            default:
                break;
        }
        setInput({
            ...input,
            [e.target.name]:value
        })
    }
    return <motion.div className="border-2 rounded-lg bg-slate-100 md:w-2/3 border-slate-300 p-3 py-4 md:x-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-10 lg:px-8">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            {
                formInput.map((item)=>{
                    return(
                    <div key={item.name}>
                        <div className="flex items-center justify-between">
                            <label htmlFor={item.name} className="block text-start text-sm font-medium leading-6 text-gray-900">
                                {item.name}
                            </label>
                            <div className="text-sm">
                                <p  className="font-semibold transition-all text-red-600 hover:text-red-500">
                                    {item.error}
                                </p>
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
            sitekey={config.RECAPTCHA_KEY}
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