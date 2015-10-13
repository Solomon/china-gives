function equalHeight() {
	var pw = $('div.person').width();
	$('div.person').css({
	    'height': pw + 'px'
	});
}

$(document).ready(equalHeight);
$(window).resize(equalHeight);