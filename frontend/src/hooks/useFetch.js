import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!url) return;
  
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        setData(null)
        try {
          const response = await axios.get(url);
          setData(response.data);
          console.log("Fetched data in useFetch:", response.data);
          console.log("Fetched data in useFetch:", response);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { data, loading, error,setError,setLoading,setData };
  };
export default useFetch;
// import { useState, useEffect } from "react";
// import axios from "axios";

// const useFetch = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async (url) => {
//     if (!url) {
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(url);
//       setData(response.data);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error,fetchData };
// };

// export default useFetch;

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
