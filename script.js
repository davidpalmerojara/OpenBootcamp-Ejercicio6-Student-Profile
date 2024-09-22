document.getElementById('fallbackNoDownload').style.display = 'none';

const searchTag = (mode) => {
	const filter = document.getElementById('myInput').value.toUpperCase();
	const ul = document.getElementById('ul');
	const li = ul.getElementsByTagName('li');
	let found;
	
	for (let i = 0; i < li.length; i++) {
		if (
			li[i].innerHTML.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(filter) > -1 &&
			!searchTagInTags(li[i].innerHTML)
		) {
			found = true;
		}
		if (filter == '' && !mode) {
			found = false;
			ul.style.display = 'none';
		}
		if (found) {
			li[i].style.display = 'block';
			ul.style.display = 'block';
			found = false;
		} else {
			li[i].style.display = 'none';
		}
	}
	
};

const deleteFile = () => {
	document.getElementById('frame').data = '';
	document.getElementById('fallback').style.display = 'none';
	document.getElementById('fallbackNoDownload').style.display = 'flex';
};

const myInput = document.getElementById('myInput');
myInput.addEventListener("blur", () => {
	document.getElementById('myInput').value = '';
	document.getElementById('ul').style.display = 'none';
});

const fileSelector = document.querySelectorAll('.file-selector');
for (let i = 0; i < fileSelector.length; i++) {
	fileSelector[i].addEventListener('change', (event) => {
		const preview = document.querySelector('object');
		const link = document.getElementById('PDFLink');
		const file = event.target.files[0];
		const url = URL.createObjectURL(file);
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = function() {
			preview.data = reader.result;
			link.href = url;
		};
		reader.onerror = function() {
			console.log(reader.error);
		};
	});
}

li = document.querySelectorAll('li');
for (let i = 0; i < li.length; i++) {
	li[i].addEventListener('mousedown', (e) => {
		const tag = document.createElement('div');
		tag.classList.add('tag');
		tag.innerHTML = e.target.innerHTML;
		li[i].style.display = 'none';
		ul.style.display = 'none';
		const icon = document.createElement('i');
		icon.classList.add('fa-solid', 'fa-xmark');
		icon.style.margin = '0 0 0 10px';
		document.getElementById('myInput').value = '';
		icon.addEventListener('click', () => {
			icon.parentElement.remove();
		});
		tag.appendChild(icon);
		document.querySelector('.tagList').appendChild(tag);
	});
}

const searchTagInTags = (value) => {
	const tags = document.querySelectorAll('.tag');

	for (const tag of tags) {
		const tagText = tag.innerHTML.split('<i')[0];
		if (tagText === value) return true;
	}
	return false;
};
