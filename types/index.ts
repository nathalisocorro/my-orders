export type Order = {
  id?: string;
  createdAt: string;
  total: number;
  products: any[];
  status: string;
  userId: string;
};

export type Category = {
  id?: string | null;
  createdAt?: string | null;
  title: string;
  desc: string;
  img: string;
  slug: string;
};

export type Product = {
  id?: string | null;
  createdAt?: string | null;
  title: string;
  desc: string;
  img: string;
  price: number;
  categorySlug: string;
};
