document.addEventListener('DOMContentLoaded', function() {
    // Comments Slider Functionality
    const commentsTrack = document.querySelector('.comments-track');
    const comments = document.querySelectorAll('.comment-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let autoSlideInterval;

    // Create navigation dots
    comments.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        const offset = -currentIndex * (100 / comments.length);
        commentsTrack.style.transform = `translateX(${offset}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % comments.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + comments.length) % comments.length;
        updateSlider();
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Pause auto-slide on hover
    commentsTrack.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    commentsTrack.addEventListener('mouseleave', startAutoSlide);

    // Start auto-slide
    startAutoSlide();

    // Navigation Menu Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.course-nav a');

    function highlightNavLink() {
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
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial highlight

    // Form Submission Handling
    const enrollmentForm = document.querySelector('.enrollment-form');
    const successMessage = document.querySelector('.enrollment-message');

    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        // Display success message
        successMessage.style.display = 'block';
        
        // Reset form
        this.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.overview-card, .feature, .instructor-card, .timeline-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add animation styles
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
}); 