document.addEventListener('DOMContentLoaded', () => {
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    const detailsButtons = document.querySelectorAll('.details-btn');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const courseCard = e.target.closest('.course-card');
            const courseName = courseCard.querySelector('h2').textContent;
            
            if (courseName === 'English') {
                window.open('english/english.html', '_blank');
            } else {
                alert(`Thank you for your interest in our ${courseName} course! Our team will contact you shortly with enrollment details.`);
            }
        });
    });

    detailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const detailsContent = e.target.parentElement.nextElementSibling;
            const isActive = detailsContent.classList.contains('active');
            
            // Close all other details sections
            document.querySelectorAll('.details-content.active').forEach(content => {
                if (content !== detailsContent) {
                    content.classList.remove('active');
                    content.previousElementSibling.querySelector('.details-btn').textContent = 'More Details';
                }
            });

            // Toggle current details section
            detailsContent.classList.toggle('active');
            button.textContent = isActive ? 'More Details' : 'Show Less';
        });
    });
});
