/* Attraverso una chiamata AJAX all’ Api di boolean avremo a disposizione una decina di dischi musicali.
Servendoci di handlebars stampiamo tutto a schermo.
In questo momento non è importante la parte grafica. */



$(document).ready(function () {

	$.ajax({

		"url": "https://flynn.boolean.careers/exercises/api/array/music",
		"method": "GET",
		success: function (data) {
			console.log(data.response);
			console.log(data.response[0]);

			let categoryArr = reduceCategory(data.response, 'genre');

			console.log(categoryArr);

		},
		'error': function (richiesta, stato, errori) {
			alert("E' avvenuto un errore.");
		}
	});


});


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