<script>
	import { createForm } from "svelte-forms-lib";
	import Modal from "sv-bootstrap-modal";

	let inProcess = false;
	let isOpen = false;
	let message = 'Procesando envio de contacto...';

    const jq = window.$;

    const services = [
        { 
            value: "Revistas",
            show: true,
            img: "/assets/img/servicios/magazine.jpg",
            description: "Para la cotización se toman los siguientes puntos: Idioma origen, idioma meta, número de palabras, estilo, tiempo de entrega y formato."
        },
        { 
            value: "Libros",
            show: true,
            img: "/assets/img/servicios/books.jpg",
            description: "Para la cotización se toman los siguientes puntos: Idioma origen, idioma meta, número de palabras, estilo, tiempo de entrega y formato."
        },
        { 
            value: "Artículos",
            show: true,
            img: "/assets/img/servicios/article.jpg",
            description: "Para la cotización se toman los siguientes puntos: Idioma origen, idioma meta, número de palabras, estilo, tiempo de entrega y formato."
        },
        { 
            value: "Actas de divorcio",
            show: true,
            img: "/assets/img/servicios/divorce.jpg",
            description: "Para la cotización se toman en cuenta los siguientes puntos: Idioma origen, idioma meta, tipo de documento, tiempo de entrega y apostillado."
        },
        { 
            value: "Actas de nacimiento",
            show: true,
            img: "/assets/img/servicios/birth.jpg",
            description: "Para la cotización se toman en cuenta los siguientes puntos: Idioma origen, idioma meta, tipo de documento, tiempo de entrega y apostillado."
        },
        { 
            value: "Cartas de titulación",
            show: true,
            img: "/assets/img/servicios/academic-title.jpg",
            description: "Para la cotización se toman en cuenta los siguientes puntos: Idioma origen, idioma meta, tipo de documento, tiempo de entrega y apostillado."
        },
        { 
            value: "Cartas de naturalización",
            show: true,
            img: "/assets/img/servicios/naturalization.jpg",
            description: "Para la cotización se toman en cuenta los siguientes puntos: Idioma origen, idioma meta, tipo de documento, tiempo de entrega y apostillado."
        },
        { 
            value: "Cartas de antecedentes penales",
            show: true,
            img: "/assets/img/servicios/penal.jpg",
            description: "Para la cotización se toman en cuenta los siguientes puntos: Idioma origen, idioma meta, tipo de documento, tiempo de entrega y apostillado."
        },
        { 
            value: "Libretos y guiones audiovisuales",
            show: true,
            img: "/assets/img/servicios/cinematography.jpg",
            description: "Para la cotización se toman los siguientes puntos: Idioma origen, idioma meta, número de palabras, estilo, tiempo de entrega y formato."
        },
        { 
            value: "Otro",
            show: false
        }
    ];

    const idiomasDestino = [
        {
            value: "Inglés"
        },
        {
            value: "Portugués"
        },
        {
            value: "Japonés"
        },
        {
            value: "Español"
        },
        {
            value: "Coreano"
        }
    ];

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {},
		validate: (values) => {
            console.log(values);
			let errors = {};

			// Name
			if(!values.name) {
				errors["name"] = "Nombre es necesario.";
			}

			// Cellphone
			if(!values.cellphone) {
				errors["cellphone"] = "Número de celular es necesario.";
			}

			// Email
			if (!values.email) {
				errors["email"] = "Correo electrónico es necesario.";
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
				errors["email"] = "Correo electrónico invalido.";
			}

			// Servicio
			if(values.service == '0') {
				errors["service"] = "Servicio es necesario.";
			}

            // Idioma origen
            if(values.originLanguage == '0') {
				errors["originLanguage"] = "Lenguaje origen es necesario.";
			}

            // Idioma destino
            if(!values.destIngles && !values.destPortugues && !values.destJapones && !values.destEspanol && !values.destCoreano) {
                errors["languageToTraduct"] = "Lenguaje destino es necesario.";
            }

			return errors;
		},
		onSubmit: async (values) => {
			await execute(values);
		},
	});


	async function execute(values) {
		message = 'Procesando envio de contacto...';
		inProcess = true;
		isOpen = true;
		try {
			const returnValue = await fetch('/email', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            });
			const response = await returnValue.json();
			message = response.message;
		} catch (error) {
			console.error(error);
		}
		inProcess = false;
	}

    jq(document).ready(function () {
        jq("#inputName").keypress(function (e) {
            var inputValue = e.charCode;
            if(!((inputValue > 64 && inputValue < 91) || (inputValue > 96 && inputValue < 123)||(inputValue==32) || (inputValue==0))){
                e.preventDefault();
            }
        });

        jq("#inputCellphone").keypress(function (e) {
            var inputValue = e.charCode;
            if(!((inputValue > 47 && inputValue < 58) ||(inputValue==32) || (inputValue==0))){
                e.preventDefault();
            }
        });
    });
