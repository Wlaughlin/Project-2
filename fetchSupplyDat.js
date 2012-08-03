//Start__________________________________________________________________[check if user hits 'enter' to submit

function enter_pressed(e){
    
    var keyCode; //ascii id
    
    if(window.event){
        keyCode = window.event.keyCode; //check text input field
    }
    else if(e){
        keyCode = e.which; //read key code
    }
    else{
        return false;
    }
    return(keyCode == 13); //return if key code is 13(enter)
}
//]_______________________________________________________________________[ajax

function ajaxRequest(){
    
    /*create xmlHttpReq object
    -------------------------------------------------------*/
    var xmlhttp;
    
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }
    
    /*define reaction to response
    -------------------------------------------------------*/
    xmlhttp.onreadystatechange=function(){

        if(xmlhttp.readyState == 4){ //response ready?
            var response = xmlhttp.responseText;
            try{ //catch invalid supplychains
                JSON.parse(response);
            }
            catch(err){
                alert("Supplychain not found.");
            }
            response = JSON.parse(response);
            if (response.supplychain == undefined){
                alert(response.error);
            }
            supVis(response); //pass response to supVis
        }   
    }
    
    /*get form input value
    -------------------------------------------------------*/
    var numS = document.getElementById("num").value;
    if (isNaN(numS)){ //check value
        alert("Enter an integer.");
        return;
    }

    /*send request
    -------------------------------------------------------*/
    xmlhttp.open("GET", "jsonLoad.php?num=" +numS, true);
    xmlhttp.send(null);
}
//]_______________________________________________________________________[visualize data
function supVis(dat){

    var links = []; //list of hop objects(source and target)
    var nodes = []; //list of stop objects(name)

    var distanceTotal = 0; // Combined length of all lines 
    var hops = dat.supplychain.hops;
    var s = dat.supplychain.stops;
    var islands = new Array(s.length); //list of tier 0 nodes

     /*add circles for each node
    -------------------------------------------------------*/
    var xPlaces = []; //x locations for circles
    var yPlaces = []; //y locations for circles
    
    var w = 800, //set width and height
        h = 200 + 5*s.length;


    /*populate links and nodes arrays
    -------------------------------------------------------*/
    if(typeof(s) != 'undefined'){
        for(var i = 0; i<s.length; ++i){ //get nodes
            nodes.push({"name" : s[i].attributes.title, "tier" : 0, "links" : [], "id" : s[i].id});
        }
    } 
    nodes.reverse(); //puts list in ascending stop id order. node index i = id - 1 
    if(typeof(hops) != 'undefined'){
        for(var i = 0; i<hops.length; ++i){ //get links
            from = hops[i].from_stop_id; //source
            to = hops[i].to_stop_id; //target
            //node index locations
            islands[to-1] = 1;
            nodes[from-1].links.push(i);
            nodes[to-1].links.push(i);
            links.push({"source" : from, "target" : to, "distance" : 0});
        }
    }
    
/*calculate tier of each node
    -------------------------------------------------------note:section needs commenting*/
    function tierMeter(){
        for (i=0; i<links.length; i++){
            var src = nodes[links[i].source - 1]; //source node
            var trg = nodes[links[i].target - 1]; //target node
            //sets source node's tier to 1 greater than target node's tier, or keeps its tier if it is higher (i.e. from another link)
            src.tier = Math.max(src.tier, trg.tier + 1);
        }
        tierChecker();
    }

    /* checks that for every link, the source node's tier is greater than the target's tier */
    function tierChecker(){
        for (i=0; i<links.length; i++){
            var src = nodes[links[i].source - 1]; //source node
            var trg = nodes[links[i].target - 1]; //target node

            if (src.tier <= trg.tier){
                tierMeter();
                return;
            }
        }
    }
    tierMeter();
    
    var tierMax = 0; //will hold max tier level, used to make scale for horizontal spacing


    for (var i = 0; i<nodes.length; i++) {
      if (nodes[i].tier == 0 && islands[i] != 1) {
         nodes[i].tier = -1; //if node is an island (has no links to it) and is tier 0 (links to nothing), gets tier -1
    }
      if (nodes[i].tier > tierMax) {
         tierMax = nodes[i].tier; //stores highest tier
    }
}
    var countArray = new Array(tierMax +2); //array where each index represents a tier, and it's current value is the ith node of that tier so far
    var tierArray = new Array(tierMax + 2); //holds # of nodes for each tier, used for vertical spacing
    for (var i = 0; i < tierMax+2; i++) {
        tierArray[i] = 0;
        countArray[i] = 0;   
    }
    //puts # of nodes per tier in that tier's index in tierArray, tier -1 is index tierMax+1
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].tier == -1) {
            tierArray[tierMax+1]++;
        }
        else {
            tierArray[nodes[i].tier]++;
        }
    }

    function computeLocations() {
        for (i=0; i < nodes.length; i++) {
            if (nodes[i].tier == -1){
                xLoc = 0;
                countArray[tierMax+1]++;
                yLoc = h - (countArray[tierMax+1]/tierArray[tierMax+1] * h);
            }
            else{ 
                xLoc = w - (nodes[i].tier/tierMax * w * .8) - 50;
                countArray[nodes[i].tier]++;
                yLoc = h - (countArray[nodes[i].tier]/tierArray[nodes[i].tier] * h * .8) - 40;
            }
            xPlaces.push(xLoc);
            yPlaces.push(yLoc);
        }
    }
    var xOne,xTwo,yOne,yTwo = 0;
    function computeDistance() {
        distanceTotal = 0;
        for (i = 0; i < links.length; i++) {
            xOne = xPlaces[links[i].source - 1];
            xTwo = xPlaces[links[i].target - 1];
            yOne = yPlaces[links[i].source - 1];
            yTwo = yPlaces[links[i].target - 1];
            links[i].distance = Math.sqrt(((xTwo - xOne) * (xTwo - xOne)) + ((yTwo - yOne) * (yTwo - yOne)));
            distanceTotal += links[i].distance;
        }
    return distanceTotal;
    }
    computeLocations();
    computeDistance();

