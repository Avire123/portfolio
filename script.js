// Theme Switcher Logic
const themeBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    
    const icon = themeBtn.querySelector('i');
    if (newTheme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
});

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const categories = (card.getAttribute('data-category') || '').split(' ');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form Submission Feedback
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
});

// Mindset & Philosophy Swipeable Slider
const track = document.getElementById('slider-track');
const slides = document.querySelectorAll('#slider-track .slide');
const prevBtn = document.getElementById('slide-prev');
const nextBtn = document.getElementById('slide-next');
const dots = document.querySelectorAll('#slider-dots .dot');
const sliderContainer = document.querySelector('.slider-track-container');

if (track && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval = null;

    function goToSlide(index) {
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetAutoPlay();
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            goToSlide(idx);
            resetAutoPlay();
        });
    });

    // Touch Swipe Support (Mobile)
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoPlay();
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });

    // Mouse Drag Swipe Support (Desktop)
    let isDragging = false;
    let mouseStartX = 0;

    sliderContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        mouseStartX = e.clientX;
        pauseAutoPlay();
    });

    sliderContainer.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = e.clientX - mouseStartX;
        if (diffX > 40) {
            goToSlide(currentSlide - 1);
        } else if (diffX < -40) {
            goToSlide(currentSlide + 1);
        }
        startAutoPlay();
    });

    sliderContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        startAutoPlay();
    });

    function handleSwipe() {
        const threshold = 40;
        const diff = touchEndX - touchStartX;
        if (diff > threshold) {
            goToSlide(currentSlide - 1);
        } else if (diff < -threshold) {
            goToSlide(currentSlide + 1);
        }
    }

    // Auto Play Timer
    function startAutoPlay() {
        if (!autoPlayInterval) {
            autoPlayInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 6000);
        }
    }

    function pauseAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    function resetAutoPlay() {
        pauseAutoPlay();
        startAutoPlay();
    }

    sliderContainer.addEventListener('mouseenter', pauseAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    // Initialize Auto-play
    startAutoPlay();
}