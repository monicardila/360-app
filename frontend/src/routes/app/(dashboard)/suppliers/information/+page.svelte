<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../../utils/models";
	import { supplier } from "../../../../../stores/models";
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
			await loadData("supplier", "all", filters);
		} else if (filters.id) {
			await loadData("supplier", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("supplier", "byStatus", filters);
		} else if (filters.name) {
			await loadData("supplier", "byName", filters);
		} else {
			await loadData("supplier", "all", filters);
		}
	};

	// Cargar productos al montar la vista
	onMount(async () => {
		await loadData("supplier", "all", filters);
	});

	// Definir columnas específicas para productos
	const columns = [
		"id",
		"nit",
		"name",
		"contact_name",
		"phone",
		"email",
		"address",
		"status",
		"deactivateAt",
	];
</script>

<h5 class="right-20 absolute font-medium">Information suppliers</h5>

<button
	on:click={() => {
		window.alert("CRUD");
	}}
	class="right-20 absolute mt-14 font-medium bg-green-600 text-white py-2 px-4 rounded-md"
	>Crear</button
>

<div class="mt-24">
	<!-- MODIFICAR POR CADA VISTA PARA LOS FILTROS PESONALIZADOS-->
	<SearchBar
		bind:filters
		on:search={handleSearch}
		searchFields={["id", "status", "name"]}
	/>

	<!-- Usar el componente Table con columnas y datos -->
	<Table {columns} data={$supplier} />
</div>
