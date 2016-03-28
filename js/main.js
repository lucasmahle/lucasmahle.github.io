SimpleJekyllSearch({
	searchInput: document.getElementById('search-input'),
	resultsContainer: document.getElementById('results-container'),
	json: '/search.json',
	searchResultTemplate: '<li><a href="{url}" title="{title}">{title}</a></li>',
	noResultsText: '<li class="no-results">Nada por aqui</li>',
	limit: 10,
	fuzzy: false
});

$(document).ready(function() {
	$('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
		$('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
		e.preventDefault();
	});

	;(function(){
		'use strict';
		/**
		 * I'm to lazy to edit every, boring, year.
		 * And this way I do not have to worry about my age
		 * My name is Lucas Mahle, brazilian and I am the Universal.
		 */
		var $age = $("#age");

		if($age.length > 0){
			var $born, _calculateAge;

			_calculateAge = function(birthday) {
				var ageDifMs, ageDate

				ageDifMs = Date.now() - birthday.getTime();
				ageDate = new Date(ageDifMs);

				return Math.abs(ageDate.getUTCFullYear() - 1970);
			}

			$age.text( _calculateAge( new Date($age.data('birth')) ) );
		}
	}());
});
