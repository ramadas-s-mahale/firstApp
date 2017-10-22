<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$result=mysqli_query($connect,"SELECT username,uname,password FROM pending WHERE username='".$username."'");
	while($row=mysqli_fetch_array($result))
	{
		$result1=mysqli_query($connect,"INSERT INTO user (uname, urole, username, password, wallet) VALUES ('".$row['uname']."', 'retail', '".$row['username']."', '".$row['password']."', 0)");
	}
	
	$result=mysqli_query($connect,"DELETE FROM pending WHERE username='".$username."'");
	echo 'Done';
?>