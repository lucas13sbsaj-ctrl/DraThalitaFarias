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