export const parseBoolean = (
  value?: string | string[]
): boolean | undefined => {
  if (Array.isArray(value)) value = value[0];
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};
