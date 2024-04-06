import React, { useState } from 'react';
import { sendVerifyEmailApi } from '../../api/user';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet'

export default function SendEmailVerification(props) {
    const [email,setEmail] = useState()
    function sendVerifyEmail(e) {
        e.preventDefault()
        sendVerifyEmailApi(email)
        .then(res => {
            toast.success(res.data.message)
        })
        .catch(err => {
            toast.error(err.response.data.message)
        })
        console.log(email)
    }
    return <>
        <Helmet>
            <title>Send Email Verification | ConceptLab</title>
            <meta name="description" content="Send Email Verification for ConceptLab"/>
            <meta name="keywords" content="Send Email Verification"/>
            <meta property="og:title" content="Send Email Verification | ConceptLab"/>
            <meta property="og:description" content="Send Email Verification for ConceptLab"/>
            <meta name="twitter:title" content="Send Email Verification | ConceptLab"/>
            <meta name="twitter:description" content="Send Email Verification for ConceptLab"/>
        </Helmet>
        <div className='flex flex-col h-[60vh] items-center justify-center'>
            <form
                onSubmit={sendVerifyEmail}
                className="mt-10 flex flex-col ">
            <input type="text"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Email"
                onChange={(e)=>setEmail(e.target.value)}
                />
            <button
                type='submit'
                className="mt-7 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                    Send Verification Email 
            </button>
            </form>
        </div>
    </>
}