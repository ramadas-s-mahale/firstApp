<?php

	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$data = array();
	$result=mysqli_query($connect,"SELECT username,uname FROM pending");
	while($row=mysqli_fetch_array($result))
	{
        $data[] = $row;
	}
	echo json_encode($data);
	
?>