document.addEventListener('DOMContentLoaded', () => {
    const enrollmentForm = document.getElementById('enrollment-form');
    const enrollmentMessage = document.getElementById('enrollment-message');
    const navLinks = document.querySelectorAll('.course-nav a');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle form submission
    enrollmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(enrollmentForm);
        const userData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            level: formData.get('level'),
            instructor: formData.get('instructor')
        };
        
        // Here you would typically send the data to your server
        console.log('Enrollment data:', userData);
        
        // Hide the form and show the success message
        enrollmentForm.style.display = 'none';
        enrollmentMessage.style.display = 'block';
        
        // Reset the form
        enrollmentForm.reset();
    });

    // Testimonials Slider
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    const cardsPerView = 3;
    const totalCards = cards.length;
    let autoSlideInterval;
    const autoSlideDelay = 5000; // 5 seconds between slides
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateSlider() {
        const offset = currentIndex * -100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function nextSlide() {
        if (currentIndex < totalCards - cardsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the beginning
        }
        updateSlider();
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalCards - cardsPerView; // Loop to the end
        }
        updateSlider();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Add hover pause functionality
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    // Initialize slider
    updateSlider();
    startAutoSlide();

    // Function to handle scroll spy
    function handleScrollSpy() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.course-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', handleScrollSpy);
    
    // Initial check for active section
    handleScrollSpy();

    // Auto-sliding functionality for testimonials
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialsSlides = document.querySelectorAll('.testimonial-card');
    let currentTestimonialIndex = 0;

    function moveTestimonialSlide() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialsSlides.length;
        testimonialsTrack.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
    }

    // Auto-sliding functionality for comments
    const commentsTrack = document.querySelector('.comments-track');
    const commentSlides = document.querySelectorAll('.comment-card');
    let currentCommentIndex = 0;

    function moveCommentSlide() {
        currentCommentIndex = (currentCommentIndex + 1) % commentSlides.length;
        commentsTrack.style.transform = `translateX(-${currentCommentIndex * 100}%)`;
    }

    // Set up auto-sliding intervals
    let testimonialInterval = setInterval(moveTestimonialSlide, 5000);
    let commentInterval = setInterval(moveCommentSlide, 5000);

    // Pause auto-sliding when hovering over either section
    document.querySelector('.testimonials-section').addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    document.querySelector('.testimonials-section').addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(moveTestimonialSlide, 5000);
    });

    document.querySelector('.comments-section').addEventListener('mouseenter', () => {
        clearInterval(commentInterval);
    });

    document.querySelector('.comments-section').addEventListener('mouseleave', () => {
        commentInterval = setInterval(moveCommentSlide, 5000);
    });

    // Manual navigation for testimonials
    document.querySelector('.testimonials-prev').addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialsSlides.length) % testimonialsSlides.length;
        testimonialsTrack.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
    });

    document.querySelector('.testimonials-next').addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialsSlides.length;
        testimonialsTrack.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
    });

    // Manual navigation for comments
    document.querySelector('.comments-prev').addEventListener('click', () => {
        currentCommentIndex = (currentCommentIndex - 1 + commentSlides.length) % commentSlides.length;
        commentsTrack.style.transform = `translateX(-${currentCommentIndex * 100}%)`;
    });

    document.querySelector('.comments-next').addEventListener('click', () => {
        currentCommentIndex = (currentCommentIndex + 1) % commentSlides.length;
        commentsTrack.style.transform = `translateX(-${currentCommentIndex * 100}%)`;
    });
});
