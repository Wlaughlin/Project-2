//_______________________________________________________________________[check if user hits 'enter' to submit
function enter_pressed(e){
    
    var keyCode;
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
//_______________________________________________________________________[ajax
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
//_______________________________________________________________________[visualize data
function supVis(dat){

    var links = []; //list of hop objects(source and target)
    var nodes = []; //list of stop objects(name)
    var h = dat.supplychain.hops;
    var s = dat.supplychain.stops;

    // populate links and nodes arrays
    // -------------------------------------------------------

    if(typeof(h) != 'undefined'){
        for(var i = 0; i<h.length; ++i){ //get links
            from = h[i].from_stop_id; //source
            to = h[i].to_stop_id; //target
            //node index locations
            links.push({"source" : from, "target" : to});
        }
    }
   if(typeof(s) != 'undefined'){
        for(var i = 0; i<s.length; ++i){ //get nodes
            nodes.push({"name" : s[i].attributes.title});
        }
    }
    nodes.reverse(); //puts list in ascending stop id order

    // create svg element
    // -------------------------------------------------------
    var w = 800, //set width and height
        h = 400;

    var svg = d3.select("#visOut") //add svg element
        .append("svg")
        .attr("id", "svgOut")
        .attr("width", w)
        .attr("height", h);

    // add circles for each node
    // -------------------------------------------------------
    var sLoc = []; //x locations for circles
    var s2Loc = []; //y locations for circles

    svg.selectAll("circle") //circle for each node
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", function(){
            xLoc = Math.random() * w;
            if(xLoc > w-50){ //prevent clipping on horizontal edges
                xLoc = xLoc - 20;
            }
            else if(xLoc < 50){
                xLoc = xLoc + 20;
            }
            sLoc.push(xLoc); //save cx values
            return xLoc;
        })
        .attr("cy", function(){
            yLoc = Math.random() * h;
            if(yLoc > h-50){ //prevent clipping on vertcal edges
                yLoc = yLoc - 20;
            }
            else if(yLoc < 50){
                yLoc = yLoc + 20;
            }
            s2Loc.push(yLoc); //save cy values
            return yLoc;
        })
        .attr("r", 5);

    // add labels above circle locations
    // -----------------------------------------------------
    svg.selectAll("text") //text for each node
        .data(nodes)
        .enter()
        .append("text")
        .text(function(d){
            return d.name;
        })
        .attr("x", function(d, i){
            return sLoc[i] //get x location of circle i
        })
        .attr("y", function(d, i){
            return s2Loc[i] - 10 //get y location of circle i
        });
    
    // add directed line for each link
    // -----------------------------------------------------
    svg.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("x1", function(d){ //start point
            return sLoc[d.source-1];
        })
        .attr("y1", function(d){
            return s2Loc[d.source-1];
        })
        .attr("x2", function(d){ //end point
            return sLoc[d.target-1];
        })
        .attr("y2", function(d){
            return s2Loc[d.target-1];
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
