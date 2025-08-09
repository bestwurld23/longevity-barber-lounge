export class ServicesManager {
    constructor() {
        this.services = [];
        this.currentLanguage = 'en';
    }

    async init() {
        await this.loadServices();
        this.renderServices();
        
        // Listen for language changes
        document.addEventListener('languageChanged', (e) => {
            this.currentLanguage = e.detail.language;
            this.renderServices();
        });
    }

    async loadServices() {
        // Service data with multilingual support
        this.services = [
            {
                id: 'haircut',
                name: {
                    en: 'Classic Haircut',
                    es: 'Corte Clásico'
                },
                description: {
                    en: 'Professional haircut with styling',
                    es: 'Corte profesional con peinado'
                },
                price: 35,
                duration: 45,
                category: 'haircut'
            },
            {
                id: 'beard-trim',
                name: {
                    en: 'Beard Trim & Shape',
                    es: 'Recorte y Forma de Barba'
                },
                description: {
                    en: 'Precision beard trimming and shaping',
                    es: 'Recorte y moldeado de barba de precisión'
                },
                price: 25,
                duration: 30,
                category: 'beard'
            },
            {
                id: 'hot-towel-shave',
                name: {
                    en: 'Hot Towel Shave',
                    es: 'Afeitado con Toalla Caliente'
                },
                description: {
                    en: 'Traditional hot towel shave experience',
                    es: 'Experiencia tradicional de afeitado con toalla caliente'
                },
                price: 40,
                duration: 45,
                category: 'shave'
            },
            {
                id: 'haircut-beard',
                name: {
                    en: 'Haircut + Beard Combo',
                    es: 'Combo Corte + Barba'
                },
                description: {
                    en: 'Complete grooming package',
                    es: 'Paquete completo de arreglo personal'
                },
                price: 50,
                duration: 75,
                category: 'combo'
            },
            {
                id: 'kids-cut',
                name: {
                    en: 'Kids Haircut',
                    es: 'Corte para Niños'
                },
                description: {
                    en: 'Haircut for children under 12',
                    es: 'Corte de cabello para niños menores de 12 años'
                },
                price: 25,
                duration: 30,
                category: 'haircut'
            },
            {
                id: 'senior-cut',
                name: {
                    en: 'Senior Haircut',
                    es: 'Corte para Adultos Mayores'
                },
                description: {
                    en: 'Haircut for seniors (65+)',
                    es: 'Corte de cabello para adultos mayores (65+)'
                },
                price: 30,
                duration: 45,
                category: 'haircut'
            }
        ];
    }

    renderServices() {
        const servicesGrid = document.getElementById('servicesGrid');
        const serviceSelect = document.getElementById('serviceSelect');
        
        if (!servicesGrid) return;

        // Get current language from i18n system
        const currentLang = document.documentElement.lang || 'en';
        
        // Clear existing content
        servicesGrid.innerHTML = '';
        
        // Render service cards
        this.services.forEach(service => {
            const serviceCard = this.createServiceCard(service, currentLang);
            servicesGrid.appendChild(serviceCard);
        });

        // Update service select options
        if (serviceSelect) {
            // Clear existing options except the first one
            const firstOption = serviceSelect.querySelector('option[value=""]');
            serviceSelect.innerHTML = '';
            if (firstOption) {
                serviceSelect.appendChild(firstOption);
            }

            this.services.forEach(service => {
                const option = document.createElement('option');
                option.value = service.id;
                option.textContent = `${service.name[currentLang]} - $${service.price}`;
                serviceSelect.appendChild(option);
            });
        }
    }

    createServiceCard(service, language) {
        const card = document.createElement('div');
        card.className = 'service-card';
        
        const durationText = language === 'es' ? 'min' : 'min';
        
        card.innerHTML = `
            <h3>${service.name[language]}</h3>
            <div class="price">$${service.price}</div>
            <div class="duration">${service.duration} ${durationText}</div>
            <p>${service.description[language]}</p>
        `;
        
        return card;
    }

    getServiceById(id) {
        return this.services.find(service => service.id === id);
    }

    getServices() {
        return this.services;
    }
}