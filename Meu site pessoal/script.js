document.addEventListener("DOMContentLoaded", () => {

    // Stories da seção "Sobre mim"
    document.querySelectorAll(".card-story").forEach(card => {
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
            video.paused ? video.play().catch(() => {}) : video.pause();
        });
    });

    // Cards de música
    const cardsMusica = document.querySelectorAll('.card-musica');

    cardsMusica.forEach(card => {
        const audio = card.querySelector('audio');
        const icone = card.querySelector('.icone-play');

        card.addEventListener('click', () => {
            const estaTocando = !audio.paused;

            cardsMusica.forEach(outroCard => {
                if (outroCard === card) return;
                const outroAudio = outroCard.querySelector('audio');
                outroAudio.pause();
                outroAudio.currentTime = 0;
                outroCard.classList.remove('tocando');
                outroCard.querySelector('.icone-play').textContent = 'play_arrow';
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

    // Animação de entrada ao rolar a página
    const secoes = document.querySelectorAll(
        '.secao-sobre, .secao-inspiracao, .secao-galeria, .secao-musica, .secao-contato, .secao-tabela, .secao-sugestao'
    );

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) entrada.target.classList.add('visivel');
        });
    }, { threshold: 0.1 });

    secoes.forEach(secao => observador.observe(secao));

});