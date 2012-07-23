<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
function enter_pressed(e){ //check if user hits "enter"
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
//Start__________________________________________________________________[check if user hits 'enter' to submit
function enter_pressed(e){
>>>>>>> Stashed changes
    
    var keyCode;
    if(window.event){
        keyCode = window.event.keyCode;
    }
    else if(e){
        keyCode = e.which;
    }
    else{
        return false;
    }
    return(keyCode == 13);
}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

=======
//]_______________________________________________________________________[ajax
>>>>>>> Stashed changes
=======
//]_______________________________________________________________________[ajax
>>>>>>> Stashed changes
=======
//]_______________________________________________________________________[ajax
>>>>>>> Stashed changes
=======
//]_______________________________________________________________________[ajax
>>>>>>> Stashed changes
=======
//]_______________________________________________________________________[ajax
>>>>>>> Stashed changes
function ajaxRequest(){
    
    //create xmlHttpReq object
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }

    //recieve data sent from sever
    xmlhttp.onreadystatechange=function(){

        //ready?
        if(xmlhttp.readyState == 4){
            //pass response to supVis
            supVis(JSON.parse(xmlhttp.responseText));
        }   
    }
    
    //get form input value
    var numS = encodeURIComponent(document.getElementById("num").value);

    //send input value to php
    xmlhttp.open("POST","jsonLoad.php?num=" +numS,true);
    xmlhttp.send(null);
}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

function supVis(dat){ //visuailize data
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
//]_______________________________________________________________________[visualize data
function supVis(dat){
>>>>>>> Stashed changes

    var links = []; //list of hop objects(source and target)
    var nodes = []; //list of stop objects(name)

    var h = dat.supplychain.hops;
    var s = dat.supplychain.stops;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    var islands = new Array(s.length);
    if(typeof(s) != 'undefined'){
        for(var i = 0; i<s.length; ++i){ //get nodes
            nodes.push({"name" : s[i].attributes.title, "id" : s[i].id, "tier" : 0});
        }
    }
    nodes.reverse();
    if (typeof(h) != 'undefined'){
        for(var i = 0; i<h.length; ++i){ //get links
             to = h[i].to_stop_id; //target
             from = h[i].from_stop_id; //source
             islands[to-1] = 1;
             links.push({"source" : from, "target" : to});
        }
    }
    var width = 640, //set width and height
        height = 200 + 5*s.length;


function tierFinder() {
    for (var i = 0; i<links.length; i++) {
        nodes[links[i].source-1].tier = Math.max(nodes[links[i].target-1].tier + 1, nodes[links[i].source-1].tier);
    }
    tierChecker();
}
function tierChecker() {
    for (var i = 0; i<links.length; i++) {
        if (nodes[links[i].source-1].tier <= nodes[links[i].target-1].tier) {
             tierFinder();
             break;
        }
    }
}
var tierMax = 0
tierFinder();
for (var i = 0; i<nodes.length; i++) {
=======
    var islands = new Array(s.length); //list of tier 0 nodes

=======
    var islands = new Array(s.length); //list of tier 0 nodes

>>>>>>> Stashed changes
=======
    var islands = new Array(s.length); //list of tier 0 nodes

>>>>>>> Stashed changes
=======
    var islands = new Array(s.length); //list of tier 0 nodes

>>>>>>> Stashed changes
=======
    var islands = new Array(s.length); //list of tier 0 nodes

>>>>>>> Stashed changes
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
        for (i=0; i<nodes.length; i++){
            var src = nodes[links[i].source - 1]; //source node
            var trg = nodes[links[i].target - 1]; //target node

            src.tier = Math.max(src.tier, trg.tier + 1);
        }
        tierChecker();
    }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes

    function tierChecker(){
        for (i=0; i<nodes.length; i++){
            var src = nodes[links[i].source - 1]; //source node
            var trg = nodes[links[i].target - 1]; //target node

<<<<<<< Updated upstream
=======

    function tierChecker(){
        for (i=0; i<nodes.length; i++){
            var src = nodes[links[i].source - 1]; //source node
            var trg = nodes[links[i].target - 1]; //target node

>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            if (src.tier <= trg.tier){
                tierMeter();
                return;
            }
        }
    }
    tierMeter();
    
    var tierMax = 0;

    for (var i = 0; i<nodes.length; i++) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if (nodes[i].tier == 0 && islands[i] != 1) {
        nodes[i].tier = -1;
    }
    if (nodes[i].tier > tierMax) {
        tierMax = nodes[i].tier;
    }
}
    var countArray = new Array(tierMax +2);
    var tierArray = new Array(tierMax + 2);
    for (var i = 0; i < tierMax+2; i++) {
        tierArray[i] = 0;
        countArray[i] = 0;   
    }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].tier == -1) {
            tierArray[tierMax+1]++;
        }
        else {
            tierArray[nodes[i].tier]++;
        }
    }
    var sLoc = [];
    var s2Loc = [];
    var svg = d3.select("#visOut") //add svg element
        .append("svg")
        .attr("id", "svgOut")
