
type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
    const { slug } = await params;
    console.log(slug)
    return <div>Product Page</div>;
}