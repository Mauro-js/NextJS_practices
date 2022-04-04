const BASE_URL = 'https://jsonplaceholder.typicode.com';
import useSWR from "swr";
import { useRouter } from "next/router";
import Layout from '../../../components/layout';
import {Loading, Slow, Error} from '../../../components/requestStatus';
import React, { useEffect, useState } from 'react';


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

export default function Post(){

    const router = useRouter();
    const { id } = router.query;
    const [requestStatus, setRequestStatus] = useState('loading');

    const {data, error } = useSWR(id ? `${BASE_URL}/posts/${id}` : null, fetcher, {
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
    if(!data) return <Layout title={'Posts'} description={'List of posts'}>
                        <Loading />
                    </Layout>

    return (
        <Layout title={'Posts ' + id}>
            {requestStatus === 'slow' && <Slow />}
            <div className="flex-col flex justify-center items-center h-screen">
                <div className="text-center mb-12">
                    <h1 className="text-2xl font-semibold mb-3">{data.id} - {data.title}</h1>
                    <p>{data.body}</p>
                </div>
            </div>
        </Layout>
    )
}