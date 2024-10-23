import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestConnection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/data');
        console.log(response);
        setData(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div >
      {data}
    </div>
  );
}

export default TestConnection;
