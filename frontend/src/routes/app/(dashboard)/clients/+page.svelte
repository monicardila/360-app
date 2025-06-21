<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../utils/models";
	import { customer } from "../../../../stores/models";
	import SearchBar from "../../../../components/SearchBar.svelte";
	import Table from "../../../../components/Table.svelte";

	let filters = { id: null, status: null, all: true };

	const handleSearch = async (event) => {
		filters = event.detail.filters;

		// Object.values(filters) = devuelve unicamente los valores de ese objeto ejemplo : [null, "", ""]
		// .every() = revisa si todos los elementos del arreglo cumplen con la condicion
		const isEmpty = Object.values(filters).every(
			(value) => value === null || value === "",
		);

		if (isEmpty) {
			await loadData("customer", "all", filters);
		} else if (filters.id) {
			await loadData("customer", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("customer", "byStatus", filters);
		} else if (filters.name) {
			await loadData("customer", "byName", filters);
		} else {
			await loadData("customer", "all", filters);
		}
	};

	// Cargar productos al montar la vista
	onMount(async () => {
		await loadData("customer", "all", filters);
	});

	// Definir columnas específicas para productos
	const columns = ["id", "identification_card", "customer_invoice"];
</script>

<h5 class="right-20 absolute mt-16 font-medium">Customer</h5>

<div class="mt-24">
	<!-- MODIFICAR POR CADA VISTA PARA LOS FILTROS PESONALIZADOS-->
	<SearchBar bind:filters on:search={handleSearch} searchFields={["id"]} />

	<!-- Usar el componente Table con columnas y datos -->
	<Table {columns} data={$customer} />
</div>
