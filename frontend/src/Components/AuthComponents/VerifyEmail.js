import React, { useEffect, useState } from "react";
import ReactLoading from 'react-loading'
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailApi } from "../../api/user";
import { toast } from "react-toastify";
import config from "../../config";
export default function VerifyEmail(){
    const {token} = useParams();
    const navigate = useNavigate();
    const {TOAST_UI} = config
    function VerifyEmail(){
        verifyEmailApi(token)
        .then((res)=>{
            toast.success(res.data.message,TOAST_UI)
            navigate('/')
        })
        .catch((res)=>{
            toast.error(res.response.data.message,TOAST_UI)
            navigate('/verify-email')
        })
    }
    useEffect(()=>{
        VerifyEmail()
    },[])
    return <div className="flex mt-5 justify-evenly  h-[50vh] items-center flex-col">
            <h1 className="text-2xl ">Verifying email</h1>
            <ReactLoading type="spokes" color="rgb(79 70 299)"/>
    </div>
}