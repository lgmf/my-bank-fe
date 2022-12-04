import { useMutation } from "react-query";
import transactionService from "../services/transaction";

interface MutationProps {
  onSuccess?: () => void;
  onError?: () => void;
}

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
