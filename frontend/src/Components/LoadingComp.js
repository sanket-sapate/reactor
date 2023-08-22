import React  from "react";
import ReactLoading from 'react-loading'
function LoadingComp (){

    return (
        <div className="h-[calc(100vh-5rem)] flex justify-center items-center" >
            <ReactLoading type="spokes" color="rgb(79 70 299)"/>
        </div>)
}

export default LoadingComp;