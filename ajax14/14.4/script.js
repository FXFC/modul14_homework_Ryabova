const btn = document.querySelector('.button');
//вешаем обработчик на кнопку
 btn.addEventListener('click', () => {
        const value1 = +document.getElementById('num1').value;
        const value2 = +document.getElementById('num2').value;
        let s = document.getElementById('j-result');
        s.textContent = '';
        if (!(value1 >= 100 && value1 <= 300 && value2 >= 100 && value2 <= 300)) {
            s.textContent = 'One of number is out of the range';
            return;
        }
	//делаем запрос данных
	fetch(`https://picsum.photos/${value1}/${value2}`)
	.then((response) => {
		document.getElementById('result').src = response.url;
	});

});