import Spline from "@splinetool/react-spline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { topicAction } from "../Redux/action";

const Model = ()=>{
    const {department,topic} = useParams()
    const obj = useSelector((storedata)=>storedata.topic)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(topicAction(department,topic))
    },[dispatch,department,topic])
    return (<div className="mt-5 min-h-[79vh]">
        {obj?<div>
            <div className="text-center sm:text-left text-xl font-bold">
                {obj?.title}
            </div>
            <div className="sm:flex sm:justify-around pb-5" >
                <div className="py-5 h-[250px] sm:mt-10 sm:h-[70vh] sm:w-[40vw]">
                    <Spline scene={obj?.spline}/>
                </div>
                <div className="sm:w-1/2">
                    {obj?.description.map((e,i)=><div key={i} className="pt-5 text-justify">{e}</div>)}
                </div>
            </div>
        </div>:''}
    </div>)
}

export default Model