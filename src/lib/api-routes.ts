export const API_ROUTES = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh_token: "/auth/refresh-token",
  },
  attributes: {
    get_attributes: "/attribute",
    create_attribute: "/attribute",
    update_attribute: (id: string) => `/attribute/${id}`,
    delete_attribute: "/attribute",
  },
  users: {
    get_users: "/user",
    create_user: "/user",
    update_user: (id: string) => `/user/${id}`,
    delete_user: "/user",
  },
  products: {
    get_products: "/product",
    create_product: "/product",
    get_product_by_slug: (slug: string) => `/product/${slug}`,
    update_product: (slug: string) => `/product/${slug}`,
    delete_product: "/product",
  },
  categories: {
    get_categories: "/category",
    create_category: "/category",
    update_category: (id: string) => `/category/${id}`,
    delete_category: "/category",
  },
  campaigns: {
    get_campaigns: "/campaign",
    create_campaign: "/campaign",
    get_campaign_by_id: (id: string) => `/campaign/${id}`,
    update_campaign: (id: string) => `/campaign/${id}`,
    delete_campaign: "/campaign",
  },
  cart: {
    get_cart: "/cart",
    add_to_cart: "/cart",
    remove_from_cart: (id: string) => `/cart/cart-item/${id}`,
    update_cart: (id: string) => `/cart/${id}`,
  },
  coupons: {
    get_coupons: "/coupon",
    create_coupon: "/coupon",
    get_coupon_by_id: (id: string) => `/coupon/${id}`,
    update_coupon: (id: string) => `/coupon/${id}`,
    delete_coupon: "/coupon",
  },
  brands: {
    get_brands: "/brand",
    create_brand: "/brand",
    update_brand: (id: string) => `/brand/${id}`,
    delete_brand: "/brand",
  },
  files: {
    get_files: "/file",
    upload_files: "/file",
    delete_files: "/file",
  },
  order: {
    create_order_for_user: "/order",
    create_order_for_guest_user: "/order/guest",
  },
};
