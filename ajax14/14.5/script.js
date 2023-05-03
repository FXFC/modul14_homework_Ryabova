function useRequest(url, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open(`GET`, url, true);

	xhr.onload = function() {
		if (xhr.status != 200) {
			console.log('Answer status:', xhr.status);
		} else {
			const result = JSON.parse(xhr.response);
			if (callback) {
				callback(result)
			}
		}
	};

	xhr.onerror = function() {
		console.log('Error! Answer status:', xhr.status);
	};

	xhr.send();
};

const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');
const textBox = document.querySelector('.text');

//Функция обработки полученного результата
//apiData - объект с результатом запроса

function displayResult(apiData) {
	let cards = '';

	apiData.forEach(item => {
		const cardBlock = `<div class="card"><img src="${item.download_url}" 
		class="card-image"><p>${item.author}</p></div>`;
		cards = cards + cardBlock;
	});

	resultNode.innerHTML = cards;
}

function searchNum() {
	const value1 = document.querySelector('.inputn').value;
	const value2 = document.querySelector('.inputl').value;
	if ((value1 < 1 || value1 > 10) && (value2 < 1 || value2 > 10)) {
		textBox.textContent = 'Page number or limit is out of the range';
		return;
	} else if (value1 < 1 || value1 > 10) {
		textBox.textContent = 'Page number is out of the range';
		return;
	} else if (value2 < 1 || value2 > 10) {
		textBox.textContent = 'Limit is out of the range';
		return;
	} else {
		localStorage.setItem('page', value1);
		localStorage.setItem('size', value2);
		textBox.textContent = "";
		useRequest(`https://picsum.photos/v2/list?page=${value1}&limit=${value2}`, 
			displayResult);
	}	
};

//вешаем обработчик на кнопку запроса
btnNode.addEventListener('click', () => {
	searchNum();
})
const page = localStorage.getItem('page');
const size = localStorage.getItem('size');
useRequest(`https://picsum.photos/v2/list?page=${page}&limit=${size}`,
	displayResult);