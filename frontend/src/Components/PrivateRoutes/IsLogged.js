import React from 'react'
import {  useSelector } from "react-redux";
import {Navigate} from 'react-router-dom'
function IsLogged({children,to}) {
    const user = useSelector((storedata)=>storedata.user)
    return <>
        {user?<Navigate to={to}/>:children}
    </>
}

export default IsLogged