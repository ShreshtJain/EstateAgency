<?php
// ✨ Force error handling
ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
ini_set('html_errors', '0');
error_reporting(0);
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/mail-errors.log');

//Start output buffering to suppress leaked warnings
ob_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ✅ Include PHPMailer manually
require '../assets/vendor/PHPMailer/PHPMailer.php';
require '../assets/vendor/PHPMailer/SMTP.php';
require '../assets/vendor/PHPMailer/Exception.php';

// ✅ Set credentials
$receiving_email_address;
$smtp_username;
$smtp_password;

// ✅ Handle POST only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(403);
  if (ob_get_length()) ob_end_clean();
  echo "Invalid request method.";
  exit;
}

// ✅ Sanitize input
$name    = strip_tags(trim($_POST['name'] ?? ''));
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = strip_tags(trim($_POST['subject'] ?? ''));
$message = trim($_POST['message'] ?? '');

if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  if (ob_get_length()) ob_end_clean();
  echo "Please fill in all required fields correctly.";
  exit;
}

// ✅ Try sending mail
try {
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host       = 'smtp.gmail.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = $smtp_username;
  $mail->Password   = $smtp_password;
  $mail->SMTPSecure = 'tls';
  $mail->Port       = 587;
  $mail->Timeout    = 10;

  $mail->setFrom($smtp_username, 'Website Form');
  $mail->addAddress($receiving_email_address);
  $mail->addReplyTo($email, $name);

  $mail->isHTML(false);
  $mail->Subject = $subject;
  $mail->Body    = "From: $name\nEmail: $email\n\nMessage:\n$message";

  $mail->send();

  // ✅ Clear buffer and send success
  if (ob_get_length()) ob_end_clean();
  header('Content-Type: text/plain');
  echo "OK";

} catch (\Throwable $e) {
  http_response_code(500);

  // ✅ Log real error
  error_log("Mailer Error: " . $e->getMessage(), 3, __DIR__ . '/mail-errors.log');

  // ✅ Prevent any auto output
  if (ob_get_length()) ob_end_clean();

  // ✅ Force clean response
  header('Content-Type: text/plain');
  echo "Something went wrong. Please try again later.";
}
