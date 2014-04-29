/**
 * @author Harry Stevens
 */

var map;
var layer_0;
function initialize() {
	var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) || (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
	if (isMobile) {
		var viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
	}

	var mapDiv = document.getElementById('map-canvas');
	mapDiv.style.width = isMobile ? '100%' : '800px';
	mapDiv.style.height = isMobile ? '100%' : '500px';

	map = new google.maps.Map(mapDiv, {
		center : new google.maps.LatLng(36.58072594811134, -95.03431384999999),
		zoom : 4
	});
	var style = [{
		featureType : 'all',
		elementType : 'all',
		stylers : [{
			saturation : -47
		}]
	}];
	var styledMapType = new google.maps.StyledMapType(style, {
		map : map,
		name : 'Styled Map'
	});
	map.mapTypes.set('map-style', styledMapType);
	map.setMapTypeId('map-style');
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

function changeMap_city() {
	var whereClause;
	var searchString = document.getElementById('search-string_0').value.replace(/'/g, "\\'");
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

google.maps.event.addDomListener(window, 'load', initialize);
