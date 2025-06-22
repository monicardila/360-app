<!-- COMPONENTE DE LA CAJA REGISTRADORA, RESPONSIVO -->

<script>
	import { auth, updateAuthFromCookie } from "../../../../stores/authStores";
	import { onMount } from "svelte";
	import { products } from "../../../../stores/models";
	import { employees } from "../../../../stores/models";
	import { loadData } from "../../../../utils/models";
	import SearchBar from "../../../../components/SearchBar.svelte";
	import ProductTableCash from "../../../../components/ProductTableCash.svelte";
	import ConfirmationCashRegister from "../../../../components/ConfirmationCashRegister.svelte";

	let filters = { id: null, status: null, all: true }; // filtros tabla productos
	let isAuthenticated;
	let role;
	let selectedProducts = []; // canasta de productos
	// campos factura
	let employee = "";
	let typeDocument = "";
	let idNumber = "";
	let total = 0;
	let date = new Date().toISOString().split("T")[0];
	// estado componente de pago
	let showConfirmation = false;

	const handleSearch = async (event) => {
		filters = event.detail.filters;

		// Object.values(filters) = devuelve unicamente los valores de ese objeto ejemplo : [null, "", ""]
		// .every() = revisa si todos los elementos del arreglo cumplen con la condicion
		const isEmpty = Object.values(filters).every(
			(value) => value === null || value === "",
		);

		if (isEmpty) {
			await loadData("products", "all", filters);
		} else if (filters.id) {
			await loadData("products", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("products", "byStatus", filters);
		} else if (filters.name) {
			await loadData("products", "byName", filters);
		} else {
			await loadData("products", "all", filters);
		}
	};

	// Cargar al montar la vista
	onMount(async () => {
		await loadData("products", "all", filters);
		await loadData("employees", "all", {});
	});

	// Definir columnas específicas para productos
	const columns = ["id", "name", "description", "price", "stock"];

	// Autenticacion
	$: auth.subscribe(($auth) => {
		isAuthenticated = $auth.isAuthenticated;
		role = $auth.role;
	});

	// Se suscríbe al store para obtener el estado actualizado
	onMount(() => {
		updateAuthFromCookie(); // Fuerza la actualización del store al cargar la vista
	});

	function addProduct(product) {
		const cleanPrice = Number(product.price ?? 0);

		const index = selectedProducts.findIndex((p) => p.id === product.id);
		if (index !== -1) {
			selectedProducts[index].quantity += 1;
			selectedProducts = [...selectedProducts];
		} else {
			selectedProducts = [
				...selectedProducts,
				{ ...product, price: cleanPrice, quantity: 1 },
			];
		}
	}

	function incrementQuantity(id) {
		const index = selectedProducts.findIndex((p) => p.id === id);
		if (index !== -1) {
			selectedProducts[index].quantity += 1;
			selectedProducts = [...selectedProducts];
		}
	}

	function decrementQuantity(id) {
		const index = selectedProducts.findIndex((p) => p.id === id);
		if (index !== -1 && selectedProducts[index].quantity > 1) {
			// sí existe ese producto, podemos modificarlo
			selectedProducts[index].quantity -= 1;
			selectedProducts = [...selectedProducts];
		}
		if (quantity <= 0) {
			quantity = 0;
		}
	}

	function removeProduct(id) {
		selectedProducts = selectedProducts.filter((p) => p.id !== id);
	}

	// acc: acumulador inicia en 0
	// 0, valor inicial
	// reduce() funcion que reduce todo un arreglo a un solo valor
	function calculateTotal() {
		console.log("Calculando desde función. Productos:", selectedProducts);
		return selectedProducts.reduce((acc, p) => {
			const price = Number(p.price ?? 0);
			const quantity = Number(p.quantity ?? 0);
			const subtotal = price * quantity;
			console.log(
				`Producto: ${p.name}, Precio: ${price}, Cantidad: ${quantity}, Subtotal: ${subtotal}`,
			);
			return acc + subtotal;
		}, 0);
	}

	$: if (selectedProducts) {
		total = calculateTotal();
	}

	$: console.log("TOTAL: ", total);
	console.log("Total con la funcion: ", calculateTotal());

	$: console.log("canasta: ", selectedProducts);

	// Estado componente de registro de pago
	function openConfirmation() {
		showConfirmation = true;
	}
</script>

{#if role === "admin"}
	<section class="min-h-screen flex items-center justify-center">
		<div
			class="w-full mx-auto relative flex flex-wrap gap-2 text-sm justify-center mt-16"
		>
			<!-- Contenedor Izquierdo -->
			<div
				class="hidden xl:block max-w-lg bg-white flex-grow drop-shadow-lg border border-gray-200 min-h-[440px] top-0"
			>
				<!-- tabla -->
				<SearchBar
					bind:filters
					on:search={handleSearch}
					searchFields={["id"]}
				/>

				<div class=" ">
					<ProductTableCash
						{columns}
						data={$products}
						on:select={(event) => addProduct(event.detail)}
					/>
				</div>
			</div>

			<!-- Contenedor Central -->
			<div
				class="hidden md:block mx-auto xl:mx-2 min-w-[150px] max-w-2xl bg-white p-8 shadow-md flex-grow mt-0 drop-shadow-lg border border-gray-200 max-h-[578px]"
			>
				<h1 class="text-3xl font-bold pb-9">Orden de venta</h1>
				<div class="relative">
					<fieldset>
						<legend class="text-gray-400 text-xs"
							>INFORMACIÓN CLIENTE</legend
						>
						<div class="pl-5 pt-5 pb-3">
							<label>
								<span class="font-medium">Empleado</span>
								<select
									bind:value={employee}
									required
									name="type-empleado"
									aria-label="Empleado"
									class=" rounded-xl border-gray-400 border p-1 absolute w-48 pl-2 ml-4"
								>
									<option value="" disabled selected
										>Selecciona un empleado</option
									>
									{#each $employees as emp}
										<option value={emp.id}
											>{emp.name}</option
										>
									{/each}
								</select>
							</label>
						</div>
						<div class="right-2 top-8 absolute">
							<label
								><span class=" font-medium">Fecha</span>
								<input
									type="date"
									bind:value={date}
									required
									class="rounded-xl border-gray-400 border p-1 w-48 pl-2 ml-10"
								/>
							</label>
						</div>
						<div class="pl-5">
							<label
								><span class=" font-medium">Tipo</span>
								<select
									name="type-id"
									aria-label="Tipo de identificación"
									class="rounded-xl border-gray-400 border p-1 ml-12 w-48"
									bind:value={typeDocument}
									required
								>
									<option value="" disabled selected
										>Tipo de documento</option
									>
									<option value="CC"
										>Cédula de ciudadanía</option
									>
									<option value="CE"
										>Cédula de extranjería</option
									>
									<option value="TI"
										>Tarjeta de identidad</option
									>
									<option value="NIT">NIT</option>
								</select>
							</label>
						</div>
						<div class="right-3 top-[68px] absolute">
							<label
								><span class=" font-medium">Numero</span>
								<input
									type="number"
									placeholder="123456"
									required
									bind:value={idNumber}
									class="rounded-xl border-gray-400 border p-1 w-48 pl-2 ml-6"
								/>
							</label>
						</div>
					</fieldset>
				</div>
				<!-- tabla produtos por cliente -->
				<div
					class="border border-black mt-5 pb-3 overflow-scroll h-[280px]"
				>
					<table class="table-fixed w-full">
						<thead>
							<tr class="">
								<th class="pl-3 pb-4 pt-5 pr-10">#</th>
								<th class="pl-3 pb-4 pt-5 pr-10">Producto</th>
								<th class="pl-3 pb-4 pt-5 pr-10">Cantidad</th>
								<th class="pl-3 pb-4 pt-5 pr-20">Precio</th>
								<th class="pl-3 pb-4 pt-5 pr-20">Total</th>
								<th class="pl-3 pb-4 pt-5 pr-20">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{#each selectedProducts as product, i}
								<tr class="border border-slate-00">
									<td class="w-1/12 pb-2 pt-2 text-center"
										>{i + 1}</td
									>
									<td class="w-3/12 pb-2 pt-2"
										>{product.name}</td
									>
									<td class="w-2/12 pb-2 pt-2">
										<div
											class="flex items-center justify-center gap-2"
										>
											<button
												type="button"
												class="bg-gray-200 px-2"
												on:click={() =>
													decrementQuantity(
														product.id,
													)}
											>
												-
											</button>
											<span>{product.quantity}</span>
											<button
												type="button"
												class="bg-gray-200 px-2"
												on:click={() =>
													incrementQuantity(
														product.id,
													)}
											>
												+
											</button>
										</div>
									</td>
									<td class="w-2/12 pb-2 pt-2 text-center"
										>${product.price}</td
									>
									<td class="w-3/12 pb-2 pt-2 text-center">
										${(
											product.quantity *
											(product.price ?? 0)
										).toFixed(2)}
									</td>
									<td class="w-1/12 pb-2 pt-2 text-center">
										<button
											type="button"
											class="text-red-900 font-medium"
											on:click={() =>
												removeProduct(product.id)}
										>
											X
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<div class="mt-4 relative">
					<h3 class="text-4xl font-bold">
						Total: ${total.toFixed(2) ?? "null"}
					</h3>
					<button
						class=" bg-green-800 font-bold text-xl text-white py-2 px-4 rounded-2xl absolute right-0 bottom-1 mx-1"
						on:click={openConfirmation}>Pagar</button
					>
				</div>
			</div>

			<!-- modal registro de pago -->

			{#if showConfirmation}
				<ConfirmationCashRegister
					{employee}
					{typeDocument}
					{idNumber}
					{date}
					{total}
					{selectedProducts}
					on:close={() => (showConfirmation = false)}
				/>
			{/if}

			<!-- view mobiles -->
			<div class="w-full container md:hidden">
				<h3
					class="text-secondary mb-10 font-bold text-[26px] font-primary"
				>
					Escanear productos
				</h3>
				<div class="grid grid-rows-2 p-x">
					<div>
						<p class="text-lg">Conectar con el computador</p>
						<p class="text-[16px] text-gray-400">
							Activar bluetooth
						</p>
					</div>
					<div class="text-end text-lg">
						<button
							class="bg-primary mr-10 text-white px-6 py-1 rounded items-end"
							>Conectar</button
						>
					</div>
				</div>
				<div class="">
					<label class="block">
						<span class="block mt-6 mb-2 font-bold"
							>Ingresar serial codigo de QR</span
						>
						<input
							type="text"
							class="h-10 w-64 border rounded-sm px-2"
							placeholder="1214854121231547"
							name="codigoQR"
							id="codigoQR"
							required
						/>
					</label>
					<label class="block">
						<span class="block mt-6 mb-2 font-bold"
							>Ingresar serial codigo de barras</span
						>
						<input
							type="text"
							class="h-10 w-64 border rounded-sm px-2"
							placeholder="6547654121"
							name="codigoBarras"
							id="codigoBarras"
							required
						/>
					</label>
					<div class="text-end px-12">
						<button
							><i
								class="ri-add-line rounded-full bg-primary text-white text-5xl"
							></i></button
						>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- temporary-div -->
	<footer class="md:hidden text-center">
		<button
			><i class="ri-qr-code-line text-secondary text-6xl my-4 mx-6"
			></i></button
		>
		<button
			><i class="ri-camera-fill text-secondary text-6xl my-4 mx-6"
			></i></button
		>
		<button
			><i class="ri-qr-scan-2-line text-secondary text-6xl my-4 mx-6"
			></i></button
		>
	</footer>
{:else if role === "user"}
	<!-- DEBERIA APARECER SOLO USER ------------------------------------------------------------------------->
	<p class=" bg-blue-400 mt-40">usted es usuario</p>
{:else}
	<p class="bg-yellow-500 mt-40">You do not have access to this page.</p>
{/if}
