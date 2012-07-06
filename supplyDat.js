function fetchSupplyDat(){
    datAtt = "id: " +dat.supplychain.id +'\n| ';
    datAtt+= "impact factor(co2e): " +dat.supplychain.stops[1].attributes.co2e;
    document.getElementById('dat').innerHTML=datAtt;
    
    var dataset=JSON.stringify(dat);    
    d3.select("body").selectAll("p")
        .data(dataset)
        .enter()
        .append("p")
        .text("found val in json obj!");
}
