// open and close sideNav when explore button is clicked from hamburger menu notes Udacity
      var menu = document.querySelector('#menu');
      var main = document.querySelector('main');
      var drawer = document.querySelector('.nav');

      main.addEventListener('click', function() {
        drawer.classList.toggle('open');
      });


var map;
var markers = [];

function initMap() {
	    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 29.975250, lng: 31.131500},
        zoom: 16,
        mapTypeId: 'satellite',
        mapTypeControl: false
       });

// list of sites to visit
var locations = [
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

       //style the markers this will be marker icon
       var defaultIcon = makeMarkerIcon('ffffff');

       // create a highlighted location when mouseover
       var highlightedIcon = makeMarkerIcon('FFFF00');

       // uses location array to create markers on initialize
       for (var i = 0; i < locations.length; i++) {
          //get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // create a marker per location, and put into markers array
          var marker = new google.maps.Marker({
          	map: map,
            position: position,
            title: title,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP, id: i
          });

          // push the marker to array of markers
          markers.push(marker);
          //create an onclick event to open an infowindow at each marker
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });

          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
          }

       //document.getElementById('show-markers').addEventListener('click', showMarkers);
       //document.getElementById('hide-markers').addEventListener('click', hideMarkers);


       function showMarkers() {
        var bounds = new google.maps.LatLngBounds();
        //extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
       }

       function hideMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
       }

       function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21, 34));
        return markerImage;
       }
   }









