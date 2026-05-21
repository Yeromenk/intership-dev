import { useState, useEffect } from 'react';
import { Trader } from '../components/DataTable/DataTable';

export function useFetchData() {
  const [data, setData] = useState<Trader[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/ranking');
      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Ошибка при загрузке данных:', err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading };
}