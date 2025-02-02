<script>
	import { onMount } from "svelte";
	import {
		branch_store,
		loadBranchStores,
		loading,
		error,
	} from "../../../../../stores/models";

	onMount(() => {
		console.log("Calling load branch store...");
		loadBranchStores();
	});
</script>

<!-- th: columns, tr:cells -->
{#if $loading}
	<p>Loading data...</p>
{:else if $branch_store && $branch_store.length > 0}
	<section>
		<h2>BRANCH STORES</h2>
		<table
			class="table-auto border-collapse border border-gray-300 w-full text-left text-sm"
		>
			<thead>
				<tr class="bg-gray-100">
					<th class="border border-gray-300 px-4 py-2">ID</th>
					<th class="border border-gray-300 px-4 py-2">Name</th>
					<th class="border border-gray-300 px-4 pt-2">Address</th>
					<th class="border border-gray-300 px-4 py-2"
						>Manager name</th
					>
					<th class="border border-gray-300 px-4 py-2"
						>Number of employees</th
					>
					<th class="border border-gray-300 px-4 py-2">Status</th>
					<th class="border border-gray-300 px-4 py-2">Stock</th>
					<th class="border border-gray-300 px-4 py-2"
						>Deactivate at</th
					>
				</tr>
			</thead>
			<tbody>
				{#each $branch_store as branch}
					<tr class="hover:bg-gray-50">
						<td class="border border-gray-300 px-4 py-2"
							>{branch.id}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{branch.name}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{branch.address}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{branch.manager_name}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{branch.description}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{branch.number_of_employees}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{branch.status}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{branch.deactivatedAt}</td
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
	<p>No branch store found.</p>
{/if}
