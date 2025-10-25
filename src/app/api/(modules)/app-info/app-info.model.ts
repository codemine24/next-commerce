import { Schema, Model, model, models } from "mongoose";

import { AppInfo } from "./app-info.interface";

const AppInfoSchema = new Schema<AppInfo>(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    secondary_logo: { type: String },
    title: { type: String, required: true },
    primary_color: { type: String, required: true },
    secondary_color: { type: String },
    favicon: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "app_info",
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const AppInfoModel =
  (models.AppInfo as Model<AppInfo>) ||
  model<AppInfo>("AppInfo", AppInfoSchema);

export default AppInfoModel;
