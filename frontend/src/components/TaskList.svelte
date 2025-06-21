<script>
	import { task } from "../stores/taskCalendar";
	//import Calendar from "./Calendar.svelte";
	let newTask = "";
	let selectedDate = "";

	// expansion operator/spread operator (...): we create a new array and that forces Svelte to update the UI to reflect the change.
	function addTask() {
		if (newTask && selectedDate) {
			task.update((currentTask) => [
				...currentTask,
				{ title: newTask, date: selectedDate },
			]);
			newTask = "";
			selectedDate = "";
		}
	}
</script>

<div class="p-4 border rounded">
	<h2 class="font-bold text-lg">New task</h2>
	<input
		type="text"
		placeholder="New task"
		bind:value={newTask}
		class="block w-full border p-2 my-2"
	/>
	<input
		type="date"
		bind:value={selectedDate}
		class="block w-full border p-2 mb-2"
	/>
	<button on:click={addTask} class="bg-blue-500 text-white px-4 py-2">
		Add
	</button>
	<ul class="mt-4 w-auto border border-black">
		{#each $task as task}
			<div class="flex">
				<li class=" items-center justify-between py-1 pr-32">
					{task.title} - {task.date}
				</li>
				<input class=" " type="checkbox" />
			</div>
		{/each}
	</ul>
</div>
