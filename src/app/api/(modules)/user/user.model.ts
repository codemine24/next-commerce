import { Schema, Model, model, models } from "mongoose";

import { User } from "./user.interface";

const userSchema = new Schema<User>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact_number: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["CUSTOMER", "ADMIN", "SUPER_ADMIN"],
      default: "CUSTOMER",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "BLOCKED"],
      default: "ACTIVE",
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    password_changed_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "users",
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        // rename
        ret.id = ret._id;

        // fields filtering
        delete ret._id;
        delete ret.password;
        delete ret.is_deleted;
        delete ret.password_changed_at;

        return ret;
      },
    },
  }
);

const UserModel =
  (models.User as Model<User>) || model<User>("User", userSchema);

export default UserModel;

// Relationships (Referencing other collections)
// files: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "File",
//   },
// ],
// cart: {
//   type: Schema.Types.ObjectId,
//   ref: "Cart",
//   default: null,
// },
// addresses: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Address",
//   },
// ],
// orders: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Order",
//   },
// ],
// reviews: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Review",
//   },
// ],
// order_histories: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "OrderHistory",
//   },
// ],
// wishlist: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Wishlist",
//   },
// ],
// QnA: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "QnA",
//   },
// ],
// blogs: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Blog",
//   },
// ],
