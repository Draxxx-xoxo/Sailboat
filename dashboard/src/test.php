<html>
<head>
<title>PHP isset() example</title>
</head>
<body>

<form method="post">

Enter value1 :<input type="text" name="str1"><br/>
Enter value2 :<input type="text" name="str2"><br/>
<input type="submit" value="Sum" name="Submit1"><br/><br/>

<?php
if(isset($_POST["Submit1"]))
{
$sum=$_POST["str1"] + $_POST["str2"];
echo "The sum = ". $sum;

}
?>

</form>
</body>
</html>