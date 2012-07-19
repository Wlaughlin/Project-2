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

    if(typeof(h) != 'undefined'){
        for(var i = 0; i<h.length; ++i){ //get links
            from = h[i].from_stop_id; //source
            to = h[i].to_stop_id; //target
            //node index locations
            links.push({"source" : s[s.length-from].id, "target" : s[s.length-to].id});
        }
    }
   if(typeof(s) != 'undefined'){
        for(var i = 0; i<s.length; ++i){ //get nodes
            nodes.push({"name" : s[i].attributes.title});
        }
    }

    var w = 800, //set width and height
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
            if(xLoc > w-50){
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
            if(yLoc > h-50){
                yLoc = yLoc - 20;
            }
            else if(yLoc < 50){
                yLoc = yLoc + 20;
            }
            s2Loc.push(yLoc); //save cy values
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
            return sLoc[i]
        })
        .attr("y", function(d, i){
            return s2Loc[i] - 10
        });
    console.log(nodes);
    console.log(links);
    console.log(sLoc);
    console.log(s2Loc);
    svg.selectAll("line") //line for each link
        .data(links)
        .enter()
        .append("line")
        .attr("x1", function(d){
            return sLoc[d.source-1];
        })
        .attr("y1", function(d){
            return s2Loc[d.source-1];
        })
        .attr("x2", function(d){
            return sLoc[d.target-1];
        })
        .attr("y2", function(d){
            return s2Loc[d.target-1];
        })
        .attr("style", "stroke:rgb(0,0,0);stroke-width:2")
}
