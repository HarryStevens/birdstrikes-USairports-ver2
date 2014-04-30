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
		zoom : 4
	});

	//Places legend on map
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend-open'));
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend'));

	//Styles map to reduce saturation and remove unnecessary elements
	var style = [{
		featureType : 'land',
		elementType : 'all',
		stylers : [{
			saturation : -80
		}]
	},  {
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

//Updates map based on level selection
function changeMap_level() {
	var whereClause;
	var searchString = document.getElementById('search-string_level').value.replace(/'/g, "\\'");
	if (searchString != '--Select--') {
		whereClause = "'Birdstrike_Rating' = '" + searchString + "'";
	}
	layer_0.setOptions({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : whereClause
		}
	});
}

//Updates map based on state selection
function changeMap_state() {
	var whereClause;
	var searchString = document.getElementById('search-string_state').value.replace(/'/g, "\\'");
	if (searchString != '--Select--') {
		whereClause = "'State' = '" + searchString + "'";
	}
	layer_0.setOptions({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : whereClause
		}
	});
}

//Updates map based on service area selection
function changeMap_area() {
	var whereClause;
	var searchString = document.getElementById('search-string_area').value.replace(/'/g, "\\'");
	if (searchString != '--Select--') {
		whereClause = "'Service Area' = '" + searchString + "'";
	}
	layer_0.setOptions({
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : whereClause
		}
	});
}

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

//This is similar to document ready (though not identical) and does not use jQuery
google.maps.event.addDomListener(window, 'load', initializeMap);
