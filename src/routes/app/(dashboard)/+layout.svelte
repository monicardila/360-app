<script>
	import { onMount } from "svelte";

	// Espera a que el DOM esté listo
	// target: elemento html que dispara un evento
	onMount(() => {
		// Selecciona todos los <li> dentro de la barra lateral
		// e: "event"
		document.querySelectorAll(".sidebar ul li").forEach((item) => {
			item.addEventListener("click", function (e) {
				// Evitar que el clic cierre otros submenus innecesariamente
				e.stopPropagation();

				// Alterna el submenu del item (li) haciendo click
				const submenu = item.querySelector("ul");

				// Cierra los submenus abiertos en los elementos hermanos
				// el: "element"
				document.querySelectorAll(".sidebar ul li").forEach((el) => {
					if (el !== item) {
						const otherSubmenu = el.querySelector("ul");
						if (otherSubmenu) {
							otherSubmenu.classList.add("hidden"); // Oculta submenus
						}
						el.classList.remove("active"); // Elimina la clase active
					}
				});

				// Si el item tiene un submenu, alterna su visibilidad
				if (submenu) {
					submenu.classList.toggle("hidden"); // Muestra/oculta el submenu
				}

				// Añade la clase active al elemento haciendo click
				item.classList.toggle("active");
			});
		});
	});
</script>

