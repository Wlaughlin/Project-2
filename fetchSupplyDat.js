function ajaxRequest(){
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }

    //recieve data sent from sever
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState == 4){
            supVis(JSON.parse(xmlhttp.responseText));
        }   
    }

    var numS = encodeURIComponent(document.getElementById("num").value);

    xmlhttp.open("POST","jsonLoad.php?num=" +numS,true);
    xmlhttp.send(null);
}

function supVis(dat){
    datAtt = dat.supplychain.id;
    document.getElementById('dat').innerHTML=datAtt;
}
