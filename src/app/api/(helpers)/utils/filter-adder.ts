import { Prisma } from "@prisma/client";

const filterAdder = <T extends Record<string, any>>(
  conditions: T[],
  field: keyof T,
  operator:
    | keyof Prisma.StringFilter
    | keyof Prisma.IntFilter
    | keyof Prisma.DateTimeFilter,
  value: any
) => {
  if (value !== undefined && value !== null && !Number.isNaN(value)) {
    conditions.push({
      [field]: {
        [operator]: value,
      },
    } as T);
  }
};

export default filterAdder;
