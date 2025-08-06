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
            'title': 'Longevity Barber Lounge - Premium Barbershop in Chicago',
            'description': 'Professional barbershop services in Chicago. Expert cuts, beard grooming, and traditional barbering. Book your appointment today.',
            'home': 'Home',
            'services': 'Services',
            'about': 'About',
            'contact': 'Contact',
            'book': 'Book Now',
            'heroTitle': 'Premium Barbershop Experience',
            'heroSubtitle': 'Expert cuts, traditional grooming, modern style. Located in the heart of Chicago.',
            'heroBook': 'Book Appointment',
            'services': 'View Services',
            'ourServices': 'Our Services',
            'servicesSubtitle': 'Professional grooming services tailored to your style',
            'ourServices': 'Our Services',
            'servicesSubtitle': 'Professional grooming services tailored to your style',
            'aboutTitle': 'About Longevity Barber Lounge',
            'aboutDescription': 'With years of experience in traditional and modern barbering, we provide exceptional grooming services in a welcoming atmosphere. Our skilled barbers combine classic techniques with contemporary styles to give you the perfect look.',
            'expertBarbers': 'Expert Barbers',
            'expertBarbersDesc': 'Skilled professionals with years of experience',
            'premiumProducts': 'Premium Products',
            'premiumProductsDesc': 'High-quality grooming products and tools',
            'relaxingEnvironment': 'Relaxing Environment',
            'relaxingEnvironmentDesc': 'Comfortable and welcoming atmosphere',
            'visitUs': 'Visit Us',
            'address': 'Address',
            'hours': 'Hours',
            'monday': 'Monday',
            'tuesday': 'Tuesday',
            'wednesday': 'Wednesday',
            'thursday': 'Thursday',
            'friday': 'Friday',
            'saturday': 'Saturday',
            'sunday': 'Sunday',
            'closed': 'Closed',
            'phone': 'Phone',
            'findUs': 'Find Us',
            'directions': 'Located on South Ashland Avenue in Chicago',
            'bookingTitle': 'Book Your Appointment',
            'fullName': 'Full Name',
            'email': 'Email',
            'phoneNumber': 'Phone',
            'service': 'Service',
            'selectService': 'Select a service',
            'date': 'Date',
            'time': 'Time',
            'selectTime': 'Select a time',
            'notes': 'Additional Notes (Optional)',
            'cancel': 'Cancel',
            'confirm': 'Book Appointment',
            'appointmentBooked': 'Appointment Booked!',
            'confirmationMessage': 'Your appointment has been successfully booked. You will receive a confirmation email shortly.',
            'close': 'Close',
            'tagline': 'Premium barbershop experience in Chicago',
            'quickLinks': 'Quick Links',
            'rights': 'All rights reserved.'
        };

        // Spanish translations
        this.translations.es = {
            'title': 'Longevity Barber Lounge - Barbería Premium en Chicago',
            'description': 'Servicios profesionales de barbería en Chicago. Cortes expertos, arreglo de barba y barbería tradicional. Reserve su cita hoy.',
            'home': 'Inicio',
            'services': 'Servicios',
            'about': 'Acerca de',
            'contact': 'Contacto',
            'book': 'Reservar',
            'heroTitle': 'Experiencia Premium de Barbería',
            'heroSubtitle': 'Cortes expertos, arreglo tradicional, estilo moderno. Ubicado en el corazón de Chicago.',
            'heroBook': 'Reservar Cita',
            'services': 'Ver Servicios',
            'ourServices': 'Nuestros Servicios',
            'servicesSubtitle': 'Servicios profesionales de arreglo personal adaptados a tu estilo',
            'ourServices': 'Nuestros Servicios',
            'servicesSubtitle': 'Servicios profesionales de arreglo personal adaptados a tu estilo',
            'aboutTitle': 'Acerca de Longevity Barber Lounge',
            'aboutDescription': 'Con años de experiencia en barbería tradicional y moderna, brindamos servicios excepcionales de arreglo personal en un ambiente acogedor. Nuestros barberos expertos combinan técnicas clásicas con estilos contemporáneos para darte el look perfecto.',
            'expertBarbers': 'Barberos Expertos',
            'expertBarbersDesc': 'Profesionales capacitados con años de experiencia',
            'premiumProducts': 'Productos Premium',
            'premiumProductsDesc': 'Productos y herramientas de arreglo personal de alta calidad',
            'relaxingEnvironment': 'Ambiente Relajante',
            'relaxingEnvironmentDesc': 'Atmósfera cómoda y acogedora',
            'visitUs': 'Visítanos',
            'address': 'Dirección',
            'hours': 'Horarios',
            'monday': 'Lunes',
            'tuesday': 'Martes',
            'wednesday': 'Miércoles',
            'thursday': 'Jueves',
            'friday': 'Viernes',
            'saturday': 'Sábado',
            'sunday': 'Domingo',
            'closed': 'Cerrado',
            'phone': 'Teléfono',
            'findUs': 'Encuéntranos',
            'directions': 'Ubicado en South Ashland Avenue en Chicago',
            'bookingTitle': 'Reserva tu Cita',
            'fullName': 'Nombre Completo',
            'email': 'Correo Electrónico',
            'phoneNumber': 'Teléfono',
            'service': 'Servicio',
            'selectService': 'Selecciona un servicio',
            'date': 'Fecha',
            'time': 'Hora',
            'selectTime': 'Selecciona una hora',
            'notes': 'Notas Adicionales (Opcional)',
            'cancel': 'Cancelar',
            'confirm': 'Reservar Cita',
            'appointmentBooked': '¡Cita Reservada!',
            'confirmationMessage': 'Tu cita ha sido reservada exitosamente. Recibirás un correo de confirmación en breve.',
            'close': 'Cerrar',
            'tagline': 'Experiencia premium de barbería en Chicago',
            'quickLinks': 'Enlaces Rápidos',
            'rights': 'Todos los derechos reservados.'
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