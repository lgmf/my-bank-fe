import httpClient from "../lib/http-client";
import { User } from "../types/User";

interface SignInBody {
  username: string;
  password: string;
}

function signIn({ username, password }: SignInBody) {
  return httpClient.post<{ user: User }>("/token", { username, password });
}

const signInService = {
  signIn,
};

export default signInService;
