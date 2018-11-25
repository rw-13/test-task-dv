app.view.listCard = {
	setupUserInterface: function() {
		let cardContainer=document.getElementById('root');
		let colDataArray = [];
		let colElementsArray = [];
		// Загружаем данные в localStorage
		Card.generateTestData(loadedData);
		Card.loadAll();
		// Получили данные из хранилища
		colDataArray = separateDataByColumns(Card.instances);
		// Упорядочили текст в колонках по-убыванию
		orderElementsInCol(colDataArray);
		// Добавили элементы на страницу
		// Создадим массив элементов
		for (let i=0; i<colDataArray.length; i++) {
			let temp = [];
			if (colDataArray[i]) {
				for (let j=0; j<colDataArray[i].length; j++) {
					let el=renderCard(colDataArray[i][j]);
					cardContainer.appendChild(el);
					temp.push(el);
				}
			}
			colElementsArray.push(temp);
		}
		// Позиционирование элементов в DOM
		setElementsPosition(colElementsArray);
	}
};

// рендеринг карточки
function renderCard(props) {
	// Аналог валидации
	let theme = (props._theme) ? props._theme : '';
	let originalText = (props._originalText) ? props._originalText : '';
	let translatedText = (props._transtatedText) ? props._transtatedText : '';

	let el = document.createElement('div');
	el.innerHTML = '<div class="cart__title">' + theme + 
		'</div>' + '<div class="cart__content">' + originalText + '</div>';
	el.setAttribute('data-translate', translatedText);
	el.classList.add('cart');
	el.setAttribute('id', props._id);
	el.style.backgroundColor=Random.getColor();
	return el;
}

// разделить данные по колонкам
function separateDataByColumns(array) {
	let limMin = 3;
	let limMax = 5;
	let columns = 3;
	let elemCols = new Array(columns);
	if (array.length < 7) {
		elemCols[0] = array.slice(0, limMin);

		// let rows = (array.length-limMin)/(columns-1);
		for (let i=limMin, j=0; i<array.length; i++, j++) {
			let col = Math.floor(j%(columns-1));
			if (elemCols[col+1]===undefined) {
				elemCols[col+1]=[];
			}
			elemCols[col+1].push(array[i]);
		}
	}
	else if (array.length > 15) {
		elemCols[0] = array.slice(0, limMax);

		// let rows = (array.length-limMax)/(columns-1);
		for (let i=limMax, j=0; i<array.length; i++, j++) {
			let col = Math.floor(i%(columns-1));
			if (elemCols[col+1]===undefined) {
				elemCols[col+1]=[];
			}
			elemCols[col+1].push(array[i]);
		}
	}
	else {
		for (let i=0; i<array.length; i++) {
			let col = Math.floor(i%(columns));
			if (elemCols[col]===undefined) {
				elemCols[col]=[];
			}
			elemCols[col].push(array[i]);
		}
	}
	return elemCols;
}

// Упорядочивает массив по длине текста
function orderElementsInCol(array) {
	for (let i=0; i<array.length; i++) {
		if (array[i]!==undefined) {
			array[i].sort(orderElementsInCol.compare);
		}
	}
}
orderElementsInCol.compare = function(a, b) {
	return b._originalText.length-a._originalText.length;
}

// Как выкинуть конфиги из функции ??
// Позиционируем карточки в блоке
function setElementsPosition(array) {
	let height = 0;
	let width = document.getElementById('root').clientWidth;
	let gutter = 10;
	let columns = 3;
	let cartWidth = (width-(columns-1)*gutter)/columns;
	let left = 0;
	for (let i=0; i<array.length; i++) {
		let top = 0;
		for (let j=0; j<array[i].length; j++) {
			array[i][j].style.width=cartWidth+'px';
			array[i][j].style.top=top+'px';
			array[i][j].style.left=left+'px';
			top+=array[i][j].clientHeight+gutter;
		}
		left+=(cartWidth+gutter);
		if (height<top) {
			height=top;
		}
	}
	document.getElementById('root').style.height=height+'px';
}