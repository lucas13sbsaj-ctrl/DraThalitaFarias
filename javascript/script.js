
/* =========================================
   SCRIPT PRINCIPAL — DRA. THALITA FARIAS
   Menu, animações, header e depoimentos
   ========================================= */

document.documentElement.classList.add("js");

/* =========================================
   1. MENU MOBILE
   Abertura, fechamento e rotação do ícone
   ========================================= */

const menuMobile = document.getElementById("menuMobile");
const btnMenu = document.getElementById("btnMenu");
const iconeMenu = btnMenu?.querySelector("i");

let temporizadorIcone = null;

function atualizarIconeMenu(aberto) {
    if (!iconeMenu) return;

    clearTimeout(temporizadorIcone);

    // A troca acontece durante a rotação.
    temporizadorIcone = setTimeout(() => {
        iconeMenu.classList.toggle("fa-bars", !aberto);
        iconeMenu.classList.toggle("fa-xmark", aberto);
    }, 150);
}

function definirEstadoMenu(aberto) {
    if (!menuMobile || !btnMenu) return;

    menuMobile.classList.toggle("active", aberto);
    btnMenu.classList.toggle("ativo", aberto);

    btnMenu.setAttribute("aria-expanded", String(aberto));
    btnMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    atualizarIconeMenu(aberto);
}

function toggleMenu() {
    if (!menuMobile) return;

    const aberto = menuMobile.classList.contains("active");

    definirEstadoMenu(!aberto);
}

function fecharMenu() {
    definirEstadoMenu(false);
}

// Necessário para os onclick existentes no HTML.
window.toggleMenu = toggleMenu;
window.fecharMenu = fecharMenu;

if (btnMenu && menuMobile) {
    btnMenu.setAttribute("role", "button");
    btnMenu.setAttribute("tabindex", "0");
    btnMenu.setAttribute("aria-controls", "menuMobile");
    btnMenu.setAttribute("aria-expanded", "false");
    btnMenu.setAttribute("aria-label", "Abrir menu");

    // Permite abrir também pelo teclado.
    btnMenu.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            toggleMenu();
        }
    });

    // Fecha ao clicar fora do menu.
    document.addEventListener("click", (evento) => {
        if (!menuMobile.classList.contains("active")) return;

        if (
            !menuMobile.contains(evento.target) &&
            !btnMenu.contains(evento.target)
        ) {
            fecharMenu();
        }
    });

    // Fecha ao pressionar ESC.
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            fecharMenu();
        }
    });

    // Fecha ao voltar para o layout desktop.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1032) {
            fecharMenu();
        }
    });
}

/* =========================================
   2. HEADER E WHATSAPP FLUTUANTE
   ========================================= */

const header = document.querySelector("header");
const whatsappFloat = document.querySelector(".whatsapp-float");

let scrollAgendado = false;

function atualizarElementosScroll() {
    const posicao = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", posicao > 50);
    }

    if (whatsappFloat) {
        whatsappFloat.classList.toggle("show", posicao > 100);
    }

    scrollAgendado = false;
}

window.addEventListener("scroll", () => {
    if (!scrollAgendado) {
        scrollAgendado = true;
        requestAnimationFrame(atualizarElementosScroll);
    }
}, { passive: true });

atualizarElementosScroll();

