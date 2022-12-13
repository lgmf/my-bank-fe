import { useMutation } from "react-query";
import TransactionService from "../services/transaction";

interface MutationProps {
  onSuccess?: () => void;
  onError?: () => void;
}

const transactionService = new TransactionService();

export default function useTransferMutation({
  onSuccess,
  onError,
}: MutationProps) {
  const transferMutation = useMutation(transactionService.transfer, {
    onSuccess,
    onError,
  });

  return transferMutation;
}
