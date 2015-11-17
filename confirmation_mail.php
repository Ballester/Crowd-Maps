<?php
$servername = "mysql01.ufpel.hospedagemdesites.ws";
$username = "ufpel";
$password = "Bid1yAw9iR";
$dbname = "ufpel";

$user = $_POST['User'];
$email = $_POST['Email'];

$hash = hash("md5", $user . $email);

$to      = 'nobody@example.com';
$subject = 'the subject';
$message = 'Obrigado por se cadastrar.' . "\n" . "Para continuar, acesse o link: http://ufpel.servicos.ws/?access=" . $hash . "\n";
$headers = 'From: ufpel@servicos.com' . "\r\n" .
    'Reply-To: pedballester@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO cadastros (name, email, hash) VALUES ('".$user."', '".$email."', '".$hash."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


?>