/* =========================================
   3. ANIMAÇÕES DE ENTRADA
   SOBRE, DEPOIMENTOS E ELEMENTOS GERAIS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const suportaObserver =
        "IntersectionObserver" in window;

    const elementosAnimados = document.querySelectorAll(
        ".about-image-wrapper, .about-content, #feedbacks, #duvidas, .scroll-reveal"
    );

    if (movimentoReduzido || !suportaObserver) {

        elementosAnimados.forEach(elemento => {
            elemento.classList.add("reveal");
        });

    } else {

        const observerReveal = new IntersectionObserver(
            (entradas, observer) => {

                entradas.forEach(entrada => {

                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("reveal");

                        observer.unobserve(entrada.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        elementosAnimados.forEach(elemento => {
            observerReveal.observe(elemento);
        });
    }

    /* =========================================
       4. ANIMAÇÕES DAS ESPECIALIDADES
       Cabeçalho + cinco faixas
       ========================================= */

    const secaoEspecialidades =
        document.querySelector(".secao-faixas");

    const faixas =
        document.querySelectorAll(".faixa-bloco");

    if (movimentoReduzido || !suportaObserver) {

        if (secaoEspecialidades) {
            secaoEspecialidades.classList.add("ativo");
        }

        faixas.forEach(faixa => {
            faixa.classList.add("ativo");
        });

    } else {

        // Anima o cabeçalho da seção.
        if (secaoEspecialidades) {

            const observerCabecalho =
                new IntersectionObserver(
                    (entradas, observer) => {

                        entradas.forEach(entrada => {

                            if (entrada.isIntersecting) {
                                entrada.target.classList.add("ativo");

                                observer.unobserve(entrada.target);
                            }

                        });

                    },
                    {
                        threshold: 0.12,
                        rootMargin: "0px 0px -50px 0px"
                    }
                );

            observerCabecalho.observe(secaoEspecialidades);
        }

        // Anima cada faixa individualmente.
        const observerFaixas =
            new IntersectionObserver(
                (entradas, observer) => {

                    entradas.forEach(entrada => {

                        if (entrada.isIntersecting) {
                            entrada.target.classList.add("ativo");

                            observer.unobserve(entrada.target);
                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );

        faixas.forEach(faixa => {
            observerFaixas.observe(faixa);
        });
    }

    /* =========================================
       5. CARROSSEL DE DEPOIMENTOS
       Navegação, indicadores e autoplay
       ========================================= */

    const feedbacksGrid =
        document.getElementById("feedbacksGrid");

    const carouselDots =
        document.getElementById("carouselDots");

    if (feedbacksGrid && carouselDots) {

        const cards = Array.from(
            feedbacksGrid.querySelectorAll(".feedback-card")
        );

        if (cards.length === 0) return;

        let indiceAtual = 0;
        let intervaloAutoplay = null;
        let pausado = false;

        const intervaloTempo = 4000;

        function obterPosicaoCard(indice) {
            const card = cards[indice];

            return card.offsetLeft - cards[0].offsetLeft;
        }

        function atualizarIndicadores() {
            const dots = carouselDots.querySelectorAll(
                ".carousel-dot, .dot"
            );

            dots.forEach((dot, indice) => {
                const ativo = indice === indiceAtual;

                dot.classList.toggle("active", ativo);
                dot.setAttribute("aria-current", String(ativo));
            });
        }

        function navegarPara(indice) {
            indiceAtual =
                (indice + cards.length) % cards.length;

            feedbacksGrid.scrollTo({
                left: obterPosicaoCard(indiceAtual),
                behavior: movimentoReduzido ? "auto" : "smooth"
            });

            atualizarIndicadores();
        }

        function criarIndicadores() {
            carouselDots.innerHTML = "";

            cards.forEach((card, indice) => {
                const dot = document.createElement("button");

                dot.type = "button";
                dot.className = "dot carousel-dot";

                dot.setAttribute(
                    "aria-label",
                    `Ir para o depoimento ${indice + 1}`
                );

                dot.addEventListener("click", () => {
                    navegarPara(indice);
                    reiniciarAutoplay();
                });

                carouselDots.appendChild(dot);
            });

            atualizarIndicadores();
        }

        function proximoDepoimento() {
            navegarPara(indiceAtual + 1);
        }

        function pararAutoplay() {
            if (intervaloAutoplay !== null) {
                clearInterval(intervaloAutoplay);
                intervaloAutoplay = null;
            }
        }

        function iniciarAutoplay() {
            pararAutoplay();

            if (
                cards.length <= 1 ||
                movimentoReduzido ||
                pausado ||
                document.hidden
            ) {
                return;
            }

            intervaloAutoplay = setInterval(() => {
                proximoDepoimento();
            }, intervaloTempo);
        }

        function reiniciarAutoplay() {
            iniciarAutoplay();
        }

        feedbacksGrid.addEventListener("mouseenter", () => {
            pausado = true;
            pararAutoplay();
        });

        feedbacksGrid.addEventListener("mouseleave", () => {
            pausado = false;
            iniciarAutoplay();
        });

        feedbacksGrid.addEventListener("touchstart", () => {
            pausado = true;
            pararAutoplay();
        }, { passive: true });

        feedbacksGrid.addEventListener("touchend", () => {
            pausado = false;
            iniciarAutoplay();
        }, { passive: true });

        feedbacksGrid.addEventListener("focusin", () => {
            pausado = true;
            pararAutoplay();
        });

        feedbacksGrid.addEventListener("focusout", (evento) => {
            if (!feedbacksGrid.contains(evento.relatedTarget)) {
                pausado = false;
                iniciarAutoplay();
            }
        });

        // Atualiza o indicador ao arrastar manualmente.
        let scrollTimer;

        feedbacksGrid.addEventListener("scroll", () => {
            clearTimeout(scrollTimer);

            scrollTimer = setTimeout(() => {
                const posicaoAtual = feedbacksGrid.scrollLeft;

                let menorDistancia = Infinity;
                let novoIndice = indiceAtual;

                cards.forEach((card, indice) => {
                    const distancia = Math.abs(
                        obterPosicaoCard(indice) - posicaoAtual
                    );

                    if (distancia < menorDistancia) {
                        menorDistancia = distancia;
                        novoIndice = indice;
                    }
                });

                indiceAtual = novoIndice;
                atualizarIndicadores();

            }, 100);

        }, { passive: true });

        window.addEventListener("resize", () => {
            feedbacksGrid.scrollTo({
                left: obterPosicaoCard(indiceAtual),
                behavior: "auto"
            });
        });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                pararAutoplay();
            } else {
                iniciarAutoplay();
            }
        });

        criarIndicadores();
        iniciarAutoplay();
    }

});



