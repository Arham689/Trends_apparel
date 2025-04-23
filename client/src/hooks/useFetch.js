import * as React from 'react';
import axios from 'axios';

const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        if (method === 'GET') {
          response = await axios.get(url ,{withCredentials : true });
          console.log(response.data.data)
        } else if (method === 'POST') {
          response = await axios.post(url, body ,{withCredentials : true });
        } else if (method === 'PUT') {
          response = await axios.put(url, body ,{withCredentials : true });
        } else if (method === 'DELETE') {
          response = await axios.delete(url ,{withCredentials : true });
        } else if (method === 'PATCH') {
          response = await axios.patch(url, body ,{withCredentials : true });
        }
        
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);
  return { data, isLoading, error };
};

export default useFetch;