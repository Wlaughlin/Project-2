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
    <script type="text/javascript">
      function initialize() {
        var myOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
      }
    </script>
  </head>
  <body onload="initialize()">
    <div id="map_canvas" style="width:100%; height:100%"></div>
  </body>
</html>

 <?php $data =
    '{ "supplychain":{ "other_perms":"1", "attributes":{"title": "Oh the places I go"},
        "stops":[
        {"local_stop_id":1,"id":1,"geometry":"POINT(-7935103.9952378 5204364.065495)","attributes":{"title":"My Home", "address":"135 Benvenue Street, Wellesey, MA"}},
        {"local_stop_id":2,"id":2,"geometry":"POINT(-7915169.3461045 5215821.7977)","attributes":{"title":"Work", "address":"614 Mass Ave, Cambridge, MA"}},
        {"local_stop_id":3,"id":3,"geometry":"POINT(-8091815.4889513 5123790.5438003)","attributes":{"title":"PKA EA", "address":"94 Vernon Street, Hartford, CT"}}
            ],
                "hops":[
                {"from_stop_id":1,"to_stop_id":2,"geometry":"MULTILINESTRING((7935103.9952378 5204364.065495, -7915169.3461045 5215821.7977))","attributes":{"title":"Co
                {"from_stop_id":1,"to_stop_id":3,"geometry":"MULTILINESTRING((7935103.9952378 5204364.065495, -8091815.4889513 5123790.5438003))","attributes":{"title":
            ] }
    }';?>

"gomaps.html" 43L, 1926C               

