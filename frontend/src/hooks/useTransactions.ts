import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import Transaction from '../types/transaction';

const useTransactions = (
  url: string,
  setTransactions: (transaction:  SetStateAction<Transaction[]>) => void
) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (url) {
       axios.get(url)
         .then(({ data }) => {
           if (data) {
             setTransactions(data.transactions);
           }
         })
         .catch(error => {
           setError(error);
         })
         .finally(() => {
           setLoading(false);
         });
      }
  }, [url]);

  return { loading, error };
};

export default useTransactions;
