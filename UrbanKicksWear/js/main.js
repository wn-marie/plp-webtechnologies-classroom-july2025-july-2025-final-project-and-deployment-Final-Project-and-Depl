// Mobile Menu Toggle
// const burger = document.getElementById('burger');
// const nav = document.querySelector('.nav-links');

// if (burger && nav) {
//     burger.addEventListener('click', () => {
//         nav.classList.toggle('active');
//     });
// }

// Back to Top Button
// const backToTopButton = document.getElementById('backToTop');

// if (backToTopButton) {
//     window.addEventListener('scroll', () => {
//         if (window.pageYOffset > 300) {
//             backToTopButton.style.display = "block";
//         } else {
//             backToTopButton.style.display = "none";
//         }
//     });

//     backToTopButton.addEventListener('click', () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     });
// }

// Optional: Auto-rotate testimonials (uncomment to enable)
/*
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function rotateTestimonials() {
    testimonials.forEach(t => t.style.display = 'none');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].style.display = 'block';
}

if (testimonials.length > 0) {
    testimonials[0].style.display = 'block';
    setInterval(rotateTestimonials, 5000);
}
*/

// Mobile Menu Toggle
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.pageYOffset > 300 ? "block" : "none";
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============= DARK MODE TOGGLE =============
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved user preference
const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'enabled') {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
}

// Toggle dark mode
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.textContent = '🌙';
        }
    });
}