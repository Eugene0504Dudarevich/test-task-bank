import { FC } from 'react';
import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Transaction from '../types/transaction';

const StyledTableContainer = styled(TableContainer)(() => ({
  border: '1px solid black',
  margin: '0 2rem',
  marginBottom: '5rem',
}));
const DeleteButton = styled(Button)(() => ({
  textTransform: 'unset',
}));

type Column = {
  id: 'amount' | 'beneficiary' | 'account' | 'address' | 'date' | 'description' | 'actions';
  label: string;
}

type TransactionTableProps = {
  transactions: Transaction[];
  loading: boolean;
  deleteTransaction: (id: string | number) => void;
}

export const TransactionTable: FC<TransactionTableProps> = props => {
  const columns: readonly Column[] = [
    { id: 'amount', label: 'Amount' },
    { id: 'beneficiary', label: 'Beneficiary' },
    { id: 'account', label: 'Account' },
    { id: 'address', label: 'Address' },
    { id: 'date', label: 'Date' },
    { id: 'description', label: 'Description' },
    { id: 'actions', label: 'Actions' }
  ];

  const onDelete = (id: string | number) => {
    props.deleteTransaction(id);
  };

  return (
    <>
      {props.loading && <div>Loading...</div>}
      {!!props.transactions.length && (
        <StyledTableContainer>
          <Table aria-label="transactions-table">
            <TableHead>
              <TableRow>
                {columns.map((column: Column) => (
                  <TableCell key={column.id}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.transactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  {columns.map((column: Column) => {
                    if (column.id === 'actions') {
                      return (
                        <TableCell key="actions">
                          <DeleteButton
                            variant="contained"
                            onClick={() => onDelete(transaction.id)}
                          >
                            Delete
                          </DeleteButton>
                        </TableCell>
                      );
                    } else {
                      const value = transaction[column.id];
                      return (
                        <TableCell key={column.id}>
                          {value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
    </>
  );
};
