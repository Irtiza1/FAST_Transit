import axios from "axios";
import { useState } from "react";

const useApi = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (url, method, data = null) => {
    setLoading(true);
    setError(null);
    setResponse(null); 
    try {
      const res = await axios({ method, url, data });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data || { message: "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, sendData };
};

export default useApi;


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
