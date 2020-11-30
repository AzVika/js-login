import UI from '../config/ui.config';
const newsWrapper = UI.newsWrapper;

export function showNews(arr) {
	console.log(arr);
	const h2 = document.createElement('h2');
	h2.classList.add('text-center');
	h2.textContent = "News";
	const ul = document.createElement('ul');
	ul.classList.add('row', 'mt-3', 'mb-3');
	arr.forEach(obj => {
		const li = document.createElement('li');
		li.id = obj._id;
		li.classList.add('col-sm-6', 'col-md-4', 'mb-3');
		const owner = obj.owner;
		const picture = obj.pictures[0];
		const temp = `
			<div class="card" style="width: 14rem;">
			  <img src="${picture.url}" class="card-img-top" alt="${owner.full_name}">
			  <div class="card-body">
			    <h5 class="card-title">${owner.full_name}</h5>
			    <p class="card-text">${owner.country}</p>
			    <p>${obj.date.slice(0, 10)}</p>
			  </div>
			</div>
			
		`;
		li.insertAdjacentHTML('beforeend', temp);
		ul.append(li);
	});
	newsWrapper.append(h2, ul);
}


