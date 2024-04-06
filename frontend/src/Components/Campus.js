import React from "react";
import Spline from '@splinetool/react-spline';
import {Helmet} from 'react-helmet-async'
function Campus() {
    
    return <>
    <Helmet>
        <title>3D Campus | ConceptLab</title>
        <meta name="description" content="Checkout this 3D Campus of VNIT"/>
        <meta name="keywords" content="3D Campus"/>
        <meta property="og:title" content="3D Campus | ConceptLab"/>
        <meta property="og:description" content="Checkout this 3D Campus of VNIT"/>
        <meta name="twitter:title" content="3D Campus | ConceptLab"/>
        <meta name="twitter:description" content="3D Campus of VNIT"/>
    </Helmet>

        <Spline style={{height:'70vh',marginTop:'9vh',marginBottom:'9vh'}} className="w-full my-10 sm:block" scene="https://prod.spline.design/Am1d4E-GAjRF6WeB/scene.splinecode" />
    </>
}

export default Campus
