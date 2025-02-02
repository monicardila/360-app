<script>
	import Calendar from "../../../components/calendar.svelte";
	import TaskList from "../../../components/TaskList.svelte";
</script>

<div class="flex flex-wrap justify-center items-center gap-4 p-4 mt-24">
	<!-- Fila 1 -->
	<div class="flex flex-wrap gap-4 justify-center w-full">
		<div class="flex-1 min-w-[20%] h-48 bg-red-200 p-4"># sales</div>
		<div class="flex-1 min-w-[20%] h-48 bg-red-200 p-4">
			Best selling products
		</div>
		<div class="flex-1 min-w-[20%] h-48 bg-red-200 p-4">
			Out of stock products
		</div>
		<div class="flex-1 min-w-[30%] h-48 bg-blue-500 p-4">User</div>
	</div>

	<!-- Fila 2 -->
	<div class="flex flex-wrap gap-4 justify-center w-full">
		<div class="flex-1 min-w-[40%] h-72 bg-red-200 p-4">graphic</div>
		<div class="flex-1 min-w-[20%] h-72 bg-red-200 p-4">top</div>
		<div class="flex-1 min-w-[30%] h-72 bg-blue-500 p-4">Calendar</div>
	</div>

	<!-- Fila 3 -->
	<div class="flex flex-wrap gap-4 justify-center w-full">
		<div class="flex-1 min-w-[20%] h-72 bg-red-200 p-4">suggestion</div>
		<div class="flex-1 min-w-[20%] h-72 bg-red-200 p-4"># sales</div>
		<div class="flex-1 min-w-[20%] h-72 bg-red-200 p-4">todo</div>
		<div class="flex-1 min-w-[30%] h-72 bg-blue-500 p-4">branch</div>
	</div>
</div>

<!-- <div class="flex">
		<div class="p-4 w-[400px] h-[400px] bg-gray-100 border border-black">
			<Calendar />
		</div>
		<div class="relative w-96 mt-24">
			<TaskList />
		</div>
	</div> -->
