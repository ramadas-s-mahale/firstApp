<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$data = array();
	$result=mysqli_query($connect,"DELETE FROM pending WHERE username='".$username."'");
	echo 'Done';
?>