<!-- aside -->
<div class=" m-0 p-0 box-border flex">
	<div class="body bg-[#dbe2f4] flex">
		<div class=" items-center w-full min-h-full mr-4">
			<!-- menu inferior -->
			<div
				class="
			"
			></div>
			<!--236 desplegado, minimizado 72  -->
			<div
				class="sidebar xl:w-[236px] xl:relative xl:h-screen xl:flex-col gap-[20px] xl:bg-[#fff] p-[20px] transition duration-300 .. items-center w-full h-24 flex-row bg-white border bottom-0 fixed z-20 xl:block"
			>
				<!-- head -->
				<div
					class="head xl:flex gap-[20px] pb-[20px] xl:border-b xl:border-[#f6f6f6] mt-4 hidden xl:block"
				>
					<div class="user-img">
						<i
							class="ri-user-3-line bg-slate-100 rounded-full text-3xl p-2"
						></i>
					</div>
					<div class="user-details">
						<p class="title font-normal text-xs uppercase">
							web developer
						</p>
						<p class="name mb-[10px] text-base">Monica Ardila</p>
					</div>
				</div>
				<!-- nav -->
				<div
					class="nav flex-1 transition-all duration-300 font-primary"
				>
					<div class="menu relative list-none mb-1">
						<p
							class="title font-normal text-xs relative flex pb-4 hidden xl:block"
						>
							PRINCIPAL
						</p>
						<ul
							class="relative list-none mb-1 flex xl:flex-col justify-center"
						>
							<li
								class="relative list-none mb-1 p-[2px] xl:hover:bg-slate-100 rounded-md"
							>
								<a href="/app/" class="text-base p-2">
									<i
										class="ri-calendar-todo-line xl:text-2xl text-4xl text-black px-2 hover:bg-teal-100 hover:rounded-2xl hover:text-teal-700 hover:px-2 xl:hover:bg-transparent"
									></i>
									<span class="text p-4 xl:inline-flex"
										><br class="xl:hidden" />Dashboard</span
									>
								</a>
							</li>

							<li
								class="relative list-none mb-1 p-[2px] xl:hover:bg-slate-100 rounded-md"
							>
								<a
									href="/app/cashier"
									class=" text-base p-2 hidden lg:block"
								>
									<i
										class="ri-coins-line xl:text-2xl text-4xl text-black px-2 hover:bg-teal-100 hover:rounded-2xl hover:text-teal-700 hover:px-2 xl:hover:bg-transparent"
									></i>
									<span class="text p-4 xl:inline-flex"
										><br class="xl:hidden" />Caja</span
									>
								</a>
							</li>
							<li
								class="relative list-none mb-1 p-[2px] xl:hover:bg-slate-100 rounded-md"
							>
								<a
									href="/app/clients"
									class=" text-base p-2 hidden lg:block"
								>
									<i
										class="ri-user-search-line xl:text-2xl text-4xl text-black px-2 hover:bg-teal-100 hover:rounded-2xl hover:text-teal-700 hover:px-2 xl:hover:bg-transparent"
									></i>
									<span class="text p-4 xl:inline-flex"
										><br class="xl:hidden" />Clientes</span
									>
								</a>
							</li>
							<li
								class="relative list-none mb-1 p-[2px] xl:hover:bg-slate-100 rounded-md"
							>
								<a href="/app/suppliers" class=" text-base p-2">
									<i
										class="ri-bus-fill xl:text-2xl text-4xl text-black px-2 hover:bg-teal-100 hover:rounded-2xl hover:text-teal-700 hover:px-2 xl:hover:bg-transparent"
									></i>
									<span class="text p-4 xl:inline-flex"
										><br
											class="xl:hidden"
										/>Proveedores</span
									>
								</a>
							</li>
							<li
								class="relative list-none mb-1 p-[2px] xl:hover:bg-slate-100 rounded-md xl:hidden"
							>
								<a href="/app/products" class=" text-base p-2">
									<i
										class="ri-shopping-cart-line xl:text-2xl text-4xl text-black px-2 hover:bg-teal-100 hover:rounded-2xl hover:text-teal-700 hover:px-2 xl:hover:bg-transparent"
									></i>
									<span class="text p-4 xl:inline-flex"
										><br class="xl:hidden" />Productos</span
									>
								</a>
							</li>
							<li
								class="relative list-none mb-1 p-[2px] xl:hover:bg-slate-100 rounded-md xl:hidden"
							>
								<a
									href="/app/reports"
									class=" text-base p-2 hidden lg:block"
								>
									<i
										class="ri-bar-chart-line xl:text-2xl text-4xl text-black px-2 hover:bg-teal-100 hover:rounded-2xl hover:text-teal-700 hover:px-2 xl:hover:bg-transparent"
									></i>
									<span class="text p-4 xl:inline-flex"
										><br class="xl:hidden" />Reportes</span
									>
								</a>
							</li>
							<!-- more -->
							<li
								class="relative list-none mb-1 p-[2px] xl:hover:bg-slate-100 rounded-md xl:hidden"
							>
								<a
									href="/app/reports"
									class=" text-base p-2 lg:hidden"
								>
									<i
										class="ri-more-2-fill xl:text-2xl text-4xl text-black px-2 hover:bg-teal-100 hover:rounded-2xl hover:text-teal-700 hover:px-2 xl:hover:bg-transparent"
									></i>
									<span class="text p-4 xl:inline-flex"
										><br class="xl:hidden" />Ver más</span
									>
								</a>
							</li>

							<div class="sidebar xl:block hidden">
								<ul class="menu flex xl:flex-col">
									<!-- Item con submenu -->
									<li class="relative list-none mb-1 p-[2px]">
										<a href="#" class="text-base p-2">
											<i
												class="ri-shopping-cart-line text-2xl px-2"
											></i>
											<span
												class="text p-4 hidden xl:inline-flex"
												>Productos</span
											>
											<i class="icon ri-arrow-down-s-line"
											></i>
										</a>
										<ul class="sub-menu hidden ml-8 mt-2">
											<li
												class="relative list-none mb-1 p-[2px] hover:bg-slate-100 rounded-md"
											>
												<a
													href="/app/products"
													class="text-sm">Stock</a
												>
											</li>
											<li
												class="relative list-none mb-1 p-[2px] hover:bg-slate-100 rounded-md"
											>
												<a href="a" class="text-sm"
													>Descargar</a
												>
											</li>
										</ul>
									</li>

									<!-- Otro item con submenu -->
									<li class="relative list-none mb-1 p-[2px]">
										<a href="#" class="text-base p-2">
											<i
												class="ri-bar-chart-line text-2xl px-2"
											></i>
											<span
												class="text p-4 hidden xl:inline-flex"
												>Reportes</span
											>
											<i class="icon ri-arrow-down-s-line"
											></i>
										</a>
										<ul class="sub-menu hidden ml-8 mt-2">
											<li
												class="relative list-none mb-1 p-[2px] hover:bg-slate-100 rounded-md"
											>
												<a
													href="/app/reports"
													class="text-sm">Balances</a
												>
											</li>
											<li
												class="relative list-none mb-1 p-[2px] hover:bg-slate-100 rounded-md"
											>
												<a href="#" class="text-sm"
													>Cartera</a
												>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</ul>
					</div>

					<div
						class="menu relative list-none mb-1 pt-14 xl:border-t xl:border-[#f6f6f6]"
					>
						<p class="text text-xs pb-4">CUENTA</p>
						<ul>
							<li
								class="relative list-none mb-1 hover:bg-slate-100 rounded-md p-[2px]"
							>
								<a href="/app/help" class=" text-base p-2">
									<i class="ri-question-line text-2xl"></i>
									<span class="text p-4">Ayuda</span>
								</a>
							</li>
							<li
								class="relative list-none mb-1 hover:bg-red-50 rounded-md p-[2px]"
							>
								<a href="../" class=" text-base px-2">
									<i
										class="ri-logout-box-r-line text-red-400 text-2xl"
									></i>
									<span class="text p-4 text-red-400"
										>Cerrar sesion</span
									>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- content -->
	<div class="m-0 flex-1 w-full overflow-auto">
		<main class=" p-4 h-screen">
			<slot />
		</main>
	</div>
</div>

<footer
	class="bg-primary p-2 text-white text-center text-sm font-primary hidden xl:block"
>
	<p>&copy; 2024 TRES60. Todos los derechos reservados.</p>
</footer>
