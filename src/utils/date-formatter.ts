export const dateFormatter = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        ...options,
    });
};