const BASE_URL = 'https://jsonplaceholder.typicode.com';
import useSWR from "swr";
import { useRouter } from "next/router";

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

export default function Post(){

    const router = useRouter();
    const { id } = router.query;

    const {data, error } = useSWR(id ? `${BASE_URL}/posts/${id}` : null, fetcher);

    if(!data) return <p>Loading</p>;

    return (
        <div>
            <h1>{data.id} - {data.title}</h1>
            <p>{data.body}</p>
        </div>
    )
}