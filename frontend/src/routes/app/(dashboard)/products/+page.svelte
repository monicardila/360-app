<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../utils/models";
	import { products } from "../../../../stores/models";
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

<h5 class="right-20 absolute font-medium">Products</h5>

<button
	on:click={() => {
		window.alert(
			"SE ABRE MODAL PARA LA CREACION DE PRODUCTOS - CADA PRODUCTO DEBE TENER EL BOTON DE EDITAR",
		);
	}}
	class="right-20 absolute mt-14 font-medium bg-green-600 text-white py-2 px-4 rounded-md"
	>Crear</button
>

<!-- MODIFICAR POR CADA VISTA PARA LOS FILTROS PESONALIZADOS-->
<div class="mt-24">
	<SearchBar
		bind:filters
		on:search={handleSearch}
		searchFields={["id", "status", "name"]}
	/>

	<!-- Usar el componente Table con columnas y datos -->
	<Table {columns} data={$products} />
</div>
