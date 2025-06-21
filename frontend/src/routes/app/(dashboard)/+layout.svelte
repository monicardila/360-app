<script>
	let isOpen = false;
	let openSubmenu = null;

	const logout = async () => {
		try {
			const response = await fetch(
				"http://localhost:3000/api/v1/auth/logout",
				{
					method: "POST",
					credentials: "include",
				},
			);

			if (response.ok) {
				window.location.href = "/";
			} else {
				console.log("Logout failed", response);
			}
		} catch (error) {
			console.log("Error during logout", error);
		}
	};

	const Menus = [
		{
			title: "Dashboard",
			link: "/app",
			icon: "ri-calendar-todo-line  ",
		},
		{
			title: "Billing",
			link: "/app/cashier",
			icon: "ri-coins-line ",
		},
		{
			title: "Products",
			link: "/app/products",
			icon: "ri-shopping-cart-line ",
		},
		{
			title: "Clients",
			link: "/app/clients",
			icon: "ri-user-search-line  ",
		},
		{
			title: "Supplier .. v",
			icon: "ri-bus-fill  ",
			submenu: true,
			submenuItems: [
				{
					title: "Information",
					link: "/app/suppliers/information",
				},
				{ title: "Orders", link: "/app/suppliers/orders" },
			],
		},
		{
			title: "Reports .. v",
			icon: "ri-folder-chart-line ",
			submenu: true,
			submenuItems: [
				{ title: "Employees", link: "/app/reports/employees" },
				{ title: "Analytics", link: "/app/reports/analytics" },
			],
		},
		{
			title: "Settings .. v",
			icon: "ri-settings-3-fill",
			submenu: true,
			submenuItems: [
				{ title: "Categories", link: "/app/settings/category" },
				{ title: "Branch Store", link: "/app/settings/branchStore" },
				{ title: "Permissions", link: "/app/settings/permissions" },
			],
		},
		{ title: "help", link: "/app/help", icon: "ri-question-fill" },
		{
			title: "Logout",
			link: "#",
			icon: "ri-logout-box-line",
			action: logout,
		},
	];

	const toggleSubmenu = (index) => {
		openSubmenu = openSubmenu === index ? null : index;
	};
</script>

<div class=" flex text-lg">
	<div
		class=" {`${isOpen ? 'w-52' : 'w-18'} duration-300   relative bg-white p-4 z-30`}"
	>
		<div class="flex">
			<i class="ri-user-4-line bg-slate-200 rounded-full p-2"></i>
			<div class={`  ${!isOpen ? "hidden" : "pl-4"} `}>
				<span class="flex text-sm">WEB DEVELOPER</span>
				<span class=" flex text-lg">MONICA </span>
			</div>
		</div>
		<button
			on:click={() => {
				isOpen = !isOpen;
			}}
			class={`absolute -right-3 top-8 ${isOpen && "rotate-180"}`}
			><i
				class="ri-arrow-right-double-fill
				rounded-full
				border
				border-black
				text-white
				bg-black"
			></i></button
		>
		{#each Menus as menu, index}
			<div class={`relative top-8  ${isOpen ? "pb-4" : "pb-0"}`}>
				<!--  menu.action
    				  ? () => menu.action()  // Si `menu.action` existe, ejecuta esta función
   					  : menu.submenu 
					  ? () => toggleSubmenu(index)  // Si `menu.submenu` existe (y `menu.action` no existe), ejecuta esta función
    				  : null  // Si ninguna de las dos condiciones anteriores es verdadera, no hace nada -->
				<a
					href={menu.link || "#"}
					on:click={menu.action
						? () => menu.action()
						: menu.submenu
							? () => toggleSubmenu(index)
							: null}
					class={`block w-full hover:bg-slate-200 rounded-lg px-1 ${!isOpen && "pb-4"}`}
				>
					<i class={`pl-1 ${menu.icon}`}></i><span
						class={`text-base ${!isOpen ? "hidden" : "pl-4"} `}
						>{menu.title}</span
					></a
				>
			</div>
			{#if menu.submenu && openSubmenu === index && isOpen}
				<div class="pl-6 mt-4">
					{#each menu.submenuItems as item}
						<a
							href={item.link || "#"}
							class="
						 block w-full text-left px-4 py-2 hover:bg-blue-200 rounded-md text-sm"
							><span>{item.title}</span></a
						>
					{/each}
				</div>
			{/if}
		{/each}
	</div>

	<div class="m-0 flex-1 w-full overflow-auto">
		<!-- nav_bar -->
		<div
			class="fixed w-full top-0 right-0 left-0 h-[60px] shadow-md z-20 bg-white inline-flex"
		>
			<div
				class=" absolute top-1/2 transform -translate-y-1/2 flex items-center right-10 space-x-20"
			>
				<!-- search general -->
				<div class="relative w-80 h-10 mx-auto mt-10 mb-10 flex">
					<i
						class="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-600"
					></i>
					<input
						class="border border-gray-400 text-gray-600 rounded-full w-full h-full pl-10 pr-6 outline-none"
						type="text"
						placeholder="Search by view"
					/>
				</div>
				<!-- user -->
				<div class=" w-auto h-10 flex">
					<i class="ri-user-4-line text-black rounded bg-white"></i>
					<h4 class="mx-2">Monica Ardila</h4>
				</div>
			</div>
		</div>

		<!-- content -->
		<main class=" h-screen bg-slate-100">
			<slot />
		</main>
	</div>
</div>
