import httpClient from "../lib/http-client";
import { UserResult } from "../types/User";

function list(token: string) {
  return httpClient.get<{ results: UserResult[] }>("/users", token);
}

const userService = {
  list,
};

export default userService;
