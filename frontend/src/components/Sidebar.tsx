import { FC, useMemo } from 'react';
import { Box, styled, Typography } from '@mui/material';
import Transaction from '../types/transaction';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '2rem 0 2rem 2rem',
  border: '1px solid black',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    margin: '2rem 2rem 1rem',
  }
}));

type SidebarProps = {
  transactions: Transaction[];
};

export const Sidebar: FC<SidebarProps> = props => {
  const currentBalance = useMemo(() => {
    let balance = 0;
    props.transactions.map((transaction: Transaction) => {
      balance += transaction.amount;
    });
    return balance;
  }, [props.transactions]);

  return (
    <Container>
      <Typography variant="h6">Current balance</Typography>
      <Typography variant="h4">{currentBalance.toFixed(2)}</Typography>
    </Container>
  );
};