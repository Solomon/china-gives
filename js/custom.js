function equalHeight() {
	var pw = $('div.person').width();
	$('div.person').css({
	    'height': pw + 'px'
	});
}

$(document).ready(equalHeight);
$(window).resize(equalHeight);


function init_chartist(){
	var times = function(n) {
  		return Array.apply(null, new Array(n));
	};

	var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
	  data.labels.push(index + 1);
	  data.series.forEach(function(series) {
	    series.push(Math.random() * 100)
	  });

	  return data;
	}, {
	  labels: [],
	  series: times(4).map(function() { return new Array() })
	});

	var options = {
	  showLine: false,
	  axisX: {
	    labelInterpolationFnc: function(value, index) {
	      return index % 13 === 0 ? 'W' + value : null;
	    }
	  }
	};

	var responsiveOptions = [
	  ['screen and (min-width: 640px)', {
	    axisX: {
	      labelInterpolationFnc: function(value, index) {
	        return index % 4 === 0 ? 'W' + value : null;
	      }
	    }
	  }]
	];

	new Chartist.Line('.ct-chart', data, options, responsiveOptions);

}

//$(document).ready(init_chartist);

function google_chart(){

	google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {

      var data = google.visualization.arrayToDataTable([
        ['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
        ['CAN',    80.66,              1.67,      'North America',  33739900],
        ['DEU',    79.84,              1.36,      'Europe',         81902307],
        ['DNK',    78.6,               1.84,      'Europe',         5523095],
        ['EGY',    72.73,              2.78,      'Middle East',    79716203],
        ['GBR',    80.05,              2,         'Europe',         61801570],
        ['IRN',    72.49,              1.7,       'Middle East',    73137148],
        ['IRQ',    68.09,              4.77,      'Middle East',    31090763],
        ['ISR',    81.55,              2.96,      'Middle East',    7485600],
        ['RUS',    68.6,               1.54,      'Europe',         141850000],
        ['USA',    78.09,              2.05,      'North America',  307007000]
      ]);

      var options = {
        title: 'Correlation between life expectancy, fertility rate and population of some world countries (2010)',
        hAxis: {title: 'Life Expectancy'},
        vAxis: {title: 'Fertility Rate'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
}

//$(document).ready(google_chart);