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

$sql = "SELECT User FROM retangulos WHERE Rect!=''";
$result = $conn->query($sql);

if (mysqli_num_rows($result) > 0) {
    $vistos = array();
    $dict = array();
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        // echo "id: " . $row["User"].;
        if (in_array($row["User"], $vistos)) {
          $dict[$row["User"]] += 1;
        }
        else {
          $vistos[] = $row["User"];
          $dict[$row["User"]] = 1;
        }
    }

    array_multisort($dict, SORT_DESC);
    echo json_encode($dict);
} else {
    echo "0 results";
}

$conn->close();

?>
