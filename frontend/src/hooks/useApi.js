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
      return res;
    } catch (err) {
      const error = err.response?.data?.message 
      setError(err)
      return {error : error}
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, sendData };
};

export default useApi;
