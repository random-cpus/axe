/* ==========================================================================
   PREMIUM COMPLIANT LANDING PAGE ENGINE (index.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. CENTRALIZED DESTINATION URL CONFIGURATION (Edit this placeholder value)
    const DESTINATION_URL = "https://asia.adform.net/C/?bn=88109405;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_50}";



    // 3. CUSTOM CURSOR GLOW (DESKTOP ONLY)
    const cursorGlow = document.getElementById('cursorGlow');
    if (window.innerWidth > 1024 && cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // 5. TESTIMONIAL SLIDER CAROUSEL
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const btnPrev = document.getElementById('slidePrev');
    const btnNext = document.getElementById('slideNext');
    let currentSlide = 0;
    let autoSlideInterval;

    const showSlide = (index) => {
        if (slides.length === 0) return;
        
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        // Wrap around
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    };

    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };

    if (btnPrev && btnNext) {
        btnNext.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
        btnPrev.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            showSlide(index);
            resetAutoSlide();
        });
    });

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 8000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    if (slides.length > 0) {
        startAutoSlide();
    }

    // 6. FAQ ACCORDION
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const isActive = parent.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });

    // 7. FLOATING CTA & MOBILE STICKY BAR (40% scroll trigger)
    const floatingCta = document.getElementById('floatingCta');
    const mobileStickyBar = document.getElementById('mobileStickyBar');
    const closeFloatingCtaBtn = document.getElementById('closeFloatingCta');
    let isFloatingClosed = false;

    if (closeFloatingCtaBtn && floatingCta) {
        closeFloatingCtaBtn.addEventListener('click', () => {
            floatingCta.classList.remove('show');
            isFloatingClosed = true;
        });
    }

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        
        const scrollPercent = window.scrollY / totalHeight;
        
        if (scrollPercent >= 0.4) {
            // Show widgets
            if (floatingCta && !isFloatingClosed) {
                floatingCta.classList.add('show');
            }
            if (mobileStickyBar) {
                mobileStickyBar.classList.add('show');
            }
        } else {
            // Hide widgets
            if (floatingCta) {
                floatingCta.classList.remove('show');
            }
            if (mobileStickyBar) {
                mobileStickyBar.classList.remove('show');
            }
        }
    });

    // 8. REVEAL ON SCROLL ANIMATION (Timeline step elements)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elemTop = rect.top;
            const elemBottom = rect.bottom;
            
            // Reveal if inside viewport height
            const isVisible = (elemTop < window.innerHeight - 50) && (elemBottom > 0);
            if (isVisible) {
                el.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check
});
