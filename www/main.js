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
		]
	);

	return burials;
}

function loadMounds(markerIcon) {
	var mounds = L.layerGroup(
		[
			// Montgomery County
			getMarker('OH - Montgomery County - Mound', 39.734360, -84.457132, markerIcon),

			// Preble County
			getMarker('OH - Preble County - Mound - Eaton', 39.687697, -84.654768, markerIcon),
			getMarker('OH - Preble County - Mound - Eaton', 39.718253, -84.625208, markerIcon),
			getMarker('OH - Preble County - Mound - Millers Fork', 39.871758, -84.531922, markerIcon),
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

	var mounds = loadMounds(moundIcon);

	var villages = loadVillages(villageIcon);

	var map = L.map('map', {
		center: [39.744445, -84.532237],
		zoom: 8,
		layers: [osmBaseMap, burials, mounds, villages]
	});

	var baseMaps = { "Standard": osmBaseMap, "Esri World Imagery": esriWorldImageryMap, "Esri World Topo": esriWorldTopoMap, "Open Topo": osmTopoMap, "USGS Topo": usgsUSTopo };
	var overlayMaps = { "Burials": burials, "Mounds": mounds, "Villages": villages };

	L.control.layers(baseMaps, overlayMaps).addTo(map);
}
