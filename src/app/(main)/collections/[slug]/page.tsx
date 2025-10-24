import { getProducts } from "@/actions/product";

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
    const { slug } = await params;
    const res = await getProducts({
        category: [slug],
    });
    console.log(res)
    return <div>Product Page</div>;
}