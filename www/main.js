"use strict";

function getMarker(textDisplay, latitude, longitude, displayIcon) {
	return L.marker([latitude, longitude], { icon: displayIcon, alt: textDisplay }).bindPopup(textDisplay);
}

function loadBurials(markerIcon) {
	var burials = L.layerGroup(
		[
			// Preble County
			getMarker('OH - Preble County - Burial - New Lexington', 39.765662, -84.527698, markerIcon),
			getMarker('OH - Preble County - Burial - West Alexandra', 39.742566, -84.506727, markerIcon),
			getMarker('OH - Preble County - Burial - West Alexandria', 39.754169, -84.518538, markerIcon),
			getMarker('OH - Preble County - Burial - Lewisburg', 39.844417, -84.529340, markerIcon),
			getMarker('OH - Preble County - Burial - Lewisburg', 39.835684, -84.528689, markerIcon),
			getMarker('OH - Preble County - Burial - Lewisburg', 39.827861, -84.528687, markerIcon),
			getMarker('OH - Preble County - Burial', 39.897806, -84.750193, markerIcon),
			getMarker('OH - Preble County - Burial - Bantas Fork', 39.852843, -84.691179, markerIcon),
			getMarker('OH - Preble County - Burial', 39.870142, -84.601462, markerIcon),
			getMarker('OH - Preble County - Burial', 39.901109, -84.513684, markerIcon),
		]
	);

	return burials;
}

function loadCircularEnclosures(markerIcon) {
	var circularEnclosures = L.layerGroup(
		[
			// Preble County
			getMarker('OH - Preble County - Earthworks - Brennersville', 39.800674, -84.569557, markerIcon),
			getMarker('OH - Preble County - Earthworks - West Alexandria', 39.722043, -84.527184, markerIcon),
		]
	);

	return circularEnclosures;
}

function loadSquareEnclosures(markerIcon) {
	var squareEnclosures = L.layerGroup(
		[
			// Preble County
			getMarker('OH - Preble County - Earthworks - West Alexandria', 39.786073, -84.534558, markerIcon),
			getMarker('OH - Preble County - Earthworks - Enclosure', 39.662643, -84.587186, markerIcon),
		]
	);

	return squareEnclosures;
}

function loadMounds(markerIcon) {
	var mounds = L.layerGroup(
		[
			// Preble County
			getMarker('OH - Preble County - Mound - Eaton', 39.687697, -84.654768, markerIcon),
			getMarker('OH - Preble County - Mound - Eaton', 39.718253, -84.625208, markerIcon),
			getMarker('OH - Preble County - Mound - Millers Fork', 39.871758, -84.531922, markerIcon),
			getMarker('OH - Preble County - Mound - Bantas Fork', 39.814658, -84.656321, markerIcon),
			getMarker('OH - Preble County - Mound - Lewisburg', 39.834729, -84.542169, markerIcon),
			getMarker('OH - Preble County - Mound - Lewisburg', 39.853552, -84.512593, markerIcon),
			getMarker('OH - Preble County - Mound Hill Cemetery Mound', 39.742990, -84.647458, markerIcon),
			getMarker('OH - Preble County - Mound - Eaton', 39.742336, -84.640171, markerIcon),
			getMarker('OH - Preble County - Mound - Fairhaven', 39.654293, -84.766950, markerIcon),
			getMarker('OH - Preble County - Mound - Houston Woods Campground', 39.583425, -84.777082, markerIcon),
		]
	);

	return mounds;
}

function loadVillages(markerIcon) {
	var villages = L.layerGroup(
		[
			// Preble County
			getMarker('OH - Preble County - Indian Village - Camden', 39.618494, -84.655175, markerIcon),
			getMarker('OH - Preble County - Indian Village - Lewisburg', 39.829725, -84.541508, markerIcon),
			getMarker('OH - Preble County - Indian Village - New Paris', 39.848445, -84.796224, markerIcon),
			getMarker('OH - Preble County - Indian Village - Twin Creek', 39.660702, -84.489130, markerIcon),
			getMarker('OH - Preble County - Indian Village - W. Alexandria', 39.755812, -84.529928, markerIcon),
		]
	);

	return villages;
}

function init() {
	// Marker icons
	var burialIcon = L.icon({ iconUrl: "images/indian_burial.png", iconSize: [40, 40] });
	var circularEnclosureIcon = L.icon({ iconUrl: "images/indian_circular_enclosure.png", iconSize: [40, 40] });
	var squareEnclosureIcon = L.icon({ iconUrl: "images/indian_square_enclosure.png", iconSize: [40, 40] });
	var moundIcon = L.icon({ iconUrl: "images/indian_mound.png", iconSize: [30, 30] });
	var villageIcon = L.icon({ iconUrl: "images/indian_village.png", iconSize: [30, 30] });

	var osmLink = "<a href='http://www.openstreetmap.org'>Open StreetMap</a>";

	var osmBaseMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Map data &copy; ' + osmLink, maxZoom: 18, });
	var osmTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
	});
	var esriWorldImageryMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});
	var esriWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
	});
	var usgsUSTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 20,
		attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
	});

	var burials = loadBurials(burialIcon);

	var circularEnclosures = loadCircularEnclosures(circularEnclosureIcon);

	var squareEnclosures = loadSquareEnclosures(squareEnclosureIcon);

	var mounds = loadMounds(moundIcon);

	var villages = loadVillages(villageIcon);

	var map = L.map('map', {
		center: [39.744445, -84.532237],
		zoom: 8,
		layers: [osmBaseMap, burials, circularEnclosures, squareEnclosures, mounds, villages]
	});

	var baseMaps = { "Standard": osmBaseMap, "Esri World Imagery": esriWorldImageryMap, "Esri World Topo": esriWorldTopoMap, "Open Topo": osmTopoMap, "USGS Topo": usgsUSTopo };
	var overlayMaps = { "Burials": burials, "Circular Enclosures": circularEnclosures, "Square Enclosures": squareEnclosures, "Mounds": mounds, "Villages": villages };

	L.control.layers(baseMaps, overlayMaps).addTo(map);
}
