import { ChangeEvent, FC, useState, useMemo } from 'react';
import {
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Transaction from '../types/transaction';
import moment from "moment";

const StyledTableContainer = styled(TableContainer)(() => ({
  border: '1px solid black',
  margin: '0 2rem 2rem 2rem',
}));

type Column = {
  id: 'amount' | 'beneficiary' | 'account' | 'address' | 'date' | 'description' | 'actions';
  label: string;
}

type TransactionTableProps = {
  transactions: Transaction[];
  loading: boolean;
  openDeleteTransactionDialog: (id: number | string) => void;
}

export const TransactionTable: FC<TransactionTableProps> = ({
  transactions,
  loading,
  openDeleteTransactionDialog,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

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
    openDeleteTransactionDialog(id);
    setPage(0);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleTransactions = useMemo(() =>
    [...transactions]
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [transactions, page, rowsPerPage],
  );

  return (
    <>
      {loading && !transactions.length && <div>Loading...</div>}
      {!!transactions.length && !loading && (
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
              {visibleTransactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  {columns.map((column: Column) => {
                    if (column.id === 'actions') {
                      return (
                        <TableCell key="actions">
                          <Tooltip title="Delete transaction">
                            <IconButton
                              onClick={() => onDelete(transaction.id)}
                            >
                              <DeleteIcon/>
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      );
                    } else if (column.id === 'date') {
                      return (
                        <TableCell key={column.id}>
                          {moment(transaction[column.id]).format('DD/MM/YYYY hh:mm')}
                        </TableCell>
                      );
                    }
                    else {
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
          <TablePagination
            component="div"
            rowsPerPageOptions={[20, 40]}
            count={transactions.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ mr: 2 }}
          />
        </StyledTableContainer>
      )}
    </>
  );
};
