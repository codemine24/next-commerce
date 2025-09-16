export const API_ROUTES = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        refresh_token: "/auth/refresh-token",
    },
    products: {
        get_products: "/product",
        create_product: "/product",
        update_product: (id: string) => `/product/${id}`,
        delete_product: (id: string) => `/product/${id}`
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
        delete_brand: (id: string) => `/brand/${id}`
    },
}
