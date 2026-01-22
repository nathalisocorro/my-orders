import ProductsClient from "@/components/productsClient"

interface Props {
  params: Promise<{
    category: string
  }>
}

const fetchFilteredByCategory = async (cat: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/products?category=${cat}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export default async function Page({ params }: Props) {
  const {category} = await params
  const data = await fetchFilteredByCategory(category);

  return (
    <ProductsClient
      category={category}
      products={data.products || []}
    />
  )
}
