import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import useSWR from 'swr';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const Cards = ({posts}) => {
    return posts.map(({id, title, body}) => <div key={id} className="p-4 sm:w-1/2 lg:w-1/3">
    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
            <h2 className="text-base font-medium text-indigo-300 mb-1">October 29,
                2021</h2>
            <h1 className="text-2xl font-semibold mb-3">
                {id} - {title}
            </h1>
            <p className="leading-relaxed mb-3">{body}</p>
            <div className="flex items-center flex-wrap ">
            <Link href={`/posts/${id}`}>
                <a className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0">Read More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                        fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </a>
            </Link>
                <span
                    className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none"
                        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none"
                        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path
                            d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                        </path>
                    </svg>6
                </span>
            </div>
        </div>
    </div>
</div>
);
}

const fetcher = async url => {
    const res = await fetch(`${url}`)

    if(!res.ok){
        const error = new Error('An error ocurred while fetching the data.');
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }
   
    return res.json()
}

export default function Index(){

    const {data, error} = useSWR(`${BASE_URL}/posts`, fetcher);

    if(!data){
        return <div className='flex justify-center items-center h-screen'>
                    <div className='relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r shadow-2xl from-indigo-600 via-indigo-600 to-gray-100'>
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-100 rounded-full'>              
                        </div>
                    </div>
                </div>
    }


    return (
        <section className="md:h-full flex items-center text-gray-600">
        <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-12">
                <h5 className="text-base md:text-lg text-indigo-700 mb-1">See Our Recent News</h5>
                <h1 className="text-4xl md:text-6xl text-gray-700 font-semibold">Tailwind Css Responsive Cards</h1>
            </div>
            <div className="flex flex-wrap -m-4">
                <Cards posts={data} />
            </div>            
        </div>
    </section>
    )
}