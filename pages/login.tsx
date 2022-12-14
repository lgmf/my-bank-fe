import {
  Container,
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  FormHelperText,
} from "@mui/material";

import { useFormik } from "formik";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import * as yup from "yup";

import ProgressButton from "../components/ProgressButton";
import { useAuth } from "../context/AuthContext";
import useTranslate from "../hooks/useTranslate";

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function Login() {
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const t = useTranslate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError("");

      try {
        await signIn({
          username: values.username,
          password: values.password,
        });

        await Router.push("/");
      } catch {
        setError("Invalid username or password");
      }
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Head>
        <title>Login</title>
      </Head>

      <Card>
        <CardHeader title={t("page.login.title")} />

        <form id="sign-in-form" onSubmit={formik.handleSubmit}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              name="username"
              label={t("form.labels.username")}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.username)}
              helperText={formik.errors.username}
            />

            <TextField
              type="password"
              name="password"
              label={t("form.labels.password")}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.password)}
              helperText={formik.errors.password}
            />

            <FormHelperText error={true}>{error}</FormHelperText>
          </CardContent>
        </form>

        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ProgressButton
            form="sign-in-form"
            type="submit"
            variant="contained"
            loading={formik.isSubmitting}
          >
            {t("actions.sign_in")}
          </ProgressButton>
        </CardActions>
      </Card>
    </Container>
  );
}
