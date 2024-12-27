<script>
	import { onMount } from "svelte";
	import {
		orders,
		loadOrders,
		loading,
		error,
	} from "../../../../../stores/models";

	onMount(() => {
		console.log("Calling orders...");
		loadOrders();
	});
</script>

<!-- th: columns, tr:cells -->
{#if $loading}
	<p>Loading data...</p>
{:else if $orders && $orders.length > 0}
	<section>
		<h2>ORDERS</h2>
		<table
			class="table-auto border-collapse border border-gray-300 w-full text-left text-sm"
		>
			<thead>
				<tr class="bg-gray-100">
					<th class="border border-gray-300 px-4 py-2">ID</th>
					<th class="border border-gray-300 px-4 py-2">Order date</th>
					<th class="border border-gray-300 px-4 pt-2"
						>Supplier nit</th
					>
					<th class="border border-gray-300 px-4 py-2"
						>Employee identification</th
					>
					<th class="border border-gray-300 px-4 py-2"
						>Product name</th
					>
					<th class="border border-gray-300 px-4 py-2"
						>Delivery status</th
					>
				</tr>
			</thead>
			<tbody>
				{#each $orders as order}
					<tr class="hover:bg-gray-50">
						<td class="border border-gray-300 px-4 py-2"
							>{order.id}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{order.order_date}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{order.supplier_nit}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{order.employee_identification}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{order.product_name}</td
						>
						<td class="border border-gray-300 px-4 py-2"
							>{order.delivery_status}</td
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
	<p>No orders found.</p>
{/if}
