import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import Transaction from '../types/transaction';

const useTransactions = (
  url: string,
  setTransactions: (transaction:  SetStateAction<Transaction[]>) => void
) => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (url) {
      const loadData = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(url);
          if (data) {
            setTransactions(data.transactions);
          }
        } catch (error: unknown) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
      }
  }, [url, setTransactions]);

  return { loading, error };
};

export default useTransactions;
