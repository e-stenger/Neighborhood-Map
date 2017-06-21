// open and close sideNav when explore button is clicked from hamburger menu notes Udacity
var menu = document.querySelector('#menu');
var main = document.querySelector('main');
var drawer = document.querySelector('.nav');
main.addEventListener('click', function() {
    drawer.classList.toggle('open');
});
// locations array, list of sites
var sites = [{
        title: 'Giza Pyramids Ticket Office and Entrance',
        lat: "29.981907",
        lng: "31.132551"
    },
    {
        title: 'The Great Pyramid at Giza',
        lat: "29.979245",
        lng: "31.1342000"
    },
    {
        title: 'Pyramid of Khafre',
        lat: "29.976000",
        lng: "31.130784"
    },
    {
        title: 'Great Sphinx of Giza',
        lat: "29.975300",
        lng: "31.137604"
    },
    {
        title: 'Pyramid of Hetepheres I',
        lat: "29.978900",
        lng: "31.136229"
    },
    {
        title: 'Khufu Ship',
        lat: "29.978000",
        lng: "31.134623"
    },
    {
        title: 'Giza Necropolis',
        lat: "29.977311",
        lng: "31.132520"
    },
    {
        title: 'Tomb of Hemiunu',
        lat: "29.979366",
        lng: "31.129901"
    },
    {
        title: 'Mortuary Temple of Khufu',
        lat: "29.979260",
        lng: "31.135675"
    },
    {
        title: 'Rock Cut Tombs',
        lat: "29.977248",
        lng: "31.129331"
    },
    {
        title: 'Valley Temple of Khafre',
        lat: "29.974790",
        lng: "31.138358"
    },
    {
        title: 'Pyramid of Mankaure',
        lat: "29.972675",
        lng: "31.128523"
    },
    {
        title: 'Pyramids of Queens',
        lat: "29.971573",
        lng: "31.127991"
    }
];
var Location = function(data) {
    this.title = data.title;
    this.lat = data.lat;
    this.lng = data.lng;
    this.marker = data.marker;
};
//init map
var map;
// map fail function
var mapError = function() {
    alert('MAP FAILED TO LOAD, please refresh and/or check console for error');
};
//load map with starting coordinates and properties
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 29.975250,
            lng: 31.131500
        },
        zoom: 16,
        mapTypeId: 'satellite',
        mapTypeControl: false
    });
    ko.applyBindings(new ViewModel());
}
//viewmodel
var ViewModel = function() {
    var self = this;
    //markers array
    self.allSites = [];
    sites.forEach(function(site) {
        self.allSites.push(site);
    });
    //ko.obseverable markers
    self.locationList = ko.observableArray([]);
    sites.forEach(function(site) {
        self.locationList.push(site);
    });
    //toggleBounce, handleThis, markerClick function credit documentation and forum (modified)
    var toggleBounce = function(marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {marker.setAnimation(null); }, 1600);
        setLocation(marker);
    };
var lastInfoWindow = null;
this.handleThis = function(marker, infoWindow) {
    return function() {
        if (lastInfoWindow === infoWindow) {
            toggleBounce(marker);
            infoWindow.close(map, this);
            lastInfoWindow = null;
        } else {
            if (lastInfoWindow !== null) {
                lastInfoWindow.close(map, this);
                toggleBounce(marker);
            }
            toggleBounce(marker);
            infoWindow.open(map, this);
            lastInfoWindow = infoWindow;
        }
    };
};
// markerClick ties list item to cooresponding marker
self.markerClick = function(location) {
    google.maps.event.trigger(location.marker, 'click');
    };

//create marker and infowindow
self.allSites.forEach(function(site) {
            latLng = new google.maps.LatLng(sites.lat, sites.lng);
            var markerOptions = {
                map: map,
                position: latLng
            };

            var createMarkers = function() {
                site.marker = new google.maps.Marker(markerOptions);
                site.infoWindow = new google.maps.InfoWindow({
                    display: '<h1' + site.title + '<h1>'
                });
                //listener opens infowindow and animates marker
                google.maps.event.addListener(location.marker, 'click', handleThis(location.marker, location.infoWindow));
            }

//search filter
self.userInput = ko.observable('');
self.searchMarkers = function() {
    var searchInput = self.userInput().toLowerCase();
    self.locationList.removeAll();
    self.allSites.forEach(function(site) {
        location.marker.setVisible(false);
        if(site.title.toLowerCase().indexOf(searchInput) !== -1) {
            self.locationList.push(site);
        }
});
    self.locationList().forEach(function(site) {
        location.marker.setVisible(true);
    });
};
function Site(data) {
    this.title = data.title;
    this.lat = data.lat;
    this.lng = data.lng;
    this.marker = null;
}
this.currentLocation = ko.observable();
this.setLocation = function(site) {
    self.currentLocation(site);
};
});
};

