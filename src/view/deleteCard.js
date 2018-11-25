app.view.deleteCard = {
	setupUserInterface: function(id) {
		let cardContainer=document.getElementById('root');
		let colDataArray=[];
		let colElementsArray=[];

		Card.remove(id);
		cardContainer.innerHTML='';
		colDataArray=separateDataByColumns(Card.instances);

		orderElementsInCol(colDataArray);

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
		setElementsPosition(colElementsArray);

		// Обработчик события клика
		CardEvents.click();
		// Обработчик двойного клика
		CardEvents.dblclick();
	}
}