<<<<<<< Updated upstream
        .attr("width", width)
        .attr("height", height)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr('version', '1.1');
   
    var defs = d3.selectAll('svg').append("marker")
        .attr('id', 'Triangle')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', '0')
        .attr('refY', '5')
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', '6')
        .attr('markerHeight', '5')
        .attr('orient', 'auto')
        .attr('fill', 'green');
    var path = d3.selectAll("marker").append("path")
        .attr('d', 'M 0 0 L 10 5 L 0 10 z');
=======
        .attr("width", w)
        .attr("height", h);

    /*add circles for each node
    -------------------------------------------------------note:section needs commenting*/
    var sLoc = []; //x locations for circles
    var s2Loc = []; //y locations for circles
>>>>>>> Stashed changes

    svg.selectAll("circle") //circle for each node
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", function(d, i){
            if (nodes[i].tier == -1){
                xLoc = 0;
            }
            else{ 
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                xLoc = width - (nodes[i].tier/tierMax * width * .8) - 50;
=======
                xLoc = w - (nodes[i].tier/tierMax * w * .8) - 50;
>>>>>>> Stashed changes
=======
                xLoc = w - (nodes[i].tier/tierMax * w * .8) - 50;
>>>>>>> Stashed changes
=======
                xLoc = w - (nodes[i].tier/tierMax * w * .8) - 50;
>>>>>>> Stashed changes
=======
                xLoc = w - (nodes[i].tier/tierMax * w * .8) - 50;
>>>>>>> Stashed changes
=======
                xLoc = w - (nodes[i].tier/tierMax * w * .8) - 50;
>>>>>>> Stashed changes
            }
            sLoc.push(xLoc);
            return xLoc;
        })
        .attr("cy", function(d, i){
            if (nodes[i].tier == -1) {
                countArray[tierMax+1]++;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                yLoc = height - (countArray[tierMax+1]/tierArray[tierMax+1] * height);
            }
            else {
                countArray[nodes[i].tier]++;
                yLoc = height - (countArray[nodes[i].tier]/tierArray[nodes[i].tier] * height);
=======
                yLoc = h - (countArray[tierMax+1]/tierArray[tierMax+1] * h);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                yLoc = h - (countArray[tierMax+1]/tierArray[tierMax+1] * h);
            }
            else {
                countArray[nodes[i].tier]++;
                yLoc = h - (countArray[nodes[i].tier]/tierArray[nodes[i].tier] * h);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            }
            else {
                countArray[nodes[i].tier]++;
                yLoc = h - (countArray[nodes[i].tier]/tierArray[nodes[i].tier] * h);
>>>>>>> Stashed changes
            }
            s2Loc.push(yLoc);
            return yLoc;
        })
        .attr("r", 5);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    /*add labels above circle locations
    -----------------------------------------------------*/
>>>>>>> Stashed changes
=======
    /*add labels above circle locations
    -----------------------------------------------------*/
>>>>>>> Stashed changes
=======
    /*add labels above circle locations
    -----------------------------------------------------*/
>>>>>>> Stashed changes
=======
    /*add labels above circle locations
    -----------------------------------------------------*/
>>>>>>> Stashed changes
=======
    /*add labels above circle locations
    -----------------------------------------------------*/
>>>>>>> Stashed changes
    svg.selectAll("text") //text for each node
        .data(nodes)
        .enter()
        .append("text")
        .text(function(d){
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            return d.name + " " + d.id;
=======
            return d.name + ' ' + d.tier;
>>>>>>> Stashed changes
=======
            return d.name + ' ' + d.tier;
>>>>>>> Stashed changes
=======
            return d.name + ' ' + d.tier;
>>>>>>> Stashed changes
=======
            return d.name + ' ' + d.tier;
>>>>>>> Stashed changes
=======
            return d.name + ' ' + d.tier;
>>>>>>> Stashed changes
        })
        .attr("x", function(d, i){
            return sLoc[i] - 20
        })
        .attr("y", function(d, i){
            return s2Loc[i] - 10
        });
<<<<<<< Updated upstream

    var tag = 0;
    var myLines = svg.selectAll("line")
=======
    
    /*add directed line for each link
    -----------------------------------------------------*/
    svg.selectAll("line")
>>>>>>> Stashed changes
        .data(links)
        .enter()
        .append("line")
        .attr("x1", function(d){
            return sLoc[d.source-1]
        })
        .attr("y1", function(d){
            return s2Loc[d.source-1]
        })
        .attr("x2", function(d){
            return sLoc[d.target-1]
        })
        .attr("y2", function(d){
            return s2Loc[d.target-1]
        })
        .attr("marker-end", "url(#Triangle)");

<<<<<<< Updated upstream
=======
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
        .attr("d", "M 0 0 L 10 5 L 0 10 z") //draw triangle
        .attr("fill", "#92E0B3");
>>>>>>> Stashed changes
}
//]____________________________________________________________________end.
