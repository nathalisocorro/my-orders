import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {


    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()


    const user1 = await prisma.user.create({
        data: {
            email: 'juan@example.com',
            password: 'password123',
        },
    })

    const user2 = await prisma.user.create({
        data: {
            email: 'maria@example.com',
            password: 'password456',
        },
    })



    const categoryPizza = await prisma.category.create({
        data: {
            title: 'Pizzas',
            desc: 'Deliciosas pizzas artesanales',
            slug: 'pizzas',
            img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
        },
    })

    const categoryBurger = await prisma.category.create({
        data: {
            title: 'Hamburguesas',
            desc: 'Hamburguesas gourmet con ingredientes frescos',
            slug: 'hamburguesas',
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        },
    })

    const categoryPasta = await prisma.category.create({
        data: {
            title: 'Pastas',
            desc: 'Pastas italianas tradicionales',
            slug: 'pastas',
            img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
        },
    })



    const pizza1 = await prisma.product.create({
        data: {
            title: 'Pizza Margarita',
            desc: 'Tomate, mozzarella y albahaca fresca',
            price: 12.99,
            categorySlug: 'pizzas',
            img: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
        },
    })

    const pizza2 = await prisma.product.create({
        data: {
            title: 'Pizza Pepperoni',
            desc: 'Pepperoni, mozzarella y salsa de tomate',
            price: 14.99,
            categorySlug: 'pizzas',
            img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
        },
    })

    const pizza3 = await prisma.product.create({
        data: {
            title: 'Pizza Cuatro Quesos',
            desc: 'Mozzarella, gorgonzola, parmesano y queso de cabra',
            price: 16.99,
            categorySlug: 'pizzas',
            img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
        },
    })


    const burger1 = await prisma.product.create({
        data: {
            title: 'Hamburguesa Clásica',
            desc: 'Carne 100% res, lechuga, tomate, cebolla y queso',
            price: 10.99,
            categorySlug: 'hamburguesas',
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        },
    })

    const burger2 = await prisma.product.create({
        data: {
            title: 'Hamburguesa BBQ',
            desc: 'Carne, queso cheddar, bacon, cebolla caramelizada y salsa BBQ',
            price: 13.99,
            categorySlug: 'hamburguesas',
            img: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
        },
    })

    const burger3 = await prisma.product.create({
        data: {
            title: 'Hamburguesa Vegetariana',
            desc: 'Hamburguesa de garbanzos, aguacate y vegetales frescos',
            price: 11.99,
            categorySlug: 'hamburguesas',
            img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360',
        },
    })


    const pasta1 = await prisma.product.create({
        data: {
            title: 'Spaghetti Carbonara',
            desc: 'Pasta con panceta, huevo, parmesano y pimienta negra',
            price: 13.99,
            categorySlug: 'pastas',
            img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
        },
    })

    const pasta2 = await prisma.product.create({
        data: {
            title: 'Lasagna Bolognesa',
            desc: 'Capas de pasta con carne, bechamel y queso gratinado',
            price: 15.99,
            categorySlug: 'pastas',
            img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3',
        },
    })



    await prisma.order.create({
        data: {
            total: 27.98,
            status: 'PAID',
            userId: user1.id,
            products: [
                { id: pizza1.id, title: pizza1.title, price: Number(pizza1.price), quantity: 1 },
                { id: burger1.id, title: burger1.title, price: Number(burger1.price), quantity: 1 },
            ],
        },
    })

    await prisma.order.create({
        data: {
            total: 42.97,
            status: 'PENDING',
            userId: user1.id,
            products: [
                { id: pizza3.id, title: pizza3.title, price: Number(pizza3.price), quantity: 1 },
                { id: pasta1.id, title: pasta1.title, price: Number(pasta1.price), quantity: 1 },
                { id: burger2.id, title: burger2.title, price: Number(burger2.price), quantity: 1 },
            ],
        },
    })

    await prisma.order.create({
        data: {
            total: 29.98,
            status: 'PAID',
            userId: user2.id,
            products: [
                { id: pasta2.id, title: pasta2.title, price: Number(pasta2.price), quantity: 1 },
                { id: pizza1.id, title: pizza1.title, price: Number(pizza1.price), quantity: 1 },
            ],
        },
    })

}

main()
    .catch((e) => {
        console.error('❌ Error en seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
