// main.js — renderiza lista de projetos como cards (sem referências ao carrossel)

const FALLBACK_IMAGE = 'https://via.placeholder.com/820x450?text=Sem+imagem';

// exemplo de projetos — edite/adicione conforme desejar
const projects = [
    {
        title: "Planilha Financeira - 2025",
        description: "Cansou de perder o controle das suas finanças? Experimente nossa Planilha Financeira 2025! Com ela, você pode monitorar suas receitas, despesas e economias de forma simples e eficiente. Organize seu orçamento mensal, acompanhe seus gastos diários e visualize gráficos que ajudam a entender melhor sua saúde financeira. Ideal para quem busca praticidade e controle total sobre suas finanças pessoais. Baixe agora e comece a transformar sua vida financeira!",
        image: "src/assets/excel_1.png",
        repo: "https://github.com/viniciosreiss/Portfolio-Data-Analystics",
        demo: ""
    },
    // adicione outros objetos aqui
];

// bloco "programas" (ícones de software como Excel, Power BI)
const programs = [
    { name: 'Excel', logo: 'src/assets/programs/excel.png' },
    { name: 'Power BI', logo: 'src/assets/programs/power_bi.png' },
    { name: 'Power Auto', logo: 'src/assets/programs/power_auto.png' },// opcional
    { name: 'Power Apps', logo: 'src/assets/programs/power_apps.png' }// opcional
];

// exemplo de tecnologias (substitua logos em src/assets ou URLs externas)
const techStack = [
    // usando arquivo local colocado em src/assets/logo-python.png
    { name: 'Python', logo: 'https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/community/logos/python-logo-only.png' },
    { name: 'SQL', logo: 'src/assets/stack/sql.png' },
    { name: 'VBA', logo: 'src/assets/stack/vba.png' },

    // { name: 'Excel', logo: 'assets/logo-excel.png' },
    // { name: 'Power BI', logo: 'assets/logo-powerbi.png' },
    // { name: 'Git', logo: 'assets/logo-git.png' }
];

function escapeHtml(s = '') {
    return String(s)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;');
}

function renderProjects(list) {
    const container = document.getElementById('projects');
    if (!container) return;
    container.innerHTML = ''; // limpa

    list.forEach(p => {
        const article = document.createElement('article');
        article.className = 'project-item';

        const card = document.createElement('div');
        card.className = 'card';

        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        const url = p.image ? String(p.image).trim() : '';
        try {
            thumb.style.backgroundImage = `url("${url || FALLBACK_IMAGE}")`;
        } catch {
            thumb.style.backgroundImage = `url("${FALLBACK_IMAGE}")`;
        }

        const meta = document.createElement('div');
        meta.className = 'meta';

        const h3 = document.createElement('h3');
        h3.textContent = p.title || '';

        const pdesc = document.createElement('p');
        pdesc.textContent = p.description || '';

        const links = document.createElement('div');
        links.className = 'links';

        if (p.repo) {
            const aRepo = document.createElement('a');
            aRepo.className = 'btn';
            aRepo.href = p.repo;
            aRepo.target = '_blank';
            aRepo.rel = 'noopener';
            aRepo.textContent = 'acesse agora!';
            links.appendChild(aRepo);
        }
        if (p.demo) {
            const aDemo = document.createElement('a');
            aDemo.className = 'btn';
            aDemo.href = p.demo;
            aDemo.target = '_blank';
            aDemo.rel = 'noopener';
            aDemo.textContent = 'Demo';
            links.appendChild(aDemo);
        }

        meta.appendChild(h3);
        meta.appendChild(pdesc);
        meta.appendChild(links);

        card.appendChild(thumb);
        card.appendChild(meta);
        article.appendChild(card);
        container.appendChild(article);
    });
}

/**
 * transforma um track em loop infinito suave e contínuo:
 * - aguarda imagens carregarem
 * - mede a largura ORIGINAL do track
 * - duplica os nodes (1,2,3 -> 1,2,3)
 * - define --scroll-distance (px negativo) e --scroll-duration (s) para a animação CSS
 */
