<html>
	<head>
		<title>supplyChainDat</title>
		<link rel="stylesheet" type="text/css" href="supplyDat.css">
		<script type="text/javascript">Object.parameter = <?= $parameter ?></script>
	</head>
	<body>
		<!--asking user for number of supply chain-->
		<script type="text/javascript">src="supplyDat.js"></script>	
		<button onclick="fetchSupplyDat()">click</button>
		<?php
		$session = curl_init("http://sourcemap.com/services/supplychains/744");
		$xml = curl_exec($session);
		echo $xml;
		curl_close($session);
		?>
		<p id="dat"></p>
	</body>
</html>
