// Header hide/show on scroll
const mainHeader = document.querySelector('.main-header');
let lastScrollTop = 0;
let scrollThreshold = 100;

// Verificação de segurança para elementos DOM
if (!mainHeader) {
    console.warn('Header não encontrado - funcionalidade de scroll desabilitada');
}

if (mainHeader) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide header
                mainHeader.classList.add('hidden');
            } else {
                // Scrolling up - show header
                mainHeader.classList.remove('hidden');
            }
        } else {
            // At top - always show
            mainHeader.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Active section in header
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header-nav a');

function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 200;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const header = document.querySelector('.main-header');
            const headerHeight = header ? header.offsetHeight : 100;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// CTA Header button
const ctaHeader = document.querySelector('.header-cta');
if (ctaHeader) {
    ctaHeader.addEventListener('click', (e) => {
        e.preventDefault();
        const contatoSection = document.querySelector('#contato');
        if (contatoSection) {
            contatoSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn('Seção de contato não encontrada');
        }
    });
}



// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos que precisam de animação
const animatedElements = document.querySelectorAll('.feature-item');
animatedElements.forEach(el => {
    observer.observe(el);
});

// Cursor customizado removido


// Performance: Lazy loading para imagens
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));


// Tratamento global de erros
window.addEventListener('error', (event) => {
    console.warn('Erro capturado:', event.error);
    // Não quebrar o site por erros de terceiros
    return true;
});

window.addEventListener('unhandledrejection', (event) => {
    console.warn('Promise rejeitada:', event.reason);
    event.preventDefault();
});

// Log de inicialização
console.log('Discover Portugal Tours - Website carregado com sucesso!');
console.log('Preparado para aventuras incríveis em Portugal!');

// Destinations Slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.destinations-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.destination-card');
    
    if (!slider || !prevBtn || !nextBtn || cards.length === 0) return;
    
    let currentIndex = 0;
    let cardsPerView = 3;
    
    // Função para calcular quantos cards mostrar baseado na largura da tela
    function updateCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) {
            cardsPerView = 1;
        } else if (width <= 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        updateSlider();
    }
    
    // Função para atualizar a posição do slider
    function updateSlider() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem = 32px
        const offset = -(currentIndex * (cardWidth + gap));
        slider.style.transform = `translateX(${offset}px)`;
        
        // Atualizar estado dos botões
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - cardsPerView;
    }
    
    // Event listeners para os botões
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - cardsPerView) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Atualizar ao redimensionar a janela
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCardsPerView();
        }, 250);
    });
    
    // Inicializar
    updateCardsPerView();
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Fechar menu ao clicar em um link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});


