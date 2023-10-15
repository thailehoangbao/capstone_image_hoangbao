import React, { useEffect, useState } from 'react'
import ImageItem from './ImageItem/ImageItem'
import { findImageFollowName, getAllImages } from '../../../../Utils/apiUtils.js';
import { useNavigate } from 'react-router-dom';

export default function ListImage() {
    const [images, setImages] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        getAllImages()
            .then((result) => {
                setImages(result);
            })
            .catch(err => { console.log(err) });

    }, [])

    const renderItems = () => {
        return images?.map((image, index) => {
            return <ImageItem image={image} key={index} />
        })
    }
    return (
        <section className="text-gray-600 body-font p-20">
            <div className="container px-5 py-5 mx-auto">
                <div className="flex flex-col text-center w-full">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Click to Create Your Images</h1>
                    <div className='flex justify-center items-center cursor-pointer' onClick={() => {
                        navigate('/create-image')
                    }}>
                        <img style={{ width: "200px", height: "200px" }} src="https://us.123rf.com/450wm/alekseyvanin/alekseyvanin1812/alekseyvanin181202315/114246109-ajouter-une-ic%C3%B4ne-de-contour-d-image-signe-de-style-lin%C3%A9aire-pour-le-concept-mobile-et-la.jpg?ver=6" alt="plus-image" />
                    </div>
                </div>
                <div className='mb-10'>
                    <h1 className='font-semibold text-md mb-2'>Search Name Image</h1>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-100">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                            </button>
                        </span>
                        <input type="text" name="Search" placeholder="Search..." style={{ border: "1px solid black", width: "400px" }} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900" onBlur={(e) => {
                            findImageFollowName(e.target.value)
                                .then((result) => {
                                    setImages(result);
                                })
                                .catch((err) => { console.log(err) })
                        }} />
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    {renderItems()}
                </div>
            </div>
        </section>
    )
}
