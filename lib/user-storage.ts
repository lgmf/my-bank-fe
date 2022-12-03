import { parseCookies, setCookie } from "nookies";
import { User } from "../types/User";

type SetCookiesParams = Parameters<typeof setCookie>;
type ParseCookieParams = Parameters<typeof parseCookies>;

type PageResContext = SetCookiesParams[0];
type PageReqContext = ParseCookieParams[0];

class UserStorage {
  private static readonly key = "my_bank.user";

  private static readonly maxAgeInSeconds = 60 * 60;

  static setItem(user: User, ctx?: PageResContext) {
    setCookie(ctx, UserStorage.key, JSON.stringify(user), {
      maxAge: UserStorage.maxAgeInSeconds,
    });
  }

  static getItem(ctx?: PageReqContext): User | null {
    try {
      const cookies = parseCookies(ctx);
      const storedUser = cookies[UserStorage.key];

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser) as User;
    } catch (error) {
      return null;
    }
  }

  private constructor() {}
}

export default UserStorage;
