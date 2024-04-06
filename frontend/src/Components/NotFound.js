import React from 'react';
import { Helmet } from 'react-helmet';
export default function NotFound() { 
    
    return (
        <div className='flex flex-col justify-center items-center h-[60vh]'>
            <h1 className='text-5xl'>404</h1>
            <p className='text-2xl'>Page not found</p>
            <Helmet>
                <title>404 | ConceptLab</title>
                <meta name="description" content="404 Page not found"/>
                <meta name="keywords" content="404 Page not found"/>
                <meta property="og:title" content="404 | ConceptLab"/>
                <meta property="og:description" content="404 Page not found"/>
                <meta name="twitter:title" content="404 | ConceptLab"/>
                <meta name="twitter:description" content="404 Page not found"/>
            </Helmet>
        </div>
    );
}