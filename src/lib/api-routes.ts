export const API_ROUTES = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        refresh_token: "/auth/refresh-token",
    },
    products: {
        get_products: "/product",
        create_product: "/product",
        get_product_by_slug: (slug: string) => `/product/${slug}`,
        update_product: (id: string) => `/product/${id}`,
        delete_product: (id: string) => `/product/${id}`
    },
    categories: {
        get_categories: "/category",
        create_category: "/category",
        update_category: (id: string) => `/category/${id}`,
        delete_category: (id: string) => `/category/${id}`
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
