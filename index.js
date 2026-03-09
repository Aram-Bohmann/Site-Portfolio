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