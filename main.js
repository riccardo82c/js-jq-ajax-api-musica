/* Attraverso una chiamata AJAX all’ Api di boolean avremo a disposizione una decina di dischi musicali.
Servendoci di handlebars stampiamo tutto a schermo.
In questo momento non è importante la parte grafica. */

$(document).ready(function () {

	$.ajax({
		"url": "https://flynn.boolean.careers/exercises/api/array/music",
		"method": "GET",
		success: function (data) {

			// trasformo lowerCase il valore di una chiave in ogni oggetto di un array di oggetti
			transformAttr(data.response, 'genre');

			// crea il DOM
			createDOM(data.response);
			// crea le opzioni del select DINAMICAMENTE
			createOptions(data.response);

			// al cambio di input in <select>
			$('#genre').change(displaySelection);

		},
		'error': function (richiesta, stato, errori) {
			alert("E' avvenuto un errore.");
		}
	});
});


/* FUNZIONI */

// Trasforma in lowerCase un attributo di un oggetto in un array
function transformAttr(arr, attr) {
	for (let i = 0; i < arr.length; i++) {
		arr[i][attr] = arr[i][attr].toLowerCase();
	}
}

// popolazione del DOM
function createDOM(data) {
	var source = $('#template').html();
	var template = Handlebars.compile(source);
	for (var i = 0; i < data.length; i++) {
		var html = template(data[i]);
		$('.cds-container').append(html);
	}
}

// Creazione dinamica delle option del select
function createOptions(data) {
	$('header').after(`<select id="genre"></select>`);
	var allCategory = reduceCategory(data, 'genre');
	allCategory.unshift('all');
	console.log(allCategory);
	for (var i = 0; i < allCategory.length; i++) {
		$('#genre').append(`<option value="${allCategory[i]}">${capitalize(allCategory[i])}</option>`)
	}
}

// Visualizza gli items del DOM in funzione del cambio dell'input in select
function displaySelection() {
	console.log('prova');
	var category = $('#genre').val();
	$('.cd').hide();
	category != 'all' ? $('.cd.' + category).show() : $('.cd').show();
}


// riduce array di oggetti per attributo
function reduceCategory(arr, attr) {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		if (!result.includes(arr[i][attr])) {
			result.push(arr[i][attr])
		}
	}
	return result
}

// capitalizza una stringa
function capitalize(stringa) {
	var primoCarattere = stringa.charAt(0).toUpperCase();
	return primoCarattere + stringa.slice(1).toLowerCase();
};