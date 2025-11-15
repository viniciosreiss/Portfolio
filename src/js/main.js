// This file contains the main JavaScript code to initialize the carousel and handle user interactions.

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const nextButton = carousel.querySelector('.carousel-next');
    const prevButton = carousel.querySelector('.carousel-prev');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    showSlide(currentSlide);
});

/*
  main.js — renderiza lista de projetos como cards (sem referências ao carrossel)
*/

const FALLBACK_IMAGE = 'https://via.placeholder.com/820x450?text=Sem+imagem';

// exemplo de projetos — edite/adicione conforme desejar
const projects = [
    {
        title: "Planilha Financeira - 2025",
        description: "Organize suas receitas e despesas com esta planilha prática.",
        image: "assets/excel_1.png",
        repo: "https://github.com/viniciosreiss/Portfolio-Data-Analystics",
        demo: ""
    },
    // adicione outros objetos aqui
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

document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
});