import { useQuery } from "react-query";

import UserService from "../services/user";
import { UserResult } from "../types/User";

const userService = new UserService();

export default function useUsers(initialData?: UserResult[]) {
  const $users = useQuery(
    ["USERS_LIST"],
    async () => {
      const { results } = await userService.list();
      return results;
    },
    {
      initialData,
    }
  );

  return $users;
}
