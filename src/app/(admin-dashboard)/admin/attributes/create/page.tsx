import { getCategories } from "@/actions/category";

import { CreateAttribute } from "./_components/create-attribute";

const CreateAttributePage = async () => {
  const categories = await getCategories();

  return <CreateAttribute categories={categories.data} />;
};

export default CreateAttributePage;
