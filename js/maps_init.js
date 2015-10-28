$(function(){
	$(".mapcontainer").mapael({
		map : {
            // Set the name of the map to display
			name : "china_map",
			width: 645,
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
		legend: {
            plot: {                
                slices: [{
                    size: 15,
                    type: "circle",
                    max: 3,
                    attrs: {
                        fill: "#89ff72"
                    },
                    label: "Less than 20000 inhabitants"
                }, {
                    size: 25,
                    type: "circle",
                    min: 4,
                    max: 10,
                    attrs: {
                        fill: "#fffd72"
                    },
                    label: "Between 20000 and 100000 inhabitants"
                }, {
                    size: 35,
                    type: "circle",
                    min: 11,
                    max: 20,
                    attrs: {
                        fill: "#ffbd54"
                    },
                    label: "Between 100000 et  200000 inhabitants"
                }, {
                    size: 50,
                    type: "circle",
                    min: 21,
                    attrs: {
                        fill: "#ff5454"
                    },
                    label: "More than 200000 inhabitants"
                }]
            }
        },
		plots: {
            "Xinjiang_Info": {
                value: "1",
                latitude: 122.5,
                longitude: 167.5,
                href: "#",
                tooltip: {
                    content: "<b>Xinjiang:</b> 1"
                }
            },
            "Guandong_Info": {
                value: "21",
                latitude: 435.5,
                longitude: 450.5,
                href: "#",
                tooltip: {
                    content: "<b>Guandong:</b> 21"
                }
            },
            "Beijing_Info": {
                value: "16",
                latitude: 455.5,
                longitude: 190.5,
                href: "#",
                tooltip: {
                    content: "<b>Beijing:</b> 16"
                }
            },
            "Zhejiang_Info": {
                value: "11",
                latitude: 520.5,
                longitude: 341.5,
                href: "#",
                tooltip: {
                    content: "<b>Zhejiang:</b> 11"
                }
            },
            "Fujian_Info": {
                value: "8",
                latitude: 496.5,
                longitude: 398.5,
                href: "#",
                tooltip: {
                    content: "<b>Fujian:</b> 8"
                }
            }
        },    
		areas: {
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
		}		
	});
});