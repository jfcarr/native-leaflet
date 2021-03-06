// Not currently used...
class MapBuilder {
	constructor() {
		this.osmLink = "<a href='http://www.openstreetmap.org'>Open StreetMap</a>";
		this.map = L.map('map').setView([39.744445, -84.532237], 8);

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; ' + this.osmLink, maxZoom: 18,
		}).addTo(this.map);

		// Marker icons
		this.villageIcon = L.icon({ iconUrl: "images/indian_village.png", iconSize: [30, 30] });
		this.moundIcon = L.icon({ iconUrl: "images/indian_mound.png", iconSize: [30, 30] });
	}

	displayMound(latitude, longitude, description) {
		var pubMarker = L.marker([latitude, longitude],
			{
				icon: this.moundIcon,
				title: description,
				alt: description
			}).addTo(this.map);
	}

	displayVillage(latitude, longitude, description) {
		var pubMarker = L.marker([latitude, longitude],
			{
				icon: this.villageIcon,
				title: description,
				alt: description
			}).addTo(this.map);
	}
}
