import * as dateFns from "date-fns";
import { enUS } from "date-fns/locale";

function formatLongLocalizedDateTime(date: number | Date) {
  return dateFns.format(date, "PPPpp", { locale: enUS });
}

const dateLib = {
  formatLongLocalizedDateTime,
};

export default dateLib;
