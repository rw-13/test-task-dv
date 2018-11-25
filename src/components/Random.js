// Генератор случайных чисел
let Random = {
	getInteger: function(min, max) {
		let rand=min+Math.random()*(max+1-min);
		return Math.floor(rand);
	},
	getColor: function() {
		let letters='0123456789ABCDEF';
		let color='#';
		let max=letters.length;
		for (let i=0; i<6; i++) {
			color+=letters[Random.getInteger(0, max-1)];
		}
		return color;
	}
}