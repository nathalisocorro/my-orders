import ProductsClient from "@/components/productsClient"
import { fetchFilteredByCategory } from "@/hooks/get-filtered"


interface Props {
  params: Promise<{
    category: string
  }>
}

const fetchFiltered = async (c: string) => {
  const data = await fetchFilteredByCategory(c)
  return data
}

export default async function Page({ params }: Props) {
  const {category} = await params
  const data = await fetchFiltered(category)
  return (
    <ProductsClient
      category={category}
      products={data.products || []}
    />
  )
}

