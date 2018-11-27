const axios = require('axios');

(function() {

	document.addEventListener('DOMContentLoaded', function() {

		var appform = document.getElementById('appform');

		appform.onsubmit = async (event) => {

			event.preventDefault();

			const allVisibleErrors = document.getElementsByClassName('visible');

			for (let idx = 0 ; idx < allVisibleErrors.length ; idx++) {
				allVisibleErrors[idx].classList.remove('visible');
			}

			const allInputs = document.getElementsByTagName('input');

			try {

				for (let idx = 0 ; idx < allInputs.length ; idx++) {
					allInputs[idx].disabled = true;
				}

				await axios({
					method: 'post',
					url: 'https://api.fourth.party/applications/',
					data: {
						name: document.getElementById('appname').value,
						contact: {
							name: document.getElementById('name').value,
							email: document.getElementById('email').value
						}
					},
					headers: {
						'X-API-Key': process.env.API_KEY
					}
				});

				document.getElementById('create').classList.add('invisible');
				document.getElementById('success').classList.add('visible');

			} catch (error) {

				for (let idx = 0 ; idx < allInputs.length ; idx++) {
					allInputs[idx].disabled = false;
				}

				if ((error.response.data || {}).name == 'validation-error') {
					const errorId = `error${error.response.data.keyPath.split('.').splice(1).join('')}`;
					const element = document.getElementById(errorId);
					element.innerHTML = error.response.data.message;
					element.classList.add('visible');
				}

				else if ((error.response.data || {}).name == 'already-exists') {
					const emailElement = document.getElementById('errorcontactemail');
					emailElement.innerHTML = 'E-mail is already registered.';
					emailElement.classList.add('visible');
				}
			}

		};

	});

})();
