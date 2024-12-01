
<?php
session_start();
try {
    $serverName = 'localhost:3306';
    $userName = 'root';
    $password = '';
    $dbname = 'test';

    $pdo_mode = PDO::ERRMODE_EXCEPTION; // Change to PDO::ERRMODE_SILENT or PDO::ERRMODE_WARNING for different modes
    $pdo = new PDO("mysql:host=$serverName;dbname=$dbname", $userName, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, $pdo_mode);

    // Insert function
    function insertRecord($pdo, $table, $data) {
        $columns = implode(", ", array_keys($data));
        $values = ":" . implode(", :", array_keys($data));
        $sql = "INSERT INTO $table ($columns) VALUES ($values)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($data);
    }

    // Update function
    function updateRecord($pdo, $table, $data, $condition) {
        $updates = implode(", ", array_map(fn($key) => "$key=:$key", array_keys($data)));
        $sql = "UPDATE $table SET $updates WHERE $condition";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($data);
    }

    // Delete function
    function deleteRecord($pdo, $table, $condition) {
        $sql = "DELETE FROM $table WHERE $condition";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    }

    // Cookie Example
    if (!isset($_COOKIE['user'])) {
        setcookie("user", "anonymous", time() + (86400 * 30), "/");
    }

    echo "Database connection successful.";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