</script>


<main id="page-top">
	<!-- Barra de navegacion -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div class="container">
            <!-- titulo pagina -->
            <a class="navbar-brand" href="#page-top">TRADUNL</a>
            <!-- Icono menu cuando es responsivo -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fas fa-bars ms-1"></i>
            </button>
            <!-- Opciones del menu -->
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                    <li class="nav-item"><a class="nav-link" href="#nosotros">Nosotros</a></li>
                    <li class="nav-item"><a class="nav-link" href="#servicios">Servicios</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contacto</a></li>
                </ul>
            </div>
        </div>
    </nav>

	<!-- Masthead-->
    <header class="masthead">
        <div class="container">
            <div class="masthead-subheading">¡Bienvenidos a TRADUNL!</div>
            <div class="masthead-heading text-uppercase">¿Necesitas algún traductor?</div>
            <a class="btn btn-primary btn-xl text-uppercase" href="#servicios">Servicios</a>
        </div>
    </header>

	<!-- Nosotros-->
    <section class="page-section" id="nosotros">
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Nosotros</h2>
                <h3 class="section-subheading text-muted">Somos traductores profesionales ubicados en el estado de Nuevo León.</h3>
            </div>
            <div class="row text-center">
                <div class="col-md-6">
                    <span class="fa-stack fa-4x">
                        <i class="fas fa-circle fa-stack-2x iconos-nosotros"></i>
                        <i class="fas fa-language fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 class="my-3">Profesionales</h4>
                    <p class="text-muted">Contamos con profesionales experimentados en traducciones jurídicas, técnicas, audiovisuales y académicas</p>
                </div>
                <div class="col-md-6">
                    <span class="fa-stack fa-4x">
                        <i class="fas fa-circle fa-stack-2x iconos-nosotros"></i>
                        <i class="fas fa-clipboard-check fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 class="my-3">Confiables</h4>
                    <p class="text-muted">Cada proyecto se hace con profesionalidad, los textos traducidos son revisados por editores experimentados y los textos certificados son autorizados por un perito traductor jurídico en Nuevo León</p>
                </div>
            </div>
        </div>
    </section>

	<!-- Servicios-->
    <section class="page-section bg-light" id="servicios">
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Servicios</h2>
                <h4 class="section-subheading text-muted">Te ayudamos a traducir</h4>
                <h3 class="section-subheading text-muted"><b>(Los textos legales incluyen sello de perito certificado)</b></h3>
            </div>
            <div class="row">
                {#each services as service}
                    {#if service.show}
                        <div class="col-lg-4 col-sm-6 mb-4">
                            <!-- Servicio item 1-->
                            <div class="servicio-item">
                                <div class="servicio-link">
                                    <img class="img-fluid" src={service.img} alt={service.value} />
                                </div>
                                <div class="servicio-caption">
                                    <div class="servicio-caption-heading">{service.value}</div>
                                    <div class="servicio-caption-subheading text-muted">{service.description}</div>
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    </section>

	<!-- Contactanos -->
    <section class="page-section" id="contact">
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Contáctanos</h2>
            </div>

            <div class="row justify-content-center mb-5">
                <div class="col-md-6">
                    <img class="img-fluid" src="/assets/img/servicios/contacto.jpg" alt="contacto" />
                </div>
                <div class="col-md-6 my-auto">
                    <div class="text-center">
                        <a class="btn btn-dark btn-social btn-xl" href="https://www.facebook.com/TRADUNL" target="_blank">
                            <i class="fab fa-facebook-square fa-6x"></i></a>
                        <a class="btn btn-dark btn-social btn-xl" href="https://wa.me/message/VQ34XFNQTPHCE1" target="_blank">
                            <i class="fab fa-whatsapp fa-6x"></i></a>
                    </div>
                </div>
            </div>

            <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                <h3 class="section-heading-2 text-white text-center" >Mándanos tus datos y nos contactaremos lo más pronto posible</h3>
                <div class="row justify-content-center mb-5">
                    <div class="col-md-6 contacto-correo">
                        <div class="form-group">
                            <!-- Input nombre-->
                            <input type="text" class="form-control" id="inputName" name="name" bind:value={$form.name} on:change={handleChange} maxlength="40" placeholder="Nombre">
                            {#if $errors.name}
                                <span class="text-danger">{$errors.name}</span>
                            {/if}
                        </div>
                        <div class="form-group">
                            <!-- Input correo electronico-->
                            <input type="email" class="form-control" id="inputEmail" name="email" bind:value={$form.email} on:change={handleChange} maxlength="60" placeholder="Correo electrónico">
                            {#if $errors.email}
                                <span class="text-danger">{$errors.email}</span>
                            {/if}
                        </div>
                        <div class="form-group">
                            <!-- Input numero de telefono-->
                            <input type="text" class="form-control" id="inputCellphone" name="cellphone" bind:value={$form.cellphone} on:change={handleChange} maxlength="10" placeholder="Número de celular">
                            {#if $errors.cellphone}
                                <span class="text-danger">{$errors.cellphone}</span>
                            {/if}
                        </div>
                        <div class="form-group">
                            <!-- Lista de servicios-->
                            <select class="form-select" name="service" id="inputService" bind:value={$form.service} on:change={handleChange}>
                                <option value="0" selected>Selecciona un servicio de su interés</option>
                                {#each services as service}
                                    <option value={service.value}>{service.value}</option>
                                {/each}
                            </select>
                            {#if $errors.service}
                                <span class="text-danger">{$errors.service}</span>
                            {/if}
                        </div>
                        <div class="form-group">
                            <!-- Lista de idioma origen-->
                            <select class="form-select" name="originLanguage" id="input-idioma-origen" bind:value={$form.originLanguage} on:change={handleChange}>
                                <option value="0" selected>Selecciona el idioma origen</option>
                                {#each idiomasDestino as idioma}
                                    <option value={idioma.value}>{idioma.value}</option>
                                {/each}
                            </select>
                            {#if $errors.originLanguage}
                                <span class="text-danger">{$errors.originLanguage}</span>
                            {/if}
                        </div>
                    </div>
                    <div class="col-md-6 contacto-correo">
                        <!-- Idiomas destino -->
                        <div class="form-group-check">
                            <legend id="legend-idioma-destino" class="">Selecciona los idiomas a traducir</legend>
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="" on:change={handleChange}
                                        name="destIngles" id="chkDestIngles">
                                    Inglés
                                </li>
                                <li class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="" on:change={handleChange}
                                        name="destPortugues" id="chkDestPortugues">
                                    Portugués
                                </li>
                                <li class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="" on:change={handleChange}
                                        name="destJapones" id="chkDestJapones">
                                    Japonés
                                </li>
                                <li class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="" on:change={handleChange}
                                        name="destEspanol" id="chkDestEspañol">
                                    Español
                                </li>
                                <li class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="" on:change={handleChange}
                                        name="destCoreano" id="chkDestCoreano">
                                    Coreano
                                </li>
                            </ul>
                            {#if $errors.languageToTraduct}
                                <span class="text-danger">{$errors.languageToTraduct}</span>
                            {/if}
                        </div>

                        <div class="form-group form-group-textarea mb-md-0">
                            <!-- Message input-->
                            <textarea class="form-control" id="description" placeholder="Escribe tu necesidad"
                                bind:value={$form.description} on:change={handleChange}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <!-- Boton enviar datos-->
                        <div class="form-button text-center">
                            <button type="button" class="btn btn-primary btn-xl text-uppercase" on:click={handleSubmit} onclick="this.blur();">Enviar datos</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>

    <!-- Footer-->
    <footer class="footer py-4">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 my-3 my-lg-2">Copyright &copy; Tradunl 2021</div>
            </div>
        </div>
    </footer>

	<!-- Modal -->
	<Modal bind:open={isOpen} dialogClasses="modal-dialog-centered" ignoreBackdrop="true">
		<div class="modal-header">
			<h5 class="modal-title" id="staticBackdropLabel">Envío de contacto</h5>
		</div>
		<div class="modal-body">
			{ message }
		</div>
		<div class="modal-footer">
			{#if !inProcess}
				<button type="button" class="btn btn-primary" on:click={() => { isOpen = false; }}>Close</button>
			{/if}
			{#if inProcess}
				<button class="btn btn-primary" type="button" disabled>
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					Loading...
				</button>
			{/if}
		</div>
	</Modal>
</main>