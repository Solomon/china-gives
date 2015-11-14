var national_total = 104226;
var current_chart;
var current_data;
var chart_data_res;
var chart_data_months_res;
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

function generosity_data() {
  if (!chart_data_res)
    chart_data_res = chart_data();  
  var rand_data = [];
  var filtered_data = jQuery.grep(chart_data_res, function(item) {
                        return item['Generosity'];
                      });
  rand_data.push(["Name Eng", "National Total", "Generosity", "Industry", "Total Amount (million Yuan)"]);
  jQuery.each(filtered_data, function(index, item) {
    rand_data.push([get_initals(item["Name Eng"]), (item["Total Amount (million Yuan)"] / national_total) * 100, get_float_from_string(item['Generosity']), 
                    trsl(item["Industry"]), item["Total Amount (million Yuan)"]]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function get_float_from_string(str){
  if (str)
    return parseFloat(str.replace('%', ''));
  return 0;
}

function industry_list(){
  return trsl_arr(['Manufacturing', 'Real Estate', 'Energy', 'Consumer', 'Tech/IT', 'Finance', 'Education', 'Healthcare', 'Transportation', 'Other']);
}

function map_colors(){
  return ['#368DB9', '#A51C30', '#FAAE53', '#52854C', '#293352', '#36B9A4', '#a51c75', '#53faae', '#857f4c', '#7b8280'];
}

function randomize_axis(){
  return ((Math.floor(Math.random() * 4) - 2)/10);
}

function industry_data() {
  if (!chart_data_res)
    chart_data_res = chart_data();
  var rand_data = [];
  rand_data.push(["Name Eng", "Industry Int", "Total Amount (million Yuan)", "Industry", "Total Amount (million Yuan)"]);
  var industries = industry_list();
  jQuery.each(chart_data_res, function(index, item) {
     rand_data.push([get_initals(item["Name Eng"]), industries.indexOf(trsl(item["Industry"])) + 1 + randomize_axis(), item["Total Amount (million Yuan)"], trsl(item["Industry"]), 
                     item["Total Amount (million Yuan)"]]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function focus_data() {
  if (!chart_data_res)
    chart_data_res = chart_data();
  var rand_data = [];
  rand_data.push(["Name Eng", "National Total", "Focus", "Industry", "Total Amount (million Yuan)"]);
  jQuery.each(chart_data_res, function(index, item) {
     rand_data.push([get_initals(item["Name Eng"]), (item["Total Amount (million Yuan)"] / national_total) * 100, get_focus(item), trsl(item["Industry"]), item["Total Amount (million Yuan)"]]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function get_focus(item){
  var i = 0;
  var focuses = ["Education", "Environment", "Healthcare", "Social Welfare", "Disaster Relief", "Culture"];
  jQuery.each(focuses, function(index, focus) {     
    if (item[focus] > 0)
      i++;
  });
  return i;
}

function get_initals(name){

  if (is_chinese()){
    if (!chart_data_res)
      chart_data_res = chart_data();
    var this_data = jQuery.grep(chart_data_res, function(item) {
                      return item["Name Eng"] == name;
                    });
    if (this_data.length > 0)
      return this_data[0]["Name CN"];
    return name;
  }

  var res = '';
  jQuery.each(name.split(' '), function(index, splitted) {
      if (splitted[0])
        res += splitted[0];
  });
  return res;
}

function months_data() {
  if (!chart_data_months_res)
    chart_data_months_res = chart_month_data();
  var rand_data = [];
  rand_data.push(['test', 'test1', 'test2', 'test3', 'Total Amount']);
  jQuery.each(chart_data_months_res, function(index, item) {    
      rand_data.push([item['Amount'] + '', index + 1, 1, 1, item['Amount']]);
  });
  var data = google.visualization.arrayToDataTable(rand_data);
  return data;
}

function age_data() {
  if (!chart_data_res)
    chart_data_res = chart_data();
  var rand_data = [];
  rand_data.push(["Name Eng", "Age", "National Total", "Industry", "Size"]);
  jQuery.each(chart_data_res, function(index, item) {
    if (item["Age"] > 0)
      rand_data.push([get_initals(item["Name Eng"]), item["Age"], (item["Total Amount (million Yuan)"] / national_total) * 100, trsl(item["Industry"]), 2]);
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
          title: trsl('National Total %'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          baseline: -0.05,
          ticks: [{v: -0.05, f: ''},{v: 0, f: '0.00'},{v: 0.1, f: '0.1'},
                {v: 0.2, f: '0.2'},{v: 0.3, f: '0.3'},{v: 0.4, f: '0.4'},{v: 0.5, f: '0.5'}]
        },
        hAxis: {
          title: trsl('Age'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          baseline: 30,
          ticks: [{v: 30, f: '30'},{v: 40, f: '40'},
                  {v: 50, f: '50'},{v: 60, f: '60'},{v: 70, f: '70'},{v: 80, f: '80'}]
        },
        colors: map_colors(),
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
      bubble: {
        textStyle: {
          fontSize: 12,
          fontName: 'Roboto',
          color: '#fff',
          bold: true,
        }
      },  
      vAxis: {
        title: trsl('Generosity %'),
        gridlineColor: 'transparent',
        baselineColor: 'black',
        baseline: -0.7,
        ticks: [{v: -0.7, f: ''},{v: 0, f: '0'},{v: 1, f: '1'},
                {v: 2, f: '2'},{v: 3, f: '3'},{v: 4, f: '4'},{v: 5, f: '5'},{v: 6, f: '6'},{v: 7, f: ''}]
      },
      hAxis: {        
        title: trsl('National Total %'),
        gridlineColor: 'transparent',
        baselineColor: 'black',        
        baseline: -0.005,
        ticks: [{v: -0.005, f: ''},{v: 0, f: '0.00'},{v: 0.1, f: '0.1'},
                {v: 0.2, f: '0.2'},{v: 0.3, f: '0.3'},{v: 0.4, f: '0.4'},{v: 0.5, f: '0.5'}]
      },
      colors: map_colors(),
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
  var h_ticks = [];
  var industries = industry_list();  
  h_ticks.push({v: 0, f: ''});
  jQuery.each(industries, function(index, item) {
     h_ticks.push({v: index + 1, f: item});
  });
  h_ticks.push({v: industries.length + 1, f: ''});
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
          title: trsl('Total Amount'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          baseline: -10,
          ticks: [{v: -10, f: ''},{v: 0, f: ''},{v: 5, f: '5 m'},{v: 10, f: ''},{v: 20, f: ''},{v: 30, f: ''},{v: 50, f: '50 m'},{v: 100, f: '100 m'},
                  {v: 200, f: '200 m'},{v: 300, f: '300 m'},{v: 400, f: '400 m'},{v: 500, f: '500 m'}]
        },
        hAxis: {
          title: trsl('Industry'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: h_ticks
        },
        colors: map_colors(),
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
          title: trsl('Chronological'),
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
          title: trsl('Focus Areas'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: [{v: 0, f: ''},{v: 1, f: '1'},
                  {v: 2, f: '2'},{v: 3, f: '3'},
                  {v: 4, f: ''}]
        },
        hAxis: {
          title: trsl('National Total %'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: [{v: 0, f: '0.0'}, {v: 0.1, f: '0.1'},
                  {v: 0.2, f: '0.2'},{v: 0.3, f: '0.3'},
                  {v: 0.4, f: '0.4'},{v: 0.5, f: '0.5'}]
        },
        colors: map_colors(),
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
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(age_data(), options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_generousity_chart(){
  var options = generosity_options();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(generosity_data(), options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_industry_chart(){
  var options = industry_options();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(industry_data(), options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_months_chart(){
  var options = months_options();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(months_data(), options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_focus_chart(){
  var options = focus_options();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));  
  current_chart.draw(focus_data(), options);  
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
      case 'industry':
        draw_industry_chart();
      break;  
      case 'months':
        draw_months_chart();
      break;
      case 'focus':
        draw_focus_chart();
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
            scrollTop: $('#person-container-' + id).offset().top - 430
          }, 2000);
        }
        else {
          $('html, body').animate({
            scrollTop: $('#person-container-' + id).offset().top - 70
          }, 2000);
        }
        $('.person-box').removeClass('selected');      
        $('#person-container-' + id).addClass('selected');
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
  if (!chart_data_res)
    chart_data_res = chart_data();
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
      case 'industry':
        return draw_industry_chart;
      break;  
      case 'months':
        return draw_months_chart;
      break;
      case 'focus':
        return draw_focus_chart;
      break;
      default:
        return draw_generousity_chart;
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
      case 'industry':
        draw_industry_chart();
      break;  
      case 'months':
        draw_months_chart();
      break;
      case 'focus':
        draw_focus_chart();
      break;
      default:
        history.pushState('', '', get_base_url() + '?generosity');
        draw_generousity_chart();
      break;
  }  
}