/* =========================================
   PROGRESSO DE ROLAGEM DA PÁGINA
   ========================================= */

const scrollProgressBar = document.getElementById(
    "scrollProgressBar"
);

function atualizarProgressoRolagem() {
    if (!scrollProgressBar) return;

    const alturaRolavel =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progresso = alturaRolavel > 0
        ? (window.scrollY / alturaRolavel) * 100
        : 0;

    const porcentagem = Math.min(
        100,
        Math.max(0, progresso)
    );

    scrollProgressBar.style.width = `${porcentagem}%`;
}

window.addEventListener(
    "scroll",
    atualizarProgressoRolagem,
    { passive: true }
);

window.addEventListener(
    "resize",
    atualizarProgressoRolagem
);

atualizarProgressoRolagem();

// ==========================================
// SETAS DO CARROSSEL DE DEPOIMENTOS
// ==========================================

const feedbackGrid = document.querySelector(".feedbacks-grid");

const btnAnterior = document.getElementById("feedbackAnterior");
const btnProximo = document.getElementById("feedbackProximo");

if (feedbackGrid && btnAnterior && btnProximo) {

    function moverFeedback(direcao) {

        const primeiroCard = feedbackGrid.firstElementChild;

        if (!primeiroCard) return;

        const larguraCard = primeiroCard.getBoundingClientRect().width;

        const estilos = window.getComputedStyle(feedbackGrid);
        const espaco = parseFloat(estilos.columnGap) || 0;

        feedbackGrid.scrollBy({
            left: direcao * (larguraCard + espaco),
            behavior: "smooth"
        });
    }

    btnAnterior.addEventListener("click", () => {
        moverFeedback(-1);
    });

    btnProximo.addEventListener("click", () => {
        moverFeedback(1);
    });

    function atualizarSetas() {
        const maxScroll =
            feedbackGrid.scrollWidth - feedbackGrid.clientWidth;

        btnAnterior.disabled = feedbackGrid.scrollLeft <= 2;

        btnProximo.disabled =
            feedbackGrid.scrollLeft >= maxScroll - 2;
    }

    feedbackGrid.addEventListener("scroll", atualizarSetas, {
        passive: true
    });

    window.addEventListener("resize", atualizarSetas);

    atualizarSetas();
}