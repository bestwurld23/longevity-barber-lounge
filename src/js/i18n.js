export class I18n {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.fallbackLanguage = 'en';
    }

    async init() {
        // Load translations
        await this.loadTranslations();
        
        // Get saved language or detect from browser
        const savedLang = localStorage.getItem('longevity-barber-lang');
        const browserLang = navigator.language.split('-')[0];
        const initialLang = savedLang || (this.translations[browserLang] ? browserLang : this.fallbackLanguage);
        
        await this.setLanguage(initialLang);
    }

    async loadTranslations() {
        // English translations
        this.translations.en = {
            'site.title': 'Longevity Barber Lounge - Premium Barbershop in Chicago',
            'site.description': 'Professional barbershop services in Chicago. Expert cuts, beard grooming, and traditional barbering. Book your appointment today.',
            'nav.home': 'Home',
            'nav.services': 'Services',
            'nav.about': 'About',
            'nav.contact': 'Contact',
            'nav.book': 'Book Now',
            'hero.title': 'Premium Barbershop Experience',
            'hero.subtitle': 'Expert cuts, traditional grooming, modern style. Located in the heart of Chicago.',
            'hero.book': 'Book Appointment',
            'hero.services': 'View Services',
            'services.title': 'Our Services',
            'services.subtitle': 'Professional grooming services tailored to your style',
            'about.title': 'About Longevity Barber Lounge',
            'about.description': 'With years of experience in traditional and modern barbering, we provide exceptional grooming services in a welcoming atmosphere. Our skilled barbers combine classic techniques with contemporary styles to give you the perfect look.',
            'about.feature1.title': 'Expert Barbers',
            'about.feature1.description': 'Skilled professionals with years of experience',
            'about.feature2.title': 'Premium Products',
            'about.feature2.description': 'High-quality grooming products and tools',
            'about.feature3.title': 'Relaxing Environment',
            'about.feature3.description': 'Comfortable and welcoming atmosphere',
            'contact.title': 'Visit Us',
            'contact.address.title': 'Address',
            'contact.hours.title': 'Hours',
            'contact.hours.monday': 'Monday',
            'contact.hours.tuesday': 'Tuesday',
            'contact.hours.wednesday': 'Wednesday',
            'contact.hours.thursday': 'Thursday',
            'contact.hours.friday': 'Friday',
            'contact.hours.saturday': 'Saturday',
            'contact.hours.sunday': 'Sunday',
            'contact.hours.closed': 'Closed',
            'contact.phone.title': 'Phone',
            'contact.location': 'Find Us',
            'contact.directions': 'Located on South Ashland Avenue in Chicago',
            'booking.title': 'Book Your Appointment',
            'booking.name': 'Full Name',
            'booking.email': 'Email',
            'booking.phone': 'Phone',
            'booking.service': 'Service',
            'booking.selectService': 'Select a service',
            'booking.date': 'Date',
            'booking.time': 'Time',
            'booking.selectTime': 'Select a time',
            'booking.notes': 'Additional Notes (Optional)',
            'booking.cancel': 'Cancel',
            'booking.confirm': 'Book Appointment',
            'booking.success.title': 'Appointment Booked!',
            'booking.success.message': 'Your appointment has been successfully booked. You will receive a confirmation email shortly.',
            'booking.success.close': 'Close',
            'footer.tagline': 'Premium barbershop experience in Chicago',
            'footer.quickLinks': 'Quick Links',
            'footer.rights': 'All rights reserved.'
        };

        // Spanish translations
        this.translations.es = {
            'site.title': 'Longevity Barber Lounge - Barbería Premium en Chicago',
            'site.description': 'Servicios profesionales de barbería en Chicago. Cortes expertos, arreglo de barba y barbería tradicional. Reserve su cita hoy.',
            'nav.home': 'Inicio',
            'nav.services': 'Servicios',
            'nav.about': 'Acerca de',
            'nav.contact': 'Contacto',
            'nav.book': 'Reservar',
            'hero.title': 'Experiencia Premium de Barbería',
            'hero.subtitle': 'Cortes expertos, arreglo tradicional, estilo moderno. Ubicado en el corazón de Chicago.',
            'hero.book': 'Reservar Cita',
            'hero.services': 'Ver Servicios',
            'services.title': 'Nuestros Servicios',
            'services.subtitle': 'Servicios profesionales de arreglo personal adaptados a tu estilo',
            'about.title': 'Acerca de Longevity Barber Lounge',
            'about.description': 'Con años de experiencia en barbería tradicional y moderna, brindamos servicios excepcionales de arreglo personal en un ambiente acogedor. Nuestros barberos expertos combinan técnicas clásicas con estilos contemporáneos para darte el look perfecto.',
            'about.feature1.title': 'Barberos Expertos',
            'about.feature1.description': 'Profesionales capacitados con años de experiencia',
            'about.feature2.title': 'Productos Premium',
            'about.feature2.description': 'Productos y herramientas de arreglo personal de alta calidad',
            'about.feature3.title': 'Ambiente Relajante',
            'about.feature3.description': 'Atmósfera cómoda y acogedora',
            'contact.title': 'Visítanos',
            'contact.address.title': 'Dirección',
            'contact.hours.title': 'Horarios',
            'contact.hours.monday': 'Lunes',
            'contact.hours.tuesday': 'Martes',
            'contact.hours.wednesday': 'Miércoles',
            'contact.hours.thursday': 'Jueves',
            'contact.hours.friday': 'Viernes',
            'contact.hours.saturday': 'Sábado',
            'contact.hours.sunday': 'Domingo',
            'contact.hours.closed': 'Cerrado',
            'contact.phone.title': 'Teléfono',
            'contact.location': 'Encuéntranos',
            'contact.directions': 'Ubicado en South Ashland Avenue en Chicago',
            'booking.title': 'Reserva tu Cita',
            'booking.name': 'Nombre Completo',
            'booking.email': 'Correo Electrónico',
            'booking.phone': 'Teléfono',
            'booking.service': 'Servicio',
            'booking.selectService': 'Selecciona un servicio',
            'booking.date': 'Fecha',
            'booking.time': 'Hora',
            'booking.selectTime': 'Selecciona una hora',
            'booking.notes': 'Notas Adicionales (Opcional)',
            'booking.cancel': 'Cancelar',
            'booking.confirm': 'Reservar Cita',
            'booking.success.title': '¡Cita Reservada!',
            'booking.success.message': 'Tu cita ha sido reservada exitosamente. Recibirás un correo de confirmación en breve.',
            'booking.success.close': 'Cerrar',
            'footer.tagline': 'Experiencia premium de barbería en Chicago',
            'footer.quickLinks': 'Enlaces Rápidos',
            'footer.rights': 'Todos los derechos reservados.'
        };
    }

    async setLanguage(lang) {
        if (!this.translations[lang]) {
            lang = this.fallbackLanguage;
        }

        this.currentLanguage = lang;
        localStorage.setItem('longevity-barber-lang', lang);
        
        // Update document language
        document.documentElement.lang = lang;
        
        // Update all translatable elements
        this.updateTranslations();
        
        // Update current language display
        const currentLang = document.getElementById('currentLang');
        if (currentLang) {
            currentLang.textContent = lang.toUpperCase();
        }
        
        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    updateTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                // Handle different element types
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.hasAttribute('content')) {
                    element.setAttribute('content', translation);
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && typeof translation === 'object') {
                translation = translation[k];
            } else {
                break;
            }
        }
        
        // Fallback to English if translation not found
        if (!translation && this.currentLanguage !== this.fallbackLanguage) {
            translation = this.translations[this.fallbackLanguage];
            for (const k of keys) {
                if (translation && typeof translation === 'object') {
                    translation = translation[k];
                } else {
                    break;
                }
            }
        }
        
        return translation || key;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}