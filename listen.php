<?php
$audioFiles = scandir("audios/");
$audioFiles = array_diff($audioFiles, array(".", "..","maupassant-lui.mp3"));

if (count($audioFiles) > 0) {
    $randomAudio = array_rand($audioFiles);
    $audioPath = "audios/" . $audioFiles[$randomAudio];
    
    // Lire le fichier audio et le renvoyer au navigateur
    if (file_exists($audioPath)) {
        header("Content-Type: audio/wav");
        header("Content-Length: " . filesize($audioPath));
        readfile($audioPath);
    } else {
        echo "Fichier audio non trouvé.";
    }
} else {
    echo "Aucun fichier audio disponible.";
}
?>
