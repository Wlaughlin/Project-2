function enter_pressed(e){ //check if user hits "enter"
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
    
    //width and height
    var w = 500,
        h = 100;

    //create svg element
    var svg = d3.select("#visOut")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
}
