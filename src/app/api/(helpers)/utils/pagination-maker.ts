type PaginationOptions = {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
};
const paginationMaker = (paginationOptions: PaginationOptions) => {
  const { page, limit, sort_by, sort_order } = paginationOptions;
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  const sortWith = sort_by || "created_at";
  const sortSequence = sort_order || "desc";

  return {
    pageNumber,
    limitNumber,
    skip,
    sortWith,
    sortSequence,
  };
};

export default paginationMaker;
