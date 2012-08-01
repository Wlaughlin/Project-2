<?php
$supNum = $_GET['num']; //retrieve form input value
$session = curl_init("http://sourcemap.com/services/supplychains/" . $supNum); //new handle
curl_setopt($session, CURLOPT_RETURNTRANSFER, TRUE); //return result of curl_exec as string
$sDat = curl_exec($session);
curl_close($session); //execute defined Curl session
echo $sDat; //return string value
?>
