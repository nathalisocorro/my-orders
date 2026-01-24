'use client'
import ProductsClient from "@/components/productsClient"
import fetchCategories from "@/hooks/categories-hooks"

interface Props {
  params: Promise<{
    category: string
  }>
}

export default async function Page({ params }: Props) {
  const {fetchFilteredByCategory} = fetchCategories()
  const {category} = await params
  const data = await fetchFilteredByCategory(category);

  return (
    <ProductsClient
      category={category}
      products={data.products || []}
    />
  )
}
