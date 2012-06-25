<?php require('lib/src-client.php'); include('lib/extra/class.krumo.php');?>
<?php $src = new SrcClient('5257d32745ffdc33c253fff73a5e5b31', 'b01975255a8be1d7afda88c228c19b47'); ?>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
Heylo thur
<button onclick="importSourceMap()">Wanna import?</button>
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

var data2 = { "supplychain":{ "category":null,"created":1298652652, "flags":32,"id":1,"modified":1306106036, "other_perms":1,"usergroup_id":null, "usergroup_perms":0,"user_id":234, "owner":{ "id":444,"name":"somefakeuserguy", "avatar":"http:\/\/www.gravatar.com\/avatar\/..." }, "taxonomy":null, "attributes":{}, "stops":[ { "local_stop_id":5,"id":5,"geometry": "POINT(-9349165.430522 4044184.943345)", "attributes":{ "name":"Facility #5" } },{ "local_stop_id":4,"id":4,"geometry": "POINT(-10634992.255936 3485526.892738)", "attributes":{ "name":"Facility #4" } },{ "local_stop_id":3,"id":3,"geometry": "POINT(-12489606.041822 3954200.282625)", "attributes":{ "name":"Facility #3" } },{ "local_stop_id":2,"id":2,"geometry": "POINT(-7929147.678904 5239202.289146)", "attributes":{ "name":"Facility #2" } },{ "local_stop_id":1,"id":1,"geometry": "POINT(-10804007.180522 3869332.593955)", "attributes":{ "name":"Facility #1" } } ], "hops":[ { "from_stop_id":3,"to_stop_id":1, "geometry": "MULTILINESTRING((-12489606.041822 3954200.282625, -10804007.180522 3869332.593955))", "attributes":{} },{ "from_stop_id":3,"to_stop_id":2, "geometry": "MULTILINESTRING((-12489606.041822 3954200.282625, -7929147.678904 5239202.289146))", "attributes":{} },{ "from_stop_id":3,"to_stop_id":4, "geometry": "MULTILINESTRING((-12489606.041822 3954200.282625, -10634992.255936 3485526.892738))", "attributes":{} },{ "from_stop_id":3,"to_stop_id":5, "geometry": "MULTILINESTRING((-12489606.041822 3954200.282625, -9349165.430522 4044184.943345))", "attributes":{} } ] },"editable":false };


var data = 
    { "supplychain":{ "attributes":{"title": "API Test"}, 
           "stops":[
               {"local_stop_id":1,"id":1,"geometry":"POINT(-7910337.7674084 5214822.776215)","attributes":{"title":"Facility #1", "address":"Boston, MA, USA"}},
               {"local_stop_id":2,"id":2,"geometry":"POINT(-8238307.2400059 4970299.6279391)","attributes":{"title":"Facility #2", "address":"New York, NY, USA"}}
           ],
           "hops":[
               {"from_stop_id":2,"to_stop_id":1,"geometry":"MULTILINESTRING((-8238307.2400059 4970299.6279391,-7910337.7674084 5214822.776215))","attributes":{"title":"Facility #2 to Facility #1"}}
           ] }
    };

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
}

  function addHopFromImport(supplyHop){
    var hopStrip = supplyHop.geometry.split("(");
    var hopStrip1 = hopStrip[2].split(")");
    var hopStrip2 = hopStrip1[0].split(", ");
    var fromStrip = hopStrip2[0].split(" ");
    var toStrip = hopStrip2[1].split(" ");
    var fromLatLng = MercatorToLatLon(fromStrip[0], fromStrip[1]);
    var toLatLng = MercatorToLatLon(toStrip[0], toStrip[1]);
    var fromLL = new google.maps.LatLng(fromLatLng.Lat, fromLatLng.Lon);
    var toLL = new google.maps.LatLng(toLatLng.Lat, toLatLng.Lon);
    var myLineOptions = {
        strokeColor: "black",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map,
        path: [fromLL, toLL]
}   
    var myNewHop = new google.maps.Polyline(myLineOptions);
}    



  function addStopFromImport(supplyStop, stopID){
      var markerName = supplyStop.attributes.name;
      var markerAddress= supplyStop.attributes.address;
      var markerDescription = supplyStop.attributes.description;
      var markerSplit = supplyStop.geometry.split("(");
      markerSplit1 = markerSplit[1].split(")");
      markerSplit2 = markerSplit1[0].split(" ");
      var markerLat = markerSplit2[0]; 
      var markerLng = markerSplit2[1];
      var myLatLng = MercatorToLatLon(markerLat, markerLng);
      var myLL = new google.maps.LatLng(myLatLng.Lat, myLatLng.Lon);
      var myNewMarker = new google.maps.Marker({
          position: myLL,
          title: markerName,
          map: map,
          id: stopID,
          description: markerDescription
      });
      if (!myNewMarker.title) myNewMarker.title = "Untitled";          
      if (!myNewMarker.description) myNewMarker.description = "";
 
      var myInfoWindow = new google.maps.InfoWindow({
            content: '<b>' + myNewMarker.title + '</b><br/><i>Lat/Long Coords:' + myNewMarker.position + '</i><br/>' + myNewMarker.description
});
      google.maps.event.addDomListener(myNewMarker, 'click', function() {
         myInfoWindow.open(map, myNewMarker);
        });

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
  // new google.maps.LatLng = google.maps.Projection.fromPointToLatLng("POINT(-7910337.7674084 5214822.776215)");

    
  }

