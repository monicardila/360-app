<script>
	import { createEventDispatcher } from "svelte";
	import { jsPDF } from "jspdf";
	import { employees } from "../stores/models";
	import { branch_store } from "../stores/models";
	import { createSale } from "../utils/apiSales";
	import { updateModel } from "../utils/models";
	import { loadData } from "../utils/models";

	const dispatch = createEventDispatcher();
	// se dispara el evento "close" que se llama en cashier
	function closeModal() {
		dispatch("close");
	}

	export let employee; // es el id de empleado
	export let typeDocument;
	export let idNumber;
	export let total;
	export let selectedProducts = [];
	export let branchStore;
	export let phone;

	let cashClient = 0;
	let moneyToReturn = 0;
	let employeeName = "";
	let branchStoreName = "";
	let branchStoreAddress = "";

	$: moneyToReturn = cashClient >= total ? cashClient - total : 0;
	// estado que desabilita el boton de pago en caso de que el efectivo sea menor al total
	$: canConfirm = cashClient >= total;

	$: {
		const found = $employees.find((e) => e.id === employee);
		employeeName = found ? found.name : "Desconocido";
	}
	$: {
		const found = $branch_store.find((e) => e.id === branchStore);
		branchStoreName = found ? found.name : "Sin referencia";
		branchStoreAddress = found ? found.address : "Sin dirección";
	}

	// descargable de la factura
	function generarPDF() {
		const doc = new jsPDF();
		let y = 10;

		// Título centrado
		doc.setFontSize(18);
		doc.setFont("helvetica", "bold");
		doc.text("FACTURA DE VENTA", 105, y, { align: "center" });
		y += 10;

		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");
		doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, y);
		y += 6;
		doc.text(`Empleado: ${employeeName}`, 10, y);
		y += 6;
		doc.text(`Sucursal: ${branchStoreName} - ${branchStoreAddress}`, 10, y);
		y += 6;
		doc.text(`Teléfono cliente: ${phone}`, 10, y);
		y += 6;
		doc.text(`Tipo de Documento: ${typeDocument}`, 10, y);
		y += 6;
		doc.text(`Número de Documento: ${idNumber}`, 10, y);
		y += 8;

		// Línea separadora
		doc.setLineWidth(0.5);
		doc.line(10, y, 200, y);
		y += 6;

		// Encabezado de productos
		doc.setFont("helvetica", "bold");
		doc.text("Productos:", 10, y);
		y += 8;

		doc.setFontSize(11);
		doc.setFont("helvetica", "bold");
		doc.text("Nombre", 10, y);
		doc.text("Cantidad", 80, y);
		doc.text("Precio", 115, y);
		doc.text("Total", 155, y);
		y += 6;

		doc.setFont("helvetica", "normal");

		selectedProducts.forEach((p) => {
			if (y > 270) {
				doc.addPage();
				y = 10;
			}
			const price = p.price.toFixed(2);
			const totalItem = (p.price * p.quantity).toFixed(2);

			doc.text(p.name, 10, y);
			doc.text(`${p.quantity}`, 85, y, { align: "right" });
			doc.text(`$${price}`, 125, y, { align: "right" });
			doc.text(`$${totalItem}`, 165, y, { align: "right" });

			y += 6;
		});

		y += 8;
		doc.setLineWidth(0.3);
		doc.line(10, y, 200, y);
		y += 6;

		// Totales
		doc.setFont("helvetica", "bold");
		doc.text(`Total:`, 130, y);
		doc.text(`$${total.toFixed(2)}`, 165, y, { align: "right" });
		y += 6;

		doc.setFont("helvetica", "normal");
		doc.text(`Recibido:`, 130, y);
		doc.text(`$${cashClient.toFixed(2)}`, 165, y, { align: "right" });
		y += 6;

		doc.text(`Cambio:`, 130, y);
		doc.text(`$${moneyToReturn.toFixed(2)}`, 165, y, { align: "right" });

		// Guardar factura
		doc.save(`factura_${Date.now()}.pdf`);
	}

	// funcion para confirmar la venta
	async function handleConfirm() {
		try {
			await createSale({
				customerId: idNumber,
				typeDocument,
				phone: phone,
				employeeName,
				total,
				cashClient,
				branch_store_id: branchStore,
				products: selectedProducts.map((p) => ({
					name: p.name,
					price: p.price,
					quantity: p.quantity,
				})),
			});

			generarPDF();
			closeModal();
		} catch (error) {
			console.error("Error al crear la venta:", error);
			alert("Ocurrió un error al procesar la venta.");
		}
	}

	// funcion para descontar las cantidades vendidas
	async function confirmPurchase() {
		for (const product of selectedProducts) {
			const newStock = product.stock - product.quantity;

			if (newStock < 0) {
				alert(`No hay suficiente stock de ${product.name}`);
				return;
			}

			try {
				await updateModel("products", product.id, { stock: newStock });
				console.log(`Stock actualizado para ${product.name}`);
			} catch (error) {
				console.error(`Error actualizando ${product.name}:`, error);
				alert(`Error al actualizar el stock de ${product.name}`);
				return;
			}
		}

		alert("Venta confirmada y stock actualizado.");
		dispatch("close");
		loadData("products", "all");
	}

	// confirmar y guardar
	async function confirmAndSave() {
		await handleConfirm();
		await confirmPurchase();
	}
</script>

<div
	class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
	<!-- Modal -->
	<div class="w-[760px] h-[410px] bg-white rounded-xl shadow-lg p-6 relative">
		<h2 class="text-xl font-extralight mb-8">Proceso de pago</h2>
		<div class="relative">
			<div class="relative flex">
				<h2 class="pr-24 font-medium">Total</h2>
				<h2 class="border border-gray-900 text-sky-900 w-[490px] px-2">
					${total.toFixed(2)}
				</h2>
			</div>
			<div class=" mt-4 relative flex">
				<h2 class="pr-8 font-light">Efectivo</h2>
				<input
					type="number"
					bind:value={cashClient}
					class="border border-gray-900 p-2 text-5xl text-sky-900 w-[490px]"
				/>
			</div>
			<div class=" mt-4 relative flex">
				<h2 class="pr-9 font-light">Cambio</h2>
				<h2 class="border border-gray-900 text-sky-900 w-[490px] px-2">
					${moneyToReturn.toFixed(2)}
				</h2>
			</div>
		</div>

		<div
			class="grid grid-flow-col space-x-1 bottom-5 absolute right-10 py-2"
		>
			<button
				class=" bg-red-600 text-white px-4 py-2 rounded"
				on:click={closeModal}
			>
				Cancelar
			</button>
			<button
				class=" bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
				on:click={confirmAndSave}
				disabled={!canConfirm}
			>
				Confirmar
			</button>
		</div>
	</div>
</div>
