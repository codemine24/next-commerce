export const API_ROUTES = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
    },
    products: {
        get_products: "/product",
        create_product: "/product",
        update_product: (id: string) => `/product/${id}`,
        delete_product: (id: string) => `/product/${id}`
    },
    brands: {
        get_brands: "/brand",
        create_brand: "/brand",
        update_brand: (id: string) => `/brand/${id}`,
        delete_brand: (id: string) => `/brand/${id}`
    }
}
