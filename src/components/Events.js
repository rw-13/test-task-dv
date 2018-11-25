window.addEventListener("load", function() {

	// Описываем обработчики событий
	// 
	window.CardEvents = {
		click: function() {
			let cartTarget = document.getElementsByClassName('cart');
			[].forEach.call(cartTarget, function(elem) {
				let timer;
				let flag = true;
				elem.addEventListener('click', function(event) {
					let that = this;
					if (flag) {
						CardEvents.reverseText(that);
						timer=setTimeout(function() {
							that.setAttribute('open', '');
							CardEvents.reverseText(that);
							flag=true;
						}, 1500);
						flag=false;
					} else {
						window.clearTimeout(timer);
						CardEvents.reverseText(this);
						this.removeAttribute('open');
						flag=true;
					}
				});
			});
		},
		dblclick: function() {
			let cartTarget = document.getElementsByClassName('cart');
			[].forEach.call(cartTarget, function(elem) {
				elem.addEventListener('dblclick', function(event) {
					let id = this.getAttribute('id');
					app.view.deleteCard.setupUserInterface(id);
				});
			});

		}
	};
	CardEvents.reverseText=function(obj) {
		let conText = obj.querySelector('.cart__content').innerText;
		let attrText = obj.getAttribute('data-translate');
		obj.querySelector('.cart__content').innerText = attrText;
		obj.setAttribute('data-translate', conText);
	}

	// Обработчик события клика
	CardEvents.click();
	// Обработчик двойного клика
	CardEvents.dblclick();

});
