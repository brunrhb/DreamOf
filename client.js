document.addEventListener("DOMContentLoaded", () => {
    const enregistrerBtn = document.getElementById("enregistrer");

    enregistrerBtn.addEventListener("click", async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/wav" });
            const url = URL.createObjectURL(blob);
            
            // Envoyer le blob vers record.php pour enregistrement
            const formData = new FormData();
            formData.append("audio", blob);
            fetch("record.php", {
                method: "POST",
                body: formData
            });
        };

        mediaRecorder.start();
        setTimeout(() => {
            mediaRecorder.stop();
        }, 5000); // Enregistrement pendant 5 secondes
    });
});
