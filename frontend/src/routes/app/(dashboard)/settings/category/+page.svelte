<script>
	import { onMount } from "svelte";
	import { loadData, createModel } from "../../../../../utils/models";
	import { categories, products } from "../../../../../stores/models";
	import SearchBar from "../../../../../components/SearchBar.svelte";
	import Table from "../../../../../components/Table.svelte";
	import FormCreateUpdate from "../../../../../components/FormCreateUpdate.svelte";
	import { fieldSchemas } from "../../../../../utils/fieldsSchema";

	let filters = { id: null, status: null, name: "", all: true };
	let showForm = false;
	let categoryFields = [];

	onMount(async () => {
		await Promise.all([
			loadData("categories", "all", { includeProducts: true }),
			loadData("products", "all"),
		]);
		categoryFields = fieldSchemas.categories
			.filter((field) => field.name !== "parentId")
			.map((field) => {
				if (field.name === "products") {
					return {
						...field,
						options: $products.map((p) => ({
							id: p.id,
							name: `${p.name} ($${p.price})`,
						})),
					};
				}
				return field;
			});
	});

	const handleSearch = async (event) => {
		filters = event.detail.filters;
		const isEmpty = Object.values(filters).every(
			(value) => value === null || value === "",
		);

		if (isEmpty) {
			await loadData("categories", "all", filters);
		} else if (filters.id) {
			await loadData("categories", "byId", {
				...filters,
				includeProducts: true, // 👈🏼 Esto es lo que faltaba
			});
		} else if (filters.status !== null && filters.status !== undefined) {
			await loadData("categories", "byStatus", filters);
		} else if (filters.name) {
			await loadData("categories", "byName", filters);
		} else {
			await loadData("categories", "all", filters);
		}
	};

	async function handleCreate(event) {
		const data = event.detail;

		if (!data.name) {
			alert("Por favor completa todos los campos obligatorios.");
			return;
		}

		try {
			await createModel("categories", data);
			await loadData("categories", "all", filters);
			showForm = false;
		} catch (error) {
			console.error("Error al crear categoría:", error);
			alert("Error al crear categoría");
		}
	}

	function openForm() {
		showForm = true;
	}

	const columns = [
		"id",
		"name",
		"description",
		"status",
		"createdAt",
		"updatedAt",
		"products",
	];
</script>

<div class="relative w-auto h-screen pt-10">
	{#if showForm}
		<FormCreateUpdate
			fields={categoryFields}
			on:submit={handleCreate}
			submitLabel="Crear categoría"
			on:close={() => (showForm = false)}
		/>
	{/if}

	<div class=" w-auto border">
		<h5 class="right-10 absolute mt-16 font-medium hidden xl:block">
			Categorias
		</h5>
		<SearchBar
			bind:filters
			on:search={handleSearch}
			searchFields={["id", "status", "name"]}
		/>

		<button
			on:click={openForm}
			class="fixed bottom-6 right-6 z-50 bg-green-600 text-white text-3xl w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-700 transition"
			aria-label="Crear nueva categoría"
		>
			+
		</button>

		<Table
			{columns}
			data={$categories}
			resourceName="categories"
			fieldSchema={categoryFields}
		/>
	</div>
</div>
