document.addEventListener('DOMContentLoaded', function() {
    // More elegant loader with smooth transitions
    setTimeout(() => {
        document.querySelector('.heart-loader').style.opacity = '0';
        document.querySelector('.content').style.opacity = '1';
        document.querySelector('.content').style.transform = 'translateY(0)';
        
        setTimeout(() => {
            document.querySelector('.heart-loader').style.display = 'none';
        }, 500);
    }, 2000);
    
    // Starting date - change this to your actual anniversary or when you met
    const startDate = new Date('2021-07-21').getTime(); // Example date
    
    // Update the countdown with smoother animation
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = now - startDate;
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Animate count changes
        animateValue('days', days);
        animateValue('hours', hours);
        animateValue('minutes', minutes);
        document.getElementById('seconds').textContent = seconds;
    }
    
    // Store previous values for smooth transitions
    const previousValues = {
        days: 0,
        hours: 0,
        minutes: 0
    };
    
    // Animate value changes for a smoother experience
    function animateValue(id, newValue) {
        const element = document.getElementById(id);
        const currentValue = parseInt(element.textContent);
        
        if (id in previousValues && newValue !== previousValues[id]) {
            // Add highlight animation
            element.classList.add('highlight');
            setTimeout(() => {
                element.classList.remove('highlight');
            }, 500);
            
            previousValues[id] = newValue;
        }
        
        element.textContent = newValue;
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
    
    // Enhanced scroll reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);  // Only animate once
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in-element').forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Create more sophisticated floating hearts with varying paths
    function createFloatingHeart() {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart');
        
        // Randomize heart properties
        const size = Math.random() * 1.5 + 0.7; // Varies from 0.7rem to 2.2rem
        const startPosition = Math.random() * 100; // Starting horizontal position
        const duration = Math.random() * 6 + 8; // Animation duration between 8-14s
        const delay = Math.random() * 1; // Small random delay for more natural effect
        const rotationStart = Math.random() * 360; // Random starting rotation
        const rotationEnd = rotationStart + Math.random() * 360 - 180; // Random ending rotation
        
        // Apply styles
        heart.style.left = `${startPosition}%`;
        heart.style.fontSize = `${size}rem`;
        heart.style.opacity = '0';
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        // Add some hearts with different colors for variety
        if (Math.random() > 0.7) {
            heart.style.color = 'var(--accent)';
        }
        
        document.querySelector('.floating-hearts').appendChild(heart);
        
        // Start animation after a small delay (improves performance)
        setTimeout(() => {
            const endPosition = startPosition + (Math.random() * 40 - 20); // End position varies slightly
            
            heart.style.opacity = Math.random() * 0.5 + 0.1;
            heart.style.transform = `translateY(-${Math.random() * 100 + 500}px) translateX(${Math.random() * 100 - 50}px) rotate(${rotationEnd}deg)`;
            heart.style.transition = `all ${duration}s cubic-bezier(0.1, 0.5, 0.1, 1)`;
            
            // Add a bit of wobble animation
            heart.style.animation = `float ${Math.random() * 2 + 2}s ease-in-out infinite alternate`;
        }, 100);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
    
    // Continue creating hearts periodically
    setInterval(createFloatingHeart, 2000);
    
    // Add parallax effect to decorative elements
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        // Move decorative corners slightly for parallax effect
        document.querySelector('.top-left').style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
        document.querySelector('.bottom-right').style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Add highlight effect to countdown items on hover
    document.querySelectorAll('.countdown-item').forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-15px) rotateY(10deg)';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.transform = '';
        });
    });
    
    // Add smooth scroll for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// CSS for highlight animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes highlight {
        0% { color: var(--primary-dark); }
        50% { color: var(--accent); }
        100% { color: var(--primary-dark); }
    }
    
    .highlight {
        animation: highlight 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// Update the start date in the script with your actual relationship start date