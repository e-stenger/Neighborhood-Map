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
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Pyramid_of_Khafre_Giza_Egypt_in_2015_2.jpg/50px-Pyramid_of_Khafre_Giza_Egypt_in_2015_2.jpg",
        extract: "The Pyramid of Khafre or of Chephren is the second-tallest and second-largest of the Ancient Egyptian Pyramids of Giza and the tomb of the Fourth-Dynasty pharaoh Khafre (Chefren)"
    },
    {
        title: "Great Sphinx of Giza",
        lat: "29.975300",
        lng: "31.137604",
        siteid: "245173",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Great_Sphinx_of_Giza_May_2015.JPG/50px-Great_Sphinx_of_Giza_May_2015.JPG",
        extract: "The Great Sphinx of Giza The Terrifying One; literally: Father of Dread), commonly referred to as the Sphinx of Giza or just the Sphinx, is a limestone statue of a reclining sphinx, a mythical creature with the body of a lion and the head of a human."
    },
    {
        title: "Pyramid of Hetepheres I",
        lat: "29.978900",
        lng: "31.136229",
        siteid: "6615670",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hetepheres_chair.jpg/50px-Hetepheres_chair.jpg",
        extract: "Hetepheres I may have been a wife of pharaoh Sneferu, and the mother of King Khufu. It is possible that Hetepheres was only a minor wife of Sneferu and only rose in prominence after her son ascended the throne."
    },
    {
        title: "Khufu Ship",
        lat: "29.978000",
        lng: "31.134623",
        siteid: "4115690",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Gizeh_Sonnenbarke_BW_2.jpg/33px-Gizeh_Sonnenbarke_BW_2.jpg",
        extract: "The Khufu ship is an intact full-size vessel from Ancient Egypt that was sealed into a pit in the Giza pyramid complex at the foot of the Great Pyramid of Giza around 2500 BC. The ship now is preserved in the Giza Solar boat museum."
    },
    {
        title: "Giza Necropolis",
        lat: "29.977311",
        lng: "31.132520",
        siteid: "2092712",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Giza-pyramids.JPG/50px-Giza-pyramids.JPG",
        extract: "The Giza Plateau is a plateau that is located in Giza, Egypt. The famous Giza Necropolis is located in this geographical area, which is characterized by a sandy, desert climate and terrain with little vegetation."
    },
    {
        title: "Tomb of Hemiunu",
        lat: "29.979366",
        lng: "31.129901",
        siteid: "2260462",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Statue-of-Hemiun.jpg/28px-Statue-of-Hemiun.jpg",
        extract: "Hemiunu (fl. 2570 BC) is believed to be the architect of the Great Pyramid of Giza, Egypt. As vizier, Hemiunu was one the most important members of the court and responsible for all the royal works. His tomb lies close to Khufu's pyramid."
    },
    {
        title: "Mortuary Temple of Khufu",
        lat: "29.979260",
        lng: "31.135675",
        siteid: "242606",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Khufu_CEM.jpg/33px-Khufu_CEM.jpg",
        extract: "Khufu , is the birth name of an ancient Egyptian pharaoh, who ruled during the Fourth Dynasty in the first half of the Old Kingdom period (26th century BC). Khufu was the second pharaoh of the 4th dynasty; he followed his possible father, king Sneferu, on the throne."
    },
    {
        title: "Rock Cut Tombs",
        lat: "29.977248",
        lng: "31.129331",
        siteid: "28022377",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Tomba_a_dado_necropoli_della_casetta_blera.jpg/50px-Tomba_a_dado_necropoli_della_casetta_blera.jpg",
        extract: "A rock-cut tomb is a burial chamber that is cut into an existing, naturally occurring rock formation, usually along the side of a hill. It was a common form of burial for the wealthy in ancient times in several parts of the world. Important examples are found in Egypt, most notably in the town of Deir el-Medina (Seet Maat), located between the Valley of the Kings and the Valley of the Queens."
    },
    {
        title: "Valley Temple of Khafre",
        lat: "29.974790",
        lng: "31.138358",
        siteid: "29616758",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Khafre_statue.jpg/37px-Khafre_statue.jpg",
        extract: "Khafre Enthroned is a funerary statue of the Pharaoh Khafre, the statue was carved for the Pharaohs valley temple near the Great Sphinx, a part of the necropolis (a funerary city) used in funeral rituals."
    },
    {
        title: "Pyramid of Menkaure",
        lat: "29.972675",
        lng: "31.128523",
        siteid: "1970544",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cairo%2C_Gizeh%2C_Pyramid_of_Menkaure%2C_Egypt%2C_Oct_2005.jpg/50px-Cairo%2C_Gizeh%2C_Pyramid_of_Menkaure%2C_Egypt%2C_Oct_2005.jpg",
        extract: "The Pyramid of Menkaure, located on the Giza Plateau in the southwestern outskirts of Cairo, Egypt, is the smallest of the three main Pyramids of Giza. It is thought to have been built to serve as the tomb of the fourth dynasty Egyptian Pharaoh Menkaure."
    },
    {
        title: "Pyramid of Queens",
        lat: "29.971573",
        lng: "31.127991",
        siteid: "6802892",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Saqqarah_Ouserkaf_06.jpg/50px-Saqqarah_Ouserkaf_06.jpg",
        extract: "Userkaf's pyramid is part of a larger mortuary complex comprising a mortuary temple, an offering chapel and a cult pyramid as well as separate pyramid and mortuary temple for Userkaf's wife, queen Neferhetepes. Userkaf's mortuary temple and cult pyramid are today completely ruined and difficult to recognize. The pyramid of the queen is no more than a mound of rubble, with its funerary chamber exposed by stone robbers."
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

            createMarkers();

//wikipedia api call
var wikiElem = [];
var thumbnail = site.thumbnail;
var extract = site.extract;

var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=' + site.thumbnail + ',' + site.extract + '&pageids=' + site.siteid + '';
$.ajax(wikiUrl, {
    dataType: 'jsonp' 

})//.done(function(response) {
//    console.log(response);
//var siteid = site.siteid;
//var extract = site.extract;
//var thumbnail = site.thumbnail;
console.log(wikiUrl);
      //  var siteid = response[1];
        
        })
        //createMarkers();
   // }.fail(function() {
     //   wikiElem.push('<h3>Wikipedia failed to load info for location</h3>');
   // });

//};

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


