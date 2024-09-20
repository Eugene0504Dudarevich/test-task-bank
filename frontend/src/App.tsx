import { FC, useState } from 'react';
import { Grid2 as Grid } from '@mui/material';
import { CreateForm, Footer, NavBar, Sidebar, TransactionTable } from './components';
import useTransactions from './hooks/useTransactions';
import Transaction from "./types/transaction";

const API_TRANSACTION_URL = '/api/transactions';

const App: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { loading } = useTransactions(
    API_TRANSACTION_URL,
    setTransactions,
  );

  const createTransaction = (newTransaction: Transaction) => {
    setTransactions([
      ...transactions,
      newTransaction,
    ]);
  };

  const deleteTransaction = (id: number | string) => {
    const updatedTransactions = transactions.filter((transaction: Transaction) =>
      transaction.id !== id
    );
    setTransactions([...updatedTransactions]);
  };

  return (
    <>
      <NavBar />
      <Grid container spacing={2} columns={24}>
        <Grid size={{ xs: 24, md: 12, lg: 12}}>
          <Sidebar transactions={transactions} />
        </Grid>
        <Grid size={{xs: 24, md: 12, lg: 12}}>
          <CreateForm
            createTransaction={createTransaction}
          />
        </Grid>
      </Grid>
      <Grid container size={12}>
        <TransactionTable
          loading={loading}
          transactions={transactions}
          deleteTransaction={deleteTransaction}
        />
      </Grid>
      <Footer />
    </>
  );
};

export default App;
