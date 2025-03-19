document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.testimonial-slideshow');
    const cards = document.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0].offsetWidth; // Get the width of a card
    const transitionSpeed = 500; // Transition duration in milliseconds

    if (!container || cards.length === 0) {
        console.error("Testimonial container or cards not found!");
        return;
    }

    function moveNext() {
        const firstCard = container.firstElementChild.cloneNode(true);
        container.appendChild(firstCard);
        container.removeChild(container.firstElementChild);
        // Apply transform for sliding effect
        container.style.transform = `translateX(-${cardWidth}px)`;

        // After transition completes, move the first card to the end and reset transform
        setTimeout(() => {
            
            
            // Reset transition and transform instantly (without animation)
            container.style.transition = "none";
            container.style.transform = "translateX(0)";
        }, transitionSpeed);
    }

    setInterval(moveNext, 3000); // Auto-slide every 3 seconds
});
