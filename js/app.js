$(document).ready(function () {
	var busquedaHorizontal = 0;
	var busquedaVertical = 0;
	var buscarNuevosDulces = 0;
	var lencolum = ["", "", "", "", "", "", ""];
	var lenrest = ["", "", "", "", "", "", ""];
	var maximo = 0;
	var matriz = 0;
	var intervalo = 0;
	var eliminar = 0;
	var nuevosDulces = 0;
	var tiempo = 0;
	var i = 0;
	var contadorTotal = 0;
	var espera = 0;
	var score = 0;
	var mov = 0;
	var min = 2;
	var seg = 0;


	//---------------Animar Titulo de la pagina-------//


	function tituloColor() {
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
	setInterval(tituloColor, 500);






	//---------------Acciones que se realizan al dar click en el botón Iniciar----------------
	$(".btn-reinicio").click(function () {
		i = 0;
		score = 0;
		mov = 0;
		$(".panel-score").css("width", "25%");
		$(".panel-tablero").show();
		$(".time").show();
		$("#score-text").html("0");
		$("#movimientos-text").html("0");
		$(this).html("Reiniciar")
		clearInterval(intervalo);
		clearInterval(eliminar);
		clearInterval(nuevosDulces);
		clearInterval(tiempo);
		min = 2;
		seg = 0;
		borrartotal();
		intervalo = setInterval(function () {
			desplazamiento()
		}, 600);
		tiempo = setInterval(function () {
			timer()
		}, 1000);
	});

	//---------------Función para comenzar el Juego con dulces aleatorios----------------
	function desplazamiento() {
		i = i + 1
		var numero = 0;
		var imagen = 0;
		$(".elemento").draggable({
			disabled: true
		});
		if (i < 8) {
			for (var j = 1; j < 8; j++) {
				if ($(".col-" + j).children("img:nth-child(" + i + ")").html() == null) {
					numero = Math.floor(Math.random() * 4) + 1;
					imagen = "image/" + numero + ".png";
					$(".col-" + j).prepend("<img src=" + imagen + " class='elemento'/>").css("justify-content", "flex-start")
				}
			}
		}
		if (i == 8) {
			clearInterval(intervalo);
			eliminar = setInterval(function () {
				eliminarhorver()
			}, 150);
		}
	};

	//---------------Función para el temporizador hacia atrás----------------
	function timer() {
		if (seg != 0) {
			seg = seg - 1;
		}
		if (seg == 0) {
			if (min == 0) {
				clearInterval(eliminar);
				clearInterval(nuevosDulces);
				clearInterval(intervalo);
				clearInterval(tiempo);
				$(".panel-tablero").hide("drop", "slow", funcioncita);
				$(".time").hide();
			}
			seg = 59;
			min = min - 1;
		}
		$("#timer").html("0" + min + ":" + seg);
	};

	//---------------Función para poner el los movimientos y puntos de toda la pantalla----------------
	function funcioncita() {
		$(".panel-score").animate({
			width: '100%'
		}, 3000);
		$(".termino").css({
			"display": "block",
			"text-align": "center"
		});
	};

	//---------------Función para borrar todo----------------
	function borrartotal() {
		for (var j = 1; j < 8; j++) {
			$(".col-" + j).children("img").detach();
		}
	};

	//---------------Función para eliminar los Dulces--------------------------
	function eliminarhorver() {
		matriz = 0;
		busquedaHorizontal = horizontal();
		busquedaVertical = vertical();
		for (var j = 1; j < 8; j++) {
			matriz = matriz + $(".col-" + j).children().length;
		}
		//Condicional si no encuentra 3 dulces o más, llamamos a la función para volver a completar el juego
		if (busquedaHorizontal == 0 && busquedaVertical == 0 && matriz != 49) {
			clearInterval(eliminar);
			buscarNuevosDulces = 0;
			nuevosDulces = setInterval(function () {
				nuevosdulces()
			}, 600);
		}

		if (busquedaHorizontal == 1 || busquedaVertical == 1) {
			$(".elemento").draggable({
				disabled: true
			});
			$("div[class^='col']").css("justify-content", "flex-end");
			$(".activo").hide("pulsate", 1000, function () {
				var scoretmp = $(".activo").length;
				$(".activo").remove("img");
				score = score + scoretmp * 10;
				$("#score-text").html(score); //Cambiamos la puntuación
			});
		}
		if (busquedaHorizontal == 0 && busquedaVertical == 0 && matriz == 49) {
			$(".elemento").draggable({
				disabled: false,
				containment: ".panel-tablero",
				revert: true,
				revertDuration: 0,
				snap: ".elemento",
				snapMode: "inner",
				snapTolerance: 40,
				start: function (event, ui) {
					mov = mov + 1;
					$("#movimientos-text").html(mov);
				}
			});
		}
		$(".elemento").droppable({
			drop: function (event, ui) {
				var dropped = ui.draggable;
				var droppedOn = this;
				espera = 0;
				do {
					espera = dropped.swap($(droppedOn));
				}
				while (espera == 0);
				busquedaHorizontal = horizontal();
				busquedaVertical = vertical();
				if (busquedaHorizontal == 0 && busquedaVertical == 0) {
					dropped.swap($(droppedOn));
				}
				if (busquedaHorizontal == 1 || busquedaVertical == 1) {
					clearInterval(nuevosDulces);
					clearInterval(eliminar);
					eliminar = setInterval(function () {
						eliminarhorver()
					}, 150);
				}
			},
		});
	};

	//---------Función para intercambiar dulces-------------------------------------
	jQuery.fn.swap = function (b) {
		b = jQuery(b)[0];
		var a = this[0];
		var t = a.parentNode.insertBefore(document.createTextNode(''), a);
		b.parentNode.insertBefore(a, b);
		t.parentNode.insertBefore(b, t);
		t.parentNode.removeChild(t);
		return this;
	};

	//---------Función para crear nuevos dulces---------------------------------------------
	function nuevosdulces() {
		$(".elemento").draggable({
			disabled: true
		});
		$("div[class^='col']").css("justify-content", "flex-start")
		for (var j = 1; j < 8; j++) {
			lencolum[j - 1] = $(".col-" + j).children().length;
		}
		if (buscarNuevosDulces == 0) {
			for (var j = 0; j < 7; j++) {
				lenrest[j] = (7 - lencolum[j]);
			}
			maximo = Math.max.apply(null, lenrest);
			contadorTotal = maximo;
		}
		if (maximo != 0) {
			if (buscarNuevosDulces == 1) {
				for (var j = 1; j < 8; j++) {
					if (contadorTotal > (maximo - lenrest[j - 1])) {
						$(".col-" + j).children("img:nth-child(" + (lenrest[j - 1]) + ")").remove("img");
					}
				}
			}
			if (buscarNuevosDulces == 0) {
				buscarNuevosDulces = 1;
				for (var k = 1; k < 8; k++) {
					for (var j = 0; j < (lenrest[k - 1] - 1); j++) {
						$(".col-" + k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");
					}
				}
			}
			for (var j = 1; j < 8; j++) {
				if (contadorTotal > (maximo - lenrest[j - 1])) {
					numero = Math.floor(Math.random() * 4) + 1;
					imagen = "image/" + numero + ".png";
					$(".col-" + j).prepend("<img src=" + imagen + " class='elemento'/>");
				}
			}
		}
		if (contadorTotal == 1) {
			clearInterval(nuevosDulces);
			eliminar = setInterval(function () {
				eliminarhorver()
			}, 150);
		}
		contadorTotal = contadorTotal - 1;
	};

	//----------Función para la busqueda horizontal de dulces----------------------------
	function horizontal() {
		var busHori = 0;
		for (var j = 1; j < 8; j++) {
			for (var k = 1; k < 6; k++) {
				var res1 = $(".col-" + k).children("img:nth-last-child(" + j + ")").attr("src");
				var res2 = $(".col-" + (k + 1)).children("img:nth-last-child(" + j + ")").attr("src");
				var res3 = $(".col-" + (k + 2)).children("img:nth-last-child(" + j + ")").attr("src");
				if ((res1 == res2) && (res2 == res3) && (res1 != null) && (res2 != null) && (res3 != null)) {
					$(".col-" + k).children("img:nth-last-child(" + (j) + ")").attr("class", "elemento activo");
					$(".col-" + (k + 1)).children("img:nth-last-child(" + (j) + ")").attr("class", "elemento activo");
					$(".col-" + (k + 2)).children("img:nth-last-child(" + (j) + ")").attr("class", "elemento activo");
					busHori = 1;
				}
			}
		}
		return busHori;
	};

	//----------Función para la busqueda vertical de dulces------------------------------
	function vertical() {
		var busVerti = 0;
		for (var l = 1; l < 6; l++) {
			for (var k = 1; k < 8; k++) {
				var res1 = $(".col-" + k).children("img:nth-child(" + l + ")").attr("src");
				var res2 = $(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("src");
				var res3 = $(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("src");
				if ((res1 == res2) && (res2 == res3) && (res1 != null) && (res2 != null) && (res3 != null)) {
					$(".col-" + k).children("img:nth-child(" + (l) + ")").attr("class", "elemento activo");
					$(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("class", "elemento activo");
					$(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("class", "elemento activo");
					busVerti = 1;
				}
			}
		}
		return busVerti;
	};




});






/*$(document).ready(function () {

	var img = $('<img id="">');
	vectorImagen = new Array(3);
	for (i = 0; i < 4; i++) {
		vectorImagen[i] = i + ".png";
	}
	
	

	function cargarAleatoriamente() {
		var aux = "";
		for (i = 0; i < 3; i++) {
			var aleatorio = (Math.floor(Math.random() * 3) + 1);
			aux = vectorImagen[i];
			vectorImagen[i] = vectorImagen[aleatorio];
			vectorImagen[aleatorio] = aux;
		}
		
		
	}
	
	var animaciones = {

		animartitulo: function () {
			$(".main-titulo").animate({
					color: 'red'
				}, "slow")
				.animate({
					color: 'yellow'
				}, "slow")
				.animate({
					color: 'white'
				}, "fast")
		},

		botonCambiarRinicio: function () {
			$("button").click(function () {
				$(".btn-reinicio").html('Reiniciar');

			});
		},
		generarDulces1: function () {
			var img = $('<img id="caramelo-1">');
			cargarAleatoriamente();
			
				for (i = 1; i < 4; i++) {
				img.attr("src", "image/caramelos/" + vectorImagen[i]);
			}
		
			img.appendTo(".col-1");
		},

		generarDulces2: function () {

			var img = $('<img id="caramelo-2">');
			cargarAleatoriamente();
				for (i = 1; i < 4; i++) {
				img.attr("src", "image/caramelos/" + vectorImagen[i]);
			}
		
			img.appendTo(".col-2");
		},

		generarDulces3: function () {

			var img = $('<img id="caramelo-3">');
			cargarAleatoriamente();
			for (i = 1; i < 4; i++) {
				img.attr("src", "image/caramelos/" + vectorImagen[i]);
			}
			img.appendTo(".col-3");
		},

		generarDulces4: function () {
			var img = $('<img id="caramelo-4">');
			cargarAleatoriamente();
			for (i = 1; i < 4; i++) {
				img.attr("src", "image/caramelos/" + vectorImagen[i]);
			}
			img.appendTo(".col-4");
		},
		generarDulces5: function () {
			var img = $('<img id="caramelo-4">');
			cargarAleatoriamente();
			for (i = 1; i < 4; i++) {
				img.attr("src", "image/caramelos/" + vectorImagen[i]);
			}
			img.appendTo(".col-5");
		},
		generarDulces6: function () {
			var img = $('<img id="caramelo-4">');
			cargarAleatoriamente();
			for (i = 1; i < 4; i++) {
				img.attr("src", "image/caramelos/" + vectorImagen[i]);
			}
			img.appendTo(".col-6");
		},
		generarDulces7: function () {
			var img = $('<img id="caramelo-4">');
			cargarAleatoriamente();
			for (i = 1; i < 4; i++) {
				img.attr("src", "image/caramelos/" + vectorImagen[i]);
			}
			img.appendTo(".col-7");
		},

		movimientos: function () {

			var div = $(".col-1");

			function runIt() {
				div
					.show("slow")

				.show(1200)
					.slideUp("normal", runIt);
			}

			function showIt() {
				var n = div.queue("fx");
				$("#movimientos-text").text(n.length);
				setTimeout(showIt, 100);
			}

			runIt();
			showIt();
		},




		cerrarventana: function () {
			$(".btn-reinicio").click(function () {
				$(".panel-tablero").toggle("slow");

			});

		}
	};


	//ejecucion de animaciones
	setInterval(animaciones.animartitulo, 500);
	animaciones.botonCambiarRinicio();
	animaciones.cerrarventana();
	setInterval(animaciones.generarDulces1, 2000);
	setInterval(animaciones.generarDulces2, 2000);
	setInterval(animaciones.generarDulces3, 2000);
	setInterval(animaciones.generarDulces4, 2000);
	setInterval(animaciones.generarDulces5, 2000);
	setInterval(animaciones.generarDulces6, 2000);
	setInterval(animaciones.generarDulces7, 2000);
	



});
*/
//---------
