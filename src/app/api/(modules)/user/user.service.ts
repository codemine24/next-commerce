import { prisma } from "../../(helpers)/shared/prisma";
import { UpdateUserPayload } from "./user.interface";

const updateProfile = async (id: string, data: UpdateUserPayload) => {
  const { data: userInfo } = data;
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...userInfo,
    },
  });

  return result;
};

export const UserServices = {
  updateProfile,
};
