var map_inited = false;
var maps_helper;

var current_map_data = -1;

$(function(){

	maps_helper = maps_helper();

    $('.maps .chart-options a').click(function (){
		var type = $(this).data('map-type');
		$('.maps .chart-options li').removeClass('active');
		$(this).parents('li').first().addClass('active');
		$('#maps h2.section-heading').html($(this).data('map-name'));
		switch (type) {
	      case 'philanthropists':
	        load_map_philanthropists_data();
	      break;
	      case 'donations':
	        load_map_donatoin_data();
	      break;
	      case 'movement':
	        load_map_movement_data();
	      break;  
	      default:
	      break;
  		}  
	});

	load_map_philanthropists_data();

	map_height();
});

function load_map_philanthropists_data(){
    if (!map_inited)
		init_map(maps_helper.plots_philantropists());
	else {		
		var new_data = maps_helper.plots_philantropists();
		var new_areas = maps_helper.areas_philantropists();
		var new_links = {};
		var diff_res = maps_helper.diff_plots(current_map_data.plots, new_data);
		var diff_areas = maps_helper.diff_areas(current_map_data.areas, new_areas);
		var diff_links = maps_helper.diff_links(current_map_data.links, new_links);

		current_map_data.plots = new_data;
		current_map_data.areas = new_areas;
		current_map_data.links = new_links;

		var updatedOptions = {
			plots: diff_res.updated_plots,
			areas: diff_areas			
		};
		var opt = {
				animDuration: 600,
				newLinks: diff_links.new_links,
				deletedLinks: diff_links.deleted_links
			};
		var deletedPlots = ["Sichuan_Info"];	
		$(".mapcontainer").trigger('update', [updatedOptions, diff_res.new_plots, diff_res.deleted_plots, opt]);
	}
}

function load_map_donatoin_data() {
	var new_data = maps_helper.plots_donations();
	var new_areas = maps_helper.areas_donations();
	var new_links = {};
	var diff_res = maps_helper.diff_plots(current_map_data.plots, new_data);
	var diff_areas = maps_helper.diff_areas(current_map_data.areas, new_areas);
	var diff_links = maps_helper.diff_links(current_map_data.links, new_links);

	current_map_data.plots = new_data;
	current_map_data.areas = new_areas;
	current_map_data.links = new_links;

	var updatedOptions = {
			plots: diff_res.updated_plots,
			areas: diff_areas
	};
	var opt = {
		animDuration: 600,
		newLinks: diff_links.new_links,
		deletedLinks: diff_links.deleted_links
	};
	$(".mapcontainer").trigger('update', [updatedOptions, diff_res.new_plots, diff_res.deleted_plots, opt]);
}

function load_map_movement_data() {
	var new_data = maps_helper.plots_movements();
	var new_areas = maps_helper.areas_movements();
	var new_links = maps_helper.links_movements();
	var diff_res = maps_helper.diff_plots(current_map_data.plots, new_data);
	var diff_areas = maps_helper.diff_areas(current_map_data.areas, new_areas);
	var diff_links = maps_helper.diff_links(current_map_data.links, new_links);

	current_map_data.plots = new_data;
	current_map_data.areas = new_areas;
	current_map_data.links = new_links;

	var updatedOptions = {
		plots: diff_res.updated_plots,
		areas: diff_areas
	};

	var deletedPlots = ["Beijing_Info"];
	var opt = {
		animDuration: 600,
		newLinks: diff_links.new_links,
		deletedLinks: []
	};
	$(".mapcontainer").trigger('update', [updatedOptions, diff_res.new_plots, diff_res.deleted_plots, opt]);
}

function init_map(plots) {
	map_inited = true;
	current_map_data = {
		plots: plots,    
		areas: maps_helper.areas_philantropists(),
		links: {}
	}
	$(".mapcontainer").mapael({
		map : {            
			name : "china_map",
			width: 750,
			defaultArea: {
				attrs : {
					fill : "#8996A0", 
					stroke: "#FFFFFF"
				}, 
				attrsHover : {
					fill: "#BAC5C6"
				}, 
				text : {
					attrs : {
						fill : "#505444"
					}, 
					attrsHover : {
						fill : "#000"
					}
				},
				eventHandlers: {
                    mouseover: function (e, id, mapElem, textElem, elemOptions) {
                    	focus_map_link(e, id, mapElem, textElem, elemOptions);
                    }
                }
			},
			defaultPlot: {
                eventHandlers: {
                    mouseover: function (e, id, mapElem, textElem, elemOptions) {
                        focus_map_link(e, id, mapElem, textElem, elemOptions);
                    }
                }
            },
            defaultLink: {
            	eventHandlers: {
                    mouseover: function (e, id, mapElem, textElem, elemOptions) {
                        focus_map_link(e, id, mapElem, textElem, elemOptions);
                    }
                }
            }
		},
		plots: current_map_data.plots,    
		areas: current_map_data.areas
	});	
	$('.maps svg')[0].setAttribute("preserveAspectRatio","xMidYMid");
}

function focus_map_link(e, id, mapElem, textElem, elemOptions){
	var region_id = id.replace('_Info', '');           	
	if (region_id){
		$('.mapcontainer path[data-id^="link_"]').attr('stroke-opacity', '0.30').attr('stroke-width', 2);  
		$('.mapcontainer path[data-id^="link_' + region_id + '_"]').attr('stroke-opacity', '0.75').attr('stroke-width', 3);
	}
}