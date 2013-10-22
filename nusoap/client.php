<?php
include('lib/nusoap.php');
$serverpath ='http://www.nusoap.dev/serveur.php';
$param = array('prenom'=>'Amine');
$client = new nusoap_client($serverpath);
$result = $client->call('bonjour', $param);
print($client->request);
?>