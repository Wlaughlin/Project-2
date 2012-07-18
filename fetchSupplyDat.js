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
        for(var i = 0; i<h.length; ++i){
            from = h[i].from_stop_id; //source
            to = h[i].to_stop_id; //target
            //stop ids are in descending order
            //thus correct stop = num of stops - stop id
            links.push({"source" : s[s.length-from].attributes.title, "target" : s[s.length-to].attributes.title});
        }
    }

   if(typeof(s) != 'undefined'){
        for(var i = 0; i<s.length; ++i){
            nodes.push({"name" : s[i].attributes.title});
        }
    }

    console.log(links);
    var out = d3.select("#visOut")
        .text(links[0].source);
}
