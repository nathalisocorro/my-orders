export const fetchFilteredByCategory = async (cat: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/products?category=${cat}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return data as any;
};
