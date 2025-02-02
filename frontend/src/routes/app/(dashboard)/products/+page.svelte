<script>
	import { onMount } from "svelte";
	import { loadData } from "../../../../utils/models";
	import { products } from "../../../../stores/models";
	import SearchBar from "../../../../components/SearchBar.svelte";

	let filters = { id: null, status: null, name: "", all: true };

	const handleSearch = async (event) => {
		filters = event.detail.filters;

		if (filters.id !== null) {
			filters.id = Number(filters.id);
			if (isNaN(filters.id)) {
				filters.id = null;
			}
		}

		if (filters.status !== null && typeof filters.status !== "boolean") {
			filters.status =
				filters.status === "true"
					? true
					: filters.status === "false"
						? false
						: null;
		}

		// Without !== null: The switch failed because values ​​like 0, false, or "" (empty string) were not considered true.
		// With !== null: You ensure that you are checking if the values ​​are different from null, regardless of whether they are "falsy" (0, false, etc.).
		// Key lesson: Always explicitly check conditions if you expect values ​​that might be "falsy" but still valid. This prevents JavaScript from incorrectly discarding those values.

		let operation = "all";

		switch (true) {
			case filters.id !== null:
				operation = "byId";
				break;
			case filters.status !== null:
				operation = "byStatus";
				break;
			case filters.name && filters.name.trim() !== "":
				operation = "byName";
				break;
			default:
				operation = "all";
				break;
		}

		console.log("Filters operation COMPONENT:", operation);
		console.log("Filters filter COMPONENT:", filters);

		await loadData("products", operation, filters);

		console.log("COMPONENT:", typeof filters.status);
	};

	// load all products by default
	onMount(async () => {
		await loadData("products", "all", filters);
	});
</script>

<h5 class="right-20 absolute mt-16 font-medium">Products</h5>
<!-- listening event  'search' -->
<SearchBar bind:filters on:search={handleSearch} />

<!-- th: columns, tr:cells -->

<section>
	<div
		class="nav_var max-w-[1500px] m-auto relative max-h-[1000px] overflow-scroll bg-white"
	>
		{#if $products && $products.length > 0}
			<table
				class="table-auto border-collapse border border-gray-300 w-full h-full text-left text-sm"
			>
				<thead>
					<tr class="bg-cyan-600 text-white">
						<th class="border border-gray-300 px-4 py-2">ID</th>
						<th class="border border-gray-300 px-4 py-2"
							>Supplier</th
						>
						<th class="border border-gray-300 px-4 pt-2">Name</th>
						<th class="border border-gray-300 px-4 py-2"
							>Category</th
						>
						<th class="border border-gray-300 px-4 py-2"
							>Description</th
						>
						<th class="border border-gray-300 px-4 py-2">Price</th>
						<th class="border border-gray-300 px-4 py-2">Stock</th>
						<th class="border border-gray-300 px-4 py-2">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each $products as product}
						<tr class="hover:bg-gray-50">
							<td class="border border-gray-300 px-4 py-2"
								>{product.id}</td
							>
							<td class="border border-gray-300 px-4 py-2"
								>{product.supplier_id}</td
							>
							<td class="border border-gray-300 px-4 py-2"
								>{product.name}</td
							>
							<td class="border border-gray-300 px-4 py-2"
								>{product.categoryId}</td
							>
							<td class="border border-gray-300 px-4 py-2"
								>{product.description}</td
							>
							<td class="border border-gray-300 px-4 py-2"
								>{product.price}</td
							>
							<td class="border border-gray-300 px-4 py-2"
								>{product.stock}</td
							>
							<td class="border border-gray-300 px-4 py-2"
								>{product.status}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No products available.</p>
		{/if}
	</div>
</section>
