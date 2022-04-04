import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Layout from '../../components/layout';
import {Loading, Slow, Error} from '../../components/requestStatus';
import Cards from '../../components/cards';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const fetcher = async url => {

    const res = await fetch(`${url}`).catch(error => {console.log(error)})

    if(!res.ok){
        const error = new Error('An error ocurred while fetching the data.');
        
        error.info = await res.json();
        error.status = res.status;
       // throw error;
    }

    return res.json();
}

export default function Index(){
    const [id, setId] = useState('')
    const [realId, setRealId] = useState(null)
    const [requestStatus, setRequestStatus] = useState('loading');

    const {data, error} = useSWR( realId ? `${BASE_URL}/posts?userId=${realId}` : `${BASE_URL}/posts`, fetcher, {
        onLoadingSlow: () => {
            setRequestStatus('slow')
        },
        onError: () => {
            setRequestStatus('error')
          },
          loadingTimeout: 800
    });


    useEffect(() => {
       setTimeout(() => {
           setRealId(id);
        },1000);
    },[id])

    function handleIdChange(event) {
        setId(event.target.value)
      }

      if(requestStatus === 'error') return <Layout title={'Posts'} description={'List of posts'}>
                                            <Error />
                                        </Layout>
    if(!data) return <Layout title={'Posts'} description={'List of posts'}>
                        <Loading />
                    </Layout>
    

    return (
        <>
        <Layout title={'Posts'} description={'List of posts'}>
                 {requestStatus === 'slow' && <Slow />}
                <div className='p-4 sm:w-1/2 lg:w-1/4'>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">User Id:</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        </div>
                        <input 
                            type="text" 
                            name="price" 
                            id="price"
                            value={id}
                            className="bg-gray-300 focus:ring-indigo-500 focus:border-indigo-500 
                            block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" 
                            onChange={handleIdChange}
                            />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                        </div>
                    </div>
                </div>
                <section className="md:h-full flex items-center text-gray-600">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-9">
                            <Cards posts={data} prefix={'/posts/'} />
                        </div>            
                    </div>
                </section>
        </Layout>
    </>
    )
}