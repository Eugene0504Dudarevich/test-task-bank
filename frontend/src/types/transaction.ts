type Transaction = {
  id: number | string;
  amount: number;
  beneficiary: string;
  account: string;
  address: string;
  date: string;
  description: string;
};

export default Transaction;
