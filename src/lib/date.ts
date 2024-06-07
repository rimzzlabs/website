import { format } from "date-fns";

export const formatDate = (
  date: string | Date | number,
  formatStr = "dd MMMM yyyy",
) => format(date, formatStr);
