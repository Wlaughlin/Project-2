<html>
    <head>
        <title>supplyChainDat</title>
        <link rel="stylesheet" type="text/css" href="supplyDat.css">
        <script type="text/javascript"src="supplyDat.js"></script>  
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
        <button onclick="fetchSupplyDat()">click</button>
        
        <form method="post" action="<?php echo $PHP_SELF;?>" onsubmit="fetchSupplyDat();">
        Enter supplychain number: <input type="text" name="schain" /><br />
        <input type="submit" value="submit" name="submit">
        </form>        
        
        <p id="dat"></p>
    </body>
</html>
