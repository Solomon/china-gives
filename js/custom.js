
var current_chart;
var current_data;
var is_click_inited = false;
var is_chart_closed = false;
function str_starts(full, str){
  return full.slice(0, str.length) == str;
}

function arr_last(arr){
  return arr[arr.length - 1];
}

function equalHeightCols() {
  var rowHeight = $('#equalcols').height();
  $('#equalcols [class*="col-"]').css({
      'height': rowHeight + 'px'
  });   
}

function resize_charts() {
  make_routing();   
}

function map_height() {
  var map_width = $('#map').width();
  $('#map > svg').css({
    'max-height': (map_width/1.25) + 'px'
  });
}

function must_fix(that){
  return $(that).scrollTop() > 116 && $(window).height() >= 600;
}

function will_fix(that){
  return $(that).scrollTop() <= 116 && $(window).height() >= 600;
}


function fix_chart(that){
  var wrap = $("#page-top");
  if (must_fix(that)) {
    wrap.addClass("fix-charts");
  } else {
    wrap.removeClass("fix-charts");
  }
  if (is_chart_closed) {
    var chart_container = $('#charts-container');
    if ($(that).scrollTop() <= 116 && chart_container.hasClass('closed'))
        chart_container.removeClass('closed');
    else if ($(that).scrollTop() > 116 && !chart_container.hasClass('closed'))
        chart_container.addClass('closed');
  }
}

function auto_hide_fixed_charts() {

  if ($("#maps").length <= 0)
    return;

  var maps_position = $("#maps").offset().top;
    
  if ($('#page-top').hasClass('fix-charts') && !is_chart_closed) {
    if ( $(document).scrollTop() >= maps_position - 400) {
      $('#charts-container').addClass('closed');
    }
    else if ($(document).scrollTop() < maps_position - 400 && is_click_inited) {
      $('#charts-container').removeClass('closed');
      $('#charts-container').addClass('reopened');
    }
  }
}