/*
function changePlaces(n) {
    for (i=0;i<nodes.length;i++) {
        if (nodes[i].tier == n) {
            yPlaces[i] = h - yPlaces[i];
        }
    }  
}
function shift(n, dir) {
    for (i=0;i<nodes.length;i++) {
        if (nodes[i].tier == n) {
            if (dir=="up") {
                yPlaces[i]+= .1*h;
            }
            else {
                yPlaces[i]-= .1*h;
            }
        }
    }
}

leastDistance = computeDistance();
for (n=0; n<=tierMax; n++) {
    changePlaces(n);
    temp = computeDistance();
    if (temp < leastDistance) {
        alert("flipped tier " + n);
        leastDistance = temp;
        }
    else {
        changePlaces(n);
    }
    shift(n, "up");
    temp = computeDistance();
    if (temp < leastDistance) {
        alert("shifted tier " + n + " down");
        leastDistance = temp;
    }
    else {
        shift(n, "down");
        shift(n, "down");
        temp = computeDistance();
        if (temp < leastDistance) {
            alert("shifted tier " + n + " up");
            leastDistance = temp;
        }
        else {
            shift(n, "up");
        }    
    }
}
*/

// starting new method of changing things

// Calculates combined distance of links from or to node n before and after shift
// If new position yields shorter distance, updates distance property on links and returns true
function computeNewDistance(n) {
    newDistances = [];
    oldDistance = 0;
    newDistance = 0;
    tempNewDistance = 0;
     for (i = 0; i < nodes[n].links.length; i++) {
         oldDistance += links[nodes[n].links[i]].distance;
         xOne = xPlaces[links[n].source - 1];
         xTwo = xPlaces[links[n].target - 1];
         yOne = yPlaces[links[n].source - 1];
         yTwo = yPlaces[links[n].target - 1];
         tempNewDistance = Math.sqrt(((xTwo - xOne) * (xTwo - xOne)) + ((yTwo - yOne) * (yTwo - yOne)));
         newDistances.push(tempNewDistance);
         newDistance += tempNewDistance;
    }
    if (newDistance < oldDistance) {
          for (i = 0; i < nodes[n].links.length; i++) {
              links[nodes[n].links[i]].distance = newDistances[i];
        }
        return true;
    }
    else {
        return false;
    }
}

