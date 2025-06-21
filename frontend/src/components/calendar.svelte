<script>
	import { onMount } from "svelte";
	import { Calendar } from "@fullcalendar/core";
	import dayGridPlugin from "@fullcalendar/daygrid";
	//import "@fullcalendar/daygrid/main.css";

	let calendarEl;

	onMount(() => {
		const calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin],
			initialView: "dayGridMonth",
			locale: "es",
			height: "auto",
		});

		calendar.render();
	});
</script>

<!-- bind: Cuando este <div> se cree en el DOM, guárdalo en la variable calendarEl -->
<div bind:this={calendarEl} class="calendar-container"></div>

<style>
	.calendar-container {
		max-width: 900px;
		max-height: 44px;
		margin: auto;
		background: #000;
	}
</style>
