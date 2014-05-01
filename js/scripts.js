/**
 * @author Harry Stevens
 */

//Global variables
var map;
var layer_0;

//This function is called when map stuff is loaded
function initializeMap() {

	//For case where map is mobile. Taken straight from Google Fusion tables publish tab.
	var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) || (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
	if (isMobile) {
		var viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
	}

	//Styles the div map-canvas where the map will display
	var mapDiv = document.getElementById('map-canvas');
	mapDiv.style.width = isMobile ? '100%' : '800px';
	mapDiv.style.height = isMobile ? '100%' : '500px';

	//Updates global var map with info about the div style and additional options for zoom and lat long center
	map = new google.maps.Map(mapDiv, {
		center : new google.maps.LatLng(36.58072594811134, -95.03431384999999),
		zoom : 4,
		streetViewControl : false,
		panControl : false,
		mapTypeControl: false
	});

	//Styles map to reduce saturation and remove unnecessary elements
	var style = [{
		featureType : 'landscape',
		elementType : 'all',
		stylers : [{
			saturation : -90
		}]
	},{
		featureType : 'landscape.natural',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	},	
	{
		featureType : 'water',
		elementType : 'all',
		stylers : [{
			saturation : -30
		}]
	},
	     {
          featureType: 'road.highway',
          elementType: 'all',
          stylers: [
            { visibility: 'off' }
          ]
        },
	 {
		featureType : 'road.arterial',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'road.local',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'administrative.neighborhood',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'administrative.land_parcel',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'poi',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}];
	var styledMapType = new google.maps.StyledMapType(style, {
		map : map,
		name : 'Styled Map'
	});
	map.mapTypes.set('map-style', styledMapType);
	map.setMapTypeId('map-style');

	//Creates functionality for updating map based on user inputs. The var whereClause will update the query string to pull certain data from the Fusion Tables
	layer_0 = new google.maps.FusionTablesLayer({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu"
		},
		map : map,
		styleId : 3,
		templateId : 4
	});
}

//Updates map based on level selection
function changeMap_level() {
	var whereClause;
	var searchString = $("#search-string_level").val();
	if (searchString != '--Select--') {
		whereClause = "'Birdstrike_Rating' = '" + searchString + "'";
	}
	layer_0.setOptions({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : whereClause
		},
	});
}

