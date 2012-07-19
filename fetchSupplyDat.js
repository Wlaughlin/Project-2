function enter_pressed(e){ //check if user hits "enter"
    
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

function supVis(dat){ //visuailize data

    var links = []; //list of hop objects(source and target)
    var nodes = []; //list of stop objects(name)
    var h = dat.supplychain.hops;
    var s = dat.supplychain.stops;
    var pathLength = [];
    var s3Loc = [];
    var islands = [];
    if(typeof(s) != 'undefined'){
        for(var i = 0; i<s.length; ++i){ //get nodes
            nodes.push({"name" : s[i].attributes.title, "id" : s[i].id});
        }
    }
    nodes.reverse();
    for (var j = 0; j<s.length+1; j++) {
        s3Loc[j] = undefined;
        pathLength[j] = 0;
    }
    if(typeof(h) != 'undefined'){
        for(var i = 0; i<h.length; ++i){ //get links
             to = h[i].to_stop_id; //target
             from = h[i].from_stop_id; //source
             s3Loc[from] = h[i].to_stop_id;
             islands[to] = 1;
             links.push({"source" : from, "target" : to});
        }
    }
    console.log(links);
    var width = 640, //set width and height
        height = 200 + 3*s.length;
    var pathLengthMax = 1;
   /* for (var m = 0; m < links.length; m++) {
        var l = m;
        while
            
*/

 for (var k=1; k<s3Loc.length; k++) {
        var l = k;
        while (s3Loc[l] != undefined) {
            pathLength[k]++;
            l = s3Loc[l];
            if (l< k) {
                pathLength[k]+= pathLength[l];
                break;
            }
        }
        if (pathLength[k] > pathLengthMax) pathLengthMax = pathLength[k];
 }
    console.log(pathLength);
    console.log(islands);


    var sLoc = [];
    var s2Loc = [];
    var svg = d3.select("#visOut") //add svg element
        .append("svg")
        .attr("id", "svgOut")
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


    svg.selectAll("circle") //circle for each node
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", function(d, i){
           /* if (islands[i+1] === undefined && pathLength[i+1] == 0) {
                xLoc = 0;
            }
            else {}*/
            xLoc = width - (pathLength[i+1]/pathLengthMax * width * .8) - 50;
           // xLoc = Math.random() * width;
            sLoc.push(xLoc);
            return xLoc;
        })
        .attr("cy", function(){
            yLoc = Math.random() * height;
            s2Loc.push(yLoc);
            return yLoc;
        })
        .attr("r", 5);

    svg.selectAll("text") //text for each node
        .data(nodes)
        .enter()
        .append("text")
        .text(function(d){
            return d.name + " " + d.id;
        })
        .attr("x", function(d, i){
            return sLoc[i] - 20
        })
        .attr("y", function(d, i){
            return s2Loc[i] - 10
        });

    var tag = 0;
    var myLines = svg.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("x1", function(d, i){
            return sLoc[d.source-1]
        })
        .attr("y1", function(d, i){
            return s2Loc[d.source-1]
        })
        .attr("x2", function(d, i){
            return sLoc[d.target-1]
        })
        .attr("y2", function(d, i){
            return s2Loc[d.target-1]
        })
        /*.attr("visibility", function(d, i){
            if (s3Loc[i+1] === undefined) {
                return "hidden"
            }
            else {
                return "visible"
            }
        })*/
        .attr("marker-end", "url(#Triangle)");

}
