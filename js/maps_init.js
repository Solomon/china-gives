var map_inited = false;
var maps_helper;

var current_map_data = -1;

$(function(){

	maps_helper = maps_helper();

    $('.maps .chart-options a').click(function (e){
		var type = $(this).data('map-type');
		make_maps_routing(type);
		e.preventDefault();
	});

	var type = get_param();
	if (!type)
		type = 'philanthropists';
	make_maps_routing(type);	

	map_height();
});

function make_maps_routing(type){
	var that = $('.maps .chart-options li a[data-map-type="' + type + '"]')
	$('.maps .chart-options li').removeClass('active');
	that.parents('li').first().addClass('active');
	$('#maps h2.section-heading').html(that.data('map-name'));	
	var base_url = get_base_url();
	history.pushState('', '', base_url + that.attr('href'));
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
      	load_map_philanthropists_data();
      break;
	}
}

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
	$('.mapcontainer path[data-id^="dummy_link_"]').remove();
}

function load_map_donatoin_data() {
	if (!map_inited)
		init_map(maps_helper.plots_donations());
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
	$('.mapcontainer path[data-id^="dummy_link_"]').remove();
}

function load_map_movement_data() {
	if (!map_inited)
		init_map(maps_helper.plots_movements());
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
	
	var svg = $('.mapcontainer svg');
	$('.mapcontainer path[data-id^="link_"]').each(function(index, element) {
		element = $(element);
		var dummy_path = document.createElementNS('http://www.w3.org/2000/svg','path');
	    dummy_path.setAttribute('fill','none');
	    dummy_path.setAttribute('opacity','0');
	    dummy_path.setAttribute('style','-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;');
	    dummy_path.setAttribute('stroke','#ffffff');
	    dummy_path.setAttribute('stroke-opacity', 0);	    
	    dummy_path.setAttribute('data-id', 'dummy_' + element.attr('data-id'));
	    dummy_path.setAttribute('stroke-width', 10);
	    dummy_path.setAttribute('d', element.attr('d'));
		svg.append(dummy_path);		
		$(dummy_path).on('mouseover', function(event) {
			if (get_param() == 'movement') {
				$('.mapcontainer path[data-id^="link_"]').attr('stroke-opacity', '0.15').attr('stroke-width', 2).attr('stroke','#FFFFFF');
				element.attr('stroke-opacity', '0.75').attr('stroke-width', 3).attr('stroke','#8FFD9B');
				element.trigger('mouseover');
			}
        }).on('mouseleave', function(event){
        	if (get_param() == 'movement') {
	        	element.attr('stroke-opacity', '0.15').attr('stroke-width', 2).attr('stroke','#FFFFFF');         	
				element.trigger('mouseleave');			
	        	var to_el = $(event.relatedTarget);
	         	var region_id = to_el.attr('data-id');	
				if (region_id){
					region_id = region_id.replace('_Info', '');
				 	$('.mapcontainer path[data-id^="link_"]').attr('stroke-opacity', '0.15').attr('stroke-width', 2).attr('stroke','#FFFFFF');  
				 	$('.mapcontainer path[data-id^="link_' + region_id + '_"]').attr('stroke-opacity', '0.75').attr('stroke-width', 3).attr('stroke','#8FFD9B');
				 	$('.mapcontainer path[data-id^="link_"][data-id$="_' + region_id + '"]').attr('stroke-opacity', '0.75').attr('stroke-width', 3).attr('stroke','#8FFD9B');
				}	
			}
        });					   
	});
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
                     mouseleave: function (e, id, mapElem, textElem, elemOptions) {
                     },
                     mouseover: function (e, id, mapElem, textElem, elemOptions) {
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
		$('.mapcontainer path[data-id^="link_"]').attr('stroke-opacity', '0.15').attr('stroke-width', 2).attr('stroke','#FFFFFF');  
		$('.mapcontainer path[data-id^="link_' + region_id + '_"]').attr('stroke-opacity', '0.75').attr('stroke-width', 3).attr('stroke','#8FFD9B');
		$('.mapcontainer path[data-id^="link_"][data-id$="_' + region_id + '"]').attr('stroke-opacity', '0.75').attr('stroke-width', 3).attr('stroke','#8FFD9B');	
	}
}