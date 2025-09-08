import api from "@/lib/api";

export default async function ProductList() {
    const data = await api.get("/product");
    console.log(data, "data");
    return <div>Product List</div>;
}