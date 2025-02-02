<script>
	import { onMount } from "svelte";
	import {
		categories,
		loadCategory,
		loading,
		error,
	} from "../../../../../stores/models";

	onMount(() => {
		console.log("Calling loadProducts...");
		loadCategory();
	});
</script>

<!-- th: columns, tr:cells -->
{#if $loading}
	<p>Loading data...</p>
{:else if $categories && $categories.length > 0}
	<section>
		<h2>CATEGORIES</h2>
		<table
			class="table-auto border-collapse border border-gray-300 w-full text-left text-sm"
		>
			<thead>
				<tr class="bg-gray-100">
					<th class="border border-gray-300 px-4 py-2">ID</th>
					<th class="border border-gray-300 px-4 py-2">Name</th>
					<th class="border border-gray-300 px-4 pt-2">Description</th
					>
					<th class="border border-gray-300 px-4 py-2">Parent id</th>

					<th class="border border-gray-300 px-4 py-2">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each $categories as category}
					<tr class="hover:bg-gray-50">
						<td class="border border-gray-300 px-4 py-2"
							>{category.id}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{category.name}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{category.description}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{category.parentId}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{category.status}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
		<ul></ul>
	</section>
{:else if $error}
	<p class="text-red-400">{$error}</p>
{:else}
	<p>No categories found.</p>
{/if}
