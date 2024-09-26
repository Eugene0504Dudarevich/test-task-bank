import { useState } from 'react';
import { Grid2 as Grid } from '@mui/material';
import {
  CreateTransactionForm,
  DeleteTransactionDialog,
  Sidebar,
  TransactionTable,
} from './';
import Transaction from '../types/transaction';
import useTransactions from '../hooks/useTransactions';

const API_TRANSACTION_URL = '/api/transactions';

export const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [transactionId, setTransactionId] = useState<number | string>();

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

  const openDeleteTransactionDialog = (id: string | number) => {
    setIsDeleteDialogOpen(true);
    setTransactionId(id);
  };

  const deleteTransaction = (id: number | string) => {
    const updatedTransactions = transactions.filter((transaction: Transaction) =>
      transaction.id !== id
    );
    setTransactions([...updatedTransactions]);
  };

  return (
    <>
      <Grid container spacing={2} columns={24}>
        <Grid size={{ xs: 24, md: 12, lg: 12 }}>
          <Sidebar transactions={transactions} />
        </Grid>
        <Grid size={{ xs: 24, md: 12, lg: 12 }}>
          <CreateTransactionForm
            createTransaction={createTransaction}
          />
        </Grid>
      </Grid>
      <Grid container size={12}>
        <TransactionTable
          loading={loading}
          transactions={transactions}
          openDeleteTransactionDialog={openDeleteTransactionDialog}
        />
      </Grid>
      <DeleteTransactionDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        transactionId={transactionId}
        deleteTransaction={deleteTransaction}
      />
    </>
  );
};