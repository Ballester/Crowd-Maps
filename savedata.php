<?php
$servername = "mysql01.ufpel.hospedagemdesites.ws";
$username = "ufpel";
$password = "Bid1yAw9iR";
$dbname = "ufpel";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
  
$user = $_POST['User'];
$image = $_POST['Image'];
$rect = $_POST['Rect'];
$heading = $_POST['Heading'];

  //$sql = "INSERT INTO retangulos (Image, Rect) VALUES ('6', 'testando')";
  $sql = "INSERT INTO retangulos (User, ImageName, Rect, Heading) VALUES ('".$user."', '".$image."', '".$rect."', '".$heading."')";

  
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>


