import { FC, SetStateAction } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from '@mui/material';

const Actions = styled(DialogActions)(() => ({
  padding: '1rem 1.5rem',
}));
const StyledButton = styled(Button)(() => ({
  textTransform: 'unset',
  '&:last-of-type': {
    marginLeft: '1rem',
  }
}));

type DeleteDialogProps = {
  transactionId?: number | string;
  open: boolean;
  setOpen: (open: SetStateAction<boolean>) => void;
  deleteTransaction: (id: number | string) => void;
};

export const DeleteTransactionDialog: FC<DeleteDialogProps> = ({
  transactionId,
  open,
  setOpen,
  deleteTransaction,
}) => {
  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    if (transactionId || transactionId === 0) {
      deleteTransaction(transactionId);
    }
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        Delete confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this transaction?
        </DialogContentText>
      </DialogContent>
      <Actions>
        <StyledButton
          variant="contained"
          onClick={onConfirm}
        >
          Yes
        </StyledButton>
        <StyledButton
          variant="outlined"
          onClick={onCancel}
        >
          No
        </StyledButton>
      </Actions>
    </Dialog>
  );
};