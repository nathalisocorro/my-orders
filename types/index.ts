export type Order = {
  id?: string,
  createdAt: string,
  total: number,
  products: any[],    
  status: string,
  userId: string
}