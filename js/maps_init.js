$(function(){
	$(".mapcontainer").mapael({
		map : {
            // Set the name of the map to display
			name : "china_map",
			width: 645,
			defaultArea: {
				attrs : {
					fill : "#BAC5C6"
					, stroke: "#FFFFFF"
				}
				, attrsHover : {
					fill: "#a4e100"
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
                    size: 4,
                    type: "circle",
                    max: 20000,
                    attrs: {
                        fill: "#89ff72"
                    },
                    label: "Less than 20000 inhabitants"
                }, {
                    size: 6,
                    type: "circle",
                    min: 20000,
                    max: 100000,
                    attrs: {
                        fill: "#fffd72"
                    },
                    label: "Between 20000 and 100000 inhabitants"
                }, {
                    size: 20,
                    type: "circle",
                    min: 100000,
                    max: 200000,
                    attrs: {
                        fill: "#ffbd54"
                    },
                    label: "Between 100000 et  200000 inhabitants"
                }, {
                    size: 40,
                    type: "circle",
                    min: 200000,
                    attrs: {
                        fill: "#ff5454"
                    },
                    label: "More than 200000 inhabitants"
                }]
            }
        },
		plots: {
            "town-75056": {
                value: "2268265",
                latitude: 122.5,
                longitude: 167.5,
                href: "#",
                tooltip: {
                    content: "<b>Morbihan</b> <br /> Bretagne"
                }
            },
        },    
		areas: {

			"Xin_Jiang":{
				tooltip: {content : "<b>Morbihan</b> <br /> Bretagne"}				
			}


		}		
	});
});