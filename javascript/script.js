// Função para abrir e fechar o menu mobile
function toggleMenu() {
    const nav = document.getElementById('menuMobile');
    const btn = document.getElementById('btnMenu');
    const icon = btn.querySelector('i');
    
    nav.classList.toggle('active');
    btn.classList.toggle('ativo');
    
    if (nav.classList.contains('active')) {
        setTimeout(() => {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }, 150);
    } else {
        setTimeout(() => {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }, 150);
    }
}

// Função para fechar o menu automaticamente ao clicar em links
function fecharMenu() {
    const nav = document.getElementById('menuMobile');
    const btn = document.getElementById('btnMenu');
    const icon = btn.querySelector('i');
    
    nav.classList.remove('active');
    btn.classList.remove('ativo');
    
    setTimeout(() => {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }, 150);
}

// Mostrar ou ocultar o botão do WhatsApp baseado na rolagem da página
window.addEventListener('scroll', function() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (!whatsappBtn) return;

    // Se rolar mais de 100 pixels para baixo a partir do topo, o botão já aparece suavemente
    if (window.scrollY > 100) {
        whatsappBtn.classList.add('show');
    } else {
        whatsappBtn.classList.remove('show');
    }
});


//APARECER TELA SOBRE A DRA
    document.addEventListener("DOMContentLoaded", function() {
        const imageWrapper = document.querySelector('.about-image-wrapper');
        const aboutContent = document.querySelector('.about-content');

        // Configuração geral do observador
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Dá uma folga para disparar um pouco antes de sumir da tela
            threshold: 0.2 // Requer 20% do elemento visível para disparar
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe reveal no elemento específico que entrou na tela
                    entry.target.classList.add('reveal');
                    // Para de observar este elemento após animar
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Cada elemento é monitorado de forma totalmente independente
        if (imageWrapper) {
            revealObserver.observe(imageWrapper);
        }
        
        if (aboutContent) {
            revealObserver.observe(aboutContent);
        }
    });

//APARECER TELA FEEDBACKS
    document.addEventListener("DOMContentLoaded", function() {
        const imageWrapper = document.querySelector('.about-image-wrapper');
        const aboutContent = document.querySelector('.about-content');
        const feedbacksSection = document.querySelector('#feedbacks'); // Nova seção de feedbacks

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.15
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Monitora todos os elementos de forma independente
        if (imageWrapper) revealObserver.observe(imageWrapper);
        if (aboutContent) revealObserver.observe(aboutContent);
        if (feedbacksSection) revealObserver.observe(feedbacksSection); // Ativa os cards em cascata ao chegar neles
    });

    //LOGICA FEEDBACKS
    document.addEventListener("DOMContentLoaded", function() {
        const imageWrapper = document.querySelector('.about-image-wrapper');
        const aboutContent = document.querySelector('.about-content');
        const feedbacksSection = document.querySelector('#feedbacks');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.15
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (imageWrapper) revealObserver.observe(imageWrapper);
        if (aboutContent) revealObserver.observe(aboutContent);
        if (feedbacksSection) revealObserver.observe(feedbacksSection);

        // ==========================================
        // CARROSSEL DE FEEDBACKS (ROBUSTO E DINÂMICO)
        // ==========================================
        const grid = document.getElementById('feedbacksGrid');
        const dotsContainer = document.getElementById('carouselDots');
        const cards = document.querySelectorAll('.feedback-card');
        
        if (grid && dotsContainer && cards.length > 0) {
            let currentIndex = 0;
            let autoplayInterval;

            // Gera os pontinhos dinamicamente baseados na quantidade real de cards
            dotsContainer.innerHTML = '';
            cards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    scrollToIndex(currentIndex);
                    updateActiveDot(currentIndex);
                    resetAutoplay();
                });
                
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('.dot');

            function scrollToIndex(index) {
                const targetCard = cards[index];
                if (targetCard) {
                    // Deslocamento exato baseado na posição do card dentro do container
                    const scrollLeftPos = targetCard.offsetLeft - grid.offsetLeft;
                    grid.scrollTo({
                        left: scrollLeftPos,
                        behavior: 'smooth'
                    });
                }
            }

            function updateActiveDot(index) {
                dots.forEach(d => d.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }

            // Sincroniza o pontinho ao rolar manualmente (arrastando com o dedo ou mouse)
            let scrollTimeout;
            grid.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const scrollPos = grid.scrollLeft;
                    let closestIndex = 0;
                    let minDistance = Infinity;

                    cards.forEach((card, index) => {
                        const cardLeft = card.offsetLeft - grid.offsetLeft;
                        const distance = Math.abs(scrollPos - cardLeft);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestIndex = index;
                        }
                    });

                    if (currentIndex !== closestIndex) {
                        currentIndex = closestIndex;
                        updateActiveDot(currentIndex);
                    }
                }, 60);
            });

            // Autoplay (Passa sozinho a cada 4 segundos e dá a volta no último)
            function startAutoplay() {
                autoplayInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % cards.length;
                    scrollToIndex(currentIndex);
                    updateActiveDot(currentIndex);
                }, 4000);
            }

            function resetAutoplay() {
                clearInterval(autoplayInterval);
                startAutoplay();
            }

            grid.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
            grid.addEventListener('mouseleave', () => startAutoplay());

            startAutoplay();
        }
    });