
<html>
<!--Html comments are dumb -->
<head>
        <title>project2</title>
        <link rel="stylesheet" type="text/css" href="proj2.css">
        
    </head>


     <script type="text/javascript">
   function doThis() {
    var something = document.getElementById("usethis");
   var myurl = "http://sourcemap.com/services/supplychains/" + something.value;
   alert(myurl);
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

    
</html>






