<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$result=mysqli_query($connect,"UPDATE products SET qty=-1 WHERE pid=".$pid);
	$result=mysqli_query($connect,"DELETE FROM cart WHERE pid=".$pid);
	echo 'Done';
?>