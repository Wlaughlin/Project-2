function enter_pressed(e){
    var keyCode;
    if(window.event){
        keyCode = window.event.keyCode
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

function supVis(dat){ //visualize data
    //d3 testing    
    var dataset = [5,15,25];
    
    d3.select("#dOut").selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function(d){
            var barHeight = d * 5; //scale up by fact of 5
            return barHeight + "px";
        });
}
