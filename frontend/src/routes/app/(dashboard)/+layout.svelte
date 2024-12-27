<script>
	let isOpen = false;

	const Menus = [
		{
			title: "Dashboard",
			link: "./",
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
			title: "Supplier",
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
			title: "Reports",
			icon: "ri-folder-chart-line ",
			submenu: true,
			submenuItems: [
				{ title: "Employees", link: "/app/reports/employees" },
				{ title: "Analytics", link: "/app/reports/analytics" },
			],
		},
		{
			title: "Settings",
			icon: "ri-settings-3-fill",
			submenu: true,
			submenuItems: [
				{ title: "Categories", link: "/app/settings/category" },
				{ title: "Branch Store", link: "/app/settings/branchStore" },
				{ title: "Permissions", link: "/app/settings/permissions" },
			],
		},
		{ title: "help", link: "/app/help", icon: "ri-question-fill" },
		{ title: "Logout", link: "../", icon: "ri-logout-box-line" },
	];

	let openSubmenu = null;
	const toggleSubmenu = (index) => {
		openSubmenu = openSubmenu === index ? null : index;
	};
</script>

<div class=" flex text-lg">
	<div
		class=" {`${isOpen ? ' w-52' : 'w-18'} duration-300  border border-black h-screen relative bg-slate-100 p-4`}"
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
				<a
					href={menu.link || "#"}
					on:click={menu.submenu ? () => toggleSubmenu(index) : null}
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

	<!-- content -->
	<div class="m-0 flex-1 w-full overflow-auto">
		<main class=" p-10 h-screen">
			<slot />
		</main>
	</div>
</div>
