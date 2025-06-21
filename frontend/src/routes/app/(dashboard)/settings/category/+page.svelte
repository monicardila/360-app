<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../../utils/models";
	import { categories } from "../../../../../stores/models";
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
			await loadData("categories", "all", filters);
		} else if (filters.id) {
			await loadData("categories", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("categories", "byStatus", filters);
		} else if (filters.name) {
			await loadData("categories", "byName", filters);
		} else {
			await loadData("categories", "all", filters);
		}
	};

	// Cargar productos al montar la vista
	onMount(async () => {
		await loadData("categories", "all", filters);
	});

	// Definir columnas específicas para productos
	const columns = [
		"id",
		"name",
		"description",
		"parentId",
		"parent",
		"children",
		"products",
		"createdAt",
		"updatedAt",
		"status",
	];
</script>

<h5 class="right-20 absolute mt-16 font-medium">Categories</h5>

<div class="mt-24">
	<!-- MODIFICAR POR CADA VISTA PARA LOS FILTROS PESONALIZADOS-->
	<SearchBar
		bind:filters
		on:search={handleSearch}
		searchFields={["id", "status"]}
	/>

	<!-- Usar el componente Table con columnas y datos -->
	<Table {columns} data={$categories} />
</div>
