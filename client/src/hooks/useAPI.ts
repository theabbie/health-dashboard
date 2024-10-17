import { useEffect, useState } from 'react';
import axios from 'axios';

const useAPI = (baseURL: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (endpoint: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}${endpoint}`);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = (endpoint: string) => {
    fetchData(endpoint);
  };

  return { data, loading, error, refetch };
};

export default useAPI;