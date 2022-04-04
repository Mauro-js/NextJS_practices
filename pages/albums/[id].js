import React, { useEffect, useState } from 'react';
const BASE_URL = 'https://jsonplaceholder.typicode.com';
import useSWR from "swr";
import { useRouter } from "next/router";
import Layout from '../../components/layout';
import {Loading, Slow, Error} from '../../components/requestStatus';
import Cards from '../../components/cards';


const fetcher = async url => {
    const res = await fetch(`${url}`)

    if(!res.ok){
        const error = new Error('An error ocurred while fetching the data.');
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }
   
    return res.json();
}

export default function Album(){

    const router = useRouter();
    const { id } = router.query;
    const [requestStatus, setRequestStatus] = useState('loading');
    const {data, error } = useSWR(id ? `${BASE_URL}/photos?albumId=${id}` : null, fetcher, {
        onSuccess: () => {
            setRequestStatus(false)
         },
        onLoadingSlow: () => {
            setRequestStatus('slow')
        },
        onError: () => {
            setRequestStatus('error')
          },
          loadingTimeout: 800
    });

    if(requestStatus === 'error') return <Layout title={'Posts'} description={'List of posts'}>
                                            <Error />
                                        </Layout>
    if(!data) return    <Layout title={'Album'} description={'List of photos'}>
                            <Loading />
                        </Layout>;

    

    return (
        <Layout title={'Album ' + id}>
            {requestStatus === 'slow' && <Slow />}
            <section className="md:h-full flex items-center text-gray-600">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-9">
                            <Cards posts={data} prefix={'/posts/'} />
                        </div>            
                    </div>
            </section>
        </Layout>
    )
}