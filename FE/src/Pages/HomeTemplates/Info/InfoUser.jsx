import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { DOMAIN_BE_IMG, USER_LOGIN } from '../../../Utils/constantsUtils';
import { getAllImagesCreatedByUser } from '../../../Utils/apiUtils';
import { useNavigate } from 'react-router-dom';


export default function InfoUser() {
    const user = JSON.parse(localStorage.getItem(USER_LOGIN));
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getAllImagesCreatedByUser(user?.user_id)
            .then(rs => {
                console.log(rs);
                setData(rs);
            })
            .catch(err => alert(err))
    }, []);
    if (!user) {
        return navigate('/login')
    }

    const renderImagesSaved = () => {
        const newData = data?.filter(item => item.is_save == 1);

        return newData?.map((item, index) => {
            return <div className="p-4 lg:w-1/4 md:w-1/2" key={index}>
                <div className="h-full flex flex-col items-center text-center">
                    <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={DOMAIN_BE_IMG + item.image} />
                    <div className="w-full">
                        <h2 className="title-font font-medium text-lg text-gray-900">{item.image_name}</h2>
                        <h3 className="text-gray-500 mb-3">Creator</h3>
                        <p className="mb-4">{item.description}</p>
                        <span className="inline-flex">
                            <a className="text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a className="ml-2 text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a className="ml-2 text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        })
    }

    const renderImagesUnSaved = () => {
        const newData = data?.filter(item => item.is_save == null);
        return newData?.map((item, index) => {
            return <div className="p-4 lg:w-1/4 md:w-1/2" key={index}>
                <div className="h-full flex flex-col items-center text-center">
                    <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={DOMAIN_BE_IMG + item.image} />
                    <div className="w-full">
                        <h2 className="title-font font-medium text-lg text-gray-900">{item.image_name}</h2>
                        <h3 className="text-gray-500 mb-3">Creator</h3>
                        <p className="mb-4">{item.description}</p>
                        <span className="inline-flex">
                            <a className="text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a className="ml-2 text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a className="ml-2 text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        })
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="flex flex-col justify-center items-center h-[100vh]">
                <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                        <img src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png" className="absolute flex h-32 w-full justify-center rounded-xl bg-cover" />
                        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                            <img className="h-full w-full rounded-full" src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png" alt />
                        </div>
                    </div>
                    <div className="mt-16 flex flex-col items-center">
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                            {user.full_name}
                        </h4>
                        <p className="text-base font-normal text-gray-600">Product Creator</p>
                    </div>
                    <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
                            <p className="text-sm font-normal text-gray-600">Posts</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                9.7K
                            </p>
                            <p className="text-sm font-normal text-gray-600">Followers</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                434
                            </p>
                            <p className="text-sm font-normal text-gray-600">Following</p>
                        </div>
                    </div>
                </div>
                <p className="font-normal text-navy-700 mt-20 mx-auto w-max">Profile Card component from <a href="https://horizon-ui.com?ref=tailwindcomponents.com" target="_blank" className="text-brand-500 font-bold">Horizon UI Tailwind React</a></p>
            </div>
            <div className="container px-5 py-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">LIST IMAGE</h1>
                    <Tabs>
                        <TabList>
                            <Tab>List Images Saved</Tab>
                            <Tab>List Images Not Saved</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="flex flex-wrap -m-4">
                                {renderImagesSaved()}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='flex flex-wrap -m-4'>
                                {renderImagesUnSaved()}
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>

            </div>
        </section>

    )
}
