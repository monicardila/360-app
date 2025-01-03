<script>
	import { onMount } from "svelte";
	import { Calendar } from "@fullcalendar/core";
	import dayGridPlugin from "@fullcalendar/daygrid"; // Enables the "month" view with the days organized in a grid.
	import interactionPlugin from "@fullcalendar/interaction";
	import { task } from "../stores/taskCalendar";

	let calendar;
	let calendarEl; // calendarEl: element HTML in the DOM
	let events;

	// $: reactive statements
	//Each element of the tasks array (which is an object with the properties title and date) is transformed into a new object with the properties title and start
	$: {
		events = $task.map((task) => ({
			title: task.title,
			start: task.date,
		}));
	}

	$: if (calendar) {
		calendar.removeAllEvents();
		calendar.addEventSource(events);
	}

	// Draws the calendar inside the element pointed to by calendarEl
	onMount(() => {
		calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin, interactionPlugin],
			initialView: "dayGridMonth",
			editable: false,
			selectable: false,
			events,
			headerToolbar: false,
		});

		calendar.render();
	});
</script>

<!-- Svelte renders the component, automatically takes the <div> and assigns it to the variable calendarEl. -->
<!-- The purpose of bind:this is to give you direct access to the <div> from your JavaScript. -->
<div class="w-full h-full"><div bind:this={calendarEl}></div></div>