function rand_name() {
    var text = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 2; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function char_to_int(chars){
  return chars[chars.length - 1].charCodeAt(0);
}

function used_letters(){
  var letters = [];
  var v_options = []
  if (!current_data)
    current_data = init_data();
  jQuery.each(current_data, function(index, item) {
     var int_char =  char_to_int(item[0]);
     if (!$.inArray(int_char, letters)){
       letters.push(int_char);
       v_options.push({v: int_char, f: arr_last(item[0])});
     }
  });
  return v_options;
}

function init_data() {
  var rand_data = [];
  rand_data.push(['Name', 'National Total %', 'Generosity %', 'Age', 'Industry', 'Donations', 'Total Amount', 'Industry Data', 'Focus Areas']);

  var industry = ['IT', 'Manufacturing', 'Finances', 'Real Estate'];
  for (var i = 0; i < 100; i++) {
      var national = (Math.floor(Math.random() * 500) + 20) / 100;
      var age = Math.floor(Math.random() * 50) + 25;
      var ind_rand = (Math.floor(Math.random() * 4) + 0);
      var ind = industry[ind_rand];
      var ind_data = ind_rand + 1 + ((Math.floor(Math.random() * 4) - 2)/10);
      var don = Math.floor(Math.random() * (100000000 - 500000 + 1)) + 500000;      
      var gener = (Math.floor(Math.random() * 70) + 20);
      var name = rand_name(); 
      var total = (Math.floor(Math.random() * (2000000000 - 120000000 + 1)) + 120000000) / 1000000;
      var focus_area = (Math.floor(Math.random() * 5) + 1);
      rand_data.push([name, national, gener, age, ind, don, Math.round(total * 100) / 100, ind_data, focus_area]);
  };
  return rand_data;
}

function generosity_data() {
  var rand_data = [];
  jQuery.each(current_data, function(index, item) {
     if (index <= 50)
        rand_data.push([item[0], item[1], item[2], item[4], item[6]]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function donation_data() {
  var rand_data = [];
  jQuery.each(current_data, function(index, item) {
     rand_data.push([item[0], item[1], item[6], item[4], item[6]]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function industry_data() {
  var rand_data = [];
  jQuery.each(current_data, function(index, item) {
     rand_data.push([item[0], item[7], item[6], item[4], item[6]]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function focus_data() {
  var rand_data = [];
  jQuery.each(current_data, function(index, item) {
     rand_data.push([item[0], item[1], item[8], item[4], item[6]]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function months_data() {
  var rand_data = [];

  rand_data.push(['test', 'test1', 'test2', 'test3', 'Total Amount']);
  for (var i = 1; i <= 12; i++) {
    var don = Math.floor((Math.floor(Math.random() * 100000000) + 500000)/12);
    var naming = (don / 1000000).toFixed(2) + '';
    rand_data.push([naming, i, 1, 1, don]);
  }

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

function alphabetical_data() {
  var rand_data = [];
  rand_data.push(['Name', 'Letter', 'Total Amount', 'Industry', 'Total Amount']);
  jQuery.each(current_data, function(index, item) {
     if (index > 0)
       rand_data.push([item[0], char_to_int(item[0]), item[6], item[4], item[6]]);
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
          baseline: 20,
          ticks: [{v: 20, f: ''},{v: 30, f: '30'},{v: 40, f: '40'},
                  {v: 50, f: '50'},{v: 60, f: '60'},{v: 70, f: '70'},{v: 85, f: ''}]
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
        backgroundColor: { fill:'transparent' },
        'tooltip' : {
          trigger: 'none'
        }
      };
}

function donation_options(){
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
          title: 'Total Amount',
          gridlineColor: 'transparent',
          baselineColor: 'black',
          baseline: 1,
          ticks: [{v: 1, f: ''},{v: 5, f: ''},{v: 10, f: ''},{v: 100, f: '100 m'},{v: 500, f: '500 m'},
                  {v: 1000, f: '1 b'},{v: 2000, f: '2 b'},{v: 2500, f: '2.5 b'}]
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
          duration: 2000,
          easing: 'out'
        },
        backgroundColor: { fill:'transparent' },
        'tooltip' : {
          trigger: 'none'
        }
      };
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
      backgroundColor: { fill:'transparent' },
        'tooltip' : {
          trigger: 'none'
        }
    };
}

function industry_options(){
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
          title: 'Total Amount',
          gridlineColor: 'transparent',
          baselineColor: 'black',
          baseline: 1,
          ticks: [{v: 1, f: ''},{v: 5, f: ''},{v: 10, f: ''},{v: 100, f: '100 m'},{v: 500, f: '500 m'},
                  {v: 1000, f: '1 b'},{v: 2000, f: '2 b'},{v: 2500, f: '2.5 b'}]
        },
        hAxis: {
          title: 'Industry',
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: [{v: 0, f: ''},{v: 1, f: 'IT'},
                  {v: 2, f: 'Manufacturing'},{v: 3, f: 'Finances'},{v: 4, f: 'Real Estate'},{v: 5, f: ''}]
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
        backgroundColor: { fill:'transparent' },
        'tooltip' : {
          trigger: 'none'
        }
      };
}

function months_options(){
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
          title: '',
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: [{v: 0, f: ''},{v: 1, f: ''},
                  {v: 2, f: ''}]
        },
        hAxis: {
          title: 'Months',
          gridlineColor: 'transparent',
          baselineColor: 'transparent',
          ticks: [{v: 0, f: ''}, {v: 1, f: 'Sep 14'}, {v: 2, f: 'Oct 14'},
                  {v: 3, f: 'Nov 14'},{v: 4, f: 'Dec 14'},{v: 5, f: 'Jan 15'},{v: 6, f: 'Feb 15'},
                  {v: 7, f: 'Mar 15'},{v: 8, f: 'Apr 15'},{v: 9, f: 'May 15'},{v: 10, f: 'Jun 15'},
                  {v: 11, f: 'Jul 15'},{v: 12, f: 'Aug 15'},{v: 13, f: ''}]
        },
        chartArea:{left:'10%',top:20,width:'80%',height:'80%'},
        legend: {
          alignment: 'center',
          position: 'top'
        },
        animation:{
          duration: 2000,
          easing: 'out'
        },
        backgroundColor: { fill:'transparent' },
        'tooltip' : {
          trigger: 'none'
        },
        colors: ['#293352']
      };
}

function focus_options(){
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
          title: 'Focus Areas',
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: [{v: 0, f: ''},{v: 1, f: '1'},
                  {v: 2, f: '2'},{v: 3, f: '3'},
                  {v: 4, f: '4'},{v: 5, f: '5'},
                  {v: 6, f: '6'}]
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
          duration: 2000,
          easing: 'out'
        },
        backgroundColor: { fill:'transparent' },
        'tooltip' : {
          trigger: 'none'
        }
      };  
}

function alphabetical_options(){
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
          title: 'Total Amount',
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: [{v: 1, f: ''},{v: 5, f: ''},{v: 10, f: ''},{v: 100, f: '100 m'},{v: 500, f: '500 m'},
                  {v: 1000, f: '1 b'},{v: 2000, f: '2 b'},{v: 2500, f: '2.5 b'}]
        },
        hAxis: {
          title: '',
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: used_letters()
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
        backgroundColor: { fill:'transparent' },
        'tooltip' : {
          trigger: 'none'
        }
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
  fix_chart(window);
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

function draw_donation_chart(){
  var options = donation_options();
  if (!current_data)
    current_data = init_data();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(donation_data(), options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_industry_chart(){
  var options = industry_options();
  if (!current_data)
    current_data = init_data();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(industry_data(), options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_months_chart(){
  var options = months_options();
  if (!current_data)
    current_data = init_data();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(months_data(), options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_focus_chart(){
  var options = focus_options();
  if (!current_data)
    current_data = init_data();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));  
  current_chart.draw(focus_data(), options);  
  init_chart_onclick();
  fix_chart(window);
}

function draw_alphabetical_chart() {
  var options = alphabetical_options();
  if (!current_data)
    current_data = init_data();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(alphabetical_data(), options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_charts(chart_type){
    activate_link(chart_type);
    switch (chart_type){
      case 'age':
        draw_age_charts();
      break;
      case 'generosity':
        draw_generousity_chart();
      break;
      case 'donation':
        draw_donation_chart();
      break;  
      case 'industry':
        draw_industry_chart();
      break;  
      case 'months':
        draw_months_chart();
      break;
      case 'focus':
        draw_focus_chart();
      break;
      case 'alphabetical':
        draw_alphabetical_chart();
      break;
    }  
}

function activate_link(chart_type){  
    $('#charts-container .chart-options li').removeClass('active');
    var active_anchor = $('#charts-container .chart-options a[data-chart-type="' + chart_type + '"]');
    active_anchor.parents('li').first().addClass('active');
    $('#charts-header .section-heading').html(active_anchor.data('chart-name'));
}

function init_chart_onclick(){
  if (!is_click_inited){
    google.visualization.events.addListener(current_chart, 'click', function(e) {
      var id = e.targetID;
      if (str_starts(id, 'bubble') && get_param() != 'months') {
        id = arr_last(id.split('#'));
        var chart_container = $('#charts-container');
        if (($('#page-top').hasClass('fix-charts') || will_fix(window)) && !is_chart_closed) {
          $('html, body').animate({
            scrollTop: $('#person-container-' + id).offset().top - 425
          }, 2000);
        }
        else {
          $('html, body').animate({
            scrollTop: $('#person-container-' + id).offset().top - 65
          }, 2000);
        }
        $('.person-info-box').removeClass('selected');      
        $('#person-container-' + id + ' .person-info-box').addClass('selected');
      }
    });

    is_click_inited = true;
  }
}

$(function (){
  var base_url = get_base_url();
  $(window).scroll(function(e) {
    fix_chart(this);
    auto_hide_fixed_charts();
  });
  equalHeightCols();
  $('#charts-container .chart-options a').click(function (event){    
    var chart_type = $(this).data('chart-type');
    draw_charts(chart_type);
    history.pushState('', '', base_url + $(this).attr('href'));
    event.preventDefault();
  });
  make_routing();

  $('#chart-toggle').click(function (){
    var chart_container = $('#charts-container');
    is_chart_closed = !chart_container.hasClass('closed'); 
    if (!is_chart_closed)
      chart_container.removeClass('closed');
    else
      chart_container.addClass('closed');
  });

  auto_hide_fixed_charts();

  resize_charts();

  map_height();

  $('[data-toggle="tooltip"]').tooltip();

});

$(window).on('resize', function(){

  resize_charts();
  map_height();

});

if ($('#series_chart_div').length > 0) {
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(get_chart_route);
}

function get_chart_route(){
  if ($('#series_chart_div').length <= 0)
    return;
  var type = get_param();
  activate_link(type);
  switch (type) {
      case 'age':
        return draw_age_charts;
      break;
      case 'generosity':
        return draw_generousity_chart;
      break;
      case 'donation':
        return draw_donation_chart;
      break;  
      case 'industry':
        return draw_industry_chart;
      break;  
      case 'months':
        return draw_months_chart;
      break;
      case 'focus':
        return draw_focus_chart;
      break;
      case 'alphabetical':
        return draw_alphabetical_chart;
      break;
      default:
        return draw_donation_chart;
      break;
  }  

}

function get_param(){
   return window.location.href.indexOf("?") > -1 ? without_hash(window.location.href.split('?')[1]) : '';
}

function without_hash(str){
   return str.indexOf("#") > -1 ? str.split('#')[0] : str;
}

function get_base_url(){
  return window.location.href.indexOf("?") > -1 ? window.location.href.split('?')[0] : window.location.href;
}

function make_routing(){
  if ($('#series_chart_div').length <= 0)
    return;
  var type = get_param();
  activate_link(type);
  switch (type) {
      case 'age':
        draw_age_charts();
      break;
      case 'generosity':
        draw_generousity_chart();
      break;
      case 'donation':
        draw_donation_chart();
      break;  
      case 'industry':
        draw_industry_chart();
      break;  
      case 'months':
        draw_months_chart();
      break;
      case 'focus':
        draw_focus_chart();
      break;
      case 'alphabetical':
        draw_alphabetical_chart();
      break;
      default:
        history.pushState('', '', get_base_url() + '?donation');
        draw_donation_chart();
      break;
  }  
}