async function makeTrackInfinite(track = 0.5, speedPxPerSec = 0.5) {
    if (!track) return;
    // if (track.dataset.infinite === '1') return;
    if (track.dataset.infinite === '1') return;
    track.dataset.infinite = '1';

    const waitForImages = (root) => {
        const imgs = Array.from(root.querySelectorAll('img'));
        return Promise.all(imgs.map(img => new Promise(resolve => {
            if (img.complete) return resolve();
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
        })));
    };

    await waitForImages(track);

    // // já embrulhado? evita re-processar
    // if (track.querySelector('.stack-loop')) {
    //     track.dataset.infinite = '1';
    //     return;
    // }

    //Se já existe o loop, apenas calcule a nova duração (velocidade)
if (track.querySelector('.stack-loop')) {

    const loop = track.querySelector('.stack-loop');
    const loopWidth = Math.ceil(loop.getBoundingClientRect().width);

    const durationSec = Math.max(6, Math.ceil(loopWidth / speedPxPerSec));

    track.style.setProperty('--scroll-duration', `${durationSec}s`);

    return; // sem recriar nada
}


    // pegar os itens atuais
    const items = Array.from(track.children);
    if (items.length === 0) return;

    // criar wrapper "loop" e mover os itens para dentro dele
    const loop = document.createElement('div');
    loop.className = 'stack-loop';
    // move each original child into the loop
    items.forEach(it => loop.appendChild(it));

    // limpar a track e inserir o loop + clone(loop)
    track.innerHTML = '';
    track.appendChild(loop);
    const clone = loop.cloneNode(true);
    track.appendChild(clone);

    // garantir layout atualizado
    await new Promise(r => requestAnimationFrame(r));

    // largura do loop (apenas a primeira sequência 1,2,3)
    const loopWidth = Math.ceil(loop.getBoundingClientRect().width);
    if (!loopWidth) return;

    // distância em px (movimenta exatamente a largura do conjunto original)
    track.style.setProperty('--scroll-distance', `-${loopWidth}px`);

    // duração em segundos baseada na largura e velocidade px/s
    const durationSec = Math.max(6, Math.ceil(loopWidth / speedPxPerSec));
    track.style.setProperty('--scroll-duration', `${durationSec}s`);

    // marcar como processado
    track.dataset.infinite = '1';
}

function renderStack(list){
    const track = document.getElementById('stack-track');
    if(!track) return;
    track.innerHTML = '';
    list.forEach(t => {
        const item = document.createElement('div');
        item.className = 'stack-item';
        const img = document.createElement('img');
        img.className = 'stack-logo';
        img.alt = t.name || 'tech';
        img.src = (t.logo && t.logo.trim()) ? t.logo.trim() : FALLBACK_IMAGE;
        img.onerror = () => img.src = FALLBACK_IMAGE;
        item.appendChild(img);
        track.appendChild(item);
    });

    // tornar infinito: velocidade padrão 60px/s
    requestAnimationFrame(() => makeTrackInfinite(track, 60));
}

function renderPrograms(list){
    const track = document.getElementById('programs-track');
    if(!track) return;
    track.innerHTML = '';
    list.forEach(t => {
        const item = document.createElement('div');
        item.className = 'stack-item';
        const img = document.createElement('img');
        img.className = 'stack-logo';
        img.alt = t.name || 'program';
        img.src = (t.logo && t.logo.trim()) ? t.logo.trim() : FALLBACK_IMAGE;
        img.onerror = () => img.src = FALLBACK_IMAGE;
        item.appendChild(img);
        track.appendChild(item);
    });

    requestAnimationFrame(() => makeTrackInfinite(track, 60));
}

