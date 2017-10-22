$(document).ready(function () {
	$("#sidebar").niceScroll({
		cursorcolor: '#53619d',
		cursorwidth: 4,
		cursorborder: 'none'
	});

	$('#dismiss, .overlay').on('click', function () {
		$('#sidebar').removeClass('active');
		$('.overlay').fadeOut();
	});

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').addClass('active');
		$('.overlay').fadeIn();
		$('.collapse.in').toggleClass('in');
		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});
});

function Logout()
{
	sessionStorage.clear();
	window.location.href='./Login.html';
}

$(document).ready(function () {
	username=sessionStorage.getItem('username');
	xhr1 = new XMLHttpRequest();
	xhr1.onreadystatechange = function()
	{
		if(xhr1.status==200 && xhr1.readyState==4)
		{
			document.getElementById('adminusername').innerHTML=xhr1.responseText;
		}
	}
	xhr1.open('POST', '../../Backend/Scripts/GetUsername.php', true);
	xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr1.send('user='+username);
	getProducts();
});

function getProducts()
{
	document.getElementById('tablecontent').innerHTML='';
	xhr2 = new XMLHttpRequest();
	xhr2.onreadystatechange = function()
	{
		if(xhr2.status==200 && xhr2.readyState==4)
		{
			myObj = JSON.parse(this.responseText);
			for(i=0;(i<myObj.length && i<9);i++)
			{
				ele = document.createElement('tr');
				ele.setAttribute("id", myObj[i]['pid']);
				ele.innerHTML = '<td></td><td style="text-align:center; padding-top:5%;" class="sidebar">'+myObj[i]['pname']+'</td>';
				ele.innerHTML += '<td style="text-align:center;"><b>Price: </b>'+myObj[i]['price']+'<br><b>Qty: </b>'+myObj[i]['qty']+'<br><b>Category: </b>'+myObj[i]['category']+'</td>';
				ele.innerHTML += '<td style="text-align:center; padding-top:5%;" class="sidebar"><button onclick="EditProducts('+myObj[i]['pid']+')" type="button" class="btn btn-info sidebar">Edit</button></td>';
				ele.innerHTML += '<td style="text-align:center; padding-top:5%;" class="sidebar"><button onclick="DeleteProducts('+myObj[i]['pid']+')" type="button" class="btn btn-danger sidebar">Delete</button></td><td></td>';
				document.getElementById('tablecontent').appendChild(ele);
			}
			if(myObj.length>9)
			{
				ele=document.createElement('tr');
				ele.setAttribute("id", "pagination");
				ele.innerHTML = '<td></td><td></td><td></td><td></td>';
				ele.innerHTML += '<td style="text-align:right;" class="sidebar"><br><button onclick="NextProducts(1)" type="button" class="btn btn-primary sidebar">Next</button></td>';
				ele.innerHTML += '<td></td>';
				document.getElementById('tablecontent').appendChild(ele);
			}
		}
	}
	xhr2.open('POST', '../../Backend/Scripts/GetProducts.php', true);
	xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr2.send('uid='+sessionStorage.getItem('uid'));
}

