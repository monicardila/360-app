<script>
	import { createEventDispatcher } from "svelte";
	import { jsPDF } from "jspdf";
	import { employees } from "../stores/models";
	import { createSale } from "../utils/apiSales";

	const dispatch = createEventDispatcher();
	// se dispara el evento "close" que se llama en cashier
	function closeModal() {
		dispatch("close");
	}

	export let employee; // es el id de empleado
	export let typeDocument;
	export let idNumber;
	export let total;
	export let selectedProducts;

	let cashClient = 0;
	let moneyToReturn = 0;
	let employeeName = "";

	$: moneyToReturn = cashClient >= total ? cashClient - total : 0;
	// estado que desabilita el boton de pago en caso de que el efectivo sea menor al total
	$: canConfirm = cashClient >= total;

	$: {
		const found = $employees.find((e) => e.id === employee);
		employeeName = found ? found.name : "Desconocido";
	}

	// descargable de la factura
	function generarPDF() {
		const doc = new jsPDF();

		let y = 10;

		doc.setFontSize(16);
		doc.text("Factura de Venta", 10, y);
		y += 10;

		doc.setFontSize(12);
		doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, y);
		y += 8;
		doc.text(`Empleado: ${employeeName}`, 10, y);
		y += 8;
		doc.text(`Tipo de Documento: ${typeDocument}`, 10, y);
		y += 8;
		doc.text(`Número de Documento: ${idNumber}`, 10, y);
		y += 10;

		doc.setFontSize(14);
		doc.text("Productos:", 10, y);
		y += 8;

		// Simula productos si los estás pasando por props
		selectedProducts.forEach((p) => {
			doc.setFontSize(12);
			doc.text(
				`- ${p.name} x${p.quantity}  $${p.price.toFixed(2)}`,
				10,
				y,
			);
			y += 6;
		});

		y += 10;
		doc.text(`Total: $${total.toFixed(2)}`, 10, y);
		y += 6;
		doc.text(`Efectivo recibido: $${cashClient.toFixed(2)}`, 10, y);
		y += 6;
		doc.text(`Cambio: $${moneyToReturn.toFixed(2)}`, 10, y);

		// Genera y descarga el archivo
		doc.save(`factura_${Date.now()}.pdf`);
	}

	async function handleConfirm() {
		try {
			await createSale({
				customerId: idNumber,
				typeDocument,
				phone: "N/A",
				employeeName,
				total,
				cashClient,
				branch_store_id: 1,
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
				on:click={handleConfirm}
				disabled={!canConfirm}
			>
				Confirmar
			</button>
		</div>
	</div>
</div>

<!--

<div class="relative">
		<div class="relative flex mb-2">
			<h2 class="pr-10 font-medium">Empleado</h2>
			<h2 class="border border-gray-900 text-sky-900 w-[490px] px-2">
				{employee}
			</h2>
		</div>

		<div class="relative flex mb-2">
			<h2 class="pr-6 font-medium">Tipo doc</h2>
			<h2 class="border border-gray-900 text-sky-900 w-[490px] px-2">
				{typeDocument}
			</h2>
		</div>

		<div class="relative flex mb-2">
			<h2 class="pr-6 font-medium">N° doc</h2>
			<h2 class="border border-gray-900 text-sky-900 w-[490px] px-2">
				{idNumber}
			</h2>
		</div>

		<div class="relative flex mb-6">
			<h2 class="pr-24 font-medium">Total</h2>
			<h2 class="border border-gray-900 text-sky-900 w-[490px] px-2">
				${total.toFixed(2)}
			</h2>
		</div>
	</div>

-->
