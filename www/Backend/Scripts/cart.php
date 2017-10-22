<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "QRStore";

/// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


if($_SERVER['REQUEST_METHOD']=='GET'){
	extract($_GET);

	$sql = "SELECT pid,qty FROM cart WHERE uid='$uid' and store_id='$sid'";
	$result = mysqli_query($conn, $sql);

	$response =array("count"=>0,"products"=>[]);
	$count =0;
	if (mysqli_num_rows($result) > 0) {
		
		// output data of each row
		while($row = mysqli_fetch_assoc($result)) {
			$sql = "SELECT price,pname FROM products WHERE pid=" . $row['pid'];
			$prod_desc = mysqli_fetch_assoc(mysqli_query($conn, $sql));
			$total = $prod_desc['price'] * $row['qty'];
			array_push($response['products'],json_encode(array('pid'=>$row['pid'],'name'=>$prod_desc['pname'],'price'=>$prod_desc['price'],'qty'=>$row['qty'],'total'=>$total)));
			$count++;
		}
		$response['count'] = $count;
		
	} 

	echo json_encode($response);	
}

elseif($_SERVER['REQUEST_METHOD']=='PUT'){
	parse_str(file_get_contents("php://input"),$post_vars);

	$products = json_decode($post_vars['products'],true);
	$sid = $post_vars['sid'];
	$uid = $post_vars['uid'];
	$count = $post_vars['count'];

	for($i=0;$i<$count;$i++){

		$qty = $products[$i]['qty'];
		$pid = $products[$i]['pid'];
		$sql = "UPDATE cart SET qty='$qty' WHERE pid='$pid' AND store_id='$sid' AND uid='$uid'";
		if (mysqli_query($conn, $sql)) {
			echo "Record updated successfully";
		} else {
			echo "Error updating record: " . mysqli_error($conn);
		}
	}

	 echo $count;
	
}

elseif($_SERVER['REQUEST_METHOD']=='DELETE'){
	echo "hello";
	parse_str(file_get_contents("php://input"),$post_vars);

	$uid = $post_vars['uid'];
	$sid = $post_vars['sid'];
	$pid = $post_vars['pid'];

	$sql = "DELETE from cart WHERE pid='$pid' AND store_id='$sid' AND uid='$uid'";
	if (mysqli_query($conn, $sql)) {
		echo "Record updated successfully";
	} else {
		echo "Error updating record: " . mysqli_error($conn);
	}
	
}

elseif($_SERVER['REQUEST_METHOD']=='POST'){
	extract($_POST);

	$sql = "INSERT INTO cart (uid,pid,store_id,qty) VALUES ('$uid','$pid','$sid','$qty')";
	if(mysqli_query($conn, $sql)){
		echo "Successfully added to cart";
	}

	else{
		echo "Something went wrong";
	}

	
}

mysqli_close($conn);
?>
