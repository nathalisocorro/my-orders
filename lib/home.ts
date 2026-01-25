import prisma from "@/src/lib/db";

// lib/home.ts

export async function getHomeData(limit = 3) {
  return prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      products: {
        take: limit,
        orderBy: { createdAt: "desc" },
      },
    },
  })
}
