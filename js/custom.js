function str_starts(full, str){
  return full.slice(0, str.length) == str;
}

function arr_last(arr){
  return arr[arr.length - 1];
}

function equalHeight() {
	var pw = $('div.person').width();
	$('div.person').css({
	    'height': pw + 'px'
	});
}

$(document).ready(equalHeight);
$(window).resize(equalHeight);


var current_chart;
var current_data;
var is_click_inited = false;

function fix_chart(that){
  var wrap = $("#page-top");
  if ($(that).scrollTop() > 116) {
    wrap.addClass("fix-charts");
  } else {
    wrap.removeClass("fix-charts");
  }
}

function rand_name()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 2; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function generosity_options() {
    return {
     // title: 'Correlation between life expectancy, fertility rate and population of some world countries (2010)',
      bubble: {
        textStyle: {
          fontSize: 12,
          fontName: 'Roboto',
          color: '#fff',
          bold: true,
        }
      },  
      vAxis: {
        title: 'Generosity %',
        gridlineColor: 'transparent',
        baselineColor: 'black'
      },
      hAxis: {        
        title: 'National Total %',
        gridlineColor: 'transparent',
        baselineColor: 'black'
      },
      colors: ['#368DB9', '#A51C30', '#FAAE53', '#52854C', '#293352'],
      chartArea:{left:'10%',top:20,width:'80%',height:'80%'},
      legend: {
        alignment: 'center',
        position: 'top'
      },
      animation:{
        duration: 1000,
        easing: 'out'
      },
      backgroundColor: { fill:'transparent' }
    };
}

function init_data() {
  var rand_data = [];
  rand_data.push(['Name', 'National Total %', 'Generosity %', 'Age', 'Industry', 'Donations']);

  var industry = ['IT', 'Manufacturing', 'Finances', 'Real Estate'];
  var ages = [1,2,3,4]
  for (var i = 0; i < 100; i++) {
      var total = (Math.floor(Math.random() * 500) + 20) / 100;
      var age = ages[(Math.floor(Math.random() * 4) + 0)] + ((Math.floor(Math.random() * 4) - 2) / 10);
      var ind = industry[(Math.floor(Math.random() * 4) + 0)];
      var don = Math.floor(Math.random() * 100000000) + 100000;
      var gener = (Math.floor(Math.random() * 70) + 20);
      var name = rand_name(); 
      rand_data.push([name, total, gener, age, ind, don]);
  };
  return rand_data;
}

function generosity_data() {
    var rand_data = [];
  jQuery.each(current_data, function(index, item) {
     rand_data.push([item[0], item[1], item[2], item[4], item[5]]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function age_data() {
  var rand_data = [];
  jQuery.each(current_data, function(index, item) {
      if (index == 0)      
        rand_data.push([item[0], item[3], item[2], item[4], '']);
      else
        rand_data.push([item[0], item[3], item[2], item[4], 2]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function age_options(){
  return {
        bubble: {
          textStyle: {
            fontSize: 12,
            fontName: 'Roboto',
            color: '#fff',
            bold: true,
          }
        },  
        vAxis: {
          title: 'Generosity %',
          gridlineColor: 'transparent',
          baselineColor: 'black'
        },
        hAxis: {
          title: 'Age',
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: [{v: 0, f: ''},{v: 1, f: 'under 30'},{v: 2, f: '31 - 45'},
                  {v: 3, f: '45 - 60'},{v: 4, f: 'above 60'},{v: 5, f: ''}]
        },
        colors: ['#368DB9', '#A51C30', '#FAAE53', '#52854C', '#293352'],
        chartArea:{left:'10%',top:20,width:'80%',height:'80%'},
        legend: {
          alignment: 'center',
          position: 'top'
        },
        animation:{
          duration: 2000,
          easing: 'out'
        },
        backgroundColor: { fill:'transparent' }
      };
}

function draw_age_charts(){
  var options = age_options();
  if (!current_data)
    current_data = init_data();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(age_data(), options);
  init_chart_onclick();
}

function draw_generousity_chart(){
  var options = generosity_options();
  if (!current_data)
    current_data = init_data();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(generosity_data(), options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_charts(chart_type){
    $('.chart-options li').removeClass('active');
    $('.chart-options a[data-chart-type="' + chart_type + '"]').parents('li').first().addClass('active');
    switch (chart_type){
      case 'age':
        draw_age_charts();
      break;
      case 'donation':
        draw_generousity_chart();
      break;  
    }  
}


function init_chart_onclick(){
  if (!is_click_inited){
    google.visualization.events.addListener(current_chart, 'click', function(e) {
      var id = e.targetID;
      if (str_starts(id, 'bubble')){
        id = arr_last(id.split('#'));
        console.log(id);
        $('html, body').animate({
          scrollTop: $('#person-container-' + id).offset().top - 425
        }, 2000);
        $('.person-info-box').removeClass('selected');      
        $('#person-container-' + id + ' .person-info-box').addClass('selected');
      }
    });
    is_click_inited = true;
  }
}

$(function (){
  $(window).scroll(function(e) {
    fix_chart(this);
  });

  $('.chart-options a').click(function (){
    var chart_type = $(this).data('chart-type');
    draw_charts(chart_type);
  });
});

if ($('#series_chart_div').length > 0) {
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(draw_generousity_chart);  
}