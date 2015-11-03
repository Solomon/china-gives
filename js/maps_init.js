var map_inited = false;
var maps_helper;

$(function(){

	maps_helper = maps_helper();

    $('.maps .chart-options a').click(function (){
		var type = $(this).data('map-type');
		$('.maps .chart-options li').removeClass('active');
		$(this).parents('li').first().addClass('active');
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
		var updatedOptions = {
			plots: plots,
			areas: areas_philantropists()			
		};
		var opt = {
				animDuration: 600,
				deletedLinks: ['beijingguandong']
			};
		//var newPlots = !!!!!!;
		var deletedPlots = ["Sichuan_Info"];	
		$(".mapcontainer").trigger('update', [updatedOptions, newPlots, deletedPlots, opt]);
	}
}

function load_map_donatoin_data() {
	var updatedOptions = {
			//plots: !!!!!!!!!,
			areas: areas_donations()
	};
	//var newPlots = !!!!!!;

	var deletedPlots = ["Beijing_Info"];
	var opt = {
		animDuration: 600,
		//newLinks: !!!!!!!!!!!
	};
	$(".mapcontainer").trigger('update', [updatedOptions, newPlots, deletedPlots, opt]);
}

function load_map_movement_data() {
	var updatedOptions = {
			//plots: !!!!!!!!!,
			areas: areas_movements()
	};
	//var newPlots = !!!!!!;

	var deletedPlots = ["Beijing_Info"];
	var opt = {
		animDuration: 600,
		//newLinks: !!!!!!!!!!!
	};
	$(".mapcontainer").trigger('update', [updatedOptions, newPlots, deletedPlots, opt]);
}

function init_map(plots) {
	map_inited = true;
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
				}
			}
		},
		plots: plots,    
		areas: maps_helper.areas_philantropists()
	});	
	$('.maps svg')[0].setAttribute("preserveAspectRatio","xMidYMid");
}

