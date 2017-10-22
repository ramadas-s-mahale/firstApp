<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$result=mysqli_query($connect,"SELECT uname FROM user WHERE username='".$user."'");
	while($row=mysqli_fetch_array($result))
	{
        echo $row['uname'];
	}
	
?>