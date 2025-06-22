const prisma = require("../utils/prismaClient");

const salesController = {
  async create(req, res) {
    try {
      const {
        customerId, // string: número de documento
        typeDocument, // enum: CC, CE, etc.
        phone,
        employeeName,
        total,
        cashClient,
        branch_store_id,
        products,
      } = req.body;

      // 1️⃣ Crear (o asegurar) cliente
      const customer = await prisma.customers.upsert({
        where: { identification_card: String(customerId) },
        update: {}, // no lo actualizas si ya existe
        create: {
          identification_card: String(customerId),
          type_of_document: typeDocument,
        },
      });

      // 2️⃣ Crear factura
      const invoice = await prisma.customer_invoice.create({
        data: {
          branch_store_id,
          phone,
          employee_name: employeeName,
          customer_identification_card: String(customerId),
          total_price: total,
          vat: 0,
          discount: 0,
          amount_paid: cashClient,
          payment_method: "EFECTIVO",
          payment_status: "PAGADA",
        },
      });

      // 3️⃣ Crear contenido de factura
      await prisma.invoice_content_customer.createMany({
        data: products.map((p) => ({
          customer_invoice_id: invoice.id,
          product_name: p.name,
          quantity: p.quantity,
          unit_price: p.price,
          total_price: p.quantity * p.price,
        })),
      });

      res.status(201).json({ message: "Venta registrada correctamente" });
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      res.status(500).json({ error: "Error al registrar la venta" });
    }
  },
};

module.exports = salesController;
