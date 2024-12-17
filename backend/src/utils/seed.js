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

    return { invoice_content_customer };
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

// order -- creation

// branch_store
// employees
// supplier
// categories
// products
// orders
// supplier_invoices
// invoice_content_customer
// customer
// customer_invoice
// invoice_content_customer
