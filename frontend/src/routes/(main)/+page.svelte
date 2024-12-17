<body class="bg-[#F0F0F0]">
	<main class="max-w-[1920px] mx-auto bg-white overflow-hidden">
		<!-- imgMain -->
		<section
			class="fondoMain h-[640px] xl:h-[840px] bg-fondoMain bg-center bg-no-repeat bg-cover bg-fixed z-20 relative"
		>
			<div
				class="container mx-auto h-full flex items-center justify-center xl:justify-start"
			>
				<!-- text -->
				<div
					class="imgMain__text w-[567px] flex flex-col mx-auto items-center text-center aspect-square shadow-xl rounded-md bg-transparent backdrop-blur-sm py-4 lg:pt-8"
				>
					<h1 class="h1 mt-8 font-primary text-black font-extrabold">
						TRES60 tu <br /> aliado de <br /> confianza
					</h1>
					<p class="mb-8 mt-4 font-secondary w-[400px]">
						Nuestro intuitivo sistema de gestión de inventario le
						ayuda a optimizar sus operaciones, reducir costos y
						tomar decisiones basadas en datos.
					</p>
					<a
						href="app/login"
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
						src="https://www.youtube.com/embed/dQw4w9WgXcQ"
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
			class="container mx-auto text-left items-center text-lg font-secondary pt-10"
		>
			<h2 class="py-4 text-4xl xl:mb-14 font-bold">Descubre mas...</h2>
			<p class="mx-4 mt-10 text-sm md:text-lg">
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
		<!-- container__svelt -->
		<div
			class="container rounded-lg w-[70%] h-[200px] lg:h-[350px] items-center mx-auto mt-20 flex text-lg xl:text-2xl"
		>
			<div
				class="left__container h-full flex-col flex w-[30%] border rounded-br-3xl rounded-tl-3xl bg-fuchsia-200 mt-12"
			>
				<button
					class="hover:bg-cyan-500 h-20 transform trasnsition-transform duration-300 hover:scale-110 hover:rounded-[8px] hover:font-bold"
					>Caja registradora</button
				>
				<button
					class="hover:bg-sky-300 h-20 transform trasnsition-transform duration-300 hover:scale-110 hover:rounded-[8px] hover:font-bold"
					>Productos</button
				>
				<button
					class="hover:bg-blue-300 h-20 transform trasnsition-transform duration-300 hover:scale-110 hover:rounded-[8px] hover:font-bold"
					>Clientes</button
				>
				<button
					class="hover:bg-indigo-300 h-20 transform trasnsition-transform duration-300 hover:scale-110 hover:rounded-[8px] hover:font-bold"
					>Proveedores</button
				>
				<button
					class="hover:bg-violet-300 h-20 transform trasnsition-transform duration-300 hover:scale-110 hover:rounded-[8px] hover:font-bold"
					>Reportes</button
				>
				<button
					class="hover:bg-purple-300 h-20 transform trasnsition-transform duration-300 hover:scale-110 hover:rounded-[8px] hover:font-bold"
					>Informes</button
				>
			</div>
			<div
				class="rigth__container flex-1 w-full border h-full bg-fuchsia-200 rounded-tl-3xl rounded-br-3xl"
			>
				descrition
			</div>
		</div>
	</figure>

	<!-- referentes, deslizante hacia los lados con comentarios sin img -->

	<!-- planes de pago, tres contenedores  -->
	<div class="planes__pago h-screen bg-slate-50 pt-44" id="subscription">
		<div
			class="container mx-auto flex lg:flex-row justify-between items-center"
		>
			<div
				class="w-full lg:max-w-3xl bg-slate-100 shadow-lg py-10 mx-auto px-4"
			>
				<h2
					class="text-4xl lg:text-6xl text-secondary text-center font-bold"
				>
					PLANES DE PAGO
				</h2>
				<br />
				<table
					class="mt-10 text-sm md:text-xl lg:text-xl w-full table-fixed"
				>
					<thead>
						<tr class="text-primary">
							<th class="w-2">Funciona</th>
							<th class="w-2 md:text-center text-right">Bronce</th
							>
							<th class="w-2 md:text-center text-right">Plata</th>
							<th class="w-2 md:text-center text-right"
								>Diamante</th
							>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="h-16">Caja registradora</td>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
						</tr>
						<tr>
							<td>Productos</td>
							<td class="text-left pl-20">
								<i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
						</tr>
						<tr>
							<td>Clientes</td>
							<td class="text-left pl-20"
								><i
									class="ri-close-large-fill text-red-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
						</tr>
						<tr>
							<td>Proveedores</td>
							<td class="text-left pl-20"
								><i
									class="ri-close-large-fill text-red-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
						</tr>
						<tr>
							<td>Reportes</td>
							<td class="text-left pl-20"
								><i
									class="ri-close-large-fill text-red-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-close-large-fill text-red-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
						</tr>
						<tr>
							<td>Informes</td>
							<td class="text-left pl-20"
								><i
									class="ri-close-large-fill text-red-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-close-large-fill text-red-600 font-bold"
								></i></td
							>
							<td class="text-left pl-20"
								><i
									class="ri-check-line text-green-600 font-bold"
								></i></td
							>
						</tr>
						<tr class="text-primary border-t-2">
							<td></td>
							<td class=" mr-30 pl-20">100.000</td>
							<td class=" mr-30 pl-20">200.000</td>
							<td class=" mr-30 pl-20">300.000</td>
						</tr>
					</tbody>
				</table>
				<div class="flex justify-end text-lg">
					<button class="mt-10 btn btn-primary">Adquirir plan</button>
				</div>
			</div>
		</div>
	</div>
	<!-- testimonials -->

	<section class="testimonials mt-[80px] xl:mt[200px] relative z-20">
		<div
			class="testimonial__bg container mx-auto bg-accent rounded-[70px] px-6"
		>
			<!-- slider -->
			<div class="w-full">
				<div class="testimonial__slider swiper h-[400px]">
					<div class="swiper-wrapper">
						<!-- slides -->
						<div class="swiper-slide">
							<!-- item -->
							<div
								class="testimonial__item w-fuill max-w-[370px] h-[340px] bg-white"
							>
								item
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
