<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../utils/models";
	import { products } from "../../../../stores/models";
	import SearchBar from "../../../../components/SearchBar.svelte";
	import Table from "../../../../components/Table.svelte";

	let filters = { id: null, status: null, all: true };

	const handleSearch = async (event) => {
		filters = event.detail.filters;

		if (filters.id) {
			await loadData("products", "byId", filters);
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("products", "byStatus", filters);
		} else if (filters.name) {
			await loadData("products", "byName", filters);
		} else {
			await loadData("products", "all", filters);
		}
	};

	// Cargar productos al montar la vista
	onMount(async () => {
		await loadData("products", "all", filters);
	});

	// Definir columnas específicas para productos
	const columns = [
		"id",
		"supplier_id",
		"categoryId",
		"name",
		"description",
		"price",
		"stock",
		"orders",
	];
</script>

<h5 class="right-20 absolute mt-16 font-medium">Products</h5>

<!-- MODIFICAR POR CADA VISTA PARA LOS FILTROS PESONALIZADOS-->
<SearchBar
	bind:filters
	on:search={handleSearch}
	searchFields={["id", "status", "name"]}
/>

<!-- Usar el componente Table con columnas y datos -->
<Table {columns} data={$products} />
