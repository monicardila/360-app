// Archivo semilla para poblar la BD
// Pasos ejecucion:
// 1. En la consola: npm run seed
const prisma = require("./prismaClient.js");

async function main() {
  const result = await prisma.$transaction(async (prisma) => {
    // // Crear categorías principales
    // const mainCategories = await prisma.category.createMany({
    //   data: [
    //     {
    //       name: "Hogar",
    //       description: "Todo lo del hogar",
    //       parentId: null,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: "Electrodomésticos",
    //       description: "Aparatos eléctricos",
    //       parentId: null,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: "Ropa",
    //       description: "Prendas de vestir",
    //       parentId: null,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: "Deportes",
    //       description: "Artículos deportivos",
    //       parentId: null,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: "Tecnología",
    //       description: "Gadgets y dispositivos",
    //       parentId: null,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    // });

    // // Recuperar IDs de las categorías principales
    // const mainCategoryIds = await prisma.category.findMany({
    //   select: { id: true },
    // });

    // // Crear subcategorías
    // const subCategories = await prisma.category.createMany({
    //   data: [
    //     {
    //       name: "Cocina",
    //       description: "Utensilios de cocina",
    //       parentId: mainCategoryIds[0].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: "Muebles",
    //       description: "Mobiliario",
    //       parentId: mainCategoryIds[0].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: "Televisores",
    //       description: "TV y accesorios",
    //       parentId: mainCategoryIds[1].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: "Celulares",
    //       description: "Teléfonos móviles",
    //       parentId: mainCategoryIds[4].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       name: "Camisetas",
    //       description: "Camisetas para todas las edades",
    //       parentId: mainCategoryIds[2].id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    // });

    // Crear carrito de compras
    const cart = await prisma.cart.createMany({
      data: [
        {
          customer_id: 1,
          createdAt: new Date(),
        },
        {
          customer_id: 2,
          createdAt: new Date(),
        },
        {
          customer_id: 3,
          createdAt: new Date(),
        },
      ],
    });

    // Crear item del carrito
    const cartItem = await prisma.cartItem.createMany({
      data: [
        {
          cart_id: 1,
          product_id: 11,
          quantity: 1,
          createdAt: new Date(),
        },
        {
          cart_id: 2,
          product_id: 12,
          quantity: 3,
          createdAt: new Date(),
        },
        {
          cart_id: 1,
          product_id: 13,
          quantity: 2,
          createdAt: new Date(),
        },
      ],
    });

    return { cartItem, cart };
  });

  console.log("resultado: ", JSON.stringify(result, null, 2));
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
