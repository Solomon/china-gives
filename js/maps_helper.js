function maps_helper(){

	var mapsHelper = {	

		diff_plots: function(current_plots, new_plots) {
			var deleted_plots = [];
			var updated_plots = {};
			var same_plots = [];
			var add_plots = {};

			$.each(current_plots, function(name, obj){
				if (!new_plots[name])
					deleted_plots.push(name);
				else {
					var isSame = JSON.stringify(obj) === JSON.stringify(new_plots[name]);
					if (!isSame){
						updated_plots[name] = new_plots[name];
					} else {
						same_plots.push([name, new_plots[name]]);
					}
				}
			});
			$.each(new_plots, function(name, obj){
				if (!current_plots[name])
					add_plots[name] = obj;
			});
			
			var res = {
				new_plots: add_plots,
				updated_plots: updated_plots,
				deleted_plots: deleted_plots,
				same_plots: same_plots
			};

			return res;
		},
		diff_areas: function(current_areas, new_areas) {
			var updated_areas = {};
			$.each(current_areas, function(name, obj){
				if (new_areas[name]) {
					var isSame = JSON.stringify(obj) === JSON.stringify(new_areas[name]);
					if (!isSame){
						updated_areas[name] = new_areas[name];
					}
				}
			});		
			return updated_areas;
		},

		diff_links: function(current_links, new_links) {
			var deleted_links = [];
			var add_links = {};

			$.each(current_links, function(name, obj){
				if (!new_links[name])
					deleted_links.push(name);
			});
			$.each(new_links, function(name, obj){
				if (!current_links[name])
					add_links[name] = obj;
			});
			
			var res = {
				new_links: add_links,
				deleted_links: deleted_links
			};

			return res;
		},

		plots_philantropists: function (){
			return {
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
		},
		plots_donations: function(){
			return {
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
		        },
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
		},

		plots_movements: function (){
			return {
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
		        },
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
		},

		links_movements: function (){
			return {
		        'beijingguandong' : {
		            factor : 0.2, 
		            between : [{latitude : 435.5, longitude : 450.5}, {latitude : 455.5, longitude : 190.5}], 
		            attrs : {
		            	stroke: "#89ff72",
		                "stroke-width" : 2
		            }, 
		            tooltip: {content : "Beijing - Guandong"}
		    	}
			};	
		},

		areas_philantropists: function (){
			return {
					"Xinjiang":{
						tooltip: {content : "<b>Xinjiang</b>"}				
					},
					"Guandong":{
						tooltip: {content : "<b>Guandong</b>"}				
					},
					"Beijing": {
						tooltip: {content : "<b>Beijing</b>"},
						attrs : {
							fill : "#8996A0", 
							stroke: "#FFFFFF"
						}	
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
					}
				};
		},

		areas_donations: function (){
			return {
					"Xinjiang":{
						tooltip: {content : "<b>Xinjiang</b>"}				
					},
					"Guandong":{
						tooltip: {content : "<b>Guandong</b>"}				
					},
					"Beijing": {
						tooltip: {content : "<b>Beijing</b>"},
						attrs : {
							fill : "#8996A0", 
							stroke: "#FFFFFF"
						}	
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
					}
				};
		},

		areas_movements: function (){
			return {
					"Xinjiang":{
						tooltip: {content : "<b>Xinjiang</b>"}				
					},
					"Guandong":{
						tooltip: {content : "<b>Guandong</b>"}				
					},
					"Beijing": {
						tooltip: {content : "<b>Beijing</b>"},
						attrs: {
				        	fill: "#89ff72"
				        }
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
					}
				};
		}
	};

	return mapsHelper;
}