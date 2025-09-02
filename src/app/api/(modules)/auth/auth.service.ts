import { CONFIG } from "@/app/api/(helpers)/config";
import { prisma } from "@/app/api/(helpers)/shared/prisma";
import bcrypt from "bcrypt";
import { UserPayload } from "./auth.interface";
import { USER_SELECED_FIELDS } from "./auth.utils";

const registerUser = async (data: UserPayload) => {
  const hashedPassword = await bcrypt.hash(
    data.password,
    Number(CONFIG.salt_rounds)
  );

  const result = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: {
      ...USER_SELECED_FIELDS,
    },
  });

  return result;
};

// const login = async (credential: CredentialPayload) => {
//   const { email, password } = credential;

//   const user = await prisma.user.findFirst({
//     where: {
//       email,
//       status: UserStatus.ACTIVE,
//       is_deleted: false,
//     },
//   });

//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const checkPassword = await bcrypt.compare(password, user.password);
//   if (!checkPassword) {
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       "Email/Contact number or password is invalid"
//     );
//   }

//   const jwtPayload = {
//     id: user.id,
//     name: user.name,
//     profile_pic: user.profile_pic,
//     contact_number: user.contact_number,
//     email: user.email,
//     role: user.role,
//   };

//   const accessToken = generateToken(
//     jwtPayload,
//     config.jwt_access_secret,
//     config.jwt_access_expiresin
//   );

//   const refreshToken = generateToken(
//     jwtPayload,
//     config.jwt_refresh_secret,
//     config.jwt_refresh_expiresin
//   );

//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     contact_number: user.contact_number,
//     role: user.role,
//     profile_pic: user.profile_pic,
//     status: user.status,
//     address: user.address,
//     city: user.city,
//     created_at: user.created_at,
//     updated_at: user.updated_at,
//     access_token: accessToken,
//     refreshToken,
//   };
// };

export const AuthServices = {
  registerUser,
};
