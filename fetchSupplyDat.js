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

    var s3Loc = [];
    for (var j = 0; j<s.length+1; j++) {
        s3Loc[j] = undefined;
    }
    
    if(typeof(h) != 'undefined'){
        for(var i = 0; i<h.length; ++i){ //get links
            //from = h[i].from_stop_id; //source
            //to = h[i].to_stop_id; //target
            //stop ids are in descending order
            //thus correct stop = num of stops - stop id
            s3Loc[h[i].from_stop_id] = h[i].to_stop_id;
            //links.push({"source" : s[s.length-from].attributes.title, "target" : s[s.length-to].attributes.title});
        }
    }
   if(typeof(s) != 'undefined'){
        for(var i = 0; i<s.length; ++i){ //get nodes
            nodes.push({"name" : s[i].attributes.title});
        }
    }

    var w = 750, //set width and height
        h = 400;

    var sLoc = [];
    var s2Loc = [];
    var svg = d3.select("#visOut") //add svg element
        .append("svg")
        .attr("id", "svgOut")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("circle") //circle for each node
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", function(){
            xLoc = Math.random() * w;
            sLoc.push(xLoc);
            return xLoc;
        })
        .attr("cy", function(){
            yLoc = Math.random() * h;
            s2Loc.push(yLoc);
            return yLoc;
        })
        .attr("r", 5);

    svg.selectAll("text") //text for each node
        .data(nodes)
        .enter()
        .append("text")
        .text(function(d){
            return d.name;
        })
        .attr("x", function(d, i){
            return sLoc[i] - 20
        })
        .attr("y", function(d, i){
            return s2Loc[i] - 10
        });

    var tag = 0;
    var myLines = svg.selectAll("line")
        .data(nodes)
        .enter()
        .append("line")
        .attr("x1", function(d, i){
            return sLoc[sLoc.length - i]
        })
        .attr("y1", function(d, i){
            return s2Loc[sLoc.length - i]
        })
        .attr("x2", function(d, i){
            return sLoc[sLoc.length - s3Loc[i]]
        })
        .attr("y2", function(d, i){
            return s2Loc[sLoc.length - s3Loc[i]]
        })
        .attr("visibility", function(d, i){
            if (s3Loc[i] === undefined) {
                return "hidden"
            }
            else {
                return "visible"
            }
        });
        console.log(s3Loc);

}
