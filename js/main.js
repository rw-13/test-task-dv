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
			
			// rootContainer.appendChild(node._el);
		};
	}

	// Карточка
	function Cart(props) {
		// Аналог валидации
		let theme = (props.theme) ? props.theme : '';
		let originalText = (props.sourceText) ? props.sourceText : '';
		let transtatedText = (props.translation) ? props.translation : '';
		let el = document.createElement('div');
		el.innerHTML = '<div class="cart__title" data-translate="' + transtatedText +'">' + 
				theme + '</div>' + '<div class="cart__content">' + originalText + '</div>';
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

	for (let i=0; i<countElem; i++) {
		let node = obj.createEl();

		// Смещение по горизонтали
		let left = (i%columns) ? ((i%columns)*(gutter+cartWidth)) : 0;
		node.style.left = left + 'px';
		node.style.width = cartWidth + 'px';

		rootContainer.appendChild(node);

		// Смещение по вертикали
		let top = getTop(elemArray, i);
		node.style.top = top + 'px';

		elemArray.push(node);
	}

	// Работа с массивом элементов cart
	function getTop(array, pos) {
		// Смещение карточки от верхней границы контейнера
		// Колонка и строка в которой находится карточка
		let offsetTop = 0;
		let col = pos%columns;
		let row = Math.floor(pos/columns);

		// Первая строка с нулевым отступом
		if (row === 0) {
			return offsetTop;
		}
		// Бегаем по строкам
		for(let i=0; i<row; i++) {
			let k = i*columns+col;
			if (array[k]) {
				offsetTop += (array[k].clientHeight + gutter);
			}
		}
		return offsetTop;
	}
});