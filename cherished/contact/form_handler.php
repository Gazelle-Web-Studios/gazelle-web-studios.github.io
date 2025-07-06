<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error_log.txt');

// Set CORS headers - allow only one origin (choose one: with or without www)
$allowedOrigin = 'https://www.cherishedlawncare.co.uk';  // Use 'cherishedlawncare.co.uk' if preferred

if ($_SERVER['HTTP_ORIGIN'] == $allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
}

// Allow the necessary HTTP methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow the necessary headers, including 'Content-Type'
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request for OPTIONS method
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "stuartburnhope";
$password = "RwIu]!=Ee_{V";
$dbname = "contact-form";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        error_log("Error decoding JSON: " . json_last_error_msg());
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON input"]);
        exit;
    }

    $name = htmlspecialchars(trim($data['name']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phone = preg_replace("/[^0-9]/", "", $data['phone']);
    $organization = htmlspecialchars(trim($data['organisation']));
    $service = htmlspecialchars(trim($data['service']));
    $timeline = htmlspecialchars(trim($data['timeline']));
    $budget = htmlspecialchars(trim($data['budget']));
    $message = htmlspecialchars(trim($data['message']));

    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($service)) {
        error_log("Validation failed: Missing or invalid fields");
        http_response_code(400);
        echo json_encode(["error" => "Invalid or missing input"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO contact_form (name, email, phone, organization, service, timeline, budget, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        error_log("SQL prepare failed: " . $conn->error);
        http_response_code(500);
        echo json_encode(["error" => "Failed to prepare statement"]);
        exit;
    }

    $stmt->bind_param("ssssssss", $name, $email, $phone, $organization, $service, $timeline, $budget, $message);

    if ($stmt->execute()) {
        header('Content-Type: application/json');
        echo json_encode(["message" => "Message sent successfully!"]);
    } else {
        error_log("SQL execute failed: " . $stmt->error);
        http_response_code(500);
        echo json_encode(["error" => "Error storing message"]);
    }

    $stmt->close();
}

$conn->close();
?>