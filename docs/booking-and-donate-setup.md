# Booking + Donate Integration

## Link the existing Booking button

- If form is on the same page, set href="#booking".
- If using a dedicated booking page, set href="/book.html".

## Donate Button

```html
<a
  class="btn btn-donate"
  href="https://www.paypal.com/donate/?hosted_button_id=5DMVN4V3BNK64"
  target="_blank"
  rel="noopener noreferrer"
>
Donate
</a>
```

```css
.btn-donate {
background:#0070ba;
color:#fff;
padding:0.8rem 1.2rem;
border-radius:6px;
text-decoration:none;
font-weight:600;
}
.btn-donate:hover { background:#005c94; }
```

## Netlify Booking Form

```html
<section id="booking" class="booking-section">
  <h2>Book Your Appointment</h2>
  <form
    name="barber-booking"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="barber-booking" />
    <p class="hidden">
      <label>Don't fill this out: <input name="bot-field" /></label>
    </p>
    <div class="form-row">
      <label for="name">Full Name</label>
      <input id="name" name="name" type="text" required />
    </div>
    <div class="form-row">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />
    </div>
    <div class="form-row">
      <label for="phone">Phone</label>
      <input id="phone" name="phone" type="tel" placeholder="(###) ###-####" />
    </div>
    <div class="form-row">
      <label for="service">Service</label>
      <select id="service" name="service" required>
        <option value="">Select a service...</option>
        <option value="mens_haircut">Men's Haircut</option>
        <option value="beard_trim">Beard Trim</option>
        <option value="head_shave">Head Shave</option>
      </select>
    </div>
    <div class="form-row">
      <label for="barber">Preferred Barber (optional)</label>
      <select id="barber" name="barber">
        <option value="">No preference</option>
        <option value="KC">KC</option>
        <option value="Any">Any available</option>
      </select>
    </div>
    <div class="form-row">
      <label for="date">Preferred Date</label>
      <input id="date" name="date" type="date" required />
    </div>
    <div class="form-row">
      <label for="time">Preferred Time</label>
      <input id="time" name="time" type="time" required />
    </div>
    <div class="form-row">
      <label for="notes">Notes</label>
      <textarea id="notes" name="notes" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit Booking</button>
    <p class="success-message" hidden>Thank you! Your booking has been received.</p>
    <p class="error-message" hidden>Something went wrong. Please try again.</p>
  </form>
</section>
```

```javascript
<script>
  (function() {
    const date = document.getElementById('date');
    if (!date) return;
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    date.min = min.toISOString().split('T')[0];
  })();
</script>
```

```css
.booking-section { padding:4rem 1.5rem; background:#f8f8f8; }
.form-row { margin-bottom:1rem; }
label { display:block; font-weight:600; margin-bottom:.35rem; }
input,select,textarea { width:100%; padding:.9rem; border:1px solid #e2e2e2; border-radius:6px; }
.btn-primary { background:#1a1a1a; color:#fff; border:none; padding:.9rem 1.4rem; border-radius:6px; cursor:pointer; }
.btn-primary:hover { background:#2b2b2b; }
.hidden { display:none; }
```

## Netlify Steps

1) Deploy site with the form present in HTML.
2) Site → Forms: confirm "barber-booking" is detected.
3) Forms → Notifications: add Email to KC's email.
4) (Optional) Add Outgoing Webhook to your automation tool; map fields to Google Calendar "create event".
5) Submit a test and verify email and calendar.

## Notes

- Keep form name and input name attributes stable.
- If your navbar Booking button already exists, just set href to "#booking" or "/book.html".
- For bilingual sites, translate labels but keep the input name attributes unchanged.

## Implementation Status

✅ **Completed:**
- Wired existing "Book Appointment" button to scroll to #booking section
- Added PayPal donate button with proper styling
- Created Netlify-compatible booking form with all required fields
- Added smooth scrolling behavior
- Set minimum date to tomorrow for bookings
- Updated logo to use lgnvty.png
- Removed old modal booking system in favor of simple form

✅ **Next Steps for Netlify:**
1. Deploy the updated site
2. Go to Netlify Dashboard → Site → Forms
3. Confirm "barber-booking" form is detected
4. Add email notification to KC's email address
5. Test the form submission