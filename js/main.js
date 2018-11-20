document.addEventListener('DOMContentLoaded', function(){

	// Данные из JSON
	let data = JSON.parse(loadedData);
	let rootContainer = document.getElementById("root");

	// function Configurator() {
	// 	this._height = 0;
	// 	this._width = rootContainer.clientWidth;
	// 	this._columns = 3;
	// 	this._gutterX = 10;
	// 	this._gutterY = 10;

	// 	this.cartWidth = function() {
	// 		return ((this._width-(this._columns-1)*this._gutterY)/this._columns);
	// 	};
	// }

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
			let node = new Cart(dataCart);
			console.log(node);
			rootContainer.appendChild(node._el);
		};
	}

	// Карточка
	function Cart(props) {
		// Аналог валидации
		let theme = (props.theme) ? props.theme : '';
		let originalText = (props.sourceText) ? props.sourceText : '';
		let transtatedText = (props.translation) ? props.translation : '';
		
		this._el = document.createElement('div');
		this._el.innerHTML = '<div class="cart__title" data-translate="' + transtatedText +'">' + 
				theme + '</div>' + '<div class="cart__content">' + originalText + '</div>';
		this._el.classList.add('cart');
	}

	// -------------------------BOOTSTRAP-----------------------------
	let obj = new CartContainer(data);
	let countElem = obj.getData().length;
	for (let i=0; i<countElem; i++) {
		obj.createEl();
	}

});