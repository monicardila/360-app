<script>
	import { onMount } from "svelte";

	onMount(() => {
		const navTriggerBtn = document.querySelector("#nav_trigger_btn");
		const navMenu = document.querySelector("#nav_menu");

		if (navTriggerBtn && navMenu) {
			navTriggerBtn.addEventListener("click", () => {
				navMenu.classList.toggle("nav-is-open");
			});
		}
	});
</script>

<!-- header -->
<header class="sticky top-0 h-[90px] shadow-xl z-30 bg-white">
	<div class="container mx-auto flex justify-between h-full items-center">
		<!-- logo -->
		<a href="a">
			<i class="ri-signal-tower-fill text-2xl">TRES60</i>
		</a>
		<!-- nav -->
		<nav>
			<!-- nav mobile trigger -->
			<div class="cursor-pointer lg:hidden" id="nav_trigger_btn">
				<i class="ri-menu-3-fill text-2xl"></i>
			</div>
			<ul
				class="fixed w-full h-0 p-0 bg-white text-primary overflow-hidden border-t top-[90px] left-0 right-0 flex flex-col gap-4 lg:relative lg:flex-row lf:p-0 lg:top-0 lg:boder-none lg:h-full transition-all duration-300 font-primary"
				id="nav_menu"
			>
				<li><a href="/app/">Principal</a></li>
				<li><a href="/app/cashier">Caja</a></li>
				<li><a href="/app/clients">Clientes</a></li>
				<li><a href="/app/suppliers">Proveedores</a></li>
				<li><a href="/app/products">Productos</a></li>
				<li><a href="/app/reports">Reportes</a></li>
				<li><a href="/app/help">Ayuda</a></li>

				<li>
					<a
						class=" bg-primary text-white px-2 transition-all duration-300 rounded-[8px] flex items-center gap-2 hover:bg-secondary hover:text-white"
						href="../.."
					>
						Cerrar sesion</a
					>
				</li>
			</ul>
		</nav>
	</div>
</header>
<slot />
<footer class="bg-primary p-2 text-white text-center text-sm font-primary">
	<p>&copy; 2024 TRES60. Todos los derechos reservados.</p>
</footer>
