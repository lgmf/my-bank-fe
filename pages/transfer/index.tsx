import {
  Autocomplete,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";
import Router from "next/router";
import * as yup from "yup";

import PageTitle from "../../components/PageTitle";
import ProgressButton from "../../components/ProgressButton";
import SecondaryText from "../../components/SecondaryText";

import useSnackbar from "../../context/SnackbarContext";
import useAccountBalance from "../../hooks/useAccountBalance";
import useTransferMutation from "../../hooks/useTransferMutation";
import useUsers from "../../hooks/useUsers";
import PrivateLayout from "../../layout/PrivateLayout";
import { User } from "../../types/User";
import { ensureAuth } from "../../utils/ensureAuth";

interface TransferPageProps {
  authenticatedUser: User;
}

const TransferForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

function createValidationSchema(balance: number) {
  return yup.object({
    amount: yup.number().min(1).max(balance).required("Required field"),
    recipientUserId: yup.string().required("Required field"),
  });
}

export default function TransferPage({ authenticatedUser }: TransferPageProps) {
  const snackbar = useSnackbar();

  const transferMutation = useTransferMutation({
    onError: () => {
      snackbar.error("Failed to complete the transfer. Try again later");
    },
  });

  const $accountBalance = useAccountBalance();

  const balance = $accountBalance.data;

  const formik = useFormik({
    initialValues: {
      amount: 0,
      recipientUserId: "",
    },
    validationSchema: createValidationSchema(balance ?? 0),
    onSubmit: async (values) => {
      await transferMutation.mutateAsync({
        amount: values.amount,
        recipientUserId: values.recipientUserId,
      });

      await Router.push("/transfer/success");
    },
  });

  const $users = useUsers();

  const users = $users.data || [];

  const userOptions = users
    .filter((user) => user.id !== authenticatedUser.id)
    .map((user) => ({
      label: user.name,
      value: user.id,
    }));

  const selectedUserOption = userOptions.find(
    (userOption) => userOption.value === formik.values.recipientUserId
  );

  return (
    <PrivateLayout documentTitle="Transfer">
      <PageTitle title="Send Money" />

      <Card sx={{ maxWidth: "50%", margin: "0 auto" }}>
        <CardContent>
          {balance !== undefined ? (
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
              Available balance <strong>R$ {balance}</strong>
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
              <Skeleton animation="wave" />
            </Typography>
          )}

          <TransferForm id="transfer-form">
            <TextField
              label="Amount"
              type="number"
              inputProps={{ min: 0, max: balance }}
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.amount)}
              helperText={formik.errors.amount}
            />

            <Autocomplete
              value={selectedUserOption}
              onChange={(_, next) => {
                formik.setFieldValue("recipientUserId", next?.value);
              }}
              options={userOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Recipient"
                  error={Boolean(formik.errors.recipientUserId)}
                  helperText={formik.errors.recipientUserId}
                />
              )}
            />
          </TransferForm>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          {formik.dirty && formik.isValid && (
            <SecondaryText gutterBottom variant="body2" margin="0 auto">
              You are sending <strong>R$ {formik.values.amount}</strong> to{" "}
              <strong>{selectedUserOption?.label}</strong>
            </SecondaryText>
          )}
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ProgressButton
            type="submit"
            form="transfer-form"
            disabled={!formik.isValid || !formik.dirty}
            variant="contained"
            color="success"
            loading={formik.isSubmitting || transferMutation.isLoading}
            onClick={formik.submitForm}
          >
            Send
          </ProgressButton>
        </CardActions>
      </Card>
    </PrivateLayout>
  );
}

export const getServerSideProps = ensureAuth(async (user) => {
  return {
    props: {
      authenticatedUser: user,
    },
  };
});
