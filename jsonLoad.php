<?php
$supNum = $_GET['num'];
$session = curl_init("http://sourcemap.com/services/supplychains/" . $supNum);
curl_setopt($session, CURLOPT_RETURNTRANSFER, TRUE);
$sDat = curl_exec($session);
curl_close($session);
echo $sDat;
?>
