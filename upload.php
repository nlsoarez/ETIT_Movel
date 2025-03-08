<?php
if ($_FILES['file']['name']) {
    $filename = $_FILES['file']['tmp_name'];
    move_uploaded_file($filename, 'data.xlsx');
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