function MercatorToLatLon(mercX, mercY) {
 
    var rMajor = 6378137; //Equatorial Radius, WGS84
    var shift  = Math.PI * rMajor;
    var lon    = mercX / shift * 180.0;
    var lat    = mercY / shift * 180.0;
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180.0)) - Math.PI / 2.0);
 
    return { 'Lon': lon, 'Lat': lat };
}






function importSourceMap() {
    var r=confirm("Import from SourceMap?");
    if (r==true) {
        for (var sstops in data2.supplychain.stops) {
        addStopFromImport(data2.supplychain.stops[sstops], sstops);
}
        for (var hhops in data2.supplychain.hops) {
        addHopFromImport(data2.supplychain.hops[hhops]);
}
}
else {
alert("you cancelled");
}
}


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


$data2 = '{ "supplychain":{ "category":null,"created":1298652652, "flags":32,"id":1,"modified":1306106036, "other_perms":1,"usergroup_id":null, "usergroup_perms":0,"user_id":234, "owner":{ "id":444,"name":"somefakeuserguy", "avatar":"http:\/\/www.gravatar.com\/avatar\/..." }, "taxonomy":null, "attributes":{}, "stops":[ { "local_stop_id":5,"id":5,"geometry": "POINT(-9349165.430522 4044184.943345)", "attributes":{ "name":"Facility #5" } },{ "local_stop_id":4,"id":4,"geometry": "POINT(-10634992.255936 3485526.892738)", "attributes":{ "name":"Facility #4" } },{ "local_stop_id":3,"id":3,"geometry": "POINT(-12489606.041822 3954200.282625)", "attributes":{ "name":"Facility #3" } },{ "local_stop_id":2,"id":2,"geometry": "POINT(-7929147.678904 5239202.289146)", "attributes":{ "name":"Facility #2" } },{ "local_stop_id":1,"id":1,"geometry": "POINT(-10804007.180522 3869332.593955)", "attributes":{ "name":"Facility #1" } } ], "hops":[ { "from_stop_id":3,"to_stop_id":1, "geometry": "MULTILINESTRING((-12489606.041822 3954200.282625, -10804007.180522 3869332.593955))", "attributes":{} },{ "from_stop_id":3,"to_stop_id":2, "geometry": "MULTILINESTRING((-12489606.041822 3954200.282625, -7929147.678904 5239202.289146))", "attributes":{} },{ "from_stop_id":3,"to_stop_id":4, "geometry": "MULTILINESTRING((-12489606.041822 3954200.282625, -10634992.255936 3485526.892738))", "attributes":{} },{ "from_stop_id":3,"to_stop_id":5, "geometry": "MULTILINESTRING((-12489606.041822 3954200.282625, -9349165.430522 4044184.943345))", "attributes":{} } ] },"editable":false }';



print_r(json_decode($data2));




?>


"gomaps.html" 43L, 1926C               

