// Простой загрузочный экран
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.startLoading();
    }
    
    startLoading() {
        // Простая задержка для демонстрации
        setTimeout(() => {
            this.hideLoading();
        }, 1500);
    }
    
    hideLoading() {
        this.loadingScreen.classList.add('hidden');
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 300);
    }
}

// Система тем
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
        
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggle());
    }
    
    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
    }
    
    updateThemeIcon() {
        const icon = document.getElementById('theme-icon');
        icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Система языков
class LanguageManager {
    constructor() {
        this.language = localStorage.getItem('language') || 'ru';
        this.translations = {
            ru: {
                // Навигация
                'Home': 'Главная',
                'About': 'Обо мне',
                'Skills': 'Навыки',
                'Portfolio': 'Портфолио',
                'Contact': 'Контакты',
                
                // Героическая секция
                'Hi, I\'m <span class=\'highlight\'>yomo4</span>': 'Привет, я <span class=\'highlight\'>yomo4</span>',
                'Programmer experienced in C/C++, C# and Python. I create functional solutions and improve user experience through quality code.': 'Программист с опытом в C/C++, C# и Python. Создаю функциональные решения и улучшаю пользовательский опыт через качественный код.',
                'Projects': 'Проекта',
                'Years experience': 'Года опыта',
                'Technologies': 'Технологий',
                'My Works': 'Мои работы',
                'Contact': 'Связаться',
                
                // Секции
                'About Me': 'Обо мне',
                'Learn more about my development journey': 'Узнайте больше о моем пути в разработке',
                'My Skills': 'Мои навыки',
                'Technologies I work with': 'Технологии, с которыми я работаю',
                'Some of my recent projects': 'Некоторые из моих последних проектов',
                'Get In Touch': 'Свяжитесь со мной',
                'Ready to discuss your next project': 'Готов обсудить ваш следующий проект'
            },
            en: {
                // Навигация
                'Главная': 'Home',
                'Обо мне': 'About',
                'Навыки': 'Skills',
                'Портфолио': 'Portfolio',
                'Контакты': 'Contact',
                
                // Героическая секция
                'Привет, я <span class=\'highlight\'>yomo4</span>': 'Hi, I\'m <span class=\'highlight\'>yomo4</span>',
                'Программист с опытом в C/C++, C# и Python. Создаю функциональные решения и улучшаю пользовательский опыт через качественный код.': 'Programmer experienced in C/C++, C# and Python. I create functional solutions and improve user experience through quality code.',
                'Проекта': 'Projects',
                'Года опыта': 'Years experience',
                'Технологий': 'Technologies',
                'Мои работы': 'My Works',
                'Связаться': 'Contact',
                
                // Секции
                'Обо мне': 'About Me',
                'Узнайте больше о моем пути в разработке': 'Learn more about my development journey',
                'Мои навыки': 'My Skills',
                'Технологии, с которыми я работаю': 'Technologies I work with',
                'Некоторые из моих последних проектов': 'Some of my recent projects',
                'Свяжитесь со мной': 'Get In Touch',
                'Готов обсудить ваш следующий проект': 'Ready to discuss your next project'
            }
        };
        this.init();
    }
    
    init() {
        this.updateLanguageText();
        
        const langToggle = document.getElementById('lang-toggle');
        langToggle.addEventListener('click', () => this.toggle());
    }
    
    toggle() {
        this.language = this.language === 'ru' ? 'en' : 'ru';
        localStorage.setItem('language', this.language);
        this.updateLanguageText();
        this.updateElements();
    }
    
    updateLanguageText() {
        const langText = document.getElementById('lang-text');
        langText.textContent = this.language === 'ru' ? 'EN' : 'RU';
    }
    
    updateElements() {
        const elements = document.querySelectorAll('[data-en][data-ru]');
        elements.forEach(element => {
            const text = this.language === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-ru');
            element.innerHTML = text;
        });
    }
}

// Навигация
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация загрузочного экрана
    new LoadingScreen();
    
    // Инициализация тем и языков
    new ThemeManager();
    new LanguageManager();
    

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Мобильное меню
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Активная ссылка при скролле
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Плавное появление навигации при скролле
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Анимация прогресс-баров для навыков
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 300);
                }
            }
        }
    });
}, observerOptions);

// Наблюдение за элементами
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-card, .portfolio-item, .contact-item, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Эффект печатающего текста
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Счетчик статистики
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
        const speed = 200;
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 1);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Параллакс эффект
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Плавное появление секций
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            
            // Запуск анимации счетчиков для секции "обо мне"
            if (entry.target.id === 'about') {
                animateCounters();
            }
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Добавление CSS для анимаций секций
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    section.section-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Обработка формы контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Анимация отправки
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Имитация отправки (замените на реальную логику)
            setTimeout(() => {
                submitBtn.textContent = 'Отправлено!';
                submitBtn.style.background = '#4ade80';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
});





// Простые эффекты при наведении
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.skill-card, .portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});

// Lazy loading для изображений (если будут добавлены)
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

