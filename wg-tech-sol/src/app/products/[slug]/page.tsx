import ProductDetailClient from "./ProductDetailClient";

type Params = { slug: string };

type ProductDetailPageProps = {
  params: Promise<Params>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
