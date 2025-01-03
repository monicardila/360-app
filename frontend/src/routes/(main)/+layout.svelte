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
			<i class="ri-signal-tower-fill text-2xl flex">
				<h5 class="font-secondary flex-1 ml-2">TRES60</h5></i
			>
		</a>
		<!-- nav -->
		<nav>
			<!-- nav mobile trigger -->
			<div class="cursor-pointer lg:hidden" id="nav_trigger_btn">
				<i class="ri-menu-3-fill text-2xl"></i>
			</div>
			<ul
				class="fixed w-full h-0 p-0 bg-white text-primary overflow-hidden top-[90px] left-0 right-0 flex flex-col gap-4 lg:relative lg:flex-row lf:p-0 lg:top-0 lg:boder-none lg:h-full transition-all duration-300 font-primary"
				id="nav_menu"
			>
				<li><a href="../"> Inicio</a></li>
				<li><a href="#subscription"> Planes</a></li>
				<li><a href="contact"> Contacto</a></li>
				<li>
					<a
						class=" bg-primary text-white px-2 transition-all duration-300 rounded-[8px] flex items-center gap-2 hover:bg-secondary hover:text-white"
						href="app/login"
					>
						Ingresar</a
					>
				</li>
			</ul>
		</nav>
	</div>
</header>

<slot />

<footer class=" bg-teal-600 mt-[80px] xl:mt-[150px] relative z-20 text-sm">
	<div class="container mx-auto px-0">
		<div class="flex flex-col xl:flex-row xl:gap-[100px] xl:py-8">
			<div
				class="w-full max-w-[400px] mx-auto my-10 text-center xl:text-left"
			>
				<a
					href="a"
					class="flex justify-center xl:justify-start mb-2 text-white"
				>
					<i class="ri-signal-tower-fill text-2xl flex">
						<h5 class="font-secondary flex-1 ml-2">TRES60</h5></i
					>
				</a>
				<p class="font-primary text-sm text-white">
					Software especializado en el control y administracion del
					inventario de tu empresa
				</p>
				<!-- socials -->
				<ul
					class="mt-4 text-white flex gap-[54px] justify-center xl:justify-start"
				>
					<li>
						<a href="a"> <i class="ri-facebook-fill"></i></a>
					</li>
					<li>
						<a href="a"> <i class="ri-instagram-fill"></i></a>
					</li>
					<li>
						<a href="a"> <i class="ri-twitter-fill"></i></a>
					</li>
				</ul>
			</div>
			<div
				class="flex-1 flex flex-col justify-center lg:flex-row text-center xl:text-left gap-12 lg:gap-[100px] xl:justify-end"
			>
				<div class="footer__item font-primary">
					<div class="h3 my-4 text-white font-extrabold text-base">
						Paginas
					</div>
					<ul class=" flex flex-col gap-2 mb-2">
						<li>
							<a href="contact" class="text-sm text-white"
								>Contacto</a
							>
						</li>
						<li>
							<a href="a" class="text-sm text-white"
								>Testimonios</a
							>
						</li>
						<li>
							<a href="a" class="text-sm text-white"
								>Actualizaciones</a
							>
						</li>
					</ul>
				</div>
				<div class="footer__item font-primary">
					<div class="h3 my-4 text-white text-base font-extrabold">
						Servicios
					</div>
					<ul class=" flex flex-col gap-2 mb-2">
						<li>
							<a href="a" class="text-sm text-white">Asesorias</a>
						</li>
						<li>
							<a href="a" class="text-sm text-white">Tutoriales</a
							>
						</li>
						<li>
							<a href="a" class="text-sm text-white">Ayuda</a>
						</li>
					</ul>
				</div>
				<div class="footer__item font-primary">
					<div class="h3 my-4 text-white text-base font-extrabold">
						Ubicacion
					</div>
					<ul class=" flex flex-col gap-2 mb-2">
						<li>
							<a href="a" class="text-sm text-white"
								>123 Calle Falsa, Piso 4</a
							>
						</li>
						<li>
							<a href="a" class="text-sm text-white"
								>Ciudad Imaginaria, XY</a
							>
						</li>
						<li>
							<a href="a" class="text-sm text-white"
								>País de Nunca Jamás</a
							>
						</li>
						<li>
							<a href="a" class="text-sm text-white"
								>Teléfono: +1 234 567 890</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>
