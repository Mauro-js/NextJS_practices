import Layout from '../components/layout';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import {Loading, Slow, Error} from '../components/requestStatus';
import Cards from '../components/cards';
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


export default function Home() {
  const [requestStatus, setRequestStatus] = useState('loading');

  const {data, error} = useSWR(`${BASE_URL}/albums`, fetcher, {
      onSuccess: () => {
          setRequestStatus(false)
       },
      onLoadingSlow: () => {
          setRequestStatus('slow')
      },
      onError: () => {
          setRequestStatus('error')
        },
        loadingTimeout: 1000
  });

  
  if(!data) return <Layout title={'MauroApp'} description={'Home'}>
                        <Loading />
                    </Layout>
  if(requestStatus === 'error') return <Layout title={'Posts'} description={'List of posts'}>
                                        <Error />
                                    </Layout>

  return (
    <Layout>
    {requestStatus === 'slow' && <Slow />}
      <section className="md:h-full flex items-center text-gray-600">
          <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-9">
                  <Cards posts={data} prefix={'/albums/'} />
              </div>            
          </div>
      </section>
    </Layout>
  )
}