$(function(){

	var plots = {
            "Xinjiang_Info": {
                value: "1",
                latitude: 122.5,
                longitude: 167.5,
                size: 15,
                attrs: {
	            	fill: "#89ff72"
	            },
                href: "javascript:void(0);",
                tooltip: {
                    content: "<b>Xinjiang:</b> 1"
                }
            },
            "Guandong_Info": {
                value: "21",
                latitude: 435.5,
                longitude: 450.5,
                size: 50,
                attrs: {
	            	fill: "#ff5454"
	            },
                href: "javascript:void(0);",
                tooltip: {
                    content: "<b>Guandong:</b> 21"
                }
            },
            "Beijing_Info": {
                value: "16",
                latitude: 455.5,
                longitude: 190.5,
                size: 25,
                attrs: {
	            	fill: "#fffd72"
	            },
                href: "javascript:void(0);",
                tooltip: {
                    content: "<b>Beijing:</b> 16"
                }
            },
            "Zhejiang_Info": {
                value: "11",
                latitude: 520.5,
                longitude: 341.5,
                size: 25,
                attrs: {
	            	fill: "#fffd72"
	            },
                href: "javascript:void(0);",
                tooltip: {
                    content: "<b>Zhejiang:</b> 11"
                }
            },
            "Fujian_Info": {
                value: "8",
                latitude: 496.5,
                longitude: 398.5,
                size: 15,
                attrs: {
                    fill: "#89ff72"
            	},
                href: "javascript:void(0);",
                tooltip: {
                    content: "<b>Fujian:</b> 8"
                }
            }
        };      


        $('.maps .chart-options a').click(function (){
			var type = $(this).data('map-type');
			switch (type) {
		      case 'philanthropists':
		        //draw_age_charts();
		      break;
		      case 'donations':
		        load_map_donatoin_data();
		      break;
		      case 'movement':
		        //draw_donation_chart();
		      break;  
		      default:
		        //history.pushState('', '', get_base_url() + '?donation');
		        //draw_donation_chart();
		      break;
	  		}  
		});

	init_map(plots);
});

function load_map_donatoin_data() {
	var updatedOptions = {
			plots: {
				"Xinjiang_Info": {
	                value: "9",
	                latitude: 152.5,
	                longitude: 167.5,
	                size: 15,
	                attrs: {
		            	fill: "#89ff72"
		            },
	                href: "javascript:void(0);",
	                tooltip: {
	                    content: "<b>Xinjiang:</b> 1"
	                }
	            },
	            "Guandong_Info": {
	                value: "7",
	                latitude: 100.5,
	                longitude: 410.5,
	                size: 15,
	                attrs: {
		            	fill: "#89ff72"
		            },
	                href: "javascript:void(0);",
	                tooltip: {
	                    content: "<b>Guandong:</b> 21"
	                }
	            }
			}
	};
	var newPlots = {
		"Sichuan_Info": {
                value: "18",
                latitude: 306.5,
                longitude: 315.5,
                size: 25,
                attrs: {
	            	fill: "#fffd72"
	            },
                href: "javascript:void(0);",
                tooltip: {
                    content: "<b>Sichuan:</b> 18"
                }
            }
	};

	var deletedPlots = ["Beijing_Info"];
	var opt = {
		animDuration: 600
	};
	$(".mapcontainer").trigger('update', [updatedOptions, newPlots, deletedPlots, opt]);
}

function init_map(plots) {
	$(".mapcontainer").mapael({
		map : {            
			name : "china_map",
			width: 750,
			defaultArea: {
				attrs : {
					fill : "#8996A0"
					, stroke: "#FFFFFF"
				}
				, attrsHover : {
					fill: "#BAC5C6"
				}
				, text : {
					attrs : {
						fill : "#505444"
					}
					, attrsHover : {
						fill : "#000"
					}
				}
			}
		},
		plots: plots,    
		areas: map_areas()
	});	
	$('.maps svg')[0].setAttribute("preserveAspectRatio","xMidYMid");
}


function map_areas(){
	return {
			"Xinjiang":{
				tooltip: {content : "<b>Xinjiang</b>"}				
			},
			"Guandong":{
				tooltip: {content : "<b>Guandong</b>"}				
			},
			"Beijing": {
				tooltip: {content : "<b>Beijing</b>"}	
			},
			"Zhejiang": {
				tooltip: {content : "<b>Zhejiang</b>"}	
			},
			"Fujian": {
				tooltip: {content : "<b>Fujian</b>"}	
			},
			"Xizang": {
				tooltip: {content : "<b>Xizang</b>"}
			},
			"Qinghai": {
				tooltip: {content : "<b>Qinghai</b>"}
			},
			"Gansu": {
				tooltip: {content : "<b>Gansu</b>"}
			},
			"Sichuan": {
				tooltip: {content : "<b>Sichuan</b>"}
			},
			"Yunnan": {
				tooltip: {content : "<b>Yunnan</b>"}
			},
			"Guizhou": {
				tooltip: {content : "<b>Guizhou</b>"}
			},
			"Guangxi": {
				tooltip: {content : "<b>Guangxi</b>"}
			},
			"Hainan": {
				tooltip: {content : "<b>Hainan</b>"}
			},
			"Hunan": {
				tooltip: {content : "<b>Hunan</b>"}
			},
			"Jiangxi": {
				tooltip: {content : "<b>Jiangxi</b>"}
			},
			"Hubei": {
				tooltip: {content : "<b>Hubei</b>"}
			},
			"Chongqing": {
				tooltip: {content : "<b>Chongqing</b>"}
			},
			"Anhui": {
				tooltip: {content : "<b>Anhui</b>"}
			},
			"Jiangsu": {
				tooltip: {content : "<b>Jiangsu</b>"}
			},
			"Shandong": {
				tooltip: {content : "<b>Shandong</b>"}
			},
			"Henan": {
				tooltip: {content : "<b>Henan</b>"}
			},
			"Shanxi": {
				tooltip: {content : "<b>Shanxi</b>"}
			},
			"Shaanxi": {
				tooltip: {content : "<b>Shaanxi</b>"}
			},
			"Ningxia": {
				tooltip: {content : "<b>Ningxia</b>"}
			},
			"Ningxia": {
				tooltip: {content : "<b>Ningxia</b>"}
			},
			"Nei Mongol":{
				tooltip: {content : "<b>Nei Mongol</b>"}
			},
			"Heilongjiang":{
				tooltip: {content : "<b>Heilongjiang</b>"}
			},
			"Jilin":{
				tooltip: {content : "<b>Jilin</b>"}
			},
			"Liaoning":{
				tooltip: {content : "<b>Liaoning</b>"}
			},
			"Hebei":{
				tooltip: {content : "<b>Hebei</b>"}
			},
			"Tianjin":{
				tooltip: {content : "<b>Tianjin</b>"}
			},
			"Shanghai":{
				tooltip: {content : "<b>Shanghai</b>"}
			},
		};
}