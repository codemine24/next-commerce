import { User } from "@prisma/client";
import httpStatus from "http-status";
import sharp from "sharp";
import { CONFIG } from "../../(helpers)/config";
import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import supabase from "../../(helpers)/shared/supabase";
import { USER_SELECED_FIELDS } from "../auth/auth.utils";

// ------------------------------------ UPDATE PROFILE -------------------------------------
const updateProfile = async (user: User, data: Record<string, any>) => {
  const { data: userInfo, avatar } = data;
  let uploadedAvatar;

  // Step 1: Process avatar if provided
  if (avatar) {
    // Step 1.1: Prepare image buffer and extract metadata
    const buffer = Buffer.from(await avatar.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    const fileName = `${user.id}-${avatar.name.replaceAll(" ", "-")}`;

    // Step 1.2: Upload image to storage
    const { data: uploadData } = await supabase.storage
      .from(CONFIG.user_bucket)
      .upload(fileName, buffer, {
        contentType: avatar.type,
        upsert: true,
      });

    if (!uploadData?.id) {
      throw new CustomizedError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to upload profile picture"
      );
    }

    // Step 1.3: Create file record in database
    const file = {
      user_id: user.id,
      name: avatar.name,
      alt_text: avatar.name,
      type: avatar.type,
      size: avatar.size,
      width: metadata.width || 0,
      height: metadata.height || 0,
      path: uploadData.path,
      bucket_id: uploadData.id,
      bucket_name: CONFIG.user_bucket,
    };

    uploadedAvatar = await prisma.file.create({ data: file });

    // Step 1.4: Remove existing avatar if present
    if (user.avatar) {
      const path = user.avatar.replace(/^\/user\//, "");
      const existingAvatar = await prisma.file.findFirst({
        where: { path },
      });

      if (existingAvatar) {
        // Execute removal operations in parallel
        await Promise.all([
          supabase.storage.from(CONFIG.user_bucket).remove([path]),
          prisma.file.delete({ where: { id: existingAvatar.id } }),
        ]);
      }
    }
  }

  // Step 2: Update user information with new avatar path if available
  const updateData = { ...userInfo };
  if (uploadedAvatar?.path) {
    updateData.avatar = `/${uploadedAvatar.bucket_name}/${uploadedAvatar.path}`;
  }

  // Step 3: Update user record in database
  const result = await prisma.user.update({
    where: { id: user.id },
    data: updateData,
    select: {
      ...USER_SELECED_FIELDS,
    },
  });

  return result;
};

export const UserServices = {
  updateProfile,
};
