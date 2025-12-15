
document.addEventListener('DOMContentLoaded', function() {
    const betoltoAnimacio = document.querySelector('.betolto-animacio');
    if (betoltoAnimacio) {
        setTimeout(() => {
            betoltoAnimacio.classList.add('eltunik');
            setTimeout(() => {
                betoltoAnimacio.remove();
            }, 500);
        }, 2000);
    }

    inicializalEjszakaiModot();

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('mutat');
        });
    }
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('mutat');
                }
            }
        });
    });
    
    const statNumbers = document.querySelectorAll('.statisztika-szam');
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-szam'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const misszioSection = document.querySelector('.misszio');
    if (misszioSection) {
        observer.observe(misszioSection);
    }
    
    const hirlevelForm = document.querySelector('.hirlevel-urlap');
    
    if (hirlevelForm) {
        hirlevelForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                alert('Köszönjük a feliratkozását! Hamarosan értesíteni fogjuk legújabb híreinkről.');
                emailInput.value = '';
            }
        });
    }
    
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('aktiv');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('aktiv');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    const cards = document.querySelectorAll('.program-kartya, .hir-kartya, .tamogatas-mod');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    function inicializalEjszakaiModot() {
        const ejszakaiModGomb = document.querySelector('.ejszakai-mod-gomb');
        
        const mentettMod = localStorage.getItem('ejszakaiMod');
        if (mentettMod === 'true') {
            document.body.classList.add('ejszakai-mod');
            ejszakaiModGomb.innerHTML = '<i class="fas fa-sun"></i>';
            ejszakaiModGomb.setAttribute('aria-label', 'Éjszakai mód kikapcsolása');
        }

        ejszakaiModGomb.addEventListener('click', function() {
            const atvaltasAnimacio = document.createElement('div');
            atvaltasAnimacio.className = 'atvaltas-animacio';
            document.body.appendChild(atvaltasAnimacio);

            this.style.pointerEvents = 'none';
            this.classList.add('aktiv');

            if (document.body.classList.contains('ejszakai-mod')) {
                atvaltasAnimacio.classList.add('vilagosra');
                setTimeout(() => {
                    document.body.classList.remove('ejszakai-mod');
                    localStorage.setItem('ejszakaiMod', 'false');
                    this.innerHTML = '<i class="fas fa-moon"></i>';
                    this.setAttribute('aria-label', 'Éjszakai mód bekapcsolása');
                    
                    setTimeout(() => {
                        atvaltasAnimacio.remove();
                        this.style.pointerEvents = 'auto';
                        this.classList.remove('aktiv');
                    }, 500);
                }, 600);
            } else {
                atvaltasAnimacio.classList.add('sotetre');
                setTimeout(() => {
                    document.body.classList.add('ejszakai-mod');
                    localStorage.setItem('ejszakaiMod', 'true');
                    this.innerHTML = '<i class="fas fa-sun"></i>';
                    this.setAttribute('aria-label', 'Éjszakai mód kikapcsolása');
                    
                    setTimeout(() => {
                        atvaltasAnimacio.remove();
                        this.style.pointerEvents = 'auto';
                        this.classList.remove('aktiv');
                    }, 500);
                }, 600);
            }
        });
    }
});