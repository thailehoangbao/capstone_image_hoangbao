import React, { useEffect, useState } from 'react'
import { DOMAIN_BE_IMG } from '../../../../../Utils/constantsUtils.js';
import { useNavigate } from 'react-router-dom';

export default function ImageItem({ image }) {
    const navigate = useNavigate();
    return (
        <div className="lg:w-1/3 sm:w-1/2 p-4 cursor-pointer" onClick={() => {
            navigate(`/detail/${image.image_id}`);
        }}>
            <div className="flex relative" style={{width:"250px",height:"300px"}}>
                <img alt="gallery" className="absolute rounded-md inset-0 w-full h-full object-cover object-center" src={DOMAIN_BE_IMG + image.image} />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{image.image_name}</h1>
                    <p className="leading-relaxed">{image.description}</p>
                </div>
            </div>
        </div>
    )
}
