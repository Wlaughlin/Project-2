function fetchSupplyDat(){
    datAtt = "id: " +dat.supplychain.id +'\n';
    datAtt+= "title: " +dat.supplychain.stops[1].attributes.co2e;
    document.getElementById('dat').innerHTML=datAtt;
}
