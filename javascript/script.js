// Função para abrir e fechar o menu mobile
function toggleMenu() {
    const nav = document.getElementById('menuMobile');
    const btn = document.getElementById('btnMenu');
    const icon = btn.querySelector('i');
    
    // Alterna a classe 'active' no menu e 'ativo' no botão
    nav.classList.toggle('active');
    btn.classList.toggle('ativo');
    
    // Alterna o ícone entre barras (fa-bars) e o "X" (fa-xmark) no momento certo da rotação
    if (nav.classList.contains('active')) {
        setTimeout(() => {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }, 150); // Troca o desenho no meio da animação para ficar natural
    } else {
        setTimeout(() => {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }, 150);
    }
}

// Função para fechar o menu automaticamente quando clicar em algum link
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
    const heroSection = document.querySelector('.hero-section');
    
    if (!whatsappBtn || !heroSection) return;

    // Pega a altura total da seção Hero
    const heroHeight = heroSection.offsetHeight;
    
    // Se a rolagem da página passou da altura da Hero (entrou na 2ª seção)
    if (window.scrollY > heroHeight - 100) {
        whatsappBtn.classList.add('show');
    } else {
        whatsappBtn.classList.remove('show');
    }
});