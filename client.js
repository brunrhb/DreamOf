document.addEventListener("DOMContentLoaded", function () {
    const listenButton = document.getElementById("listenButton");
    const recordButton = document.getElementById("recordButton");
    const audioPlayer = document.getElementById("audioPlayer");

    let mediaRecorder;
    let audioChunks = [];

    listenButton.addEventListener("click", function () {
        // Make an AJAX request to listen.php to fetch a random audio file.
        fetch("/DreamOf/listen.php")
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

    recordButton.addEventListener("click", async function () {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const blob = new Blob(audioChunks, { type: "audio/wav" });
                const formData = new FormData();
                formData.append("audio_data", blob);

                const response = await fetch("/DreamOf/record.php", {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    alert("Audio recorded and uploaded successfully.");
                } else {
                    alert("Failed to upload audio.");
                }
                
                audioChunks = [];
            };

            mediaRecorder.start();
            recordButton.disabled = true;
            setTimeout(() => {
                mediaRecorder.stop();
                recordButton.disabled = false;
            }, 5000); // Record for 5 seconds
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to access the microphone.");
        }
    });
});
