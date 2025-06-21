<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../../utils/models";
	import { branch_store } from "../../../../../stores/models";
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
			await loadData("branch_store", "all", filters);
		} else if (filters.id) {
			await loadData("branch_store", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("branch_store", "byStatus", filters);
		} else if (filters.name) {
			await loadData("branch_store", "byName", filters);
		} else {
			await loadData("branch_store", "all", filters);
		}
	};

	// Cargar productos al montar la vista
	onMount(async () => {
		await loadData("branch_store", "all", filters);
	});

	// Definir columnas específicas para productos
	const columns = [
		"id",
		"name",
		"address",
		"manager_name",
		"number_of_employees",
		"status",
		"deactivateAt",
	];
</script>

<h5 class="right-20 absolute mt-16 font-medium">Branch store</h5>

<div class="mt-24">
	<!-- MODIFICAR POR CADA VISTA PARA LOS FILTROS PESONALIZADOS-->
	<SearchBar
		bind:filters
		on:search={handleSearch}
		searchFields={["id", "status"]}
	/>

	<!-- Usar el componente Table con columnas y datos -->
	<Table {columns} data={$branch_store} />
</div>
