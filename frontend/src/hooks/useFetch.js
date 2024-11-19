import { useState,useEffect } from "react";
import axios from "axios";

const useFetch = (url) =>{
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchData= async ()=>{
            try {
                const response = axios.get(url)
                setData(response)
            } catch (error) {
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[url])
    return {data,loading,error};
}

export default useFetch;

//usage
// import useFetch from '../hooks/useFetch';

// const UserList = () => {
//     const { data: users, loading, error } = useFetch('https://api.example.com/users');

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <ul>
//             {users.map((user) => (
//                 <li key={user.id}>{user.name}</li>
//             ))}
//         </ul>
//     );
// };
