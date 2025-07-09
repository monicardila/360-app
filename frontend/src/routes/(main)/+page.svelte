<script>
	import fondoPrices from "../../assets/fondoPrices.jpg";
	import fondoBlanco from "../../assets/fondoBlanco.jpg";
	import { onMount } from "svelte";
	let isMobile = false;
	let activeSlide = 0;
	let activeIndex = null;

	//  --- container features
	const setActiveIndex = (i) => {
		activeIndex = i;
	};

	const features = [
		{
			title: "Caja registradora",
			description:
				"Mantén el control total de tus ventas con nuestra vista de caja registradora. Realiza transacciones rápidas y seguras mientras gestionas productos, precios y cantidades en tiempo real. Ideal para optimizar la experiencia de tus clientes y garantizar un flujo de caja eficiente. ",
			image: "https://i.pinimg.com/1200x/2e/ec/5e/2eec5e102196c0ffbf911358d71bb803.jpg",
		},

		{
			title: "Facturacion",
			description:
				"Simplifica la emisión de facturas con nuestro sistema ágil y personalizable. Genera facturas electrónicas en pocos clics, gestiona impuestos automáticamente y envía copias a tus clientes de forma inmediata. ¡Más tiempo para enfocarte en tu negocio, menos en el papeleo!",
			image: "https://i.pinimg.com/1200x/2e/ec/5e/2eec5e102196c0ffbf911358d71bb803.jpg",
		},
		{
			title: "Clientes",
			description:
				"Administra la información de tus clientes desde un solo lugar. Consulta historiales de compras, crea perfiles personalizados y mejora la relación con ellos mediante un manejo más organizado y eficiente de sus datos. ¡Convierte a tus clientes en tus mejores aliados!",
			image: "https://i.pinimg.com/1200x/2e/ec/5e/2eec5e102196c0ffbf911358d71bb803.jpg",
		},
		{
			title: "Proveedores",
			description:
				"Simplifica el proceso de abastecimiento con nuestra herramienta de gestión de órdenes a proveedores. Genera pedidos de forma automatizada, realiza seguimientos detallados y asegura que tu inventario esté siempre completo. ¡Sincronización perfecta para tu negocio!",
			image: "https://i.pinimg.com/1200x/2e/ec/5e/2eec5e102196c0ffbf911358d71bb803.jpg",
		},
		{
			title: "Reportes",
			description:
				"Obtén una visión completa de tu negocio con reportes detallados y gráficos interactivos. Analiza ventas, inventarios, ingresos y más. Transforma los datos en decisiones estratégicas que impulsen el crecimiento de tu empresa.",
			image: "https://i.pinimg.com/1200x/2e/ec/5e/2eec5e102196c0ffbf911358d71bb803.jpg",
		},
		{
			title: "Roles",
			description:
				"Administra todas tus sucursales desde un solo panel y controla quién accede a qué. Crea roles personalizados para empleados y delega responsabilidades de manera eficiente. Tu equipo estará siempre organizado y trabajando al máximo rendimiento.",
			image: "https://i.pinimg.com/1200x/2e/ec/5e/2eec5e102196c0ffbf911358d71bb803.jpg",
		},
		{
			title: "Contabilidad",
			description:
				"Lleva las cuentas claras con nuestro módulo de contabilidad. Automatiza el registro de ingresos y egresos, genera reportes financieros y cumple fácilmente con tus obligaciones fiscales. Más control, menos preocupaciones.",
			image: "https://i.pinimg.com/1200x/2e/ec/5e/2eec5e102196c0ffbf911358d71bb803.jpg",
		},
	];

	//  --- container slides
	const updateScreenSize = () => {
		isMobile = window.innerWidth <= 768;
	};

	onMount(() => {
		updateScreenSize();
		window.addEventListener("resize", updateScreenSize);

		return () => {
			window.removeEventListener("resize", updateScreenSize);
		};
	});

	const slides = [
		{
			icon: "ri-quill-pen-fill text-blue-500 text-4xl",
			title: "Plan  Gratuito",
			price: "Gratis",
			features: [
				"Crear productos",
				"Ver clientes",
				"Usar caja registradora",
				"Informe simple de ventas",
			],
			button: "Empieza aquí",
		},
		{
			icon: "ri-vip-crown-2-fill text-yellow-500 text-4xl",
			title: "Plan Premium",
			price: "$1.200.000",
			features: [
				"Todo lo del Plan Intermedio",
				"Generación de informes",
				"Información de los empleados",
				"Control de roles",
				"Información contable",
				"Manejo sucursales",
			],
			button: "¡Suscríbete ahora!",
		},
		{
			icon: "ri-bard-fill text-indigo-500 text-4xl",
			title: "Plan Avanzado",
			price: "$320.000",
			features: [
				"Todo lo del Plan Gratuito",
				"Crear proveedores",
				"Facturación",
				"Kartex",
			],
			button: "Actualiza tu plan",
		},
	];
	// example with 5 slide
	// activeSlide = 0, nextSlide = (0+1)%s R/ 1
	const nextSlide = () => {
		activeSlide = (activeSlide + 1) % slides.length;
	};
	// activeSlide = 1. prevSlide = (0-1+5)%5 R/ 4
	const prevSlide = () => {
		activeSlide = (activeSlide - 1 + slides.length) % slides.length;
	};
