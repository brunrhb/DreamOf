<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_FILES["audio_data"]) && $_FILES["audio_data"]["error"] === UPLOAD_ERR_OK) {
        $tempFilePath = $_FILES["audio_data"]["tmp_name"];
        $fileName = "audio_" . date("Ymd_His") . ".wav";
        $destination = "audios/" . $fileName;

        if (move_uploaded_file($tempFilePath, $destination)) {
            echo "Audio recording successful: " . $fileName;
        } else {
            echo "Failed to record audio.";
        }
    } else {
        echo "No audio data received.";
    }
} else {
    echo "Unauthorized method.";
}
?>
