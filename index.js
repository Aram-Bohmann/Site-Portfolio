const projFiltros = document.querySelectorAll('.proj-filtro-btn');
const projCards   = document.querySelectorAll('.proj-card');

projFiltros.forEach(btn => {
    btn.addEventListener('click', () => {
        projFiltros.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filtro = btn.dataset.filtro;

        projCards.forEach(card => {
            const cats = card.dataset.categoria || '';
            const match = filtro === 'todos' || cats.split(' ').includes(filtro);
            
            if (match) {
                card.classList.remove('oculto');
                card.style.animation = 'none';
                card.offsetHeight; // reflow
                card.style.animation = 'projFadeIn 0.3s ease forwards';
            } else {
                card.classList.add('oculto');
            }
            
        });
        if (projGrid.classList.contains('colapsado')) {
                    projGrid.classList.remove('colapsado');
                    projFade.classList.add('oculto');
                    btnProjMais.classList.add('expandido');
                    btnProjMais.childNodes[0].textContent = 'Ver menos projetos ';
        }
    });
});

// Keyframes de entrada
const projStyle = document.createElement('style');
projStyle.textContent = `
@keyframes projFadeIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(projStyle);


const filtros = document.querySelectorAll('.cert-filtro-btn');
const cards   = document.querySelectorAll('.cert-card');

filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        // Atualiza botão ativo
        filtros.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filtro = btn.dataset.filtro;

        cards.forEach(card => {
            const match = filtro === 'todos' || card.dataset.categoria === filtro;
            if (match) {
                card.classList.remove('oculto');
                
                // Pequena animação de entrada
                card.style.animation = 'none';
                card.offsetHeight; // reflow
                card.style.animation = 'certFadeIn 0.3s ease forwards';
            } else {
                card.classList.add('oculto');
            }
        });
        if (projGrid.classList.contains('colapsado')) {
                    projGrid.classList.remove('colapsado');
                    projFade.classList.add('oculto');
                    btnProjMais.classList.add('expandido');
                    btnProjMais.childNodes[0].textContent = 'Ver menos projetos ';
        }
    });
});

// Animação de entrada dos cards
const styleTag = document.createElement('style');
styleTag.textContent = `
@keyframes certFadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleTag);

let trilho = document.getElementById('btn-tema')
let body = document.getElementById('body')

trilho.addEventListener('click', ()=>{
  body.classList.toggle('dark')
})

function trocarImagem() {
    const minhaImagem = document.getElementById('minhaImagem');
    const linkedin = document.getElementById('linkedin');
    const github = document.getElementById('github');
    const email = document.getElementById('email');

    if (minhaImagem.src.includes('Imagens/tema-claro.png')) {
        // Troca para tema escuro
        minhaImagem.src = 'Imagens/tema-escuro.png';
        linkedin.src = 'Imagens/icon-linkedIn-escuro.png';
        github.src = 'Imagens/icon-github-escuro.png';
        email.src = 'Imagens/icon-email-escuro.png';
        abrir.src = 'Imagens/icon-abrir-escuro.png';
    } else {
        // Volta para tema claro
        minhaImagem.src = 'Imagens/tema-claro.png';
        linkedin.src = 'Imagens/icon-linkedim.png';
        github.src = 'Imagens/icon-github-cinza.png';
        email.src = 'Imagens/icon-email.png';
    }
}

const elementosParaAnimar = document.querySelectorAll('.elemento-escondido');

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('mostrar');
  }
});
}, {
threshold: 0.2
});
elementosParaAnimar.forEach(elemento => {
  observer.observe(elemento);
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('menu-toggle').checked = false;
  });
});

// ── VER MAIS: Projetos ──────────────────────────────────────────────
const projGrid    = document.getElementById('proj-grid');
const projFade    = document.getElementById('proj-fade');
const btnProjMais = document.getElementById('btn-ver-mais-proj');

// Estado inicial: colapsado
projGrid.classList.add('colapsado');

btnProjMais.addEventListener('click', () => {
    const expandido = projGrid.classList.toggle('colapsado');
    // toggle retorna true se a classe FOI adicionada (colapsou), false se foi removida (expandiu)
    const estaColapsado = projGrid.classList.contains('colapsado');

    projFade.classList.toggle('oculto', !estaColapsado);
    btnProjMais.classList.toggle('expandido', !estaColapsado);
    btnProjMais.querySelector('span') 
        ? null 
        : null; // não há span, vamos trocar o texto diretamente
    btnProjMais.childNodes[0].textContent = estaColapsado
        ? 'Ver mais projetos '
        : 'Ver menos projetos ';
});

// Inicializa fade visível
projFade.classList.remove('oculto');


// ── VER MAIS: Certificados ──────────────────────────────────────────
const certGrid    = document.getElementById('cert-grid');
const certFade    = document.getElementById('cert-fade');
const btnCertMais = document.getElementById('btn-ver-mais-cert');

// Estado inicial: colapsado
certGrid.classList.add('colapsado');

btnCertMais.addEventListener('click', () => {
    const estaColapsado = certGrid.classList.toggle('colapsado');
    // após toggle: estaColapsado = true significa que ACABOU de colapsar

    certFade.classList.toggle('oculto', !certGrid.classList.contains('colapsado'));
    btnCertMais.classList.toggle('expandido', !certGrid.classList.contains('colapsado'));
    btnCertMais.childNodes[0].textContent = certGrid.classList.contains('colapsado')
        ? 'Ver mais certificados '
        : 'Ver menos certificados ';
});

// Inicializa fade visível
certFade.classList.remove('oculto');