import { useState, useEffect } from 'react';
import { Trader } from '../components/DataTable/DataTable';

const MOCK_DATA: Trader[] = [
  { id: 1, name: 'Petra Nováková', avatar: 'https://i.pravatar.cc/150?u=1', deals: 45, value: 2500000, trendPercent: 12, sharePercent: 45, region: 'Praha', team: 'Alpha', month: '2026-05', badge: 'Top Seller' },
  { id: 2, name: 'Martin Dvořák', avatar: 'https://i.pravatar.cc/150?u=2', deals: 38, value: 2100000, trendPercent: 8, sharePercent: 38, region: 'Brno', team: 'Beta', month: '2026-05' },
  { id: 3, name: 'Jana Horáková', avatar: 'https://i.pravatar.cc/150?u=3', deals: 31, value: 1850000, trendPercent: -5, sharePercent: 33, region: 'Ostrava', team: 'Gamma', month: '2026-05' },
  { id: 4, name: 'Tomáš Procházka', avatar: 'https://i.pravatar.cc/150?u=4', deals: 28, value: 1620000, trendPercent: 6, sharePercent: 29, region: 'Praha', team: 'Alpha', month: '2026-05', badge: 'Rising Star' },
  { id: 5, name: 'Eva Šimánková', avatar: 'https://i.pravatar.cc/150?u=5', deals: 24, value: 1340000, trendPercent: -3, sharePercent: 24, region: 'Brno', team: 'Beta', month: '2026-05' },
  { id: 6, name: 'Jakub Marek', avatar: 'https://i.pravatar.cc/150?u=6', deals: 21, value: 1150000, trendPercent: 4, sharePercent: 20, region: 'Ostrava', team: 'Gamma', month: '2026-05' },
  { id: 7, name: 'Lucie Veselá', avatar: 'https://i.pravatar.cc/150?u=7', deals: 19, value: 980000, trendPercent: -7, sharePercent: 18, region: 'Plzeň', team: 'Alpha', month: '2026-05' },
  { id: 8, name: 'Ondřej Blažek', avatar: 'https://i.pravatar.cc/150?u=8', deals: 17, value: 870000, trendPercent: 2, sharePercent: 15, region: 'Praha', team: 'Beta', month: '2026-05' },
  { id: 9, name: 'Markéta Čermáková', avatar: 'https://i.pravatar.cc/150?u=9', deals: 14, value: 720000, trendPercent: -9, sharePercent: 12, region: 'Brno', team: 'Beta', month: '2026-05' },
  { id: 10, name: 'Radek Novotný', avatar: 'https://i.pravatar.cc/150?u=10', deals: 12, value: 580000, trendPercent: 1, sharePercent: 10, region: 'Ostrava', team: 'Gamma', month: '2026-05' },
  { id: 11, name: 'Ukázka Duben', avatar: 'https://i.pravatar.cc/150?u=11', deals: 5, value: 100000, trendPercent: 5, sharePercent: 2, region: 'Praha', team: 'Alpha', month: '2026-04' },
];

export function useFetchData() {
  const [data, setData] = useState<Trader[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Новое состояние загрузки

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {

      await new Promise((resolve) => setTimeout(result => resolve(result), 1200));

      // const response = await fetch('/api/traders');
      // const result = await response.json();
      // setData(result);

      setData(MOCK_DATA);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading };
}