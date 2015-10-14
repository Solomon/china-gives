function equalHeight() {
	var pw = $('div.person').width();
	$('div.person').css({
	    'height': pw + 'px'
	});
}

$(document).ready(equalHeight);
$(window).resize(equalHeight);


function rand_name()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 2; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

if ($('#series_chart_div').length > 0){

  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawSeriesChart);

  function drawSeriesChart() {


    var rand_data = [];
    rand_data.push(['Name', 'National Total %', 'Generosity %',  'Industry',       'Donations']);

    var industry = ['IT', 'Manufacturing', 'Finances', 'Real Estate'];
    for (var i = 0; i < 100; i++) {
        var total = (Math.floor(Math.random() * 500) + 20) / 100;
        var gener = (Math.floor(Math.random() * 70) + 20);
        var ind = industry[(Math.floor(Math.random() * 4) + 0)];
        var don = Math.floor(Math.random() * 100000000) + 100000;
        var name = rand_name(); 
        rand_data.push([name, total, gener, ind, don]);
    };



    var data = google.visualization.arrayToDataTable(rand_data);

    var options = {
     // title: 'Correlation between life expectancy, fertility rate and population of some world countries (2010)',
      hAxis: {title: 'National Total %'},
      vAxis: {title: 'Generosity %'},
      bubble: {textStyle: {fontSize: 11}}
    };

    var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    chart.draw(data, options);
  }
}