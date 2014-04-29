/**
 * @author Harry Stevens
 */
function initialize() {
	google.maps.visualRefresh = true;
	var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) || (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
	if (isMobile) {
		var viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
	}

	var mapDiv = document.getElementById('googft-mapCanvas');
	mapDiv.style.width = isMobile ? '100%' : '800px';
	mapDiv.style.height = isMobile ? '100%' : '500px';

	//Styles the map
	var mapOptions = {
		center : new google.maps.LatLng(37, -95),
		zoom : 4,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		draggable : true,
		zoomable : false,
		scrollwheel : true,
		pancontrol: false,
		disableDoubleClickZoom : false
	};

	var map = new google.maps.Map(mapDiv, mapOptions);
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend-open'));
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend'));

	layer = new google.maps.FusionTablesLayer({
		map : map,
		heatmap : {
			enabled : false
		},
		query : {
			select : "col10",
			from : "1SopmxcZt8wuGlLJF4vHXg3deZ-mgu5djQBetwJBu",
			where : ""
		},
		options : {
			styleId : 3,
			templateId : 4
		}
	});

	if (isMobile) {
		var legend = document.getElementById('googft-legend');
		var legendOpenButton = document.getElementById('googft-legend-open');
		var legendCloseButton = document.getElementById('googft-legend-close');
		legend.style.display = 'none';
		legendOpenButton.style.display = 'block';
		legendCloseButton.style.display = 'block';
		legendOpenButton.onclick = function() {
			legend.style.display = 'block';
			legendOpenButton.style.display = 'none';
		}
		legendCloseButton.onclick = function() {
			legend.style.display = 'none';
			legendOpenButton.style.display = 'block';
		}
	}
}

google.maps.event.addDomListener(window, 'load', initialize);
