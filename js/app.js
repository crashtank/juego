//////// cambiar color del logo
function cambiar_logo(selector) {
	$(selector).animate({
		opacity: '1',	},			 
			{step: function () {	$(this).css('color', 'white');},
			queue: true
		}) .animate({
			opacity: '1'}, 
			{step: function () {	$(this).css('color', 'yellow');
			},
			queue: true
		}, 500).delay(1000).animate({
			opacity: '2'
		}, {step: function () {    $(this).css('color', 'white');
			},
			queue: true
		}) .animate({	opacity: '2'}, {step: function () {  $(this).css('color', 'yellow');
			cambiar_logo('h1.main-titulo');
			},
			queue: true
		});
}


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function giveCandyArrays(arrayType, index) {

	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();

	var galleta_col = $([candyCol1, candyCol2, candyCol3, candyCol4,candyCol5,candyCol6, candyCol7]);

	if (typeof index === 'number') {
		var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
			candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
			candyCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return galleta_col;
	} else if (arrayType === 'rows' && index !== '') {
		return candyRow;
	}
}

function galleta_fila(index) {
	var candyRow = giveCandyArrays('rows', index);
	return candyRow;
}

function galleta_col(index) {
	var candyColumn = giveCandyArrays('columns');
	return candyColumn[index];
}




function validar_colm() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyColumn = galleta_col(j);
		var comparisonValue = candyColumn.eq(0);
		var gap = false;
		for (var i = 1; i < candyColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyColumn.eq(i);
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			borrar_galleta_horz(candyPosition, candyColumn);
			puntuacion(candyCount);
		}
	}
}

function borrar_galleta_horz(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}


function validar_fila() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = galleta_fila(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyRow[i];
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			borrar_hori(candyPosition, candyRow);
			puntuacion(candyCount);
		}
	}
}

function borrar_hori(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}

function puntuacion(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}




function verificar_tablero() {
	llenar_tablero();
}

function llenar_tablero() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for (var i = 0; i < agrega; i++) {
			var candyType = getRandomInt(1, 5);
			if (i === 0 && candys < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
	agregar_even();
	val_set();
}

function val_set() {
	validar_colm();
	validar_fila();
	if ($('img.delete').length !== 0) {
		borrar_galleta_animacion();
	}
}

function agregar_even() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: Swap_galleta
	});
	aplicar_drag();

	
}

function quitar_drag() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function aplicar_drag() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}



function Swap_galleta(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		verificar_tablero();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			actualizar_movi();
		}
	}, 500);

}

function verificar_tablero_temp(result) {
	if (result) {
		verificar_tablero();
	}
}

function actualizar_movi() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}



function error_sw(error) {
	console.log(error);
}

function borrar_galleta_animacion() {
	quitar_drag();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				borrar_galleta()
					.then(verificar_tablero_temp)
					.catch(error_sw);
			},
			queue: true
		});
}

function borrar_galleta() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se puede eliminar Galleta!!');
		}
	});
}



function fin_juego() {
	$('div.panel-tablero, div.time').hide('Slide');
	$('h1.main-titulo').addClass('title-over').text('GAME OVER!')
	$('div.score, div.moves, div.panel-score').width('100%');
}

function init() {
	    cambiar_logo('h1.main-titulo');
	    $('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);			
		}
		$('#timer').delay(40000).effect('pulsate', 5000);verificar_tablero();
		$(this).text('Reiniciar');
		$('#timer').html("");
		$('#timer').startTimer({
			
			onComplete: fin_juego
			
		});
	});
}

$(function () {
	init();
		
	
});
