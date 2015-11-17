<?php
function random_pic($conn, $dir = 'images') {

  while (true) {

    $n_empty = 0;
    $n_filled = 0;

    $files = glob($dir . '/*.*');
    $file = array_rand($files);

    $sql = "SELECT ImageName FROM retangulos WHERE ImageName='" . $files[$file] . "'";
    $result = $conn->query($sql);

    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            if ($row["Rect"] != "") {
              $n_filled++;
            }
            else {
              $n_empty++;
            }
        }
    }

    if ($n_empty > 1 || $n_filled > 4) {
      rename($files[$file], 'verified_images/' . $files[$file]);
    }
    else {
      break;
    }

  }
  return $files[$file];
}

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

echo random_pic($conn);

?>
