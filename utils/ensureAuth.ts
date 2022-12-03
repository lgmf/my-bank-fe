import { NextPageContext } from "next";

import UserStorage from "../lib/user-storage";
import { User } from "../types/User";

type GetServerSidePropsFn = (params: {
  ctx: NextPageContext;
  user: User;
}) => Promise<unknown>;

export function ensureAuth(fn: GetServerSidePropsFn) {
  async function getServerSideProps(ctx: NextPageContext) {
    const user = UserStorage.getItem(ctx);

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return fn({ ctx, user });
  }

  return getServerSideProps;
}
