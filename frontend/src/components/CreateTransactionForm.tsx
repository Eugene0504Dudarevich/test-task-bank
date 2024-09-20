import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, styled, FormControl } from '@mui/material';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import Transaction from "../types/transaction";

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  margin: '2rem 2rem 2rem 0',
  border: `1px solid black`,
  [theme.breakpoints.down('md')]: {
    margin: '0 2rem 2rem',
  }
}));
const Title = styled(Typography)(() => ({
  marginBottom: '2rem',
}));
const StyledFormControl = styled(FormControl)(() => ({
  width: '100%',
  marginBottom: '2rem',
}));
const Error = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
}));
const AddButton = styled(Button)(() => ({
  textTransform: 'unset',
}));

type FormData = {
  amount: number;
  accountNumber: string;
  address: string;
  description: string;
};

const validationSchema = yup.object({
  amount: yup.number()
    .typeError("Value of 'Amount' field must be a number")
    .min(0, "Value of 'Amount' field  must be positive")
    .required(),
  accountNumber: yup.string().required("'AccountNumber' field is required"),
  address: yup.string().required("'Address' field is required"),
  description: yup.string().required("'Description' field is required"),
});

type CreateFormProps = {
  createTransaction: (newTransaction: Transaction) => void;
};

export const CreateForm: FC<CreateFormProps> = props => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormData) => {
    const newTransaction = {
      id: uuid(),
      amount: data.amount,
      beneficiary: '',
      account: data.accountNumber,
      address: data.address,
      date: new Date().toDateString(),
      description: data.description,
    };
    props.createTransaction(newTransaction);
    reset();
  };

  return (
    <Container>
      <Title variant="h6">
        Add new transaction
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFormControl>
          <TextField
            {...register('amount')}
            error={Boolean(errors.amount?.message)}
            variant="outlined"
            label="Amount"
          />
          {errors.amount?.message && <Error>{errors.amount.message}</Error>}
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            {...register('accountNumber')}
            error={Boolean(errors.accountNumber?.message)}
            variant="outlined"
            label="Account Number"
          />
          {errors.accountNumber?.message && <Error>{errors.accountNumber.message}</Error>}
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            {...register('address')}
            error={Boolean(errors.address?.message)}
            variant="outlined"
            label="Address"
          />
          {errors.address?.message && <Error>{errors.address.message}</Error>}
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            {...register('description')}
            multiline
            error={Boolean(errors.description?.message)}
            rows={3}
            variant="outlined"
            label="Description"
          />
          {errors.description?.message && <Error>{errors.description.message}</Error>}
        </StyledFormControl>
        <AddButton type="submit" variant="contained">
          Add
        </AddButton>
      </form>
    </Container>
  );
};