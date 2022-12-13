import { useLocale } from "../context/LocaleContext";

export default function useTranslate() {
  const { t } = useLocale();
  return t;
}
