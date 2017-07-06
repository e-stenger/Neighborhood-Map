// open and close sideNav when explore button is clicked from hamburger menu notes Udacity
var menu = document.querySelector('#menu');
var main = document.querySelector('aside');
var drawer = document.querySelector('.nav');
main.addEventListener('click', function() {
    drawer.classList.toggle('open');
});
// locations array, list of sites
var sites = [{
        title: "Giza Pyramid Complex Tickets and Entrance",
        lat: "29.981907",
        lng: "31.132551",
        siteid: "1979299",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/50px-All_Gizah_Pyramids.jpg",
        extract: "The Giza pyramid complex is an archaeological site on the Giza Plateau, on the outskirts of Cairo, Egypt.This complex of ancient monuments includes the three pyramid complexes known as the Great Pyramids, the massive sculpture known as the Great Sphinx, several cemeteries, a workers' village and an industrial complex."
    },
    {
        title: "The Great Pyramid at Giza",
        lat: "29.979245",
        lng: "31.1342000",
        siteid: "12224",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/50px-Kheops-Pyramid.jpg",
        extract: "The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza pyramid complex bordering what is now El Giza, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact."
    },
    {
        title: "Pyramid of Khafre",
        lat: "29.976000",
        lng: "31.130784",
        siteid: "1942584",
    },
    {
        title: "Great Sphinx of Giza",
        lat: "29.975300",
        lng: "31.137604",
        siteid: "245173",
    },
    {
        title: "Pyramid of Hetepheres I",
        lat: "29.978900",
        lng: "31.136229",
        siteid: "6615670",
    },
    {
        title: "Khufu Ship",
        lat: "29.978000",
        lng: "31.134623",
        siteid: "4115690",
    },
    {
        title: "Giza Necropolis",
        lat: "29.977311",
        lng: "31.132520",
        siteid: "2092712",
    },
    {
        title: "Tomb of Hemiunu",
        lat: "29.979366",
        lng: "31.129901",
        siteid: "2260462",
    },
    {
        title: "Mortuary Temple of Khufu",
        lat: "29.979260",
        lng: "31.135675",
        siteid: "242606",
    },
    {
        title: "Rock Cut Tombs",
        lat: "29.977248",
        lng: "31.129331",
        siteid: "28022377",
    },
    {
        title: "Valley Temple of Khafre",
        lat: "29.974790",
        lng: "31.138358",
        siteid: "29616758",
    },
    {
        title: "Pyramid of Menkaure",
        lat: "29.972675",
        lng: "31.128523",
        siteid: "1970544",
    },
    {
        title: "Pyramid of Queens",
        lat: "29.971573",
        lng: "31.127991",
        siteid: "6802892",
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
                    content: '<h2>' + site.title + '</h2>' + '<div>' + wikiElem + '</div>'
                }); 
                
                //listener opens infowindow and animates marker
                google.maps.event.addListener(site.marker, 'click', self.handleThis(site.marker, site.infoWindow));
            };

            //createMarkers();

//wikipedia api call
var wikiElem = [];
var siteid = site.siteid;

var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts&exsentences=2&pageids=' + site.siteid + '';
    $.ajax(wikiUrl, {
      dataType: 'jsonp'
    }).done(function(error, success, data) {

      var obj = data.responseJSON.query.pages;
      var key = Object.keys(obj)[0];

      //console.log(Object.keys(obj))

      //console.log(obj)

      var thumbnail = data.responseJSON.query.pages[key].thumbnail.source;
      var extract = data.responseJSON.query.pages[key].extract;
      
       //console.log(thumbnail);
       //console.log(extract);

      wikiElem.push('<img src="' + thumbnail + '"><p>' + extract + '</p>');
      createMarkers();
    }).fail(function() {
       wikiElem.push('<h3>Wikipedia failed to load info for location</h3>');
       createMarkers();
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


