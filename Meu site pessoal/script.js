document.addEventListener("DOMContentLoaded", () => {
    const storyCards = document.querySelectorAll(".card-story");

    storyCards.forEach(card => {
        const video = card.querySelector("video");

        card.addEventListener("click", (e) => {
            if (e.target.classList.contains('botao-volume')) {
                video.muted = !video.muted;
                e.target.textContent = video.muted ? "volume_off" : "volume_up";
                return;
            }
            if (e.target.classList.contains('icone-coracao') || e.target.closest('.campo-resposta')) {
                return;
            }
            if (video.paused) {
                video.play().catch(err => console.log("Erro ao reproduzir:", err));
            } else {
                video.pause();
            }
        });
    });
});

const secoes = document.querySelectorAll('.secao-sobre, .secao-inspiracao, .secao-galeria, .secao-contato, .secao-tabela');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
        }
    });
}, { threshold: 0.1 });

secoes.forEach(secao => observador.observe(secao));
const cardsMusica = document.querySelectorAll('.card-musica');

cardsMusica.forEach(card => {
    const audio = card.querySelector('audio');
    const icone = card.querySelector('.icone-play');

    card.addEventListener('click', () => {
        const estaTocando = !audio.paused;
        cardsMusica.forEach(outroCard => {
            const outroAudio = outroCard.querySelector('audio');
            const outroIcone = outroCard.querySelector('.icone-play');
            if (outroAudio !== audio) {
                outroAudio.pause();
                outroAudio.currentTime = 0;
                outroCard.classList.remove('tocando');
                outroIcone.textContent = 'play_arrow';
            }
        });

        if (estaTocando) {
            audio.pause();
            card.classList.remove('tocando');
            icone.textContent = 'play_arrow';
        } else {
            audio.play();
            card.classList.add('tocando');
            icone.textContent = 'pause';
        }
    });
    audio.addEventListener('ended', () => {
        card.classList.remove('tocando');
        icone.textContent = 'play_arrow';
    });
});