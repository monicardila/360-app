<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../../utils/models";
	import { orders } from "../../../../../stores/models";
	import SearchBar from "../../../../../components/SearchBar.svelte";
	import Table from "../../../../../components/Table.svelte";

	let filters = { id: null, status: null, all: true };

	const handleSearch = async (event) => {
		filters = event.detail.filters;

		// Object.values(filters) = devuelve unicamente los valores de ese objeto ejemplo : [null, "", ""]
		// .every() = revisa si todos los elementos del arreglo cumplen con la condicion
		const isEmpty = Object.values(filters).every(
			(value) => value === null || value === "",
		);

		if (isEmpty) {
			await loadData("orders", "all", filters);
		} else if (filters.id) {
			await loadData("orders", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("orders", "byStatus", filters);
		} else if (filters.name) {
			await loadData("orders", "byName", filters);
		} else {
			await loadData("orders", "all", filters);
		}
	};

	// Cargar productos al montar la vista
	onMount(async () => {
		await loadData("orders", "all", filters);
	});

	// Definir columnas específicas para productos
	const columns = [
		"id",
		"order_date",
		"supplier_nit",
		"employees_identification_card",
		"product_name",
		"delivery_status",
	];
</script>

<h5 class="right-20 absolute font-medium">Orders</h5>

<button
	on:click={() => {
		window.alert("CRUD");
	}}
	class="right-20 absolute mt-14 font-medium bg-green-600 text-white py-2 px-4 rounded-md"
	>Crear</button
>

<div class="mt-24">
	<!-- MODIFICAR POR CADA VISTA PARA LOS FILTROS PESONALIZADOS-->
	<SearchBar bind:filters on:search={handleSearch} searchFields={["id"]} />

	<!-- Usar el componente Table con columnas y datos -->
	<Table {columns} data={$orders} />
</div>
