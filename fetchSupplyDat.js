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

    //send to value  php
    xmlhttp.open("POST","jsonLoad.php?num=" +numS,true);
    xmlhttp.send(null);
}

function supVis(dat){
    
    //visualize data
    datAtt = dat.supplychain.id;
    document.getElementById('dat').innerHTML=datAtt;
}
