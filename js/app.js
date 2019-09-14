$(function () {
	//cambiar color a titulo pricipal 
	function animartitulo() {
		$(".main-titulo").animate({
				color: 'red'
			}, "slow")
			.animate({
				color: 'yellow'
			}, "slow")
			.animate({
				color: 'white'
			}, "fast")


	}

	setInterval(animartitulo, 500);

	$(document).click(function () {
			$(".panel-score").animate({
					width: "100%",
					height: 700

				}), 2000, function () {

					$(".panel-tablero").hide("slow");
				};


	});






});
