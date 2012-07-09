<html>
    <head>
        <title>supplyChainDat</title>
        <link rel="stylesheet" type="text/css" href="supplyDat.css">
        <script type="text/javascript"src="supplyDat.js"></script>
        <script type="text/javascript"src="http://d3js.org/d3.v2.js"></script>
    </head>
    <body>
        <?php
        $num = $_POST["schain"];
        $session = curl_init("http://sourcemap.com/services/supplychains/" . $num);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, TRUE);
        $xml = curl_exec($session);
        curl_close($session);
        ?>
        <script type="text/javascript">dat = <?= $xml ?></script>
        
        <form method="post" action="<?php echo $PHP_SELF;?>" onchange="fetchSupplyDat();">
        Enter supplychain number: <input type="text" name="schain" /><br />
        <input type="submit" value="submit" name="submit">
        </form>

        <button onclick="fetchSupplyDat()">after submitting, click to display data</button>
        <p id="dat"></p>
        <div id="chart">hi</div>
    </body>
</html>
