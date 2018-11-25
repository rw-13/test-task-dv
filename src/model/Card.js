function Card(props) {
	this._id = props.id;
	this._theme = props.theme;
	this._originalText = props.sourceText;
	this._transtatedText = props.translation;
};

// Коллекция всех экземпляров
Card.instances = [];

Card.add = function() {};

// Загружает данные из файла в localStorage
Card.generateTestData = function(loadedData) {
	if (loadedData) {
		localStorage.setItem('cards', loadedData);
	}
	for (let i=0; i<localStorage.cards; i++) {
		console.log(localStorage.cards[i]);
	}
}

// Загружает данные из localStorage в Card.instances
Card.loadAll = function() {
	let cardsString = "";
	try {
		if (localStorage.cards) {
			cardsString = localStorage.cards;
		}
	} catch(e) {
		console.log('Error reading localStorage');
	}
	if (cardsString) {
		cards = JSON.parse(cardsString);
	}

	for (i=0; i<cards.length; i++) {
		cards[i].id = i;
		Card.instances.push(Card.createCard(cards[i]));
	}
};

// Чистит все данные в localStorage
Card.clearAll = function() {
	localStorage.clear();
};

// Удаляет элемент из Card.instances
Card.remove = function(id) {
	let idEl = Card.search(id);
	Card.instances.splice(idEl, 1);
};

// Создает новый экземпляр класса
Card.createCard = function(data) {
	return new Card(data);
};

Card.search = function(toFind) {
	if (!Card.instances) return null;

	let first=0;
	let last=Card.instances.length-1;
	while (first<last) {
		let mid=first+Math.floor((last-first)/2);
		if (Card.instances[mid]._id>=toFind)
			last=mid;
		else
			first=mid+1;
	}
	if (Card.instances[last]._id==toFind)
		return last;
	else return null;
}