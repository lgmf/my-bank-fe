import AxiosHttpClient from "./AxiosHttpClient";

export * as types from "./types";

export const axiosHttpClient = new AxiosHttpClient();

export const myBankApiHttpClient = new AxiosHttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
