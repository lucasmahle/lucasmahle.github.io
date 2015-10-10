$(document).ready(function(){
	months = {
		"January": "Janeiro",
		"February": "Fevereiro",
		"March": "Março",
		"April": "Abril",
		"May": "Maio",
		"June": "Junho",
		"July": "Julho",
		"August": "Agosto",
		"September": "Setembro",
		"October": "Outubro",
		"November": "Novembro",
		"Dezember": "Dezembro"
	};

	months_short = {
		"Jan": "Jan",
		"Feb": "Fev",
		"Mar": "Mar",
		"Apr": "Abr",
		"May": "Mai",
		"Jun": "Jun",
		"Jul": "Jul",
		"Aug": "Ago",
		"Sep": "Set",
		"Oct": "Out",
		"Nov": "Nov",
		"Dec": "Dez"
	};

	$(".posted-on").each(function(){
		self = $(this);
		text = self.text();
		
		for(month in months){
			rMonth = new RegExp( month, 'igm');
			text = text.replace( rMonth, months[month]);
		}

		for(month in months_short){
			rMonth = new RegExp( month, 'igm');
			text = text.replace( rMonth, months_short[month]);
		}

		self.text( text );
	})
})