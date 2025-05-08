/**
 * Main JavaScript file for the courses page
 * Handles course card interactions and enrollment functionality
 */

// Function to handle course enrollment
function handleEnrollment(courseName) {
    // Convert course name to lowercase for consistent comparison
    const course = courseName.toLowerCase();
    
    // Open the corresponding course page
    switch(course) {
        case 'english':
            window.open('english/english.html', '_blank');
            break;
        case 'spanish':
            window.open('spanish/spanish.html', '_blank');
            break;
        case 'french':
            window.open('french/french.html', '_blank');
            break;
        case 'japanese':
            window.open('japanese/japanese.html', '_blank');
            break;
        default:
            alert(`Thank you for your interest in our ${courseName} course! Our team will contact you shortly with enrollment details.`);
    }
}

// Add onclick attributes to the HTML buttons
// Example usage in HTML:
// <button class="enroll-btn" onclick="handleEnrollment('English')">Enroll Now</button>
