<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../../utils/models";
	import { orders } from "../../../../../stores/models";
	import SearchBar from "../../../../../components/SearchBar.svelte";
	import Table from "../../../../../components/Table.svelte";

	let filters = { id: null, status: null, all: true };

	const handleSearch = async (event) => {
		filters = event.detail.filters;

		if (filters.id) {
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

<h5 class="right-20 absolute mt-16 font-medium">Orders</h5>

<!-- MODIFICAR POR CADA VISTA PARA LOS FILTROS PESONALIZADOS-->
<SearchBar bind:filters on:search={handleSearch} searchFields={["id"]} />

<!-- Usar el componente Table con columnas y datos -->
<Table {columns} data={$orders} />
