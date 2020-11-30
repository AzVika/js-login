function getConteiner() {
	return document.querySelector('.notify-container');
}

function alertTemplate(msg, className, index) {
	return `
		<div class="alert ${className}" data-index="${index}">
			${msg}
		</div>
	`;
}

function notifyConteinerTemplate() {
	return `
		<div class="notify-container" style="position: fixed; top: 5%; left: 40%;"></div>
	`;
}

function createNotifyContainer() {
	const template = notifyConteinerTemplate();
	document.body.insertAdjacentHTML('afterbegin', template);
}

function getAlertIndex() {
	return document.querySelectorAll('.notify-container .alert').length;
}

/**
* Function notify. Show notification message
* @param {Object} settings
* @param {String} settings.msg
* @param {String} settings.className
* @param {Number} settings.timeout
*/
export function notify({
	msg = 'Info message',
	className = 'alert-info',
	timeout = 2000,
} = {}) {

	if(!getConteiner()) {
		createNotifyContainer();
	}

	const index = getAlertIndex();
	const template = alertTemplate(msg, className, index);
	const container = getConteiner();

	container.insertAdjacentHTML('beforeend', template);

	setTimeout(() => closeNotify(index), timeout);
}

export function closeNotify(index) {
	let alert;

	if(index === undefined) {
		alert = document.querySelector('.notify-container .alert');
	} else {
		alert = document.querySelector(`.notify-container .alert[data-index="${index}"]`);
	}

	if(!alert) {
		console.warn('Alert not fount');
		return;
	}

	const container = getConteiner();
	container.removeChild(alert);
}