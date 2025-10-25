// src/models/file.model.ts

import { Schema, Model, model, models } from "mongoose";

import { File } from "./file.interface";

const fileSchema = new Schema<File>(
  {
    user_id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    alt_text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    bucket_id: {
      type: String,
      required: true,
    },
    bucket_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "files",
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        // rename
        ret.id = ret._id;

        // fields filtering
        delete ret._id;

        return ret;
      },
    },
  }
);

const FileModel =
  (models.File as Model<File>) || model<File>("File", fileSchema);

export default FileModel;
