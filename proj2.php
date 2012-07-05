<html>
   <body style="background-image:url('http://img.ffffound.com/static-data/assets/6/ffaf9fe485ebd5695dc2de3006c7d70f9435676b_m.jpg');>
    <head>
        <title>project2</title>
    
        <h1 style="font: comic-sans; color: green; background-color: grey;">This page is a BAMF</h1>
    
 </head>
 <div style="background-color: white;">
<script src="http://d3js.org/d3.v2.js"></script>

     <script type="text/javascript">
   function doThis() {
    var something = document.getElementById("usethis");
   var myurl = "http://sourcemap.com/services/supplychains/" + something.value;
          <?php 
        $link = "http://sourcemap.com/services/supplychains/" . $_GET["schain"];
    $myjsondata = file_get_contents($link); 
    ?>
  var longjson = <?= $myjsondata ?>;
   console.log(longjson);
   
   document.write("<html><body> The id is " + longjson.supplychain.id + "<br /> And the title is: " + longjson.supplychain.attributes.title + "<br/> and the weight is: " + longjson.supplychain.attributes.weight +  "<form method='get' onsubmit='doThis()'> Please enter the number of the supplychain you would like to know about, hit enter, and then click submit: <input type = 'text' name='schain' id='usethis' /><input type='submit' value='Submit' /></form></body></html>");
      }
        </script>
    
    <form method="get" onsubmit="doThis()">
    
    Please enter the number of the supplychain you'd like to know about, hit enter, and then click submit: <input type = "text" name="schain" id="usethis" />
   <input type="submit" value="Submit" />
    </form>
<div></div>
<div style="float: bottom-right; background-color: white;">Enjoy the Space Kitty!</div>
</div>
    </body>
    
</html>






