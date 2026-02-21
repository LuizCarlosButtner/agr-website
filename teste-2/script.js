// Aguarda o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todos os links do menu
    const links = document.querySelectorAll('.nav-link');

    // Adiciona o evento de clique em cada link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o pulo instantâneo padrão do HTML
            
            // Descobre qual seção foi clicada (ex: #about)
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Faz a rolagem suave até a seção
            window.scrollTo({
                top: targetSection.offsetTop - 60, // -60 compensa a altura do menu fixo
                behavior: 'smooth'
            });

            // Remove a classe 'active' de todos os links e adiciona no clicado
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});