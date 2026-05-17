/* ============================================================
   ARAM LUZ — PORTFOLIO JS
   ============================================================ */

/* ── THEME TOGGLE ───────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const body = document.getElementById('body');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    themeToggle.querySelector('.theme-icon').textContent =
        body.classList.contains('light') ? '●' : '◐';
});

/* ── HAMBURGER MENU ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
    });
});

/* ── HEADER SCROLL EFFECT ───────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 40
        ? 'var(--border-accent)'
        : 'var(--border)';
});

/* ── TYPED TEXT ─────────────────────────────────────────── */
const roles = [
    'Data Scientist',
    'Data Engineer',
    'Data Analyst',
    'ML Engineer',
    'RPA Developer'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
    const role = roles[roleIdx];
    if (!deleting) {
        typedEl.textContent = role.slice(0, ++charIdx);
        if (charIdx === role.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
    } else {
        typedEl.textContent = role.slice(0, --charIdx);
        if (charIdx === 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }
    setTimeout(type, deleting ? 50 : 80);
}
type();

/* ── ANIMATED GRID CANVAS ───────────────────────────────── */
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
let dots = [], W, H;

function initCanvas() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    dots = [];
    const spacing = 48;
    for (let x = 0; x < W; x += spacing) {
        for (let y = 0; y < H; y += spacing) {
            dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
    }
}

let mouseX = -9999, mouseY = -9999;
window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

const accent = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent').trim() || '#F8C837';

function drawCanvas() {
    ctx.clearRect(0, 0, W, H);
    const isLight = document.body.classList.contains('light');
    const dotColor = isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)';
    const nearColor = isLight ? 'rgba(180,130,0,0.7)' : 'rgba(248,200,55,0.7)';

    dots.forEach(d => {
        const dx = mouseX - d.x, dy = mouseY - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 90;
        if (dist < radius) {
            const force = (radius - dist) / radius;
            d.vx -= dx * force * 0.012;
            d.vy -= dy * force * 0.012;
        }
        d.vx += (d.ox - d.x) * 0.06;
        d.vy += (d.oy - d.y) * 0.06;
        d.vx *= 0.78;
        d.vy *= 0.78;
        d.x += d.vx;
        d.y += d.vy;

        const near = dist < radius;
        const size = near ? 2 : 1.2;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = near ? nearColor : dotColor;
        ctx.fill();
    });
    requestAnimationFrame(drawCanvas);
}

initCanvas();
window.addEventListener('resize', initCanvas);
drawCanvas();

/* ── REVEAL ON SCROLL ───────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

/* ── PROJETOS: FILTROS ──────────────────────────────────── */
const projFiltros = document.querySelectorAll('[data-f]');
const projCards = document.querySelectorAll('.proj-card');

projFiltros.forEach(btn => {
    btn.addEventListener('click', () => {
        projFiltros.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filtro = btn.dataset.f;

        projCards.forEach(card => {
            const cats = (card.dataset.cat || '').split(' ');
            const match = filtro === 'todos' || cats.includes(filtro);
            card.classList.toggle('hidden', !match);
            if (match) {
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = 'fadeIn 0.3s ease forwards';
            }
        });

        // Re-expand if collapsed
        if (projGrid.classList.contains('collapsed')) {
            projGrid.classList.remove('collapsed');
            projFade.classList.add('hidden-fade');
            btnProjMais.classList.add('expanded');
            btnProjMais.querySelector('span').textContent = 'Ver menos projetos';
        }
    });
});

/* ── PROJETOS: VER MAIS ─────────────────────────────────── */
const projGrid = document.getElementById('projGrid');
const projFade = document.getElementById('projFade');
const btnProjMais = document.getElementById('btnProjMais');

projGrid.classList.add('collapsed');

btnProjMais.addEventListener('click', () => {
    const isCollapsed = projGrid.classList.toggle('collapsed');
    projFade.classList.toggle('hidden-fade', !isCollapsed);
    btnProjMais.classList.toggle('expanded', !isCollapsed);
    btnProjMais.querySelector('span').textContent = isCollapsed
        ? 'Ver mais projetos'
        : 'Ver menos projetos';
});

/* ── CERTIFICADOS: FILTROS ──────────────────────────────── */
const certFiltros = document.querySelectorAll('[data-fc]');
const certCards = document.querySelectorAll('.cert-card');

certFiltros.forEach(btn => {
    btn.addEventListener('click', () => {
        certFiltros.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filtro = btn.dataset.fc;

        certCards.forEach(card => {
            const match = filtro === 'todos' || card.dataset.cc === filtro;
            card.classList.toggle('hidden', !match);
            if (match) {
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = 'fadeIn 0.3s ease forwards';
            }
        });

        if (certGrid.classList.contains('collapsed')) {
            certGrid.classList.remove('collapsed');
            certFade.classList.add('hidden-fade');
            btnCertMais.classList.add('expanded');
            btnCertMais.querySelector('span').textContent = 'Ver menos certificados';
        }
    });
});

/* ── CERTIFICADOS: VER MAIS ─────────────────────────────── */
const certGrid = document.getElementById('certGrid');
const certFade = document.getElementById('certFade');
const btnCertMais = document.getElementById('btnCertMais');

certGrid.classList.add('collapsed');

btnCertMais.addEventListener('click', () => {
    const isCollapsed = certGrid.classList.toggle('collapsed');
    certFade.classList.toggle('hidden-fade', !isCollapsed);
    btnCertMais.classList.toggle('expanded', !isCollapsed);
    btnCertMais.querySelector('span').textContent = isCollapsed
        ? 'Ver mais certificados'
        : 'Ver menos certificados';
});

/* ── GLOBAL ANIMATION KEYFRAME ──────────────────────────── */
const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleEl);