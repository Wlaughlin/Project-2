<?php require('lib/src-client.php'); include('lib/extra/class.krumo.php');?>
<?php $src = new SrcClient('5257d32745ffdc33c253fff73a5e5b31', 'b01975255a8be1d7afda88c228c19b47'); ?>


<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<title>My Sourcemap API Client Example (PHP)</title>
<style> body { width:960px; margin:0 auto; font-family:sans-serif; }</style>
</head>

<body>
<h1> hello there</h1>

<code>$src->create_supplychain($data)
    <?php $data = 
    '{ "supplychain":{ "other_perms":"1", "attributes":{"title": "Oh the places I go"}, 
        "stops":[
        {"local_stop_id":1,"id":1,"geometry":"POINT(-7935103.9952378 5204364.065495)","attributes":{"title":"My Home", "address":"135 Benvenue Street, Wellesey, MA"}},
        {"local_stop_id":2,"id":2,"geometry":"POINT(-7915169.3461045 5215821.7977)","attributes":{"title":"Work", "address":"614 Mass Ave, Cambridge, MA"}},
        {"local_stop_id":3,"id":3,"geometry":"POINT(-8091815.4889513 5123790.5438003)","attributes":{"title":"PKA EA", "address":"94 Vernon Street, Hartford, CT"}}
            ],
                "hops":[                                                                                                                                                                                                       
                {"from_stop_id":1,"to_stop_id":2,"geometry":"MULTILINESTRING((7935103.9952378 5204364.065495, -7915169.3461045 5215821.7977))","attributes":{"title":"Commute to work", "description":"It sucks"}},
                {"from_stop_id":1,"to_stop_id":3,"geometry":"MULTILINESTRING((7935103.9952378 5204364.065495, -8091815.4889513 5123790.5438003))","attributes":{"title":"Drive to school", "description":"90 to 84"}}
            ] }
    }';?>
    <?php $resp = $src->create_supplychain($data); ?>
        <?php krumo($resp); ?>
        <?php
        if($resp->error) {
            $created_id = "482";
        } else {
            $segments = explode("/", $resp->created);
            $created_id = $segments[2];
        }?>
    <?php print_r($resp);?>
        <iframe width="640px" height="480px" frameborder="0" src="<?php echo $src::VIEW_ENDPOINT.$created_id;?>"></iframe>


        </body>
        </html>


