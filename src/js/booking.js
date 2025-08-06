export class BookingSystem {
    constructor() {
        this.modal = null;
        this.form = null;
        this.successMessage = null;
        this.businessHours = {
            monday: { open: '09:00', close: '19:00' },
            tuesday: { open: '09:00', close: '19:00' },
            wednesday: { open: '09:00', close: '19:00' },
            thursday: { open: '09:00', close: '19:00' },
            friday: { open: '09:00', close: '20:00' },
            saturday: { open: '08:00', close: '18:00' },
            sunday: { closed: true }
        };
    }

    init() {
        this.modal = document.getElementById('bookingModal');
        this.form = document.getElementById('bookingForm');
        this.successMessage = document.getElementById('successMessage');
        
        this.setupEventListeners();
        this.setupDateRestrictions();
    }

    setupEventListeners() {
        // Modal close buttons
        const closeModal = document.getElementById('closeModal');
        const cancelBooking = document.getElementById('cancelBooking');
        const closeSuccess = document.getElementById('closeSuccess');

        closeModal?.addEventListener('click', () => this.closeModal());
        cancelBooking?.addEventListener('click', () => this.closeModal());
        closeSuccess?.addEventListener('click', () => this.closeSuccessMessage());

        // Close modal when clicking outside
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Form submission
        this.form?.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Date change handler
        const dateInput = document.getElementById('appointmentDate');
        dateInput?.addEventListener('change', () => this.updateAvailableTimeSlots());

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeSuccessMessage();
            }
        });
    }

    setupDateRestrictions() {
        const dateInput = document.getElementById('appointmentDate');
        if (!dateInput) return;

        // Set minimum date to today
        const today = new Date();
        const minDate = today.toISOString().split('T')[0];
        dateInput.min = minDate;

        // Set maximum date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    openModal() {
        this.modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = this.form?.querySelector('input');
        firstInput?.focus();
    }

    closeModal() {
        this.modal?.classList.remove('active');
        document.body.style.overflow = '';
        this.form?.reset();
    }

    closeSuccessMessage() {
        this.successMessage?.classList.remove('active');
        document.body.style.overflow = '';
    }

    updateAvailableTimeSlots() {
        const dateInput = document.getElementById('appointmentDate');
        const timeSelect = document.getElementById('appointmentTime');
        
        if (!dateInput || !timeSelect || !dateInput.value) return;

        const selectedDate = new Date(dateInput.value);
        const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'lowercase' });
        
        // Clear existing options
        timeSelect.innerHTML = '<option value="" data-i18n="booking.selectTime">Select a time</option>';
        timeSelect.innerHTML = '<option value="" data-i18n="selectTime">Select a time</option>';

        // Check if the day is closed
        if (this.businessHours[dayName]?.closed) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Closed';
            option.disabled = true;
            timeSelect.appendChild(option);
            return;
        }

        // Generate time slots
        const hours = this.businessHours[dayName];
        if (hours) {
            const timeSlots = this.generateTimeSlots(hours.open, hours.close);
            
            timeSlots.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = this.formatTime(time);
                timeSelect.appendChild(option);
            });
        }
    }

    generateTimeSlots(openTime, closeTime) {
        const slots = [];
        const [openHour, openMinute] = openTime.split(':').map(Number);
        const [closeHour, closeMinute] = closeTime.split(':').map(Number);
        
        let currentHour = openHour;
        let currentMinute = openMinute;
        
        while (currentHour < closeHour || (currentHour === closeHour && currentMinute < closeMinute)) {
            const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
            slots.push(timeString);
            
            // Add 30 minutes
            currentMinute += 30;
            if (currentMinute >= 60) {
                currentMinute = 0;
                currentHour++;
            }
        }
        
        return slots;
    }

    formatTime(time) {
        const [hour, minute] = time.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const bookingData = {
            customerName: formData.get('customerName'),
            customerEmail: formData.get('customerEmail'),
            customerPhone: formData.get('customerPhone'),
            service: formData.get('service'),
            appointmentDate: formData.get('appointmentDate'),
            appointmentTime: formData.get('appointmentTime'),
            notes: formData.get('notes') || '',
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        try {
            // Show loading state
            const submitButton = this.form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Booking...';
            submitButton.disabled = true;

            // Here you would typically send the data to your backend
            // For now, we'll simulate the booking process
            await this.simulateBooking(bookingData);
            
            // Close modal and show success message
            this.closeModal();
            this.showSuccessMessage();
            
            // Reset form
            this.form.reset();
            
        } catch (error) {
            console.error('Booking error:', error);
            alert('There was an error booking your appointment. Please try again.');
        } finally {
            // Reset button state
            const submitButton = this.form.querySelector('button[type="submit"]');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async simulateBooking(bookingData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store booking data locally for demo purposes
        const bookings = JSON.parse(localStorage.getItem('longevity-bookings') || '[]');
        bookings.push({
            ...bookingData,
            id: Date.now().toString()
        });
        localStorage.setItem('longevity-bookings', JSON.stringify(bookings));
        
        // In a real application, you would:
        // 1. Send data to Supabase
        // 2. Send confirmation email
        // 3. Create calendar event
        // 4. Send SMS notification (optional)
        
        console.log('Booking created:', bookingData);
    }

    showSuccessMessage() {
        this.successMessage?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Method to integrate with Supabase (for future implementation)
    async saveToSupabase(bookingData) {
        // This would be implemented when Supabase is connected
        // const { data, error } = await supabase
        //     .from('bookings')
        //     .insert([bookingData]);
        
        // if (error) throw error;
        // return data;
    }

    // Method to send confirmation email (for future implementation)
    async sendConfirmationEmail(bookingData) {
        // This would be implemented with an email service
        // Could use Supabase Edge Functions to send emails
    }

    // Method to create calendar event (for future implementation)
    async createCalendarEvent(bookingData) {
        // This would integrate with Google Calendar API
        // or create an .ics file for download
    }
}