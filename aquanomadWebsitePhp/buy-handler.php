
<?php
require 'database.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Validate form data
    $data = [
        'firstName' => $_POST['firstName'] ?? '',
        'lastName' => $_POST['lastName'] ?? '',
        'email' => $_POST['email'] ?? '',
        'phone' => $_POST['phone'] ?? '',
        'bottleSize' => $_POST['bottleSize'] ?? '',
        'color' => $_POST['color'] ?? '',
        'quantity' => $_POST['quantity'] ?? '',
        'promoCode' => $_POST['promoCode'] ?? '',
        'address' => $_POST['address'] ?? '',
        'comments' => $_POST['comments'] ?? '',
    ];

    $errors = [];

    foreach ($data as $key => $value) {
        if (empty($value) && $key !== 'promoCode' && $key !== 'comments') { // PromoCode and Comments are optional
            $errors[] = ucfirst($key) . " is required.";
        }
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // File upload handling
    $uploadedFilePath = '';
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $targetDir = "uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = basename($_FILES['file']['name']);
        $uploadedFilePath = $targetDir . $fileName;

        if (!move_uploaded_file($_FILES['file']['tmp_name'], $uploadedFilePath)) {
            $errors[] = "Failed to upload file.";
        }
    } else {
        $errors[] = "File upload is required.";
    }

    if (empty($errors)) {
        try {
            $data['file'] = $uploadedFilePath; // Add file path to data array
            $sqlData = [
                'first_name' => $data['firstName'],
                'last_name' => $data['lastName'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'bottle_size' => $data['bottleSize'],
                'color' => $data['color'],
                'quantity' => $data['quantity'],
                'promo_code' => $data['promoCode'],
                'address' => $data['address'],
                'comments' => $data['comments'],
                'file_path' => $uploadedFilePath,
            ];

            insertRecord($pdo, 'purchases', $sqlData); // Use table 'purchases'
            echo "Data successfully saved.";
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo implode("<br>", $errors);
    }
}
?>
