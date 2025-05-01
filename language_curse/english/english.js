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

    // Comments slider functionality
    const commentsTrack = document.querySelector('.comments-track');
    const comments = document.querySelectorAll('.comment-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    let currentIndex = 0;
    const totalComments = comments.length;

    function updateSlider() {
        const offset = -currentIndex * 100;
        commentsTrack.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalComments) % totalComments;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalComments;
        updateSlider();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Auto-slide functionality
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalComments;
        updateSlider();
    }, 5000);

    // Pause auto-slide on hover
    commentsTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    commentsTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalComments;
            updateSlider();
        }, 5000);
    });

    // Initialize slider
    updateSlider();

    // Function to handle scroll spy
    function handleScrollSpy() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.course-nav a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.course-nav a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', handleScrollSpy);
    
    // Initial check for active section
    handleScrollSpy();
});
