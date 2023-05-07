import React from "react";
import Spline from '@splinetool/react-spline';

function Campus() {
    document.title = '3D Capmus'
    return <>
        <Spline style={{height:'70vh',marginTop:'9vh',marginBottom:'9vh'}} className="w-full my-10 sm:block" scene="https://prod.spline.design/Am1d4E-GAjRF6WeB/scene.splinecode" />
    </>
}

export default Campus
