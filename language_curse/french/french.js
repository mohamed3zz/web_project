// Comments Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.comments-track');
    const slides = document.querySelectorAll('.comment-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    let slideWidth = slides[0].offsetWidth;
    let autoSlideInterval;
    
    // Create dots for navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Event listeners for buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Pause auto slide on hover
    const slider = document.querySelector('.comments-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        slider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Start auto slide
    startAutoSlide();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth;
        updateSlider();
    });
});

// Navigation Menu Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.course-nav a');
    
    function highlightNav() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Initial highlight
});

// Form Submission Handling
document.addEventListener('DOMContentLoaded', function() {
    const enrollmentForm = document.querySelector('.enrollment-form');
    const successMessage = document.querySelector('.enrollment-message');
    
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(enrollmentForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                enrollmentForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.overview-card, .feature, .instructor-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Add animation classes to CSS
const style = document.createElement('style');
style.textContent = `
    .overview-card, .feature, .instructor-card, .timeline-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .overview-card.animate, .feature.animate, .instructor-card.animate, .timeline-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style); 