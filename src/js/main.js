import { I18n } from './i18n.js';
import { BookingSystem } from './booking.js';
import { ServicesManager } from './services.js';

class LongevityBarberApp {
    constructor() {
        this.i18n = new I18n();
        this.bookingSystem = new BookingSystem();
        this.servicesManager = new ServicesManager();
        
        this.init();
    }

    async init() {
        // Initialize i18n
        await this.i18n.init();
        
        // Initialize services
        await this.servicesManager.init();
        
        // Initialize services
        await this.servicesManager.init();
        
        // Initialize booking system
        this.bookingSystem.init();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup smooth scrolling
        this.setupSmoothScrolling();
        
        // Setup navbar scroll effect
        this.setupNavbarScroll();
    }

    setupEventListeners() {
        // Donate button
        const donateBtn = document.getElementById('donateBtn');
        donateBtn?.addEventListener('click', () => {
            // Add donate functionality here
            alert('Donate functionality to be implemented');
        });

        // Hero booking button
        const heroBookBtn = document.getElementById('heroBookBtn');
        heroBookBtn?.addEventListener('click', () => {
            button.addEventListener('click', () => {
                this.bookingSystem.openModal();
            });
        });
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LongevityBarberApp();
});