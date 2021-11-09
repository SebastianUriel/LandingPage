<script>
	import { createForm } from "svelte-forms-lib";
	import Modal from "sv-bootstrap-modal";

	let inProcess = false;
	let isOpen = false;
	let message = 'Procesando envio de contacto...';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {},
		validate: (values) => {
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
			if(!values.service) {
				errors["service"] = "Servicio es necesario.";
			}

			return errors;
		},
		onSubmit: async (values) => {
			await execute();
		},
	});


	async function execute() {
		message = 'Procesando envio de contacto...';
		inProcess = true;
		isOpen = true;
		try {
			const returnValue = await fetch('/email', { method: 'POST' });
			const response = await returnValue.json();
			message = response.message;
		} catch (error) {
			console.error(error);
		}
		inProcess = false;
	}
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
            <div class="masthead-subheading">Bienvenidos a TRADUNL!</div>
            <div class="masthead-heading text-uppercase">¿Necesitas algún traductor?</div>
            <a class="btn btn-primary btn-xl text-uppercase" href="#servicios">Servicios</a>
        </div>
    </header>

	<!-- Nosotros-->
    <section class="page-section" id="nosotros">
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Nosotros</h2>
                <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
            </div>
            <div class="row text-center">
                <div class="col-md-4">
                    <span class="fa-stack fa-4x">
                        <i class="fas fa-circle fa-stack-2x iconos-nosotros"></i>
                        <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 class="my-3">E-Commerce</h4>
                    <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                </div>
                <div class="col-md-4">
                    <span class="fa-stack fa-4x">
                        <i class="fas fa-circle fa-stack-2x iconos-nosotros"></i>
                        <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 class="my-3">Responsive Design</h4>
                    <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                </div>
                <div class="col-md-4">
                    <span class="fa-stack fa-4x">
                        <i class="fas fa-circle fa-stack-2x iconos-nosotros"></i>
                        <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 class="my-3">Web Security</h4>
                    <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                </div>
            </div>
        </div>
    </section>

	<!-- Servicios-->
    <section class="page-section bg-light" id="servicios">
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Servicios</h2>
                <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
            </div>
            <div class="row">
                <div class="col-lg-4 col-sm-6 mb-4">
                    <!-- Servicio item 1-->
                    <div class="servicio-item">
                        <a class="servicio-link" data-bs-toggle="modal" href="#servicioModal1">
                            <div class="servicio-hover">
                                <div class="servicio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="/assets/img/servicios/1.jpg" alt="..." />
                        </a>
                        <div class="servicio-caption">
                            <div class="servicio-caption-heading">Servicio 1</div>
                            <div class="servicio-caption-subheading text-muted">Illustration</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6 mb-4">
                    <!-- Servicio item 2-->
                    <div class="servicio-item">
                        <a class="servicio-link" data-bs-toggle="modal" href="#servicioModal2">
                            <div class="servicio-hover">
                                <div class="servicio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="/assets/img/servicios/2.jpg" alt="..." />
                        </a>
                        <div class="servicio-caption">
                            <div class="servicio-caption-heading">Servicio 2</div>
                            <div class="servicio-caption-subheading text-muted">Graphic Design</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6 mb-4">
                    <!-- Servicio item 3-->
                    <div class="servicio-item">
                        <a class="servicio-link" data-bs-toggle="modal" href="#servicioModal3">
                            <div class="servicio-hover">
                                <div class="servicio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="/assets/img/servicios/3.jpg" alt="..." />
                        </a>
                        <div class="servicio-caption">
                            <div class="servicio-caption-heading">Servicio 3</div>
                            <div class="servicio-caption-subheading text-muted">Graphic Design</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6 mb-4 mb-lg-0">
                    <!-- Servicio item 4-->
                    <div class="servicio-item">
                        <a class="servicio-link" data-bs-toggle="modal" href="#servicioModal4">
                            <div class="servicio-hover">
                                <div class="servicio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="/assets/img/servicios/4.jpg" alt="..." />
                        </a>
                        <div class="servicio-caption">
                            <div class="servicio-caption-heading">Servicio 4</div>
                            <div class="servicio-caption-subheading text-muted">Branding</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6 mb-4 mb-sm-0">
                    <!-- servicio item 5-->
                    <div class="servicio-item">
                        <a class="servicio-link" data-bs-toggle="modal" href="#servicioModal5">
                            <div class="servicio-hover">
                                <div class="servicio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="/assets/img/servicios/5.jpg" alt="..." />
                        </a>
                        <div class="servicio-caption">
                            <div class="servicio-caption-heading">Servicio 5</div>
                            <div class="servicio-caption-subheading text-muted">Website Design</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <!-- servicio item 6-->
                    <div class="servicio-item">
                        <a class="servicio-link" data-bs-toggle="modal" href="#servicioModal6">
                            <div class="servicio-hover">
                                <div class="servicio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="/assets/img/servicios/6.jpg" alt="..." />
                        </a>
                        <div class="servicio-caption">
                            <div class="servicio-caption-heading">Servicio 6</div>
                            <div class="servicio-caption-subheading text-muted">Photography</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

	<!-- Contactanos -->
    <section class="page-section" id="contact">
        <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Contactanos</h2>
                <h3 class="section-subheading text-muted">Nos contactaremos lo más pronto posible.</h3>
            </div>
            <!-- * * * * * * * * * * * * * * *-->
            <!-- * * SB Forms Contact Form * *-->
            <!-- * * * * * * * * * * * * * * *-->
            <!-- This form is pre-integrated with SB Forms.-->
            <!-- To make this form functional, sign up at-->
            <!-- https://startbootstrap.com/solution/contact-forms-->
            <!-- to get an API token!-->
            <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                <div class="row justify-content-center mb-5">
                    <div class="col-md-6">
                        <div class="form-group">
                            <!-- Input nombre-->
                            <input class="form-control" id="name" type="text" placeholder="Tu nombre *" data-sb-validations="required" />
                            <div class="invalid-feedback" data-sb-feedback="name:required">Se requiere un nombre.</div>
                        </div>
                        <div class="form-group">
                            <!-- Input correo electronico-->
                            <input class="form-control" id="email" type="email" placeholder="Tu correo electrónico *" data-sb-validations="required,email" />
                            <div class="invalid-feedback" data-sb-feedback="email:required">Se requiere un email.</div>
                            <div class="invalid-feedback" data-sb-feedback="email:email">El correo no es válido.</div>
                        </div>
                        <div class="form-group">
                            <!-- Input numero de telefono-->
                            <input class="form-control" id="phone" type="tel" placeholder="Su teléfono *" data-sb-validations="required" />
                            <div class="invalid-feedback" data-sb-feedback="phone:required">Se requiere un número de teléfono.</div>
                        </div>
                        <div class="form-group mb-md-0">
                            <!-- Lista de servicios-->
                            <select name="list-servicios" class="form-control" id="lista-servicios" data-sb-validations="required">
                                <option value="" selected disabled>Selecciona un servicio</option>
                                <option value="value1">Servicio 1</option>
                                <option value="value2">Servicio 2</option>
                                <option value="value3">Servicio 3</option>
                            </select>
                            <div class="invalid-feedback" data-sb-feedback="list-servicios:required">Seleccione un servicio.</div>
                        </div>
                    </div>
                </div>
                <!-- Submit success message-->
                <!---->
                <!-- This is what your users will see when the form-->
                <!-- has successfully submitted-->
                <div class="d-none" id="submitSuccessMessage">
                    <div class="text-center text-white mb-3">
                        <div class="fw-bolder">Envío de formulario exitoso!</div>
                        To activate this form, sign up at
                        <br />
                        <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                    </div>
                </div>
                <!-- Submit error message-->
                <!---->
                <!-- This is what your users will see when there is-->
                <!-- an error submitting the form-->
                <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">¡Error al enviar los datos!</div></div>
                <!-- Submit Button-->
                <div class="text-center"><button class="btn btn-primary btn-xl text-uppercase" id="submitButton" type="submit">Enviar datos</button></div>
            </form>
        </div>
    </section>

    <!-- Footer-->
    <footer class="footer py-4">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 my-3 my-lg-2 ">
                    <a class="btn btn-dark btn-social mx-2" href="https://www.facebook.com/TRADUNL" target="_blank"><i class="fab fa-facebook-f"></i></a>
                </div>
                <div class="col-lg-12 my-3 my-lg-2">Copyright &copy; Tradunl 2021</div>
            </div>
        </div>
    </footer>

	<!-- Servicios Modals-->
        <!-- Servicio item 1 modal popup-->
        <div class="servicio-modal modal fade" id="servicioModal1" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="/assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <!-- Project details-->
                                    <h2 class="text-uppercase">Servicio 1</h2>
                                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                    <img class="img-fluid d-block mx-auto" src="/assets/img/servicios/1.jpg" alt="..." />
                                    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Client:</strong>
                                            Threads
                                        </li>
                                        <li>
                                            <strong>Category:</strong>
                                            Illustration
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-times me-1"></i>
                                        Cerrar Servicio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Servicio item 2 modal popup-->
        <div class="servicio-modal modal fade" id="servicioModal2" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="/assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <!-- Project details-->
                                    <h2 class="text-uppercase">Servicio 2</h2>
                                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                    <img class="img-fluid d-block mx-auto" src="/assets/img/servicios/2.jpg" alt="..." />
                                    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Client:</strong>
                                            Explore
                                        </li>
                                        <li>
                                            <strong>Category:</strong>
                                            Graphic Design
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-times me-1"></i>
                                        Cerrar Servicio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Servicio item 3 modal popup-->
        <div class="servicio-modal modal fade" id="servicioModal3" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="/assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <!-- Project details-->
                                    <h2 class="text-uppercase">Servicio 3</h2>
                                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                    <img class="img-fluid d-block mx-auto" src="/assets/img/servicios/3.jpg" alt="..." />
                                    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Client:</strong>
                                            Finish
                                        </li>
                                        <li>
                                            <strong>Category:</strong>
                                            Identity
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-times me-1"></i>
                                        Cerrar Servicio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Servicio item 4 modal popup-->
        <div class="servicio-modal modal fade" id="servicioModal4" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="/assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <!-- Project details-->
                                    <h2 class="text-uppercase">Servicio 4</h2>
                                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                    <img class="img-fluid d-block mx-auto" src="/assets/img/servicios/4.jpg" alt="..." />
                                    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Client:</strong>
                                            Lines
                                        </li>
                                        <li>
                                            <strong>Category:</strong>
                                            Branding
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-times me-1"></i>
                                        Cerrar Servicio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Servicio item 5 modal popup-->
        <div class="servicio-modal modal fade" id="servicioModal5" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="/assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <!-- Project details-->
                                    <h2 class="text-uppercase">Servicio 5</h2>
                                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                    <img class="img-fluid d-block mx-auto" src="/assets/img/servicios/5.jpg" alt="..." />
                                    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Client:</strong>
                                            Southwest
                                        </li>
                                        <li>
                                            <strong>Category:</strong>
                                            Website Design
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-times me-1"></i>
                                        Cerrar Servicio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Servicio item 6 modal popup-->
        <div class="servicio-modal modal fade" id="servicioModal6" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="/assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <!-- Project details-->
                                    <h2 class="text-uppercase">Servicio 6</h2>
                                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                    <img class="img-fluid d-block mx-auto" src="/assets/img/servicios/6.jpg" alt="..." />
                                    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Client:</strong>
                                            Window
                                        </li>
                                        <li>
                                            <strong>Category:</strong>
                                            Photography
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-times me-1"></i>
                                        Cerrar Servicio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

	<!-- <div class="container-md">
		<div class="card">
			<h5 class="card-header">CONTACTO-TEST</h5>
			<div class="card-body">
				<form>
					<div class="mb-3">
						<label for="inputName" class="form-label">Nombre:</label>
						<input type="text" class="form-control" id="inputName" name="name" bind:value={$form.name} on:change={handleChange} maxlength="40">
						{#if $errors.name}
							<span class="text-danger">{$errors.name}</span>
						{/if}
					</div>
					<div class="mb-3">
						<label for="inputCellphone" class="form-label">Número de celular:</label>
						<input type="text" class="form-control" id="inputCellphone" name="cellphone" bind:value={$form.cellphone} on:change={handleChange} maxlength="10">
						{#if $errors.cellphone}
							<span class="text-danger">{$errors.cellphone}</span>
						{/if}
					</div>
					<div class="mb-3">
						<label for="inputEmail" class="form-label">Correo electrónico:</label>
						<input type="email" class="form-control" id="inputEmail" name="email" bind:value={$form.email} on:change={handleChange} maxlength="60">
						{#if $errors.email}
							<span class="text-danger">{$errors.email}</span>
						{/if}
					</div>
					<div class="mb-3">
						<label for="inputService" class="form-label">Servicio:</label>
						<select class="form-select" name="service" id="inputService" bind:value={$form.service} on:change={handleChange}>
							<option value="0" selected>Zero</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
						{#if $errors.service}
							<span class="text-danger">{$errors.service}</span>
						{/if}
					</div>
					<div class="mb-3">
						<button type="button" class="btn btn-primary" on:click={handleSubmit}>Enviar</button>
					</div>
				</form>
			</div>
		</div>
	</div> -->

	<!-- Modal -->
	<!-- <Modal bind:open={isOpen} dialogClasses="modal-dialog-centered" ignoreBackdrop="true">
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
	</Modal> -->
</main>