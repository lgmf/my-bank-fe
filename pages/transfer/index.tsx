import {
  Autocomplete,
  Card,
  CardActions,
  CardContent,
  Divider,
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
import useTransferMutation from "../../hook/useTransferMutation";
import PrivateLayout from "../../layout/PrivateLayout";
import accountService from "../../services/account";
import userService from "../../services/user";
import { User, UserResult } from "../../types/User";
import { ensureAuth } from "../../utils/ensureAuth";

interface TransferPageProps {
  authenticatedUser: User;
  balance: number;
  users: UserResult[];
}

const TransferForm = styled("form")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
});

function createValidationSchema(balance: number) {
  return yup.object({
    amount: yup.number().min(1).max(balance).required("Required field"),
    recipientUserId: yup.string().required("Required field"),
  });
}

export default function TransferPage({
  balance,
  authenticatedUser,
  users,
}: TransferPageProps) {
  const snackbar = useSnackbar();

  const transferMutation = useTransferMutation({
    onError: () => {
      snackbar.error("Failed to complete the transfer. Try again later");
    },
  });

  const formik = useFormik({
    initialValues: {
      amount: 0,
      recipientUserId: "",
    },
    validationSchema: createValidationSchema(balance),
    onSubmit: async (values) => {
      await transferMutation.mutateAsync({
        amount: values.amount,
        recipientUserId: values.recipientUserId,
        token: authenticatedUser.token,
      });

      await Router.push("/transfer/success");
    },
  });

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
    <PrivateLayout documentTitle="Transfer" user={authenticatedUser}>
      <PageTitle title="Send Money" />

      <Card>
        <CardContent>
          <SecondaryText variant="subtitle1" sx={{ marginBottom: 3 }}>
            Available balance <strong>R$ {balance}</strong>
          </SecondaryText>

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
            <Typography gutterBottom variant="body2" margin="0 auto">
              You are sending <strong>R$ {formik.values.amount}</strong> to{" "}
              <strong>{selectedUserOption?.label}</strong>
            </Typography>
          )}
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ProgressButton
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

export const getServerSideProps = ensureAuth(async ({ user }) => {
  const [{ account }, { results: users }] = await Promise.all([
    accountService.retrieve(user.token),
    userService.list(user.token),
  ]);

  return {
    props: {
      authenticatedUser: user,
      balance: account.balance,
      users,
    },
  };
});