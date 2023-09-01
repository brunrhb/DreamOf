<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Vérifier si les données audio sont présentes dans la requête
    if (isset($_FILES["audio_data"]) && $_FILES["audio_data"]["error"] === UPLOAD_ERR_OK) {
        $tempFilePath = $_FILES["audio_data"]["tmp_name"];
        
        // Nom du fichier basé sur la date et l'heure
        $fileName = "audio_" . date("Ymd_His") . ".wav";
        $destination = "audios/" . $fileName;
        
        // Déplacer le fichier vers le dossier "audios"
        if (move_uploaded_file($tempFilePath, $destination)) {
            echo "Enregistrement vocal réussi : " . $fileName;
        } else {
            echo "Échec de l'enregistrement vocal.";
        }
    } else {
        echo "Aucune donnée audio n'a été reçue.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>

