document.addEventListener('DOMContentLoaded', () => {
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
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
});
