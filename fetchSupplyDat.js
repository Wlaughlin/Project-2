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

    var h = dat.supplychain.hops;
    var s = dat.supplychain.stops;
    var islands = new Array(s.length); //list of tier 0 nodes

    /*populate links and nodes arrays
    -------------------------------------------------------*/
    if(typeof(h) != 'undefined'){
        for(var i = 0; i<h.length; ++i){ //get links
            from = h[i].from_stop_id; //source
            to = h[i].to_stop_id; //target
            //node index locations
            islands[to-1] = 1;
            links.push({"source" : from, "target" : to});
        }
    }
   if(typeof(s) != 'undefined'){
        for(var i = 0; i<s.length; ++i){ //get nodes
            nodes.push({"name" : s[i].attributes.title, "tier" : 0});
        }
    }
    nodes.reverse(); //puts list in ascending stop id order
    
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

    /*add circles for each node
    -------------------------------------------------------*/
    var xPlaces = []; //x locations for circles
    var yPlaces = []; //y locations for circles

    /*add circles for each node
    -------------------------------------------------------note:section needs commenting*/
    var xPlaces = []; //x locations for circles
    var yPlaces = []; //y locations for circles

    svg.selectAll("circle") //circle for each node
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", function(d, i){
            if (nodes[i].tier == -1){
                xLoc = 0;
            }
            else{ 
                xLoc = w - (nodes[i].tier/tierMax * w * .8) - 50;
            }
            xPlaces.push(xLoc); //save cx values
            return xLoc;
        })
        .attr("cy", function(d, i){
            if (nodes[i].tier == -1) {
                countArray[tierMax+1]++;
                yLoc = h - (countArray[tierMax+1]/tierArray[tierMax+1] * h);
            }
            else {
                countArray[nodes[i].tier]++;
                yLoc = h - (countArray[nodes[i].tier]/tierArray[nodes[i].tier] * h);
            }
            yPlaces.push(yLoc); //save cy values
            return yLoc;
        })
        .attr("r", 4);

    /*add labels above circle locations
    -----------------------------------------------------*/
    svg.selectAll("text") //text for each node
        .data(nodes)
        .enter()
        .append("text")
        .text(function(d){
            return d.name + ' ' + d.tier;
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
