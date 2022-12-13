import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";

import UserStorage from "../lib/user-storage";
import { User } from "../types/User";

type AuthGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (
  user: User,
  context: GetServerSidePropsContext<Q, D>
) => Promise<GetServerSidePropsResult<P>>;

const defaultFn: AuthGetServerSideProps = async () => ({ props: {} });

export function ensureAuth(
  fn: AuthGetServerSideProps = defaultFn
): GetServerSideProps {
  const getServerSideProps: GetServerSideProps = async (ctx) => {
    const user = UserStorage.getItem(ctx);

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return fn(user, ctx);
  };

  return getServerSideProps;
}
