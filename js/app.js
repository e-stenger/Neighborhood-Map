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
        lng: "31.132551",
        url: "https://en.wikipedia.org/wiki/Giza_pyramid_complex"
    },
    {
        title: 'The Great Pyramid at Giza',
        lat: "29.979245",
        lng: "31.1342000",
        url: "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza"
    },
    {
        title: 'Pyramid of Khafre',
        lat: "29.976000",
        lng: "31.130784",
        url: "https://en.wikipedia.org/wiki/Pyramid_of_Khafre"
    },
    {
        title: 'Great Sphinx of Giza',
        lat: "29.975300",
        lng: "31.137604",
        url: "https://en.wikipedia.org/wiki/Great_Sphinx_of_Giza"
    },
    {
        title: 'Pyramid of Hetepheres I',
        lat: "29.978900",
        lng: "31.136229",
        url: "https://en.wikipedia.org/wiki/Hetepheres_I"
    },
    {
        title: 'Khufu Ship',
        lat: "29.978000",
        lng: "31.134623",
        url: "https://en.wikipedia.org/wiki/Khufu_ship"
    },
    {
        title: 'Giza Necropolis',
        lat: "29.977311",
        lng: "31.132520",
        url: "https://simple.wikipedia.org/wiki/Giza_Necropolis"
    },
    {
        title: 'Tomb of Hemiunu',
        lat: "29.979366",
        lng: "31.129901",
        url: "https://en.wikipedia.org/wiki/Hemiunu"
    },
    {
        title: 'Mortuary Temple of Khufu',
        lat: "29.979260",
        lng: "31.135675",
        url: "https://en.wikipedia.org/wiki/Mortuary_temple"
    },
    {
        title: 'Rock Cut Tombs',
        lat: "29.977248",
        lng: "31.129331",
        url: "https://en.wikipedia.org/wiki/Rock-cut_tomb"
    },
    {
        title: 'Valley Temple of Khafre',
        lat: "29.974790",
        lng: "31.138358",
        url: "https://sv.m.wikipedia.org/wiki/Valley_Temple_of_Khafre"
    },
    {
        title: 'Pyramid of Menkaure',
        lat: "29.972675",
        lng: "31.128523",
        url: "https://en.wikipedia.org/wiki/Pyramid_of_Menkaure"
    },
    {
        title: 'Pyramids of Queens',
        lat: "29.971573",
        lng: "31.127991",
        url: "https://sv.wikipedia.org/wiki/Pyramids_of_Queens"
    }
];
var Location = function(data) {
    this.title = data.title;
    this.lat = data.lat;
    this.lng = data.lng;
    this.url = data.url;
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
            lat: 29.972000,
            lng: 31.133000
        },
        zoom: 15,
        mapTypeId: 'satellite',
        mapTypeControl: false,
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
        //console.log(site);
    });
    //toggleBounce, handleThis, markerClick function credit documentation and forum (modified)
    var toggleBounce = function(marker) { 
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {marker.setAnimation(null); }, 1500);
    };

var lastInfoWindow = null;
self.handleThis = function(site, infoWindow) {
    return function() {
        if (lastInfoWindow === infoWindow) {
            toggleBounce(site.marker);
            infoWindow.close(map, this);
            lastInfoWindow = null;
        } else {
            if (lastInfoWindow !== null) {
                lastInfoWindow.close(map, this);
                toggleBounce(site.marker);
            }
            toggleBounce(site.marker);
            infoWindow.open(map, this);
            lastInfoWindow = infoWindow;
        }
    infoWindow.setContent('<h2>' + site.title + '</h2>' + '<a href="' + site.url + '" target="_blank">' + site.url + '</a>' + site.siteImage);
    };
};

// markerClick ties list item to cooresponding marker
self.markerClick = function(location) {
    google.maps.event.trigger(location.marker, 'click');
    };

//create marker and infowindow
self.allSites.forEach(function(site) {
            var markerOptions = {
                map: map,
                position: {lat: parseFloat(site.lat),lng: parseFloat(site.lng)},
            };

            var createMarkers = function() {
                site.marker = new google.maps.Marker(markerOptions);
                site.infoWindow = new google.maps.InfoWindow ({
                }); 
                
                //listener opens infowindow and animates marker
                google.maps.event.addListener(site.marker, 'click', self.handleThis(site, site.infoWindow));
            };

            createMarkers();

// foursquare api info - trying to get working from forum post modified
var foursquareURL = "https://api.foursquare.com/v2/venues/4b9f7a50f964a520422537e3/photos?&client_id=M5AMWSRULFRYVIAV11A40HE1DYOLQBULFQHFR1X1HJUH1UII&client_secret=WHYWWD30H2V0Z4SN5PEBLMY4MN0QL0SO3ETSWIMFBP225WI0&v=20170620&m=foursquare";
var photo = [];

function foursquarePhotos () {
    $.ajax({
        async: true,
        url: foursquareURL,
        dataType: "jsonp",
        success: function (response) {
            console.log(response);
            var photos = response.response.photos;
            var photo = photos.items[1];
            var img = photo.prefix + 'width' + photo.width + photo.suffix;
            console.log(photos);
            console.log(photo);
            var siteImage = ('<img class="siteImage" src="' + img + '">');
            site.siteImage = siteImage;
        }

    });
 }
foursquarePhotos();


//search filter
self.userInput = ko.observable('');
self.filterMarkers = function() {
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
    this.url = data.url;
    this.marker = null;
}
this.currentLocation = ko.observable();
this.setLocation = function(site) {
    self.currentLocation(site);
};
});
};

