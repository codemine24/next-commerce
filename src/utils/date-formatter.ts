import dayjs, { Dayjs } from "dayjs";

export type DatePickerFormat =
  | Dayjs
  | Date
  | string
  | number
  | null
  | undefined;

export const formatStr = {
  dateTime: "DD MMM YYYY h:mm a", // 17 Apr 2022 12:00 am
  date: "DD MMM YYYY", // 17 Apr 2022
  time: "h:mm a", // 12:00 am
  split: {
    dateTime: "DD/MM/YYYY h:mm a", // 17/04/2022 12:00 am
    date: "DD/MM/YYYY", // 17/04/2022
  },
  paramCase: {
    dateTime: "DD-MM-YYYY h:mm a", // 17-04-2022 12:00 am
    date: "DD-MM-YYYY", // 17-04-2022
  },
};

export const dateFormatter = (
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
) => {
  const d = new Date(date);

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
};

export function dateIsAfter(
  startDate: DatePickerFormat,
  endDate: DatePickerFormat
) {
  return dayjs(startDate).isAfter(endDate);
}

export function getDateTime(date: DatePickerFormat, format?: string) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.dateTime)
    : "Invalid time value";
}