//Updates map based on state selection
function changeMap_state() {
	var whereClause;
	var stateName;
	var stateLocs;
	var stateLat;
	var stateLng;
	var stateZoom;
	var searchString = $("#search-string_state").val();
	if (searchString != '--Select--') {
		whereClause = "'State' = '" + searchString + "'";
		stateName = $("#search-string_state option:selected").text();

		//JSON for state locations
		stateLocs = {
			"Alaska" : {
				"lat" : 62.17267192672637,
				"lng" : -150.22962635,
				"zoom" : 5
			},
			"Arizona" : {
				"lat" : 34.05315398991166,
				"lng" : -112.09058826406249,
				"zoom" : 6
			},
			"California" : {
				"lat" :	35.61313610437187,
				"lng" :  -117.60023181874999,
				"zoom" : 5
			},
			"Colorado" : {
				"lat" : 39.040983266931924, 
				"lng" : -105.27357166249999,
				"zoom" : 6
			},
			"District of Columbia" : {
				"lat" : 38.78774020556518, 
				"lng" : -77.17329090078124,
				"zoom" : 9
			},
			"Florida" : {
				"lat" : 28.08583517704441, 
				"lng" :-81.41401355703124,
				"zoom" : 6
			},
			"Georgia" : {
				"lat" : 32.85125125266963, 
				"lng" : -82.85322254140624,
				"zoom" : 7
			},
			"Hawaii" : {
				"lat" : 20.5549254702272, 
				"lng" : -155.53876941640624,
				"zoom" : 7
			},
			"Illinois" : {
				"lat" : 39.17205679668551, 
				"lng" : -87.93989246328124,
				"zoom" : 6
			},
			"Kansas" : {
				"lat" : 38.25051301331366, 
				"lng" : -98.43183582265624,
				"zoom" : 7
			},
			"Maryland" : {
				"lat" : 38.650592020360776, 
				"lng" : -75.89887683828124,
				"zoom" : 7
			},
			"Massachusetts" : {
				"lat" : 42.34173144078288, 
				"lng" : -72.59199207265624,
				"zoom" : 7
			},
			"Michigan" : {
				"lat" : 43.452355299228486, 
				"lng" : -83.96284168203124,
				"zoom" : 6
			},
			"Minnesota" : {
				"lat" : 46.118403357943215,  
				"lng" : -93.96040027578124,
				"zoom" : 6
			},
			"Missouri" : {
				"lat" : 38.08640214682979,  
				"lng" : -91.69721668203124,
				"zoom" : 6
			},
			"Nevada" : {
				"lat" : 37.48296048342987,  
				"lng" : -116.49335926015624,
				"zoom" : 6
			},
			"New Jersey" : {
				"lat" : 40.409768023835944,   
				"lng" : -74.51136463124999,
				"zoom" : 7
			},
			"New York" : {
				"lat" : 42.004850785754485,   
				"lng" : -74.77827136953124,
				"zoom" : 7
			},
			"North Carolina" : {
				"lat" : 35.45276653557984, 
				"lng" : -78.84458606679686,
				"zoom" : 7
			},
			"Ohio" : {
				"lat" : 39.952842887936825, 
				"lng" : -82.39317005117186,
				"zoom" : 7
			},
			"Oregon" : {
				"lat" : 44.891813597856725,  
				"lng" : -121.65830676992186,
				"zoom" : 6
			},
			"Pennsylvania" : {
				"lat" : 39.826398881350656, 
				"lng" : -76.18589466054686,
				"zoom" : 7
			},
			"Tennessee" : {
				"lat" : 35.336340313027286,  
				"lng" : -87.15025012929686,
				"zoom" : 7
			},
			"Texas" : {
				"lat" : 31.85940404545869,  
				"lng" : -99.38489978749999,
				"zoom" : 6
			},
			"Utah" : {
				"lat" : 39.16513624755324, 
				"lng" : -112.06724231679686,
				"zoom" : 6
			},
			"Virginia" : {
				"lat" : 38.226243588641914,  
				"lng" : -78.37217395742186,
				"zoom" : 7
			},
			"Washington" : {
				"lat" : 46.98862284606915,  
				"lng" : -120.71348255117186,
				"zoom" : 7
			},
			"Puerto Rico" : {
				"lat" : 18.05765729533466,
				"lng" : -66.26936023671874,
				"zoom" : 8
			},
			"Indiana" : {
				"lat" : 39.97336800566942,
				"lng" : -84.27595203359374,
				"zoom" : 6
			},
			"New Mexico" : {
				"lat" : 34.09187058036035,
				"lng": -106.572431240625,
				"zoom": 6
			},
			"Kentucky" : {
				"lat" : 37.877530991928026,
				"lng" : -82.67716756874998,
				"zoom": 6
			},
			"Wisconsin" : {
				"lat" : 43.96363233036241,
				"lng" : -449.92265096718745,
				"zoom" : 6
			},
			"Louisiana" : {
				"lat" : 31.290838716080735,
				"lng" : -452.14188924843745,
				"zoom" : 7
			},
			"Oklahoma" : {
				"lat" : 35.364942386676354,
				"lng" : -98.56889120156247,
				"zoom" : 7
			},
			"South Carolina" : {
				"lat" : 33.92794439297983,
				"lng" : -81.11710897499998,
				"zoom" : 7
			},
			"Idaho" : {
				"lat" : 45.33908637180679,
				"lng" : -115.40543905312494,
				"zoom": 6
			},
			"Arkansas" : {
				"lat": 34.626959175201485,
				"lng": -91.77934042031247,
				"zoom": 7
			},
			"South Dakota" : {
				"lat": 44.30269212491957,
				"lng": -99.46427694374997,
				"zoom": 7
			},
			"North Dakota" : {
				"lat": 47.363450749792214,
				"lng": -100,
				"zoom": 7
			},
			"Montana" : {
				"lat": 46.930075175878436,
				"lng": -110.25285116249997,
				"zoom": 6
			},
			"Wyoming" : {
				"lat": 43.111480467980975,
				"lng": -107.18217245156247,
				"zoom": 6
			},
			"Nebraska" : {
				"lat": 41.346371258019644,
				"lng": -99.24455038124997,
				"zoom": 6
			},
			"Iowa" : {
				"lat": 42.084434278086945,
				"lng": -93.31742635781247,
				"zoom": 7
			},
			"Alabama" : {
				"lat": 32.900886359248034,
				"lng": -86.36857381874998,
				"zoom": 7
			},
			"Mississippi" : {
				"lat": 31.88043818384802,
				"lng": -89.31290975624998,
				"zoom": 7
			},
			"Vermont": {
				"lat": 43.76164261693037, 
				"lng": -72.78123251015619,
				"zoom": 7
			},
			"New Hampshire" : {
				"lat": 43.27567570696476,
				"lng": -71.0453926664062,
				"zoom": 7
			},
			"Maine" : {
				"lat": 45.242474137822235,
				"lng": -68.51853719765619,
				"zoom": 6
			}
		};			
		
		stateLat = stateLocs[stateName].lat;
		stateLng = stateLocs[stateName].lng;
		stateZoom = stateLocs[stateName].zoom;


	} else {
		stateLat = 36.58072594811134;
		stateLng = -95.03431384999999;
		stateZoom = 4;
	}

	layer_0.setOptions({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : whereClause
		}
	});
	layer_0.map.setCenter(new google.maps.LatLng(stateLat, stateLng));
	layer_0.map.setZoom(stateZoom);
}

