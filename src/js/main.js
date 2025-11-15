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

// exemplo de projetos — adicione seus repositórios e descrições aqui
const projects = [
    {
        title: "Planilha Financeira - 2025",
        description: "Cansou de perder o controle das suas finanças? Esta planilha financeira para 2025 é a solução perfeita para você! Com ela, você poderá organizar suas receitas e despesas de forma simples e eficiente.",
        image: "assets/excel_1.png",
        repo: "https://github.com/viniciosreiss/Portfolio-Data-Analystics",
        demo: ""
    },
    // adicione mais objetos para outros projetos
];

function renderProjects(list){
    const container = document.getElementById('projects');
    if(!container) return;
    container.innerHTML = list.map(p => `
        <article class="carousel-item project-item">
            <div class="card">
                <div class="thumb" style="background-image: url('${p.image || ''}');"></div>
                <div class="meta">
                    <h3>${escapeHtml(p.title)}</h3>
                    <p>${escapeHtml(p.description)}</p>
                    <div class="links">
                        ${p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">Acessa Agora!</a>` : ''}
                        ${p.demo ? `<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Demo</a>` : ''}
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}

function escapeHtml(s=''){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }

document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
});