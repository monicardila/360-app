// api para el registro de productos de la caja registradora

export async function createSale(saleData) {
	const response = await fetch("http://localhost:3000/api/v1/sales", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(saleData),
	});

	if (!response.ok) {
		throw new Error("Error al crear la venta");
	}

	return await response.json();
}
