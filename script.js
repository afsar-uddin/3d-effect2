window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		f1 = 300,
		cards = [];
		numCards = 21;
		for( var i = 0; i < numCards; i += 1 ) {
			var card = {
				x: utils.randomRange(-1000, 1000),
				y: utils.randomRange(-1000, 1000),
				z: utils.randomRange(0, 5000),
				img:document.createElement("img")
			};
			card.img.src = "au" + (i % 6) + ".jpg";
			cards.push(card);	
		}
		context.translate(width / 2, height / 2);
		context.font = "200px Arial";

		update();

		function update() {
			cards.sort(zsort);
			context.clearRect(-width / 2, -height / 2, width, height);
			for( var i = 0; i < numCards; i += 1 ) {
				var card = cards[i],
					perspective = f1 / (f1 + card.z);

				context.save();
				context.scale(perspective, perspective);
				context.translate(card.x, card.y);
				context.translate(-card.img.width / 2, -card.img.height / 2);
				context.drawImage(card.img, 0, 0);
				context.restore();

				card.z -= 5;
				if(card.z < 0) {
					card.z = 5000;
				}
			}
			requestAnimationFrame(update);
		}

		function zsort( cardA, cardB ) {
			return cardB.z - cardA.z;
		}
};