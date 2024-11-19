import axios from "axios";
import { useState } from "react";

const useApi = () =>{
    const [response,setResponse] = useState(null);
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    const sendData = async (url,method,data)=>{
        setLoading(true)
        setError(null)
        try {
            const res = axios({method,url,data:data})
            setResponse(response)
        } catch (error) {
            setError(error)
        } finally{
            setLoading(false)
        }
    }
    return {response,loading,error}
}
export default useApi

//ussage
// import React, { useState } from 'react';
// import useApi from '../hooks/useApi';

// const CreateUser = () => {
//     const [user, setUser] = useState({ name: '', email: '' });
//     const { response, loading, error, sendRequest } = useApi();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await sendRequest('https://api.example.com/users', 'POST', user); // Send POST request
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={user.name}
//                     onChange={(e) => setUser({ ...user, name: e.target.value })}
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={user.email}
//                     onChange={(e) => setUser({ ...user, email: e.target.value })}
//                 />
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Creating...' : 'Create User'}
//                 </button>
//             </form>

//             {error && <p>Error: {error.message}</p>}
//             {response && <p>User created successfully!</p>}
//         </div>
//     );
// };
