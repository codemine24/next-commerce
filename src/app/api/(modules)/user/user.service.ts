import httpStatus from "http-status";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import sharp from "sharp";

import { CONFIG } from "@/app/api/(helpers)/config";
import CustomizedError from "@/app/api/(helpers)/error/customized-error";
import supabase from "@/app/api/(helpers)/shared/supabase";
import { generateToken } from "@/app/api/(helpers)/utils/jwt-helpers";

import FileModel from "../file/file.model";

import { User } from "./user.interface";
import UserModel from "./user.model";

// ------------------------------------ GET PROFILE ----------------------------------------
const getProfile = async (user: User) => {
  const result = await UserModel.findById(user._id);

  if (!result) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "User not found");
  }

  return result;
};

// ------------------------------------ UPDATE PROFILE -------------------------------------
const updateProfile = async (user: User, data: Record<string, any>) => {
  const { data: userInfo, avatar } = data;
  const cookieStore = await cookies();

  let uploadedAvatar;

  // Step 1: Process avatar if provided
  if (avatar) {
    const buffer = Buffer.from(await avatar.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    const fileName = `${user.id}-${avatar.name.replaceAll(" ", "-")}`;

    const { data: uploadData, error } = await supabase.storage
      .from(CONFIG.user_bucket)
      .upload(fileName, buffer, {
        contentType: avatar.type,
        upsert: true,
      });

    if (error || !uploadData?.path) {
      throw new CustomizedError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to upload profile picture"
      );
    }

    // Step 1.3: Create file record
    const fileData = {
      user_id: new mongoose.Types.ObjectId(String(user.id)),
      name: avatar.name,
      alt_text: avatar.name,
      type: avatar.type,
      size: avatar.size,
      width: metadata.width || 0,
      height: metadata.height || 0,
      path: uploadData.path,
      bucket_name: CONFIG.user_bucket,
    };

    uploadedAvatar = await FileModel.create(fileData);

    // Step 1.4: Remove existing avatar
    if (user.avatar) {
      const path = user.avatar.replace(/^\/user\//, "");
      const existingAvatar = await FileModel.findOne({ path });

      if (existingAvatar) {
        await Promise.all([
          supabase.storage.from(CONFIG.user_bucket).remove([path]),
          FileModel.findByIdAndDelete(existingAvatar._id),
        ]);
      }
    }
  }

  // Step 2: Merge new avatar if available
  const updateData = { ...userInfo };
  if (uploadedAvatar?.path) {
    updateData.avatar = `/${uploadedAvatar.bucket_name}/${uploadedAvatar.path}`;
  }

  // Step 3: Update user
  const result = await UserModel.findByIdAndUpdate(user.id, updateData, {
    new: true,
  });

  if (!result) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "User not found");
  }

  const jwtPayload = {
    id: result.id.toString(),
    first_name: result.first_name,
    last_name: result.last_name,
    avatar: result.avatar,
    contact_number: result.contact_number,
    email: result.email,
    role: result.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    CONFIG.jwt_access_secret,
    CONFIG.jwt_access_expiresIn
  );

  const refreshToken = generateToken(
    jwtPayload,
    CONFIG.jwt_refresh_secret,
    CONFIG.jwt_refresh_expiresIn
  );

  // Set cookies
  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: CONFIG.node_env === "production",
    sameSite: "strict",
    maxAge: Number(CONFIG.jwt_refresh_expiresIn),
  });

  cookieStore.set("access_token", accessToken, {
    httpOnly: false,
    secure: CONFIG.node_env === "production",
    sameSite: "strict",
    maxAge: Number(CONFIG.jwt_access_expiresIn),
  });

  return result;
};

export const UserServices = {
  getProfile,
  updateProfile,
};
