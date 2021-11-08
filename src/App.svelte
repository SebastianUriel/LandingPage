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

<main>
	<div class="container-md">
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
	</div>

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