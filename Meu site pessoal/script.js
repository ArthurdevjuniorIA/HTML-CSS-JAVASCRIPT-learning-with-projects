document.addEventListener("DOMContentLoaded", () => {
    const storyCards = document.querySelectorAll(".story-card");

    storyCards.forEach(card => {
        const video = card.querySelector("video");

        card.addEventListener("click", (e) => {
            // 1. Se clicar especificamente no botão de volume
            if (e.target.classList.contains('volume-btn')) {
                video.muted = !video.muted;
                // Altera o ícone dinamicamente entre som ligado ou desligado
                e.target.textContent = video.muted ? "volume_off" : "volume_up";
                return; // Para o código aqui para não pausar o vídeo sem querer
            }

            // Ignora se o clique for na caixinha de texto ou no coração de curtir
            if (e.target.classList.contains('heart-icon') || e.target.closest('.story-input-capsule')) {
                return;
            }

            // 2. Lógica de Play e Pause ao clicar no card
            if (video.paused) {
                video.play().catch(err => console.log("Erro ao reproduzir:", err));
            } else {
                video.pause();
            }
        });
    });
});