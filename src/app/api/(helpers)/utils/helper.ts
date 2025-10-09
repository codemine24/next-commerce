import { prisma } from "../shared/prisma";

export function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {};
  const countMap: Record<string, number> = {};

  // Count occurrences of each key
  formData.forEach((_, key) => {
    countMap[key] = (countMap[key] || 0) + 1;
  });

  formData.forEach((value, key) => {
    let parsedValue: any = value;

    if (typeof value === "string") {
      try {
        parsedValue = JSON.parse(value);
      } catch {
        parsedValue = value;
      }
    }

    if (obj[key]) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(parsedValue);
    } else {
      if (countMap[key] > 1 || key === "files") {
        obj[key] = [parsedValue];
      } else {
        obj[key] = parsedValue;
      }
    }
  });

  return obj;
}

export const convertConnectingData = (data?: string[]): { id: string }[] => {
  if (data && Array.isArray(data) && data.length > 0) {
    return data.map((item: string) => ({ id: item }));
  }
  return [];
};

export const orderIdGenerator = async (): Promise<string> => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);

  const lastOrder = await prisma.order.findFirst({
    where: {
      order_id: {
        startsWith: `ORD${month}${year}`,
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  let new_order_id;

  if (lastOrder) {
    const lastSequence = parseInt(lastOrder.order_id.slice(-6)) || 0;
    const newSequence = String(lastSequence + 1).padStart(6, "0");

    new_order_id = `ORD${month}${year}${newSequence}`;
  } else {
    new_order_id = `ORD${month}${year}000001`;
  }

  return new_order_id;
};

export function minutesAgo(dateString: string | Date): number {
  const inputTime = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - inputTime.getTime(); // difference in milliseconds
  const diffMin = Math.floor(diffMs / 1000 / 60); // convert to minutes

  return diffMin;
}

export const OTPGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
