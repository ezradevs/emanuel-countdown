// Emanuel School Countdown
// Target: February 2nd, 2026 at 8:20 AM AEDT (Australia/Sydney timezone)

(function() {
    'use strict';

    // Target date: Feb 2, 2026 at 8:20 AM in Sydney timezone
    // We create the target date as a UTC timestamp
    // AEDT (Australian Eastern Daylight Time) is UTC+11
    // So 8:20 AM AEDT = 21:20 UTC on Feb 1, 2026 (previous day)
    const TARGET_DATE = new Date('2026-02-01T21:20:00Z');

    // DOM elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const completedMessage = document.getElementById('completed-message');
    const countdown = document.getElementById('countdown');

    // Pad numbers with leading zeros
    function pad(num) {
        return String(num).padStart(2, '0');
    }

    // Update the countdown display
    function updateCountdown() {
        const now = new Date();
        const diff = TARGET_DATE - now;

        // If countdown is complete
        if (diff <= 0) {
            showCompleted();
            return false;
        }

        // Calculate time components
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update DOM
        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minutesEl.textContent = pad(minutes);
        secondsEl.textContent = pad(seconds);

        return true;
    }

    // Show the completion message
    function showCompleted() {
        if (completedMessage) {
            completedMessage.classList.add('show');
        }
    }

    // Particle system
    const particlesContainer = document.getElementById('particles');
    const PARTICLE_COUNT = 12;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Random size variation
        const size = 2 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random animation duration (slower = more ethereal)
        const duration = 8 + Math.random() * 12;
        particle.style.animationDuration = duration + 's';

        // Random delay so they don't all start together
        particle.style.animationDelay = Math.random() * duration + 's';

        particlesContainer.appendChild(particle);
    }

    function initParticles() {
        if (!particlesContainer) return;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            createParticle();
        }
    }

    // Flying heads - DVD screensaver style bouncing
    const HEAD_SIZE = 80;
    const SPEED = 80;

    const heads = [
        { el: document.getElementById('flying-head-1'), x: 0, y: 0, vx: 0, vy: 0, rotation: 0 },
        { el: document.getElementById('flying-head-2'), x: 0, y: 0, vx: 0, vy: 0, rotation: 0 },
        { el: document.getElementById('flying-head-3'), x: 0, y: 0, vx: 0, vy: 0, rotation: 0 }
    ];

    let lastTimestamp = 0;

    function updateHeads(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = (timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;

        const maxX = window.innerWidth - HEAD_SIZE;
        const maxY = window.innerHeight - HEAD_SIZE;

        for (const head of heads) {
            if (!head.el) continue;

            // Update position
            head.x += head.vx * delta;
            head.y += head.vy * delta;
            head.rotation += 90 * delta;

            // Bounce off edges
            if (head.x <= 0) {
                head.x = 0;
                head.vx = Math.abs(head.vx);
            } else if (head.x >= maxX) {
                head.x = maxX;
                head.vx = -Math.abs(head.vx);
            }

            if (head.y <= 0) {
                head.y = 0;
                head.vy = Math.abs(head.vy);
            } else if (head.y >= maxY) {
                head.y = maxY;
                head.vy = -Math.abs(head.vy);
            }

            // Apply transform
            head.el.style.transform = `translate(${Math.round(head.x)}px, ${Math.round(head.y)}px) rotate(${Math.round(head.rotation)}deg)`;
        }

        requestAnimationFrame(updateHeads);
    }

    function initFlyingHeads() {
        for (const head of heads) {
            if (!head.el) continue;

            // Random starting position
            head.x = Math.random() * (window.innerWidth - HEAD_SIZE);
            head.y = Math.random() * (window.innerHeight - HEAD_SIZE);

            // Random starting direction
            head.vx = (Math.random() > 0.5 ? 1 : -1) * SPEED;
            head.vy = (Math.random() > 0.5 ? 1 : -1) * SPEED * (0.6 + Math.random() * 0.4);

            // Random starting rotation
            head.rotation = Math.random() * 360;
        }

        requestAnimationFrame(updateHeads);
    }

    // Initialize countdown
    function init() {
        // Initial update
        const shouldContinue = updateCountdown();

        // Set up interval if countdown hasn't completed
        if (shouldContinue) {
            setInterval(updateCountdown, 1000);
        }

        // Initialize particles
        initParticles();

        // Initialize flying heads
        initFlyingHeads();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