</script>

<body class="bg-[#F0F0F0]">
	<main class="max-w-[1920px] mx-auto bg-white overflow-hidden">
		<!-- imgMain -->
		<section
			class="fondoMain h-[640px] xl:h-[840px] bg-fondoMain bg-center bg-no-repeat bg-cover bg-fixed z-20 relative"
		>
			<div
				class="container mx-auto h-auto pt-16 flex justify-center xl:justify-start"
			>
				<!-- text -->
				<div
					class="imgMain__text w-[460px] flex flex-col mx-auto items-center text-center aspect-square shadow-xl rounded-md bg-teal-900 backdrop-blur-sm py-4 lg:pt-10"
					style="background-image: url('{fondoBlanco}')"
				>
					<p class="text-5xl mt-8 font-primary text-black font-bold">
						TRES60 tu <br /> aliado de <br /> confianza
					</p>
					<p class="mb-8 mt-4 font-secondary text-sm w-[250px]">
						Nuestro intuitivo sistema de gestión de inventario le
						ayuda a optimizar sus operaciones, reducir costos y
						tomar decisiones basadas en datos.
					</p>
					<a
						href="app/auth/login"
						class="btn btn-secondary mx-auto xl:mx-0 font-primary bg-accent"
					>
						Registrate
						<i class="ri-arrow-right-double-fill text-white"></i>
					</a>
				</div>
			</div>
		</section>
	</main>

	<!-- gif intro -->

	<!-- video con mensaje a la derecha -->
	<section
		class="bg-slate-100 p-4 xl:h-screen h-[780px] lg:[1000px] md:h-[950px] items-center justify-center mx-4"
	>
		<div
			class=" flex flex-col xl:flex-row items-center justify-center md:h-screen mx-4"
		>
			<div
				class="font-secondary text-lg flex flex-1 items-center justify-center mt-10 lg:mr-10 xl:max-w-lg xl:w-full"
			>
				<div>
					<h1
						class="font-secondary font-bold text-4xl text-left mt-4 mb-8 lg:mb-20 md:text-4xl"
					>
						Simplifica la Gestión y Aumenta tu Productividad
					</h1>
					<p class="text-sm md:text-lg">
						Bienvenido a TRES60, la plataforma diseñada para
						revolucionar la forma en que manejas tu negocio. Con
						TRES60, podrás centralizar todas las operaciones
						esenciales, desde el control de inventario hasta la
						gestión contable, en un solo lugar. Descubre cómo
						nuestra aplicación puede simplificar tus tareas diarias,
						automatizar procesos y brindarte un control total de tu
						negocio. Mira este video para conocer más...
					</p>
				</div>
			</div>
			<div
				class="  w-full p-2 rounded-lg shadow-xl m-10 max-w-3xl bg-slate-200 sm:p-4"
			>
				<div class="aspect-video">
					<iframe
						src="https://www.youtube.com/embed/jC_-06jd-TI"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						title="Video tutorial sobre cómo usar TRES60"
						class="w-full h-full"
					></iframe>
				</div>
			</div>
		</div>
	</section>

	<!-- texto publico objetivo solo texto,  -->
	<!-- ventana principales leer documentacion svelte -->
	<figure class="h-screen bg-slate-200">
		<div
			class="container mx-auto text-left items-center text-lg font-secondary mt-4 md:pt-10 pb-16"
		>
			<p class="pt-4 xl:mb-14 font-bold text-2xl md:text-4xl">
				Descubre mas...
			</p>
			<p class="mx-4 mt-4 xl:mt-10 text-sm md:text-lg">
				En TRES60, nuestro objetivo es claro: ayudarte a optimizar la
				gestión de tu negocio de manera eficiente y efectiva. Con
				nuestra plataforma, tendrás acceso a herramientas avanzadas que
				te permitirán supervisar cada aspecto de tu operación. Desde la
				gestión de ventas hasta el seguimiento del stock, pasando por la
				administración de roles de usuario y la generación automática de
				pedidos a proveedores, TRES60 te ofrece todo lo que necesitas
				para llevar tu negocio al siguiente nivel. Simplifica,
				automatiza y controla con TRES60.
			</p>
		</div>
		<!-- container__features -->

		<div
			class="container h-[350px] md:h-[450px] items-end mx-auto mt-18 flex text-lg xl:text-2xl justify-center overflow-hidden"
		>
			<!-- Buttons -->
			<div
				class=" h-full bg-blue-50 rounded-lg border-teal-600 border-r-4 py-4"
			>
				{#each features as item, i}
					<div class="">
						<button
							on:click={() => {
								setActiveIndex(i);
							}}
							class="text-left text-teal-900 font-medium hover:bg-sky-800 hover:text-white md:text-lg h-10 w-full transform trasnsition-transform duration-300 hover:scale-105 hover:rounded-[8px] text-sm px-2 md:px-10"
							>{item.title}</button
						>
					</div>
				{/each}
			</div>
			<!-- Description -->
			<div
				class="left__container flex-col flex w-[60%] h-full bg-white p-3 md:p-10 rounded-lg"
			>
				{#if activeIndex !== null}
					<div class="">
						<p class=" text-sky-800 font-semibold">
							{features[activeIndex].title}
						</p>
						<p class="text-sm py-2">
							{features[activeIndex].description}
						</p>
						<img
							class=" hidden lg:block h-60 m-auto py-4"
							src={features[activeIndex].image}
							alt="img"
						/>
					</div>
				{:else}
					<div class="">
						<p
							class=" text-lg md:text-2xl text-sky-700 font-semibold"
						>
							Conoce mas de nuestras soluciones
						</p>
						<div class=" text-sm md:text-lg pt-4">
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Ratione explicabo beatae ut dignissimos quo
							labore dicta nostrum, vero quidem cupiditate neque a
							quaerat magnam itaque, consectetur, maiores
							doloremque magni ipsam.
						</div>
					</div>
				{/if}
			</div>
		</div>
	</figure>

	<!-- vista mobil -->

	<!-- transform: -->
	<!-- activeSlide = 0 {-0 * 100}% → 0% -->
	<!-- activeSlide = 1 {-1 * 100}% → -100% -->
	<!-- activeSlide = 2 {-2 * 100}% → -200% -->
	{#if isMobile}
		<div class="relative w-full max-w-5xl mx-auto mt-10" id="subscription">
			<!-- Slides container -->
			<div class="flex overflow-hidden relative">
				{#each slides as slide, i}
					<div
						class="flex-shrink-0 w-full transition-transform duration-500"
						style="transform: translateX({-activeSlide * 100}%)"
					>
						<div
							class="p-10 m-4 bg-white rounded-lg shadow-lg text-center"
						>
							<i class={`pl-1 ${slide.icon}`}></i>
							<h4 class="mt-6">
								{slide.title}
							</h4>
							<p class="text-gray-500 text-sm mt-2">
								{slide.price}
							</p>
							<ul class="mt-6 text-sm space-y-2 text-left px-10">
								{#each slide.features as feature}
									<li>{feature}</li>
								{/each}
							</ul>
							<button
								class="mt-8 bg-teal-400 text-white rounded-full px-6 py-3 font-semibold"
							>
								{slide.button}
							</button>
						</div>
					</div>
				{/each}
			</div>

			<!-- Navigation buttons -->
			<button
				on:click={prevSlide}
				class="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg"
			>
				<i class="ri-arrow-left-wide-line"></i>
			</button>
			<button
				on:click={nextSlide}
				class="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg"
			>
				<i class="ri-arrow-right-wide-line"></i>
			</button>
		</div>
	{:else}
		<!-- planes de pago, tres contenedores NORMAL -->

		<div class="relative h-screen bg-slate-100 z-0" id="subscription">
			<div
				class="absolute inset-0 w-full h-96 z-0 bg-no-repeat bg-cover"
				style="background-image: url('{fondoPrices}')"
			></div>
			<!-- Contenedor principal para los planes -->
			<div class="relative z-10 overflow-hidden">
				<div>
					<p
						class="justify-center flex pt-2 text-slate-500 font-semibold md:text-3xl lg:text-5xl"
					>
						Una solución<br /> para cada necesidad
					</p>
					<p
						class="  hidden justify-center xl:flex pt-8 md:pt-2 text-white text-sm lg:text-2xl md:text-black xl:text-neutral-400 font-semibold"
					>
						Selecciona el plan que potencia tu productividad
					</p>
				</div>

				<div class="flex justify-center items-end z-10 md:pt-6">
					<div
						class="w-96 h-[600px] py-8 lg:p-10 m-2 rounded-lg text-center shadow-lg bg-white"
					>
						<div class="">
							<i class="ri-quill-pen-fill text-blue-500 text-4xl"
							></i>
							<h4 class="mt-6">Plan <strong>Gratuito</strong></h4>
							<p class="text-gray-500 text-sm">Mes de prueba</p>
							<p class="text-lg mt-6 font-semibold">Gratis</p>
						</div>
						<div class=" text-sm mt-12">
							<ul class="mt-4 space-y-2 text-left px-6 lg:px-10">
								<li>Crear productos</li>
								<li>Ver clientes</li>
								<li>Usar caja registradora</li>
								<li>Informe simple de ventas</li>
							</ul>
						</div>
						<button
							class=" rounded-full bg-blue-500 py-4 px-4 xl:px-10 text-base xl:text-lg text-white font-bold mt-20"
							>Empieza aqui</button
						>
						<p class="text-gray-400 text-sm mt-4">
							Leer especificacion <a
								href="/contact"
								class=" text-yellow-600 text-sm">Aqui</a
							>
						</p>
					</div>
					<div
						class="w-96 h-[640px] py-8 lg:p-10 m-2 rounded-lg text-center shadow-lg bg-white border-y-4 border-y-yellow-500"
					>
						<div class="">
							<i
								class="ri-vip-crown-2-fill text-yellow-500 text-4xl"
							></i>
							<h4 class="mt-6">Plan <strong>Premium</strong></h4>
							<p class="text-gray-500 text-sm">Mensualidad</p>
							<p class="text-lg mt-6 font-semibold">$1.200.000</p>
						</div>
						<div class=" text-sm mt-12">
							<ul class=" mt-4 space-y-2 text-left px-6 lg:px-10">
								<li>Todo lo del Plan Intermedio</li>
								<li>Generacion de informes</li>
								<li>Información de los empleados</li>
								<li>Control de roles</li>
								<li>Información contable</li>
								<li>Manejo sucursales</li>
							</ul>
						</div>
						<button
							class=" rounded-full bg-yellow-500 py-4 px-4 xl:px-10 text-base xl:text-lg text-white font-bold mt-8"
							>Suscribete ahora!</button
						>
						<p class="text-gray-400 text-sm mt-4">
							Leer especificacion <a
								href="/contact"
								class=" text-yellow-600 text-sm">Aqui</a
							>
						</p>
					</div>
					<div
						class="w-96 h-[600px] py-8 lg:p-10 m-2 rounded-lg text-center shadow-lg bg-white"
					>
						<div class="">
							<i class="ri-bard-fill text-indigo-500 text-4xl"
							></i>
							<h4 class="mt-6">Plan <strong>Avanzado</strong></h4>
							<p class="text-gray-500 text-sm">Mensualidad</p>
							<p class="text-lg mt-6 font-semibold">$320.000</p>
						</div>
						<div class=" text-sm mt-12">
							<ul class="mt-4 space-y-2 text-left px-6 lg:px-10">
								<li>Todo lo del Plan Gratuito</li>
								<li>Crear proveedores</li>
								<li>Facturación</li>
								<li>Kartex</li>
							</ul>
						</div>
						<button
							class=" rounded-full bg-indigo-500 py-4 px-4 xl:px-10 text-base xl:text-lg text-white font-bold mt-20"
							>Actualiza tu plan</button
						>
						<p class="text-gray-400 text-sm mt-4">
							Leer especificacion <a
								href="/contact"
								class=" text-yellow-600 text-sm">Aqui</a
							>
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<!-- testimonials -->
	<div class=""></div>
</body>
