<?php require('lib/src-client.php'); include('lib/extra/class.krumo.php');?>
<?php $src = new SrcClient('5257d32745ffdc33c253fff73a5e5b31', 'b01975255a8be1d7afda88c228c19b47'); ?>

<!doctype html>  
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8">
    <title>Sourcemap API Client Example (PHP)</title>   
 	<style> body { width:960px; margin:0 auto; font-family:sans-serif; }</style>
</head>

<body class="main">
	<h1>Sourcemap API Client</h1>
		<p>This is an example page for a simple php client to the <a href="http://www.sourcemap.com">Sourcemap.com</a> API. Here we create a new SrcClient and use it to perform some basic searches, and get information about a particular supplychain. The results are delivered using json, so we json_ecode that into a native php object that we can work with.</p>
		
	<h3>Declare a new Sourcemap API Client</h3>
	<blockquote>
		<code>$src = new SrcClient(); print($src);</code><br/>
		<code><strong><?php print($src); ?></strong></code>
	</blockquote>

	<h3>List available services</h3>
	<blockquote>
		<code>$src->available();</code>
		<?php krumo($src->available()); ?>
	</blockquote>

	<h3>Get supplychain id 744</h3>
	<blockquote>
		<code>$src->get_supplychain(744);</code>
		<?php krumo($src->get_supplychain(744)); ?>
	</blockquote>

	<h3>Get a list of supplychains</h3>
	<blockquote>
		<code>$src->get_supplychains(25);</code>
		<?php krumo($src->get_supplychains(25)); ?>
	</blockquote>

	<h3>Get supplychains that match a search</h3>
	<blockquote>
		<code>$src->get_supplychains("laptop");</code>
		<?php krumo($src->get_supplychains("laptop")); ?>
	</blockquote>
	
	<h3>Create a Supplychain</h3>
	<blockquote>
		<code><pre style="width:100%; overflow:auto;">
$data = 
	'{ "supplychain":{ "attributes":{"title": "API Test"}, 
		   "stops":[
			   {"local_stop_id":1,"id":1,"geometry":"POINT(-7910337.7674084 5214822.776215)","attributes":{"title":"Facility #1", "address":"Boston, MA, USA"}},
			   {"local_stop_id":2,"id":2,"geometry":"POINT(-8238307.2400059 4970299.6279391)","attributes":{"title":"Facility #2", "address":"New York, NY, USA"}}
		   ],
		   "hops":[
			   {"from_stop_id":2,"to_stop_id":1,"geometry":"MULTILINESTRING((-8238307.2400059 4970299.6279391,-7910337.7674084 5214822.776215))","attributes":{"title":"Facility #2 to Facility #1"}}
		   ] }
	}';
		</pre></code><br/><br/>
			
		<code>$src->create_supplychain($data);</code>
		<?php $data = '{ "supplychain":{ "attributes":{"title": "API Test"}, "stops":[{"local_stop_id":1,"id":1,"geometry":"POINT(-7910337.7674084 5214822.776215)","attributes":{"title":"Facility #1", "address":"Boston, MA, USA"}}, {"local_stop_id":2,"id":2,"geometry":"POINT(-8238307.2400059 4970299.6279391)","attributes":{"title":"Facility #2", "address":"New York, NY, USA"}}],"hops":[{"from_stop_id":2,"to_stop_id":1,"geometry":"MULTILINESTRING((-8238307.2400059 4970299.6279391,-7910337.7674084 5214822.776215))","attributes":{"title":"Facility #2 to Facility #1"}}] }}'; ?>
		<?php $resp = $src->create_supplychain($data); ?>
		<?php krumo($resp); ?>
		<?php 
			if($resp->error) { 
				$created_id = "482"; 
			} else { 
				$segments = explode("/", $resp->created); 
				$created_id = $segments[2]; 
			}
		?>
		<iframe width="640px" height="480px" frameborder="0" src="<?php echo $src::VIEW_ENDPOINT.$created_id;?>"></iframe>
		
	</blockquote>
	
	<h3>Update a Supplychain</h3>
	<blockquote>
		<code>$id = 482; $supplychain_json_file = 'sample.json';<code><br/><br/>
			
		<code>$src->update_supplychain($supplychain_json_file, $id);</code>
		<?php $id = 482; $supplychain_json_file = "sample.json"; ?>
		<?php //$resp = $src->update_supplychain($supplychain_json_file, $id); ?>
		<?php //krumo($resp); ?>
		<iframe width="640px" height="480px" frameborder="0" src="<?php echo $src::VIEW_ENDPOINT.$id;?>"></iframe>
	</blockquote>
</body>
</html>
