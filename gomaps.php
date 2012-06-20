<?php require('lib/src-client.php'); include('lib/extra/class.krumo.php');?>
<?php $src = new SrcClient('5257d32745ffdc33c253fff73a5e5b31', 'b01975255a8be1d7afda88c228c19b47'); ?>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
Heylo thur
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map_canvas { height: 100% }
    </style>
    <script type="text/javascript"
      src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBV7iV0eIHKxPkBIGtJb0020G-X1g4wg8E&sensor=false">
    </script>
<script src="http://code.jquery.com/jquery-latest.js"></script>
    <script type="text/javascript">
   
var map;
var supplylines;

   function initialize() {
        var myOptions = {
          center: new google.maps.LatLng(40, -20),
          zoom: 3,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

       
   map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
   
   var lineOptions = {
       strokeColor: "black",
       strokeOpacity: 1.0,
       strokeWeight: 3
   }
  

  supplylines = new google.maps.Polyline(lineOptions);
  supplylines.setMap(map);

  google.maps.event.addListener(map, 'dblclick', addStop);
//  var kLayer = new google.maps.kmlLayer('http://www.sourcemap.com/services/supplychain/744?f=kml');
//   kLayer.setMap(map);
}

  function addStop(event) {
      var markerName =  prompt("What is the name of this location?", "Type location name here");
      if (markerName!=null){
          if (markerName=="Type location name here") markerName="Untitled Location";
          var newMarker = new google.maps.Marker({
          position: event.latLng,
          title: markerName,
          map:map
      });
          var descriptionInfo = prompt("Would you like to add a description?", "Type description here");
          if (descriptionInfo==null || descriptionInfo=="Type description here") descriptionInfo="";
          var infowindow = new google.maps.InfoWindow({
              content: '<b>' + markerName + '</b><br/><i>Lat/Long Coords:' + newMarker.getPosition() + '</i><br/>' + descriptionInfo
          });
          
      var path = supplylines.getPath();
      path.push(event.latLng);
     
      google.maps.event.addListener(newMarker, 'click', function() {
          infowindow.open(map,newMarker);
      });
      }
   new google.maps.LatLng = google.maps.Projection.fromPointToLatLng("POINT(-7910337.7674084 5214822.776215)");

    
  }

function MercatorToLatLon(mercX, mercY) {
 
    var rMajor = 6378137; //Equatorial Radius, WGS84
    var shift  = Math.PI * rMajor;
    var lon    = mercX / shift * 180.0;
    var lat    = mercY / shift * 180.0;
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180.0)) - Math.PI / 2.0);
 
    return { 'Lon': lon, 'Lat': lat };
}

var thisguy = MercatorToLatLon(-7910337.7674084, 5214822.776215);
console.log(thisguy);

    </script>
  </head>
  <body onload="initialize()">
    <div id="map_canvas" style="width:100%; height:100%"></div>
  </body>
</html>

 <?php
    $data = 
    '{ "supplychain":{ "attributes":{"title": "API Test"}, 
           "stops":[
               {"local_stop_id":1,"id":1,"geometry":"POINT(-7910337.7674084 5214822.776215)","attributes":{"title":"Facility #1", "address":"Boston, MA, USA"}},
               {"local_stop_id":2,"id":2,"geometry":"POINT(-8238307.2400059 4970299.6279391)","attributes":{"title":"Facility #2", "address":"New York, NY, USA"}}
           ],
           "hops":[
               {"from_stop_id":2,"to_stop_id":1,"geometry":"MULTILINESTRING((-8238307.2400059 4970299.6279391,-7910337.7674084 5214822.776215))","attributes":{"title":"Facility #2 to Facility #1"}}
           ] }
    }';

print_r(json_decode($data));




?>


"gomaps.html" 43L, 1926C               

