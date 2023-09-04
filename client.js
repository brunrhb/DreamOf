document.addEventListener("DOMContentLoaded", function () {
    const listenButton = document.getElementById("listenButton");
    const audioPlayer = document.getElementById("audioPlayer");

    listenButton.addEventListener("click", function () {
        // Make an AJAX request to listen.php to fetch a random audio file.
        fetch("/DreamOf/listen.php") // Utilisez le chemin relatif depuis la racine de votre serveur.
            .then(response => response.json())
            .then(data => {
                if (data.audioUrl) {
                    audioPlayer.src = data.audioUrl;
                    audioPlayer.play();
                } else {
                    alert("No audio available.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while fetching audio.");
            });
    });
});