//shifts node n up if dir = "up", down if dir = anythingelse
function shift(n, dir) {
            if (dir=="up") {
                yPlaces[n]-= 0.05*h;
            }
            else {
                yPlaces[n]+= 0.05*h;
            }
}
for (p = 0; p < nodes.length; p++) {
    moved = 0;
    if (nodes[p].tier != -1) {
        shift(p, "up"); // shift up
        while (computeNewDistance(p)) { // test, if new distance is longer, shift down
            shift(p, "up");
            moved = 1;
        }
        if (moved == 1) { 
            moved = 0;
            continue;
        }
        else {
            shift(p, "down");
            shift(p, "down"); //shift down twice, once to get it to normal, again for down shift,
            while (computeNewDistance(p)) {
                shift(p, "down");
                moved = 1;
            }
            if ( moved == 1) {
                moved = 0;
                continue;
            }
            else {
                moved = 0;
                shift(p, "up"); // shifts back to normal
            }
        }
    }
}



    /*create svg element
    -------------------------------------------------------*/
    var w = 800, //set width and height
        h = 200 + 5*s.length;

    var svg = d3.select("#visOut") //add svg element
        .append("svg")
        .attr("id", "svgOut")
        .attr("width", w)
        .attr("height", h)
        .attr("pointer-events", "all")
        .call(d3.behavior.zoom().on("zoom", redraw))
        .append('svg:g');

    function redraw(){
        svg.attr("transform",
            "translate(" +d3.event.translate + ")"
            + " scale(" + d3.event.scale + ")");
    }
    
    svg.selectAll("circle") //circle for each node
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", function(d, i){
            return xPlaces[i];
        })
        .attr("cy", function(d, i){
            return yPlaces[i];
        })
        .attr("r", 4);

    /*add labels above circle locations
    -----------------------------------------------------*/
    svg.selectAll("text") //text for each node
        .data(nodes)
        .enter()
        .append("text")
        .text(function(d){
            return d.name + ' ' + d.id;
        })
        .attr("x", function(d, i){
            return xPlaces[i] //get x location of circle i
        })
        .attr("y", function(d, i){
            return yPlaces[i] - 10 //get y location of circle i
        })
        .attr("font-size", "50%");
    
    /*add directed line for each link
    -----------------------------------------------------*/
    svg.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("x1", function(d){ //start point
            return xPlaces[d.source-1];
        })
        .attr("y1", function(d){
            return yPlaces[d.source-1];
        })
        .attr("x2", function(d){ //end point
            return xPlaces[d.target-1];
        })
        .attr("y2", function(d){
            return yPlaces[d.target-1];
        })
        .attr("style", "stroke:rgb(0,0,0);stroke-width:2")
        .attr("marker-end", "url(#arrow)");

        svg.append("svg:marker") //add direction
        .attr("id", "arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", "20")
        .attr("refY", "5")
        .attr("markerUnits","strokeWidth")
        .attr("markerWidth","9")
        .attr("markerHeight","5")
        .attr("orient","auto")
        .append("svg:path")
        .attr("d","M 0 0 L 10 5 L 0 10 z") //draw triangle
        .attr("fill", "#92E0B3");
}
//]____________________________________________________________________end.
