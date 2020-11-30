import { getCountries, getCities } from '../services/coutries.service';
import UI from '../config/ui.config';

/**
* Function inputErrorTemplate
* @param {String} msg
*/
function inputErrorTemplate(msg) {
	return `
	<div class="invalid-feedback">${msg}</div>
	`;
}

/** 
* Function showInputError. Add input error
* @param {HTMLInputElement} el
*/
export function showInputError(el) {
	const parent = el.parentElement;
	const msg = el.dataset.invalidMessage || 'Invalid input';
	const template = inputErrorTemplate(msg);
	const prevMsg = parent.querySelector('.invalid-feedback');
	if(prevMsg) {
		prevMsg.remove();
	}
	el.classList.add('is-invalid');
	parent.insertAdjacentHTML('beforeend', template);
}

/**
* Function removeInputError. Remove input error
* @param {HTMLInputElement} el
*/
export function removeInputError(el) {
	const parent = el.parentElement;
	const err = parent.querySelector('.invalid-feedback');
	if(!err) return;

	el.classList.remove('is-invalid');
	parent.removeChild(err);
}

export function showCountries() {
	const lists = getCountries();

		lists.then(countries => {
			if(Object.keys(countries).length) {
				let options = '';
				// console.log(countries);

				for(let key in countries) {
					options += `
						<option value="${key}">${countries[key]}</option>
					`;
				}

				UI.regCountry.insertAdjacentHTML('beforeend', options);
			}
			
		});
}

export function showCities(country_index) {
	const lists = getCities(country_index);

		lists.then(cities => {
			if(cities.length) {
				let options = '<option value="" selected>Selected city</option>';

				cities.forEach( city => {
					options += `
						<option value="${city}">${city}</option>
					`;
				});

				UI.regCity.textContent = '';
				UI.regCity.removeAttribute('readonly');
				UI.regCity.insertAdjacentHTML('beforeend', options);
			}
			
		});
}

