<?php
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$message = isset($_POST['message']) ? $_POST['message'] : '';

if(empty($name) || empty($email) || empty($message)){
    header('HTTP/1.1 500 Internal Server Booboo');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(array('message' => 'Some field is empty', 'code' => 500)));
}

$headers = 'From: ' . $name . '<' . $email . '>' . "\r\n" .
    'Content-type: text/html;' .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    $message = '
        <table border="1">
            <tr>
                <td>Name:</td>
                <td>' . $name . '</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>' . $email . '</td>
            </tr>
            <tr>
                <td>Message:</td>
                <td>' . $message . '</td>
            </tr>
        </table>
    ';

    $subject = empty($_POST['subject']) || !isset($_POST['subject']) ? "Spacework website" : $_POST['subject'];
    
  $mail = mail( "izgeist.check@gmail.com", $subject, $message, $headers );
 
  //      ^
  //  Replace with your email

  if($mail){
    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(array('message' => 'Message send successful', 'code' => 200)));
  }

?>