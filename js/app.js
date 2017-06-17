// open and close sideNav when explore button is clicked from hamburger menu notes Udacity
      var menu = document.querySelector('#menu');
      var main = document.querySelector('main');
      var drawer = document.querySelector('.nav');

      main.addEventListener('click', function() {
        drawer.classList.toggle('open');
      });

// locations array, list of sites
var sites = [
       {title: 'Giza Pyramids Ticket Office and Entrance', location: {lat: 29.981907, lng: 31.132551}},
       {title: 'The Great Pyramid at Giza', location: {lat: 29.979245, lng: 31.1342000}},
       {title: 'Pyramid of Khafre', location: {lat: 29.976000, lng: 31.130784}},
       {title: 'Great Sphinx of Giza', location: {lat: 29.975300, lng: 31.137604}},
       {title: 'Pyramid of Hetepheres I', location: {lat: 29.978900, lng: 31.136229}},
       {title: 'Khufu Ship', location: {lat: 29.978000, lng: 31.134623}},
       {title: 'Giza Necropolis', location: {lat: 29.977311, lng: 31.132520}},
       {title: 'Tomb of Hemiunu', location: {lat: 29.979366, lng: 31.129901}},
       {title: 'Mortuary Temple of Khufu', location: {lat: 29.979260, lng: 31.135675}},
       {title: 'Rock Cut Tombs', location: {lat: 29.977248, lng: 31.129331}},
       {title: 'Valley Temple of Khafre', location: {lat: 29.974790, lng: 31.138358}},
       {title: 'Pyramid of Mankaure', location: {lat: 29.972675, lng: 31.128523}},
       {title: 'Pyramids of Queens', location: {lat: 29.971573, lng: 31.127991}}
       ];

var Location = function(data) {
  this.title=data.title;
  this.lat=data.lat;
  this.lng=data.lng;
};

//init map
var map;

function initMap() {
      map = new google.maps.Map(document.getElementById('#map'), {
        center: {lat: 29.975250, lng: 31.131500},
        zoom: 16,
        mapTypeId: 'satellite',
        mapTypeControl: false
       });
      ko.applyBindings(ViewModel());
    };

 //viewmodel
 var ViewModel = function() {
  var self=this;

//markers array
self.allSites = [];
places.forEach(function(site) {
  self.allLocations.push(site);
});

//ko.obseverable markers
self.siteList = ko.observableArray([]);
sites.forEach(function(site) {
  self.siteList.push(site);
});
 







