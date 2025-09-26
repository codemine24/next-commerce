export const API_ROUTES = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        refresh_token: "/auth/refresh-token",
    },
    users: {
        get_users: "/user",
        create_user: "/user",
        update_user: (id: string) => `/user/${id}`,
        delete_user: "/user"
    },
    products: {
        get_products: "/product",
        create_product: "/product",
        get_product_by_slug: (slug: string) => `/product/${slug}`,
        update_product: (slug: string) => `/product/${slug}`,
        delete_product: "/product"
    },
    categories: {
        get_categories: "/category",
        create_category: "/category",
        update_category: (id: string) => `/category/${id}`,
        delete_category: "/category"
    },
    cart: {
        get_cart: "/cart",
        add_to_cart: "/cart",
        remove_from_cart: (id: string) => `/cart/cart-item/${id}`,
        update_cart: (id: string) => `/cart/${id}`,
    },
    brands: {
        get_brands: "/brand",
        create_brand: "/brand",
        update_brand: (id: string) => `/brand/${id}`,
        delete_brand: "/brand"
    },
    files: {
        get_files: "/file",
        upload_files: "/file",
        delete_files: "/file",
    }
}
