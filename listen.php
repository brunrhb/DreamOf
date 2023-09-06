<?php
// Path to the directory containing audio files.
$audioDirectory = '/DreamOf/Audios';

// Get a list of all audio files (mp3 and wav) in the directory.
$audioFiles = glob($_SERVER['DOCUMENT_ROOT'] . $audioDirectory . '/*.mp3');
$audioFiles = array_merge($audioFiles, glob($_SERVER['DOCUMENT_ROOT'] . $audioDirectory . '/*.wav'));

if (empty($audioFiles)) {
    // No audio files found.
    $response = ['audioUrl' => null];
} else {
    // Select a random audio file from the list.
    $randomAudioFile = $audioFiles[array_rand($audioFiles)];

    // Construct the URL to the selected audio file.
    $audioUrl = 'http://' . $_SERVER['HTTP_HOST'] . $audioDirectory . '/' . basename($randomAudioFile);

    $response = ['audioUrl' => $audioUrl];
}

// Set the response content type to JSON.
header('Content-Type: application/json');

// Encode and echo the response as JSON.
echo json_encode($response);
?>
