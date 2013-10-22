<?php
include('lib/nusoap.php');
$serveur = new nusoap_server;
$serveur->register('bonjour');

function bonjour($prenom){
	return "Bonjour ".$prenom;
}
$serveur->service($HTTP_RAW_POST_DATA);
?>