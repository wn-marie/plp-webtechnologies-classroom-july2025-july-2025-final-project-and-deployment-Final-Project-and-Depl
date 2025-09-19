function animateStats() {
    const statElements = document.querySelectorAll('.stat-number');
    
    statElements.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // ~60fps

        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        requestAnimationFrame(updateCount);
    });
}

// Trigger animation when stats section is in view
function handleScroll() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const sectionTop = statsSection.offsetTop;
    const triggerPoint = sectionTop - window.innerHeight + 200;

    if (window.scrollY > triggerPoint) {
        animateStats();
        window.removeEventListener('scroll', handleScroll); // Run once
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // If already in view on load
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && window.scrollY > statsSection.offsetTop - window.innerHeight + 200) {
        animateStats();
    } else {
        window.addEventListener('scroll', handleScroll);
    }
});