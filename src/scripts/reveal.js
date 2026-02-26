export function initReveal() {
    const revealItems = document.querySelectorAll('.reveal-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const container = entry.target.parentElement;
                const siblings = Array.from(container.querySelectorAll('.reveal-item'));
                const itemIndex = siblings.indexOf(entry.target);
                const delay = Math.min(itemIndex * 75, 240);

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => revealObserver.observe(item));
}

// Run on initial load
initReveal();

// Support Astro View Transitions if needed
document.addEventListener('astro:after-swap', initReveal);
