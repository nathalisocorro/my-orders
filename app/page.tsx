import prisma from "@/lib/db";

export default async function Home() {

  const [categories, products, orders, users] = await Promise.all([
    prisma.category.findMany({
      include: {
        products: true,
      },
    }),
    prisma.product.findMany({
      include: {
        category: true,
      },
      take: 5,
    }),
    prisma.order.findMany({
      include: {
        user: true,
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.user.findMany({
      include: {
        _count: {
          select: { orders: true },
        },
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black p-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid gap-8">

          <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span className="text-3xl">👥</span>
              Usuarios
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{user.email}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {user._count.orders} {user._count.orders === 1 ? 'orden' : 'órdenes'}
                  </p>
                </div>
              ))}
            </div>
          </section>


          <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span className="text-3xl">📂</span>
              Categorías
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
                    {category.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    {category.desc}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    {category.products.length} {category.products.length === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              ))}
            </div>
          </section>


          <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span className="text-3xl">🍕</span>
              Productos Destacados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:border-green-500 dark:hover:border-green-400 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {product.title}
                    </h3>
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    {product.desc}
                  </p>
                  <span className="inline-block px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-xs rounded text-zinc-700 dark:text-zinc-300">
                    {product.category.title}
                  </span>
                </div>
              ))}
            </div>
          </section>


          <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span className="text-3xl">🛒</span>
              Órdenes Recientes
            </h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">
                        {order.user.email}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {new Date(order.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                        ${Number(order.total).toFixed(2)}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${order.status === 'PAID'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : order.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {Array.isArray(order.products) ? order.products.length : 0}{' '}
                    {Array.isArray(order.products) && order.products.length === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              ))}
            </div>
          </section>


          <section className="bg-linear-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📊</span>
              Estadísticas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">{users.length}</p>
                <p className="text-sm opacity-90">Usuarios</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">{categories.length}</p>
                <p className="text-sm opacity-90">Categorías</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">
                  {categories.reduce((sum, cat) => sum + cat.products.length, 0)}
                </p>
                <p className="text-sm opacity-90">Productos</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">{orders.length}</p>
                <p className="text-sm opacity-90">Órdenes</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
