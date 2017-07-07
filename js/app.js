//open and close sideNav when explore button is clicked from hamburger menu notes Udacity
    var menu = document.querySelector('#menu');
    var main = document.querySelector('aside');
    var drawer = document.querySelector('.nav');
    main.addEventListener('click', function() {
    drawer.classList.toggle('open');
    });
//locations array, list of sites
    var sites = [{
        title: "Giza Pyramid Complex Tickets and Entrance",
        lat: "29.981907",
        lng: "31.132551",
        siteid: "1979299",
        url: "https://en.wikipedia.org/wiki/Giza_pyramid_complex"
    },
    {
        title: "The Great Pyramid at Giza",
        lat: "29.979245",
        lng: "31.1342000",
        siteid: "12224",
        url: "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza"
    },
    {
        title: "Pyramid of Khafre",
        lat: "29.976000",
        lng: "31.130784",
        siteid: "1942584",
        url: "https://en.wikipedia.org/wiki/Pyramid_of_Khafre"
    },
    {
        title: "Great Sphinx of Giza",
        lat: "29.975300",
        lng: "31.137604",
        siteid: "245173",
        url: "https://en.wikipedia.org/wiki/Great_Sphinx_of_Giza"
    },
    {
        title: "Pyramid of Hetepheres I",
        lat: "29.978900",
        lng: "31.136229",
        siteid: "6615670",
        url: "https://en.wikipedia.org/wiki/Hetepheres_I"
    },
    {
        title: "Khufu Ship",
        lat: "29.978000",
        lng: "31.134623",
        siteid: "4115690",
        url : "https://en.wikipedia.org/wiki/Khufu_ship"
    },
    {
        title: "Giza Necropolis",
        lat: "29.977311",
        lng: "31.132520",
        siteid: "2092712",
        url: "https://simple.wikipedia.org/wiki/Giza_Necropolis"
    },
    {
        title: "Tomb of Hemiunu",
        lat: "29.979366",
        lng: "31.129901",
        siteid: "2260462",
        url: "https://en.wikipedia.org/wiki/Hemiunu"
    },
    {
        title: "Mortuary Temple of Khufu",
        lat: "29.979260",
        lng: "31.135675",
        siteid: "242606",
        url: "https://en.wikipedia.org/wiki/Mortuary_temple"
    },
    {
        title: "Rock Cut Tombs",
        lat: "29.977248",
        lng: "31.129331",
        siteid: "28022377",
        url: "https://en.wikipedia.org/wiki/Rock-cut_tomb"
    },
    {
        title: "Valley Temple of Khafre",
        lat: "29.974790",
        lng: "31.138358",
        siteid: "29616758",
        url: "https://sv.m.wikipedia.org/wiki/Valley_Temple_of_Khafre"
    },
    {
        title: "Pyramid of Menkaure",
        lat: "29.972675",
        lng: "31.128523",
        siteid: "1970544",
        url: "https://en.wikipedia.org/wiki/Pyramid_of_Menkaure"
    },
    {
        title: "Pyramid of Queens",
        lat: "29.971573",
        lng: "31.127991",
        siteid: "6802892",
        url: "https://sv.wikipedia.org/wiki/Pyramids_of_Queens"
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
    });
//toggleBounce, handleThis, markerClick function credit documentation and forum (modified)
        var toggleBounce = function(marker) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
            marker.setAnimation(null);
            }, 1600);
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
                position: {
                    lat: parseFloat(site.lat),
                    lng: parseFloat(site.lng)
                },
            };

        var createMarkers = function() {
            site.marker = new google.maps.Marker(markerOptions);
            site.infoWindow = new google.maps.InfoWindow({
                content: '<h2>' + site.title + '</h2>' + '<div>' + wikiElem + '</div>' + '<h2>Read More</h2>' + '<a href="' + site.url + '" target="_blank">' + site.url + '</a><br>'
            });

//listener opens infowindow and animates marker
            google.maps.event.addListener(site.marker, 'click', self.handleThis(site.marker, site.infoWindow));
            };

        //wikipedia api call credit help to @Karol 1:1 meeting
        var wikiElem = [];
        var siteid = site.siteid;

        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts&exchars=750&pageids=' + site.siteid + '';
            $.ajax(wikiUrl, {
                dataType: 'jsonp'
            }).done(function(error, success, data) {
                var obj = data.responseJSON.query.pages;
                var key = Object.keys(obj)[0];
            var thumbnail = data.responseJSON.query.pages[key].thumbnail.source;
            var extract = data.responseJSON.query.pages[key].extract;
            wikiElem.push('<img src="' + thumbnail + '"><p>' + extract + '</p>');
            createMarkers();
        }).fail(function() {
            wikiElem.push('<h2>Wikipedia failed to load info for location</h2>');
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
                if (site.title.toLowerCase().indexOf(searchInput) !== -1) {
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