function NextProducts(count)
{
	document.getElementById('tablecontent').innerHTML='';
	for(i=count*9;(i<myObj.length && i<((count+1)*9));i++)
	{
		ele = document.createElement('tr');
		ele.setAttribute("id", myObj[i]['pid']);
		ele.innerHTML = '<td></td><td style="text-align:center; padding-top:5%;" class="sidebar">'+myObj[i]['pname']+'</td>';
		ele.innerHTML += '<td style="text-align:center;"><b>Price: </b>'+myObj[i]['price']+'<br><b>Qty: </b>'+myObj[i]['qty']+'<br><b>Category: </b>'+myObj[i]['category']+'<br><b>Store: </b>'+myObj[i]['sname']+'</td>';
		ele.innerHTML += '<td style="text-align:center; padding-top:5%;" class="sidebar"><button onclick="EditProducts('+myObj[i]['pid']+')" type="button" class="btn btn-info sidebar">Edit</button></td>';
		ele.innerHTML += '<td style="text-align:center; padding-top:5%;" class="sidebar"><button onclick="DeleteProducts('+myObj[i]['pid']+')" type="button" class="btn btn-danger sidebar">Delete</button></td><td></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	if(myObj.length>(count+1)*9 && count>0)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td><td></td><td></td>';
		ele.innerHTML += '<td colspan=3 style="text-align:right;" class="sidebar"><br><button onclick="PreviousProducts('+(count+1)+')" type="button" class="btn btn-primary sidebar">Previous</button>&ensp;<button onclick="NextProducts('+(count+1)+')" type="button" class="btn btn-primary sidebar">Next</button></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	else if(count>0)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td><td></td><td></td>';
		ele.innerHTML += '<td colspan=3 style="text-align:right;" class="sidebar"><br><button onclick="PreviousProducts('+(count+1)+')" type="button" class="btn btn-primary sidebar">Previous</button></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	else if(myObj.length>(count+1)*9)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td><td></td><td></td>';
		ele.innerHTML += '<td colspan=3 style="text-align:right;" class="sidebar"><br><button onclick="NextProducts('+(count+1)+')" type="button" class="btn btn-primary sidebar">Next</button></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	
}

function PreviousProducts(count)
{
	document.getElementById('tablecontent').innerHTML='';
	for(i=(count-2)*9;(i<myObj.length && i<((count-1)*9));i++)
	{
		ele = document.createElement('tr');
		ele.setAttribute("id", myObj[i]['pid']);
		ele.innerHTML = '<td></td><td style="text-align:center; padding-top:5%;" class="sidebar">'+myObj[i]['pname']+'</td>';
		ele.innerHTML += '<td style="text-align:center;"><b>Price: </b>'+myObj[i]['price']+'<br><b>Qty: </b>'+myObj[i]['qty']+'<br><b>Category: </b>'+myObj[i]['category']+'<br><b>Store: </b>'+myObj[i]['sname']+'</td>';
		ele.innerHTML += '<td style="text-align:right; padding-top:5%;" class="sidebar"><button onclick="EditProducts('+myObj[i]['pid']+')" type="button" class="btn btn-info sidebar">Edit</button></td>';
		ele.innerHTML += '<td style="text-align:center; padding-top:5%;" class="sidebar"><button onclick="DeleteProducts('+myObj[i]['pid']+')" type="button" class="btn btn-danger sidebar">Delete</button></td><td></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	if(myObj.length>(count-1)*9 && (count-2)>0)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td><td></td><td></td>';
		ele.innerHTML += '<td colspan=3 style="text-align:right;" class="sidebar"><br><button onclick="PreviousProducts('+(count-1)+')" type="button" class="btn btn-primary sidebar">Previous</button>&ensp;<button onclick="NextProducts('+(count-1)+')" type="button" class="btn btn-primary sidebar">Next</button></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	else if((count-2)>0)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td><td></td><td></td>';
		ele.innerHTML += '<td colspan=3 style="text-align:right;" class="sidebar"><br><button onclick="PreviousProducts('+(count-1)+')" type="button" class="btn btn-primary sidebar">Previous</button></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	else if(myObj.length>(count-1)*9)
	{
		ele=document.createElement('tr');
		ele.setAttribute("id", "pagination");
		ele.innerHTML = '<td></td><td></td><td></td>';
		ele.innerHTML += '<td colspan=3 style="text-align:right;" class="sidebar"><br><button onclick="NextProducts('+(count-1)+')" type="button" class="btn btn-primary sidebar">Next</button></td>';
		document.getElementById('tablecontent').appendChild(ele);
	}
	
}

function DeleteProducts(pid)
{
	xhr3 = new XMLHttpRequest();
	xhr3.onreadystatechange = function()
	{
		if(xhr3.status==200 && xhr3.readyState==4)
		{
			document.getElementById('tablecontent').innerHTML='';
			getProducts();
		}
	}
	xhr3.open('POST', '../../Backend/Scripts/DeleteProducts.php', true);
	xhr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr3.send('pid='+pid);
}