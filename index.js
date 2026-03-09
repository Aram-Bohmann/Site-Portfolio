new Swiper('.card-wrapper', {
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
        slidesPerView: 1
    },
    768: {
        slidesPerView: 2
    },
    1024: {
        slidesPerView: 3
    },
  }
});

new Swiper(".mySwiper", {
  slidesPerView: 4,
  grid: {
    rows: 2,
  },
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true
  },
  
  breakpoints: {
    0: {
        slidesPerView: 1
    },
    768: { 
        slidesPerView: 3
    },
    1024: {
        slidesPerView: 4
    },
  }
});

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