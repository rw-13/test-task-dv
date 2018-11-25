document.addEventListener('DOMContentLoaded', function(){

	// Данные из JSON
	let data = JSON.parse(loadedData);
	let rootContainer = document.getElementById("root");

	// Конструктор контейнера с карточками
	function CartContainer(data) {
		this._data = data;

		this.getRandomEl = function() {
			let randomNumber = Math.floor(Math.random() * Math.floor(this.getDataLength()));
			return this._data.splice(randomNumber, 1)[0];
		};
		this.getData = function() {
			return this._data;
		};
		this.getDataLength = function() {
			return this._data.length;
		};
		this.createEl = function() {
			// Вырезали случ.объект из this._data
			let dataCart = this.getRandomEl();
			return new Cart(dataCart);
		};
	}

	// Карточка
	function Cart(props) {
		// Аналог валидации
		let theme = (props.theme) ? props.theme : '';
		let originalText = (props.sourceText) ? props.sourceText : '';
		let transtatedText = (props.translation) ? props.translation : '';
		let el = document.createElement('div');
		el.innerHTML = '<div class="cart__title">' + 
				theme + '</div>' + '<div class="cart__content">' + originalText + '</div>';
		el.setAttribute('data-translate', transtatedText);
		el.classList.add('cart');
		return el;
	}


	// -------------------------BOOTSTRAP-----------------------------
	// Контейнер
	// Кол-во объектов из JSON
	// Массив элементов
	let obj = new CartContainer(data);
	let countElem = obj.getData().length;
	let elemArray = [];
	let firstColumn = [];

	// Кол-во колонок
	// Отступ между колонками
	// Ширина контейнера
	// Высота карточки
	// Ширина карточки
	let columns = 3;
	let gutter = 10;
	let width = rootContainer.clientWidth;
	let cartHeight = 0;
	let cartWidth = (width-(columns-1)*gutter)/columns;

	// Min, Max карточек в первой колонке
	let minCarts = 3;
	let maxCarts = 5;
	let curCarts = 0;

	// Позиционируем элементы в контейнере
	// на выходе два массива для первой и второй-третей колонок
	for (let i=0, j=0; i<countElem; i++) {
		let node = obj.createEl();
		node.style.width = cartWidth + 'px';
		node.style.background = getRandomColor();

		// Элементов мало, выделить в первую колонку 3
		if (countElem < 7) {
			// Смещение по горизонтали
			if (curCarts<3) {
				let left = 0;
				node.style.left = left + 'px';

				// Добавили элемент в контейнер (иначе не считает высоту)
				rootContainer.appendChild(node);

				// Смещение по вертикали
				let top = getTop(firstColumn, i, 1);
				node.style.top = top + 'px';

				curCarts++;

				firstColumn.push(node);
			} else {
				let left = (j%(columns-1)) ? ((j%(columns-1))*(gutter+cartWidth)+(gutter+cartWidth))  : (gutter+cartWidth);
				node.style.left = left + 'px';

				// Добавили элемент в контейнер (иначе не считает высоту)
				rootContainer.appendChild(node);

				// Смещение по вертикали
				let top = getTop(elemArray, j, columns-1);
				node.style.top = top + 'px';

				j++;
				console.log(j);

				// Положили элемент в массив
				elemArray.push(node);
			}

		}
		// Можно ложить элементы в 3 колонки
		else if (countElem >= 7 && countElem < 14) {
			// Смещение по горизонтали
			let left = (i%columns) ? ((i%columns)*(gutter+cartWidth)) : 0;
			node.style.left = left + 'px';
			node.style.width = cartWidth + 'px';

			// Добавили элемент в контейнер (иначе не считает высоту)
			rootContainer.appendChild(node);

			// Смещение по вертикали
			let top = getTop(elemArray, i, columns);
			node.style.top = top + 'px';

			// Положили элемент в массив
			elemArray.push(node);
		}
		// Элементов больше нужного, ограничить до 5 элементов в 1 колонке
		else {
			if (curCarts < 5) {
				let left = 0;
				node.style.left = left + 'px';

				// Добавили элемент в контейнер (иначе не считает высоту)
				rootContainer.appendChild(node);

				// Смещение по firstColumn
				let top = getTop(firstColumn, i, 1);
				node.style.top = top + 'px';

				curCarts++;
				console.log(i);

				firstColumn.push(node);
			} else {
				let left = (j%(columns-1)) ? ((j%(columns-1))*(gutter+cartWidth)+(gutter+cartWidth)) : (gutter+cartWidth);
				node.style.left = left + 'px';

				// Добавили элемент в контейнер (иначе не считает высоту)
				rootContainer.appendChild(node);

				// Смещение по вертикали
				let top = getTop(elemArray, j, columns-1);
				node.style.top = top + 'px';

				j++;

				// Положили элемент в массив
				elemArray.push(node);
			}
		}

	}

	// Сортировка первой колонки
//	firstColumn.sort(compareSort);
	// Сортировка второй-третьей колонки
//	elemArrayю.sort(compareSort);



	// Массив элементов
	// Позиция элемента в массиве
	// Число колонок в массиве
	function getTop(array, pos, columns) {
		let offsetTop = 0;
		let col = pos%columns;
		let row = Math.floor(pos/columns);

		// Смещение первой строки массива
		if (row===0) {
			return offsetTop;
		}

		switch (columns) {
			// Бегаем по строкам
			case 1:
				for(let i=0; i<row; i++) {
					let k = i*columns+col;
					if (array[k]) {
						offsetTop += (array[k].clientHeight + gutter);
					}
				}
				break;
			case 2:
				// Бегаем по строкам
				for(let i=0; i<row; i++) {
					let k = i*columns+col;
					if (array[k]) {
						offsetTop += (array[k].clientHeight + gutter);
					}
				}
				break;				
			case 3:
				// Бегаем по строкам
				for(let i=0; i<row; i++) {
					let k = i*columns+col;
					if (array[k]) {
						offsetTop += (array[k].clientHeight + gutter);
					}
				}
				break;
			default:
				break;
		}

		return offsetTop;
	}

	// Генератор случайного цвета
	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	// Сортировка элементов
	function compareSort(a, b) {
		return a.name.length - b.name.length;
	}





	// -------------------------Обработка событий ----------------------

	(function (){

		let cartTarget = document.getElementsByClassName('cart');

		[].forEach.call(cartTarget, function(elem) {
			let timer;
			let flag = true;

			elem.addEventListener('click', function(event) {
				let that = this;
					
				// Открытие перевода запуск таймера	
				if (flag) {
					reverseText(that);

					timer = setTimeout(function() {
						that.setAttribute('open', '');
						reverseText(that);
						flag = true;
					}, 1500);
					
					flag = false;
				} else {
					window.clearTimeout(timer);
					reverseText(this);
					this.removeAttribute('open');
					flag = true;
				}

			});

			elem.addEventListener('dblclick', function() {
				this.parentNode.removeChild(this);
			});

		});

		// Смена текста в блоке
		function reverseText(obj) {
			let conText = obj.querySelector('.cart__content').innerText;
			let attrText = obj.getAttribute('data-translate');
			obj.querySelector('.cart__content').innerText = attrText;
			obj.setAttribute('data-translate', conText);
		}
			
	})();


});