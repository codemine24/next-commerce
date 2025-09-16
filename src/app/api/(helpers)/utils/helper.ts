export function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {};
  formData.forEach((value, key) => {
    // Handle JSON fields
    if (typeof value === "string") {
      try {
        obj[key] = JSON.parse(value);
      } catch {
        obj[key] = value;
      }
    } else {
      // Files stay as File objects
      obj[key] = value;
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