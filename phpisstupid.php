var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
var myOptions = {
      zoom: 4,
        center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
}
var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

var marker = new google.maps.Marker({
        position: myLatlng,
            title:"Hello World!"
});

<?php $data = 
    '{ "supplychain":{ "attributes":{"title": "API Test"}, 
               "stops":[
                           {"local_stop_id":1,"id":1,"geometry":"POINT(-7910337.7674084 5214822.776215)","attributes":{"title":"Facility #1", "address":"Boston, MA, USA"}},
                                       {"local_stop_id":2,"id":2,"geometry":"POINT(-8238307.2400059 4970299.6279391)","attributes":{"title":"Facility #2", "address":"New York, NY, USA"}}
                                               ],
                                                       "hops":[
                                                                   {"from_stop_id":2,"to_stop_id":1,"geometry":"MULTILINESTRING((-8238307.2400059 4970299.6279391,-7910337.7674084 5214822.776215))","attributes":{"title":"Facility #2 to Facility #1"}}
                                                                           ] }
                                                                            }';
$jsondata = 'JSON_encode($data)';?>


// To add the marker to the map, call setMap();
// marker.setMap(map);