function initStackCarousel(options = {}){
    const viewport = document.getElementById('stack-viewport');
    const track = document.getElementById('stack-track');
    const prev = document.getElementById('stack-prev');
    const next = document.getElementById('stack-next');
    if(!viewport || !track) return;

    const AUTOPLAY_MS = options.autoplayMs || 3500;
    let autoplayTimer = null;

    function scrollNext(){
        // scroll by one item width (approx)
        const item = track.querySelector('.stack-item');
        if(!item) return;
        const step = item.getBoundingClientRect().width + parseInt(getComputedStyle(track).gap || 12);
        // if near end, go to start
        if(Math.round(viewport.scrollLeft + viewport.clientWidth) >= track.scrollWidth - 4){
            viewport.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            viewport.scrollBy({ left: step, behavior: 'smooth' });
        }
    }
    function scrollPrev(){
        const item = track.querySelector('.stack-item');
        if(!item) return;
        const step = item.getBoundingClientRect().width + parseInt(getComputedStyle(track).gap || 12);
        if(viewport.scrollLeft <= 2){
            viewport.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
            viewport.scrollBy({ left: -step, behavior: 'smooth' });
        }
    }

    if(next) next.addEventListener('click', scrollNext);
    if(prev) prev.addEventListener('click', scrollPrev);

    viewport.addEventListener('mouseenter', ()=> clearInterval(autoplayTimer));
    viewport.addEventListener('mouseleave', ()=> {
        if(AUTOPLAY_MS) autoplayTimer = setInterval(scrollNext, AUTOPLAY_MS);
    });

    // start autoplay
    if(AUTOPLAY_MS) autoplayTimer = setInterval(scrollNext, AUTOPLAY_MS);
}

function initProgramsCarousel(options = {}){
    const viewport = document.getElementById('programs-viewport');
    const track = document.getElementById('programs-track');
    const prev = document.getElementById('programs-prev');
    const next = document.getElementById('programs-next');
    if(!viewport || !track) return;

    const AUTOPLAY_MS = options.autoplayMs || 3500;
    let autoplayTimer = null;

    function scrollNext(){
        const item = track.querySelector('.stack-item');
        if(!item) return;
        const gap = parseInt(getComputedStyle(track).gap || 12);
        const step = item.getBoundingClientRect().width + gap;
        if(Math.round(viewport.scrollLeft + viewport.clientWidth) >= track.scrollWidth - 4){
            viewport.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            viewport.scrollBy({ left: step, behavior: 'smooth' });
        }
    }
    function scrollPrev(){
        const item = track.querySelector('.stack-item');
        if(!item) return;
        const gap = parseInt(getComputedStyle(track).gap || 12);
        const step = item.getBoundingClientRect().width + gap;
        if(viewport.scrollLeft <= 2){
            viewport.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
            viewport.scrollBy({ left: -step, behavior: 'smooth' });
        }
    }

    if(next) next.addEventListener('click', scrollNext);
    if(prev) prev.addEventListener('click', scrollPrev);

    viewport.addEventListener('mouseenter', ()=> clearInterval(autoplayTimer));
    viewport.addEventListener('mouseleave', ()=> {
        if(AUTOPLAY_MS) autoplayTimer = setInterval(scrollNext, AUTOPLAY_MS);
    });

    if(AUTOPLAY_MS) autoplayTimer = setInterval(scrollNext, AUTOPLAY_MS);
}

/* novo: atualiza variável CSS --footer-height com a altura real do footer */
function updateFooterHeight(){
    const footer = document.querySelector('.site-footer');
    if(!footer) return;
    const h = Math.ceil(footer.getBoundingClientRect().height);
    // define a variável no :root para que body::after use
    document.documentElement.style.setProperty('--footer-height', `${h}px`);
}

// rodas iniciais e em resize (debounced)
window.addEventListener('load', updateFooterHeight);
let __fhTimer;
window.addEventListener('resize', () => {
    clearTimeout(__fhTimer);
    __fhTimer = setTimeout(updateFooterHeight, 150);
});

// observa mudanças no footer (se conteúdo dinâmico)
const footerEl = document.querySelector('.site-footer');
if(footerEl && window.MutationObserver){
    const mo = new MutationObserver(updateFooterHeight);
    mo.observe(footerEl, { childList: true, subtree: true, characterData: true });
}

// chama após DOM pronto (e após render de imagens)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateFooterHeight, 80);
});

// DOMContentLoaded: render projects, programs e stack
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    renderPrograms(programs);             // adiciona programas acima de tecnologias
    renderStack(techStack);
    initProgramsCarousel({ autoplayMs: 3500 });
    initStackCarousel({ autoplayMs: 3500 });
});