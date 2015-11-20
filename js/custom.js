var national_total = 104226;
var current_chart;
var current_data;
var chart_data_res;
var chart_data_months_res;
var is_click_inited = false;
var is_chart_closed = false;
var currentMousePos = { x: -1, y: -1 };

var c_c_h;
var c_c_w;

function get_chart_container_sizes(){
  c_c_h = $('#series_chart_div').height();
  c_c_w = $(window).width();
}

function str_starts(full, str){
  return full.slice(0, str.length) == str;
}

function arr_last(arr){
  return arr[arr.length - 1];
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
  return $(that).scrollTop() > 40 && $(window).height() >= 600;
}

function will_fix(that){
  return $(that).scrollTop() <= 40 && $(window).height() >= 600;
}


function fix_chart(that){
  var wrap = $("#page-top");
  if (must_fix(that)) {
    if (!wrap.hasClass("fix-charts")){
      wrap.addClass("fix-charts");
      get_chart_container_sizes();
      make_routing();
    }
  } else {
    if (wrap.hasClass("fix-charts")){
      wrap.removeClass("fix-charts");
      get_chart_container_sizes();
      make_routing();
    }
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
  if ($("#charts").length <= 0)
    return;
  var footer_position = $('.site-footer').offset().top;    
  if ($('#page-top').hasClass('fix-charts') && !is_chart_closed) {
    if ( $(document).scrollTop() >= footer_position - 500) {
      $('#charts-container').addClass('closed');
    }
    else if ($(document).scrollTop() < footer_position - 500 && is_click_inited) {
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
  rand_data.push(["Name Eng", "Total Amount (million Yuan)", "Generosity", "Industry", "Total Amount (million Yuan)"]);
  jQuery.each(filtered_data, function(index, item) {
    rand_data.push([get_initals(item["Name Eng"]), item["Total Amount (million Yuan)"], get_float_from_string(item['Generosity']), 
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

function map_colors(ch_data){
  var def_colors = [['Manufacturing', '#368DB9'], ['Real Estate', '#A51C30'], ['Energy', '#FAAE53'], ['Consumer', '#52854C'], ['Tech/IT','#293352'], 
                    ['Finance', '#48c4b7'], ['Education', '#861657'], ['Healthcare', '#CED665'], ['Transportation', '#8C8179'], ['Other', '#80475E']];
  var res_colors = [];                  
  var res_ind = [];
  jQuery.each(ch_data.Gf, function(index, item) {
    if ($.inArray(trsl(item.c[3].v), res_ind) < 0){
      var item_color = jQuery.grep(def_colors, function(col) {
                        return trsl(col[0]) == trsl(item.c[3].v);
                      });
      res_colors.push(item_color[0][1]);
      res_ind.push(trsl(item.c[3].v));
   }
  });
  return res_colors;
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
  rand_data.push(["Name Eng", "Total Amount (million Yuan)", "Focus", "Industry", "Total Amount (million Yuan)"]);
  jQuery.each(chart_data_res, function(index, item) {
     rand_data.push([get_initals(item["Name Eng"]), item["Total Amount (million Yuan)"], get_focus(item), trsl(item["Industry"]), item["Total Amount (million Yuan)"]]);
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
  rand_data.push(['t1', 't2', 't3', 't4', 'Total Amount']);
  jQuery.each(chart_data_months_res, function(index, item) {    
      rand_data.push([trsl_int('¥' + item['Amount'] + ' m'), index + 1, 1, 1, item['Amount']]);
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

function focus_type_data(type){
  if (!chart_data_res)
    chart_data_res = chart_data();  
  var rand_data = [];
  var filtered_data = jQuery.grep(chart_data_res, function(item) {
                        return item[type];
                      });
  rand_data.push(["Name Eng", "Total Donations", trsl('Donations in ' + type), "Industry", "Total Amount (million Yuan)"]);
  jQuery.each(filtered_data, function(index, item) {
    rand_data.push([get_initals(item["Name Eng"]), item["Total Amount (million Yuan)"], item[type],
                    trsl(item["Industry"]), item["Total Amount (million Yuan)"]]);
  });
  return rand_data
}

function age_options(ch_data){
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
        colors: map_colors(ch_data),
        chartArea:{left:80,top:30,width: c_c_w - 160,height: c_c_h - 80},
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


function generosity_options(ch_data) {
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
        title: trsl('Total Amount (Million Yuan)'),
        gridlineColor: 'transparent',
        baselineColor: 'black',   
        ticks: [{v: 0, f: ''}, {v: 100, f: '100'},
                {v: 200, f: '200'},{v: 300, f: '300'},{v: 400, f: '400'},{v: 500, f: '500'}]
      },
      colors: map_colors(ch_data),
      chartArea:{left:80,top:30,width: c_c_w - 160,height: c_c_h - 80},
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

function industry_options(ch_data){
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
          title: trsl('Total Amount (Million Yuan)'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          baseline: -10,
          ticks: [{v: -10, f: ''},{v: 0, f: ''},{v: 5, f: '5'},{v: 10, f: ''},{v: 20, f: ''},{v: 30, f: ''},{v: 50, f: '50'},{v: 100, f: '100'},
                  {v: 200, f: '200'},{v: 300, f: '300'},{v: 400, f: '400'},{v: 500, f: '500'}]
        },
        hAxis: {
          title: trsl('Industry'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: h_ticks
        },
        colors: map_colors(ch_data),
        chartArea:{left:80,top:30,width: c_c_w - 160,height: c_c_h - 80},
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
        sizeAxis: {
          minSize: 23,
          maxSize: 45
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
          ticks: [{v: 0, f: ''}, {v: 1, f: trsl('Sep 14')}, {v: 2, f: trsl('Oct 14')},
                  {v: 3, f: trsl('Nov 14')},{v: 4, f: trsl('Dec 14')},{v: 5, f: trsl('Jan 15')},{v: 6, f: trsl('Feb 15')},
                  {v: 7, f: trsl('Mar 15')},{v: 8, f: trsl('Apr 15')},{v: 9, f: trsl('May 15')},{v: 10, f: trsl('Jun 15')},
                  {v: 11, f: trsl('Jul 15')},{v: 12, f: trsl('Aug 15')},{v: 13, f: ''}]
        },
        chartArea:{left:80,top:30,width: c_c_w - 160,height: c_c_h - 80},
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
        },
        colors: ['#293352']
      };
}

function focus_options(ch_data){
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
                  {v: 4, f: '4'},{v: 5, f: ''}]
        },
        hAxis: {
          title: trsl('Total Amount (Million Yuan)'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          ticks: [{v: 0, f: ''}, {v: 100, f: '100'},
                  {v: 200, f: '200'},{v: 300, f: '300'},{v: 400, f: '400'},{v: 500, f: '500'}]
        },
        colors: map_colors(ch_data),
        chartArea:{left:80,top:30,width: c_c_w - 160,height: c_c_h - 80},
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

function focus_type_options(ch_data, data, type){
  var ticks = focus_type_ticks(type);
  return {
        bubble: {
          textStyle: {
            fontSize: 12,
            fontName: 'Roboto',
            color: '#fff',
            bold: true
          }
        },  
        vAxis: {          
          title: trsl('Total Donations (Million Yuan)'),    
          gridlineColor: 'transparent',
          baselineColor: 'black',
          baseline: ticks.v[0].v,
          ticks: ticks.v      
        },
        hAxis: {      
          title: trsl(type + ' Donations (Million Yuan)'),
          gridlineColor: 'transparent',
          baselineColor: 'black',
          baseline: ticks.h[0].v,
          ticks: ticks.h          
        },
        colors: map_colors(ch_data),
        chartArea:{left:80,top:30,width: c_c_w - 160,height: c_c_h - 80},
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

function focus_type_ticks(type){  
  switch (type) {      
      case 'Education':
        return {
                  v: [{v: -10, f: ''},{v: 0, f: '0'},{v: 100, f: '100'},
                      {v: 200, f: '200'},{v: 300, f: '300'}, {v: 400, f: '400'}],
                  h: [{v: 0, f: '0'},{v: 100, f: '100'},
                      {v: 200, f: '200'},{v: 300, f: '300'}, {v: 400, f: '400'}]
               };
      break;
      case 'Environment':
        return {
                v: [{v: -5, f: ''},{v: 0, f: '0'},{v: 10, f: '10'},
                    {v: 20, f: '20'},{v: 30, f: '30'}],
                h:
                  [{v: 0, f: '0'},{v: 25, f: '25'},
                   {v: 50, f: '50'},{v: 75, f: '75'}, {v: 100, f: '100'},
                   {v: 125, f: '125'}, {v: 150, f: '150'}]
               };
      break;      
      case 'Healthcare':
        return  {
                  v: [{v: -5, f: ''},{v: 0, f: '0'},{v: 50, f: '50'},
                      {v: 100, f: '100'},{v: 150, f: '150'}],
                  h: [{v: 0, f: '0'},{v: 50, f: '50'},
                      {v: 100, f: '100'},{v: 150, f: '150'}]
                };
      break;
      case 'Social Welfare':
        return {
                  v: [{v: -10, f: ''},{v: 0, f: '0'},{v: 100, f: '100'},
                      {v: 200, f: '200'},{v: 300, f: '300'},{v: 400, f: '400'}, {v: 500, f: '500'}],
                  h: [{v: 0, f: '0'},{v: 100, f: '100'},
                      {v: 200, f: '200'},{v: 300, f: '300'}, {v: 400, f: '400'}, {v: 500, f: '500'}]
               };
      break;
      case 'Disaster Relief':
        return {
                  v: [{v: -10, f: ''},{v: 0, f: '0'},{v: 10, f: '10'},
                      {v: 20, f: '20'},{v: 30, f: '30'},{v: 40, f: '40'}, {v: 50, f: '50'}, {v: 60, f: '60'}],
                  h: [{v: 0, f: '0'},{v: 50, f: '50'},
                      {v: 100, f: '100'}, {v: 200, f: '200'}, {v: 300, f: '300'}, {v: 400, f: '400'}]
               };
      break;
      case 'Culture':
        return {
                  v: [{v: -10, f: ''},{v: 0, f: '0'},{v: 10, f: '10'},
                      {v: 20, f: '20'},{v: 30, f: '30'},{v: 40, f: '40'}, {v: 50, f: '50'}, {v: 60, f: '60'}],
                  h: [{v: 0, f: '0'},{v: 10, f: '10'},
                      {v: 20, f: '20'},{v: 30, f: '30'}, {v: 40, f: '40'}, {v: 50, f: '50'}, 
                      {v: 60, f: '60'}, {v: 70, f: '70'}, {v: 80, f: '80'}, {v: 90, f: '90'}]
              };
      break;
      default:
        return [{v: 0, f: '0'},{v: 100, f: '100'},
                {v: 200, f: '200'},{v: 300, f: '300'}, {v: 400, f: '400'}];;
      break;
  }  
}

function draw_age_charts(){
  var ch_data = age_data();
  var options = age_options(ch_data);
  current_data = ch_data;
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(ch_data, options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_generousity_chart(){
  var ch_data = generosity_data();
  var options = generosity_options(ch_data);
  current_data = ch_data;
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(ch_data, options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_industry_chart(){
  var ch_data = industry_data();
  var options = industry_options(ch_data);
  current_data = ch_data;
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(ch_data, options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_months_chart(){
  var options = months_options();
  current_data = months_data();
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  current_chart.draw(current_data, options);
  init_chart_onclick();
  fix_chart(window);
}

function draw_focus_chart(){
  var ch_data = focus_data();
  var options = focus_options(ch_data);
  current_data = ch_data;
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));  
  current_chart.draw(ch_data, options);  
  init_chart_onclick();
  fix_chart(window);
}

function draw_focus_type_chart(type){
  var data = focus_type_data(type);
  var ch_data = google.visualization.arrayToDataTable(data);
  var options = focus_type_options(ch_data, data, type);
  current_data = ch_data;
  if (!current_chart)
    current_chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));  
  current_chart.draw(ch_data, options);  
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
      case 'education':
        draw_focus_type_chart('Education');
      break;
      case 'environment':
        draw_focus_type_chart('Environment');
      break;
      case 'social':
        draw_focus_type_chart('Social Welfare');
      break;
      case 'healthcare':
        draw_focus_type_chart('Healthcare');
      break;
      case 'disaster':
        draw_focus_type_chart('Disaster Relief');
      break;
      case 'culture':
        draw_focus_type_chart('Culture');
      break;
    }  
}

function activate_link(chart_type){  
    $('#charts-container .chart-options a.chart-option').removeClass('active');
    var active_anchor = $('#charts-container .chart-options a[data-chart-type="' + chart_type + '"]');
    active_anchor.addClass('active');
}

function init_chart_onclick(){
  if (!is_click_inited){
    google.visualization.events.addListener(current_chart, 'click', function(e) {
      var id = e.targetID;
      if (str_starts(id, 'bubble') && get_param() != 'months') {        
        id = arr_last(id.split('#'));
        var chart_container = $('#charts-container');
        var attr = 'data-' + get_param();
        var elem = $('['+ attr + '="' + id + '"]');
        if ($(elem).length > 0) {
          if (($('#page-top').hasClass('fix-charts') || will_fix(window)) && !is_chart_closed) {
            $('html, body').animate({
              scrollTop: elem.offset().top - 430
            }, 2000);
          }
          else {
            $('html, body').animate({
              scrollTop: elem.offset().top - 70
            }, 2000);
          }
          $('.person-box').removeClass('selected');      
          elem.addClass('selected');
        }
      }
    });

    google.visualization.events.addListener(current_chart, 'onmouseover', function(e) {
      var attr = 'data-' + get_param();
      var row = e.row;
      if (row){     
        var elem = $('['+ attr + '="' + row + '"]');
        if (elem.length > 0){ 
          var person_name = elem.find('.card-name-container').data('name');
          var tooltip = $('#chart-tooltip');
          if (tooltip.length <= 0){
            tooltip = $('<div id="chart-tooltip" class="mapTooltip"><b>' + person_name + '</b></div>');
            $('body').append(tooltip);
          }
          tooltip.find('b').html(person_name);
          tooltip.css('left', currentMousePos.x + 15);
          tooltip.css('top', currentMousePos.y - 35);
          tooltip.css('display', 'block');
        }
      }
    });

    google.visualization.events.addListener(current_chart, 'onmouseout', function(e) {
      $('#chart-tooltip').css('display', 'none');
    });

    is_click_inited = true;
  }
}

$(function (){

  get_chart_container_sizes();

  var base_url = get_base_url();
  $(window).scroll(function(e) {
    fix_chart(this);
    auto_hide_fixed_charts();
  });
  $('#charts-container .chart-options a.chart-option').click(function (event){    
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


  $(document).mousemove(function(event) {
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
  });
});

$(window).on('resize', function(){
  get_chart_container_sizes();
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
      case 'education':
        return draw_focus_type_chart('Education');
      break;
      case 'environment':
        return draw_focus_type_chart('Environment');
      break;
      case 'social':
        return draw_focus_type_chart('Social Welfare');
      break;
      case 'healthcare':
        return draw_focus_type_chart('Healthcare');
      break;
      case 'disaster':
        return draw_focus_type_chart('Disaster Relief');
      break;
      case 'culture':
        return draw_focus_type_chart('Culture');
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
      case 'education':
        draw_focus_type_chart('Education');
      break;
      case 'environment':
        draw_focus_type_chart('Environment');
      break;
      case 'social':
        draw_focus_type_chart('Social Welfare');
      break;
      case 'healthcare':
        draw_focus_type_chart('Healthcare');
      break;
      case 'disaster':
        draw_focus_type_chart('Disaster Relief');
      break;
      case 'culture':
        draw_focus_type_chart('Culture');
      break;
      default:
        history.pushState('', '', get_base_url() + '?generosity');
        draw_generousity_chart();
      break;
  }  
}