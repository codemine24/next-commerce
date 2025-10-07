import { AttributesIcon } from "@/icons/attributes";
import { BrandIcon } from "@/icons/brand";
import { CampaignIcon } from "@/icons/campaign";
import { CategoriesIcon } from "@/icons/categories";
import { CouponIcon } from "@/icons/coupon";
import { CustomizationIcon } from "@/icons/customization";
import { DashboardIcon } from "@/icons/dashboard";
import { MediaIcon } from "@/icons/media";
import { OrdersIcon } from "@/icons/orders";
import { ProductsIcon } from "@/icons/products";
import { ReviewIcon } from "@/icons/review";
import { SettingsIcon } from "@/icons/settings";
import { UsersIcon } from "@/icons/users";

export const ADMIN_NAVIGATION = [
  {
    name: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
    path: "/admin/dashboard",
  },
  {
    name: "Orders",
    icon: <OrdersIcon fontSize="small" />,
    path: "/admin/orders",
  },
  {
    name: "Users",
    icon: <UsersIcon fontSize="small" />,
    path: "/admin/users",
  },
  {
    name: "Products",
    icon: <ProductsIcon fontSize="small" />,
    children: [
      { name: "Product List", path: "/admin/products" },
      { name: "Create Product", path: "/admin/products/create" },
    ],
  },
  {
    name: "Attributes",
    icon: <AttributesIcon fontSize="small" />,
    children: [
      { name: "Attribute List", path: "/admin/attributes" },
      { name: "Create Attribute", path: "/admin/attributes/create" },
    ],
  },
  {
    name: "Categories",
    icon: <CategoriesIcon fontSize="small" />,
    children: [
      { name: "Category List", path: "/admin/categories" },
      { name: "Create Category", path: "/admin/categories/create" },
    ],
  },
  {
    name: "Brands",
    icon: <BrandIcon fontSize="small" />,
    children: [
      { name: "Brand List", path: "/admin/brands" },
      { name: "Create Brand", path: "/admin/brands/create" },
    ],
  },
  {
    name: "Campaigns",
    icon: <CampaignIcon fontSize="small" />,
    children: [
      { name: "Campaign List", path: "/admin/campaigns" },
      { name: "Create Campaign", path: "/admin/campaigns/create" },
    ],
  },
  {
    name: "Media",
    icon: <MediaIcon fontSize="small" />,
    path: "/admin/media",
  },
  {
    name: "Coupons",
    icon: <CouponIcon fontSize="small" />,
    children: [
      { name: "Coupon List", path: "/admin/coupons" },
      { name: "Create Coupon", path: "/admin/coupons/create" },
    ],
  },
  {
    name: "Reviews",
    icon: <ReviewIcon fontSize="small" />,
    path: "/admin/reviews",
  },
  {
    name: "Settings",
    icon: <SettingsIcon fontSize="small" />,
    children: [
      { name: "Account Settings", path: "/admin/settings" },
      { name: "User Management", path: "/admin/user-management" },
    ],
  },
  {
    name: "Customization",
    icon: <CustomizationIcon fontSize="small" />,
    children: [
      { name: "SEO Settings", path: "/admin/customization/seo" },
      { name: "Email Settings", path: "/admin/customization/email" },
      { name: "Social Settings", path: "/admin/customization/social" },
      { name: "Payment Settings", path: "/admin/customization/payment" },
      { name: "Shipping Settings", path: "/admin/customization/shipping" },
      { name: "Tax Settings", path: "/admin/customization/tax" },
      { name: "Currency Settings", path: "/admin/customization/currency" },
      { name: "Language Settings", path: "/admin/customization/language" },
      { name: "Theme Settings", path: "/admin/customization/theme" },
    ],
  },
];
