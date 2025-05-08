// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Comments Slider Functionality
    const commentsTrack = document.querySelector('.comments-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const commentCards = document.querySelectorAll('.comment-card');
    let currentIndex = 0;

    // Function to update slider position
    function updateSlider() {
        const cardWidth = commentCards[0].offsetWidth + 32; // Width + gap
        commentsTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update active state of navigation dots
        updateDots();
    }

    // Create navigation dots
    const dotsContainer = document.querySelector('.slider-dots');
    commentCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    });

    // Update dots active state
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Event listeners for slider buttons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < commentCards.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    // Auto-slide functionality
    let slideInterval = setInterval(() => {
        if (currentIndex < commentCards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 5000);

    // Pause auto-slide on hover
    commentsTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
    commentsTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            if (currentIndex < commentCards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000);
    });

    // Navigation Menu Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.course-nav a');

    function highlightNavigation() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // Form Submission Handling
    const enrollmentForm = document.getElementById('enrollment-form');
    const enrollmentMessage = document.getElementById('enrollment-message');

    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(enrollmentForm);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        // Here you would typically send the data to a server
        console.log('Form submitted:', formDataObj);

        // Show success message
        enrollmentForm.style.display = 'none';
        enrollmentMessage.style.display = 'block';

        // Reset form
        enrollmentForm.reset();
    });

    // Scroll event listener for navigation highlighting
    window.addEventListener('scroll', highlightNavigation);

    // Initial call to set correct navigation highlight
    highlightNavigation();

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.overview-card, .feature, .instructor-card, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.overview-card, .feature, .instructor-card, .timeline-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial call to animate elements in view
    animateOnScroll();
}); 