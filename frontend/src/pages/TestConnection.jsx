import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RegisterDriver } from '../component/RegisterDriver';
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
    <div className='bg-gray-900'>
      {data}
      <RegisterDriver/>
    </div>
  );
}

export default TestConnection;
