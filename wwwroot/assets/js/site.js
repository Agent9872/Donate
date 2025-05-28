document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Progress Bar and Donation Counter Animation
    try {
        const progressBar = document.querySelector('.progress-bar');
        const raisedAmountSpan = document.getElementById('raisedAmount');
        const targetAmount = 85000; // ₦100,000 raised
        const goalAmount = 500000; // ₦500,000 goal
        const percentage = Math.min((targetAmount / goalAmount) * 100, 100);

        // Animate progress bar
        let width = 0;
        const animateProgress = () => {
            if (width < percentage) {
                width += 0.5;
                progressBar.style.width = `${width}%`;
                progressBar.setAttribute('aria-valuenow', width);
                requestAnimationFrame(animateProgress);
            } else {
                progressBar.style.width = `${percentage}%`;
            }
        };
        if (progressBar) {
            requestAnimationFrame(animateProgress);
        }

        // Animate donation counter
        let currentAmount = 0;
        const increment = targetAmount / 200;
        const animateCounter = () => {
            if (currentAmount < targetAmount) {
                currentAmount += increment;
                raisedAmountSpan.textContent = `₦${Math.min(Math.floor(currentAmount), targetAmount).toLocaleString()}`;
                setTimeout(animateCounter, 15);
            } else {
                raisedAmountSpan.textContent = `₦${targetAmount.toLocaleString()} raised`;
            }
        };
        if (raisedAmountSpan) {
            animateCounter();
        }

        // Pulsating effect for Donate button
        const donateBtn = document.querySelector('.donate-btn');
        if (donateBtn) {
            setInterval(() => {
                donateBtn.classList.toggle('pulse');
            }, 2000);
        }
    } catch (error) {
        console.error('Error in animation script:', error);
    }
});