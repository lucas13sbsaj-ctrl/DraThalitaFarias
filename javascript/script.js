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

// Lógica de exibição do botão flutuante do WhatsApp
window.addEventListener('scroll', function() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const heroSection = document.querySelector('.hero-section');
    
    if (!whatsappBtn || !heroSection) return;

    const heroHeight = heroSection.offsetHeight;
    
    if (window.scrollY > heroHeight - 150) {
        whatsappBtn.classList.add('show');
    } else {
        whatsappBtn.classList.remove('show');
    }
});