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