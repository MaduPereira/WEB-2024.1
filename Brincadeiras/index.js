function myMove() { //animaçao
    let id = null;
    const elem = document.getElementById("animate");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        if (pos == 350) {
        clearInterval(id);
        } else {
        pos++;
        elem.style.top = pos + 'px';
        elem.style.left = pos + 'px';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const images = document.querySelectorAll('.moving-image');
    const speed = 2; // Ajuste a velocidade de movimento das imagens

    images.forEach(img => {
        // Inicializa a posição aleatória das imagens
        img.style.top = Math.random() * (window.innerHeight - img.clientHeight) + 'px';
        img.style.left = Math.random() * (window.innerWidth - img.clientWidth) + 'px';

        let dx = speed * (Math.random() > 0.5 ? 1 : -1);
        let dy = speed * (Math.random() > 0.5 ? 1 : -1);

        function animate() {
            let rect = img.getBoundingClientRect();
            
            if (rect.left + dx < 0 || rect.right + dx > window.innerWidth) {
                dx = -dx;
            }
            if (rect.top + dy < 0 || rect.bottom + dy > window.innerHeight) {
                dy = -dy;
            }

            img.style.left = rect.left + dx + 'px';
            img.style.top = rect.top + dy + 'px';

            requestAnimationFrame(animate);
        }

        animate();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heart = document.querySelector('.heart');
    const images = document.querySelectorAll('.moving-image');

    // Função para obter a posição do coração
    const getHeartPosition = () => {
        const rect = heart.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2, // Centro do coração em relação à viewport
            y: rect.top + rect.height / 2
        };
    };

    images.forEach(img => {
        img.addEventListener('click', () => {
            const { x, y } = getHeartPosition();

            // Adiciona variáveis CSS customizadas para a posição do coração
            img.style.setProperty('--heart-x', `${x}px`);
            img.style.setProperty('--heart-y', `${y}px`);

            // Adiciona a classe 'hide-to-heart' à imagem clicada
            img.classList.add('hide-to-heart');

            // Remove a imagem do DOM após a animação para evitar sobreposição
            setTimeout(() => {
                img.remove();
            }, 1000); // O tempo deve corresponder à duração da animação
        });
    });
});
