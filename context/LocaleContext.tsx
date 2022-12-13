import { useRouter } from "next/router";
import Polyglot, { PolyglotOptions } from "node-polyglot";
import { createContext, ReactNode, useContext } from "react";

import enUS from "../lang/en-US.json";
import ptBR from "../lang/pt-BR.json";

const messages = {
  "en-US": enUS,
  "pt-BR": ptBR,
};

interface LocaleContextValue {
  locale: string;
  t: (phrase: string, options?: PolyglotOptions) => string;
}

interface LocaleProviderProps {
  children: ReactNode;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale() {
  const locale = useContext(LocaleContext);

  if (!locale) {
    throw new Error("useLocale must be used inside a child of LocaleProvider");
  }

  return locale;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const router = useRouter();

  const locale = router.locale ?? "en-US";
  const phrases = messages[locale as keyof typeof messages];

  const polyglot = new Polyglot({ phrases });

  return (
    <LocaleContext.Provider
      value={{
        locale,
        t: polyglot.t.bind(polyglot),
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
