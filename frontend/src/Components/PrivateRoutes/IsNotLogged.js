import React from 'react'
import {  useSelector } from "react-redux";
import {Navigate, useParams} from 'react-router-dom'
import LoadingComp from '../LoadingComp';
function IsNotLogged({children,to}) {
    const user = useSelector((storedata)=>storedata.user)
    const [isloading,setisloading] = React.useState(true)
    const {redirect} = useParams()
    setTimeout(()=>{
        setisloading(false)
    },1000)
    return <>
        {!user? isloading ? <LoadingComp/>:<Navigate to={redirect||to}/>:children}
    </>
}

export default IsNotLogged