//Updates map based on service area selection
function changeMap_area() {
	var whereClause;
	var areaName;
	var areaLocs;
	var areaLat;
	var areaLng;
	var areaZoom;
	var searchString = $("#search-string_area").val();
	if (searchString != '--Select--') {
		whereClause = "'Service Area' = '" + searchString + "'";
		areaName = $("#search-string_area option:selected").text();

		//JSON for area locations
		areaLocs = {
			"Eastern" : {
				"lat" : 37.90187792229758, 
				"lng" : -70.65977161367186,
				"zoom" : 5
			},
			"Central" : {
				"lat" : 39.00310778756596, 
				"lng" : -92.19297473867186,
				"zoom" : 5
			},
			"Western" : {
				"lat" :	40.77319393665586, 
				"lng" :  -116.36289661367186,
				"zoom" : 5
			}
		};
		areaLat = areaLocs[areaName].lat;
		areaLng = areaLocs[areaName].lng;
		areaZoom = areaLocs[areaName].zoom;
	} else {
		areaLat = 36.58072594811134;
		areaLng = -95.03431384999999;
		areaZoom = 4;
	}
	layer_0.setOptions({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : whereClause
		}
	});
	layer_0.map.setCenter(new google.maps.LatLng(areaLat, areaLng));
	layer_0.map.setZoom(areaZoom);
}

/*
//Updates map based on region selection
function changeMap_region() {
var whereClause;
var searchString = document.getElementById('search-string_region').value.replace(/'/g, "\\'");
if (searchString != '--Select--') {
whereClause = "'Region' = '" + searchString + "'";
}
layer_0.setOptions({
query : {
select : "col10",
from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
where : whereClause
}
});
}
*/

/*
//Updates map based on city selection
function changeMap_city() {
var whereClause;
var searchString = document.getElementById('search-string_city').value.replace(/'/g, "\\'");
if (searchString != '--Select--') {
whereClause = "'City' = '" + searchString + "'";
}
layer_0.setOptions({
query : {
select : "col10",
from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
where : whereClause
}
});
}
*/

//This is similar to document ready (though not identical) and does not use jQuery
google.maps.event.addDomListener(window, 'load', initializeMap);
