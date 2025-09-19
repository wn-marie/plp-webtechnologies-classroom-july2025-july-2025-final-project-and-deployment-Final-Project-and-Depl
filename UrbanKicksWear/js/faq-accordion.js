document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains('active');

            // Close all
            faqQuestions.forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.style.display = 'none';
            });

            // Open this one if wasn't active
            if (!isActive) {
                button.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });
});