// open and close sideNav when explore button is clicked from hamburger menu notes Udacity
var menu = document.querySelector('#menu');
var main = document.querySelector('aside');
var drawer = document.querySelector('.nav');
main.addEventListener('click', function() {
    drawer.classList.toggle('open');
});
// locations array, list of sites
var sites = [{
        title: "Giza Pyramid Complex",
        lat: "29.981907",
        lng: "31.132551",
        photo:""
    },
    {
        title: "The Great Pyramid at Giza",
        lat: "29.979245",
        lng: "31.1342000",
        photo:""
    },
    {
        title: "Pyramid of Khafre",
        lat: "29.976000",
        lng: "31.130784",
        photo:""
    },
    {
        title: "Great Sphinx of Giza",
        lat: "29.975300",
        lng: "31.137604",
        photo:""
    },
    {
        title: "Hetepheres I",
        lat: "29.978900",
        lng: "31.136229",
        photo:""
    },
    {
        title: "Khufu Ship",
        lat: "29.978000",
        lng: "31.134623",
        photo:""
    },
    {
        title: "Giza Necropolis",
        lat: "29.977311",
        lng: "31.132520",
        photo:""
    },
    {
        title: "Hemiunu",
        lat: "29.979366",
        lng: "31.129901",
        photo:""
    },
    {
        title: "Khufus Pyramid",
        lat: "29.979260",
        lng: "31.135675",
        photo:""
    },
    {
        title: "Rock Cut Tombs",
        lat: "29.977248",
        lng: "31.129331",
        photo:""
    },
    {
        title: "Valley Temple of Khafre",
        lat: "29.974790",
        lng: "31.138358",
        photo:""
    },
    {
        title: "Pyramid of Menkaure",
        lat: "29.972675",
        lng: "31.128523",
        photo:""
    },
    {
        title: "Pyramid of Userkaf",
        lat: "29.971573",
        lng: "31.127991",
        photo: ""
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
        setTimeout(function() {marker.setAnimation(null); }, 1600);
    };

var lastInfoWindow = null;
self.handleThis = function(marker, infoWindow) {
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
this.markerClick = function(location) {
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
                    content: '<h2>' + site.title + '</h2>' + '<div>'+ wikiElem +'</div>', maxWidth:300
                }); 
                
                //listener opens infowindow and animates marker
                google.maps.event.addListener(site.marker, 'click', self.handleThis(site.marker, site.infoWindow));
            };

            //createMarkers();

//wikipedia api call
var wikiElem = [];

var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + site.title + '&format=json&callback=wikiCallback';
$.ajax(wikiUrl, {
    dataType: 'jsonp' 
}).done(function(response) {
        console.log(response);
        var articleList = response[1];
        for (var i = 0; i < articleList.length; i++) {
            articleStr = articleList [i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            wikiElem.push('<li id="wikiLinks"><a href =' + url + '>' + articleStr + '</a><li>');
        }
        createMarkers();
    }).fail(function() {
        wikiElem.push('<h3>Wikipedia failed to load info for location</h3>');
    });

});

//search filter
self.userInput = ko.observable('');
self.searchMarkers = function() {
    var searchInput = self.userInput().toLowerCase();
    self.locationList.removeAll();
    self.allSites.forEach(function(site) {
        site.marker.setVisible(false);
        if(site.title.toLowerCase().indexOf(searchInput) !== -1) {
            self.locationList.push(site);
        }
});
    self.locationList().forEach(function(site) {
        site.marker.setVisible(true);
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
};


