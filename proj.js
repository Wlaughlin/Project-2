function loadXMLDoc(scURL)
{
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    var myJSON = xmlhttp.responseText;
    var myObject = eval('(' + myJSON + ')');
    document.getElementById("otherDiv").innerHTML = "Supply chain " + myObject.supplychain.id + ", titled <b>" + myObject.supplychain.attributes.title + "</b>, has " + myObject.supplychain.stops.length + " stops and " + myObject.supplychain.hops.length + " hops.<br/> It has the following description: " + myObject.supplychain.attributes.description + "<br/>This supply chain was created by the infamous " + myObject.supplychain.owner.name + " (pictured below).<br/><img src='" + myObject.supplychain.owner.avatar + "' height='100' width='100' />";
    }
  };
xmlhttp.open("GET", scURL ,true);
xmlhttp.send();
}

function getNumber() {
    var scNumber = prompt("Please enter the number of the supplychain you want to know about","Enter your number here");
    var scURL = "http://sourcemap.com/services/supplychains/" + scNumber;
    loadXMLDoc(scURL);
    }

