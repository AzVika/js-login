import axios from '../plugins/axios';

/**
* Function signup. Make signup request to API
* @param {Array} arr [{id: ..., value: ...}]
*/

export async function signup(arr) {
	const { regEmail: email,
			regPassword: password,
			regNickname: nickname,
			regFirstName: first_name,
			regLastName: last_name,
			regPhone: phone,
			regSex: gender_orientation,
			regCity: city,
			regCountry: country,
			regDateDay: date_of_birth_day,
			regDateMounth: date_of_birth_month,
			regDateYear: date_of_birth_year
	} = arr;
	
	const dataForSignup = {
		email,
		password,
		nickname,
		first_name,
		last_name,
		phone,
		gender_orientation,
		city,
		country,
		date_of_birth_day,
		date_of_birth_month,
		date_of_birth_year,
	};
	
	// console.log(dataForSignup);
	try {
		const response = await axios.post(
			`/auth/signup`,
			JSON.stringify(dataForSignup),
		);

		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
}