// This file contains the logic for the carousel functionality, including transitioning between slides and displaying the repository links.

/* Removido código antigo que usava .carousel-container / .carousel-slide / .carousel-next / .carousel-prev
   Mantido apenas o módulo que expõe window.renderCarousel (IIFE abaixo) */
(function(){
    const inner = document.getElementById('carousel-inner');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carousel = document.getElementById('carousel');

    let itemsCount = 0;
    let index = 0;
    let autoplayTimer = null;
    const AUTOPLAY_MS = 5000;
    const FALLBACK_IMAGE = 'https://via.placeholder.com/820x450?text=Sem+imagem';

    function render(items){
        inner.innerHTML = '';
        itemsCount = items.length || 0;
        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'carousel-item';
            el.innerHTML = `
                <div class="card">
                    <div class="thumb" aria-hidden="true"></div>
                    <div class="meta">
                        <h3>${escapeHtml(item.title)}</h3>
                        <p>${escapeHtml(item.description)}</p>
                        <div class="links">
                            ${item.repo ? `<a class="btn" href="${item.repo}" target="_blank" rel="noopener">Acesse Agora!</a>` : ''}
                            ${item.demo ? `<a class="btn" href="${item.demo}" target="_blank" rel="noopener">Demo</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
            const thumb = el.querySelector('.thumb');
            const url = item.image ? String(item.image).trim() : '';
            try {
                thumb.style.backgroundImage = `url("${url || FALLBACK_IMAGE}")`;
            } catch (e) {
                thumb.style.backgroundImage = `url("${FALLBACK_IMAGE}")`;
            }
            inner.appendChild(el);
        });
        update();
        resetAutoplay();
    }

    function update(){
        if(itemsCount === 0) return;
        if(index < 0) index = itemsCount - 1;
        if(index >= itemsCount) index = 0;
        inner.style.transform = `translateX(-${index * 100}%)`;
    }

    function prev(){
        index = (index - 1 + itemsCount) % itemsCount;
        update();
        resetAutoplay();
    }
    function next(){
        index = (index + 1) % itemsCount;
        update();
        resetAutoplay();
    }

    function resetAutoplay(){
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(()=> next(), AUTOPLAY_MS);
    }

    function escapeHtml(str = ''){
        return String(str)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#039;');
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    document.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowLeft') prev();
        if(e.key === 'ArrowRight') next();
    });
    carousel.addEventListener('mouseenter', ()=> clearInterval(autoplayTimer));
    carousel.addEventListener('mouseleave', resetAutoplay);

    window.renderCarousel = render;
})();