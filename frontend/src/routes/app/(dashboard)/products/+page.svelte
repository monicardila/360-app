<script>
	import { onMount } from "svelte";
	import { products, supplier, categories } from "../../../../stores/models";
	import SearchBar from "../../../../components/SearchBar.svelte";
	import Table from "../../../../components/Table.svelte";
	import FormCreateUpdate from "../../../../components/FormCreateUpdate.svelte";
	import { fieldSchemas } from "../../../../utils/fieldsSchema";
	import { createModel, loadData } from "../../../../utils/models";

	let filters = { id: null, status: null, all: true };
	let showForm = false;
	let productFields = [];

	// Al montar, carga productos, proveedores y categorías
	onMount(async () => {
		await Promise.all([
			loadData("products", "all", filters),
			loadData("supplier", "all"),
			loadData("categories", "all"),
		]);

		// Mapear los campos y llenar dinámicamente los selects
		productFields = fieldSchemas.products.map((field) => {
			if (field.name === "supplier_id") {
				return {
					...field,
					options: $supplier.map((s) => ({ id: s.id, name: s.name })),
				};
			}
			if (field.name === "categoryId") {
				return {
					...field,
					options: $categories.map((c) => ({
						id: c.id,
						name: c.name,
					})),
				};
			}
			return field;
		});
	});

	// Función para buscar productos según filtros
	const handleSearch = async (event) => {
		filters = event.detail.filters;

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

	// Función para crear un producto
	async function handleCreate(event) {
		console.log("Datos enviados:", event);
		const data = event.detail;
		if (
			!data.name ||
			!data.price ||
			!data.stock ||
			!data.categoryId ||
			!data.supplier_id
		) {
			alert("Por favor completa todos los campos obligatorios.");
			return;
		}

		try {
			await createModel("products", data);
			await loadData("products", "all", filters);
			showForm = false;
		} catch (error) {
			console.error("Error al crear producto:", error);
			alert("Error al crear producto");
		}
	}

	// Mostrar el formulario
	function openForm() {
		showForm = true;
	}
</script>

<!-- Vista -->
<div class="relative w-auto">
	<!-- <h5 class="right-20 absolute font-medium">Products</h5> -->

	{#if showForm}
		<FormCreateUpdate
			fields={productFields}
			on:submit={handleCreate}
			submitLabel="Crear producto"
			on:close={() => (showForm = false)}
		/>
	{/if}

	<div class="mt-24 w-auto border">
		<SearchBar
			bind:filters
			on:search={handleSearch}
			searchFields={["id", "status", "name"]}
		/>
		<button
			on:click={openForm}
			class="fixed bottom-6 right-6 z-50 bg-green-600 text-white text-3xl w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-700 transition"
			aria-label="Crear nuevo"
		>
			+
		</button>

		<Table
			columns={[
				"id",
				"supplier_id",
				"categoryId",
				"name",
				"description",
				"price",
				"stock",
				"status",
			]}
			data={$products}
			resourceName="products"
			fieldSchema={productFields}
		/>
	</div>
</div>
