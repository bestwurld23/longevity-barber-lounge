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
        // Language switcher
        const langToggle = document.getElementById('langToggle');
        const langDropdown = document.getElementById('langDropdown');
        const langButtons = document.querySelectorAll('[data-lang]');

        langToggle?.addEventListener('click', () => {
            langDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langToggle?.contains(e.target) && !langDropdown?.contains(e.target)) {
                langDropdown?.classList.remove('active');
            }
        });

        langButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const lang = e.target.dataset.lang;
                await this.i18n.setLanguage(lang);
                langDropdown?.classList.remove('active');
            });
        });

        // Booking buttons
        const bookingButtons = document.querySelectorAll('#bookingBtn, #heroBookBtn');
        bookingButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.bookingSystem.openModal();
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileToggle?.addEventListener('click', () => {
            navMenu?.classList.toggle('active');
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