import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import 'jquery/dist/jquery';
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap.min';

import UI from './config/ui.config';
import { getCountries } from './services/coutries.service';
import { validate } from './helpers/validate';
import { showInputError, removeInputError, showCountries, showCities } from './views/form';
import { showNews } from './views/news';
import { login } from './services/auth.service';
import { signup } from './services/signup.service';
import { notify } from './views/notifications';
import { getNews } from './services/news.service';


const { form, inputEmail, inputPassword, btnRightData, formReg, regCountry } = UI;
const inputs = [inputEmail, inputPassword];
let inputsReg = [];

inputsReg = [...formReg].filter(item => item.id);


//Events
form.addEventListener('submit', e => {
	e.preventDefault();
	onSubmit(inputs);
});

formReg.addEventListener('submit', e => {
	e.preventDefault();
	onSubmit(inputsReg);
});

regCountry.addEventListener('change', e => {
	showCities(regCountry.value);
});

inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

btnRightData.addEventListener('click', e => {
	inputEmail.value = 'denis.m.pcspace@gmail.com';
	inputPassword.value = 'dmgame12345';
});


showCountries();

//Handlers
async function onSubmit(inputs) {
	const isValidForm = inputs.every(el => {
		const isValidInput = validate(el);
		if(!isValidInput) {
			showInputError(el);
		}

		return isValidInput;
	});

	if(!isValidForm) return;

	if(inputs[0].id === 'email') {
		try {
			await login(inputEmail.value, inputPassword.value);
			const newsData = await getNews();
			if(newsData) {
				showNews(newsData.news);
			}
			form.reset();
			notify({ msg: 'Login success', className: 'alert-success', timeout: 3000 });
		} catch(err) {
			notify({ msg: 'Login faild', className: 'alert-danger', timeout: 5000 });
		}
	}

	if(inputs[0].id === 'regEmail') {
		const regsData = {};
		inputs.forEach( item => regsData[item.id] = item.value);

		try {
			await signup(regsData);
			formReg.reset();
			notify({ msg: 'User created success. On your email sended link. Please verify your email.', 
					className: 'alert-success', timeout: 3000 });
		} catch(err) {
			notify({ msg: 'Singup faild', className: 'alert-danger', timeout: 5000 });
		}
	}

}