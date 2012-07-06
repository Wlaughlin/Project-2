function fetchSupplyDat(){
	<?php
		$session = curl_init("http://sourcemap.com/services/supplychains/744");
		$xml = curl_exec($session);
		$myjsondata = file_get_contents($);
		echo $xml;
		curl_close($session);
	?>
 
	document.getElementById('dat').innerHTML=datSup;
}
