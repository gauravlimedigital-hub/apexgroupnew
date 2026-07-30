/**
 * js/form-logic.js
 * Handles gated brochure downloads, form validation, and lead submission mock.
 */

function initFormLogic() {
    initBrochureTriggers();
    initFormValidation();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormLogic);
} else {
    initFormLogic();
}

function initBrochureTriggers() {
    const triggers = document.querySelectorAll('.brochure-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check session storage
            if (sessionStorage.getItem('elyriaBrochureUnlocked') === 'true') {
                triggerDownload();
            } else {
                // Scroll to form and focus first input
                const formElement = document.getElementById('enquiry-form');
                if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Focus first input after a slight delay to allow scroll to complete
                    setTimeout(() => {
                        const firstInput = formElement.querySelector('input[name="name"]');
                        if (firstInput) firstInput.focus();
                    }, 500);
                }
            }
        });
    });
}

function initFormValidation() {
    const forms = document.querySelectorAll('.enquiry-form');
    if (!forms.length) return;

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm(form)) {
                submitLead(form);
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    clearErrors(form);

    // Validate Name
    const nameInput = form.querySelector('input[name="name"]');
    if (nameInput && nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters.');
        isValid = false;
    }

    // Validate Mobile
    const mobileInput = form.querySelector('input[name="mobile"]');
    const mobileRegex = /^\d{10}$/;
    if (mobileInput && !mobileRegex.test(mobileInput.value.trim())) {
        showError(mobileInput, 'Enter a valid 10-digit mobile number.');
        isValid = false;
    }

    // Validate Email (Optional in some forms, required if marked)
    const emailInput = form.querySelector('input[name="email"]');
    if (emailInput && emailInput.required) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Enter a valid email address.');
            isValid = false;
        }
    } else if (emailInput && emailInput.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Enter a valid email address.');
            isValid = false;
        }
    }

    // Validate Apartment Type
    const bhkInput = form.querySelector('[name="bhk"]');
    if (bhkInput && bhkInput.value === "") {
        showError(bhkInput, 'Please select an apartment type.');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    input.classList.add('input-error');
    const errorSpan = input.parentElement.querySelector('.form-error');
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('visible');
    }
}

function clearErrors(form) {
    const inputs = form.querySelectorAll('.input-error');
    inputs.forEach(input => input.classList.remove('input-error'));
    
    const errorSpans = form.querySelectorAll('.form-error.visible');
    errorSpans.forEach(span => {
        span.textContent = '';
        span.classList.remove('visible');
    });
}

function submitLead(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const spinner = submitBtn ? submitBtn.querySelector('.loading-spinner') : null;
    
    // Disable button & show loading state
    if(submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (spinner) spinner.style.display = 'inline-block';

    // Mock API Call (1.5 seconds)
    setTimeout(() => {
        // Fire Conversion Hooks
        fireConversionEvents();

        // Unlock session for both brochure and floor plans
        sessionStorage.setItem('elyriaBrochureUnlocked', 'true');
        sessionStorage.setItem('elyriaFloorPlanUnlocked', 'true');

        // Show Success Message
        showSuccessMessage(form);

        // Reset Form & Button
        form.reset();
        if(submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline-block';
        if (spinner) spinner.style.display = 'none';

        // ALWAYS trigger brochure download for EVERY single form submission
        triggerDownload();

        // Check if there was a pending floor plan view requested
        if (typeof openFloorPlanModal === 'function' && window.pendingFloorPlanImg) {
            const activeModal = form.closest('.modal');
            setTimeout(() => {
                if (activeModal) {
                    activeModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
                openFloorPlanModal(window.pendingFloorPlanImg, window.pendingFloorPlanTitle);
            }, 1200);
        } else if (form.closest('.modal')) {
            const activeModal = form.closest('.modal');
            setTimeout(() => {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }, 3500);
        }

    }, 1500);
}

function showSuccessMessage(form) {
    const successMsg = form.parentElement.querySelector('.success-message');
    const formHeading = form.parentElement.querySelector('h3');
    
    // Hide form elements and show success
    form.style.display = 'none';
    if(formHeading) formHeading.style.display = 'none';
    if(successMsg) successMsg.style.display = 'block';

    // Auto-hide after 4 seconds
    setTimeout(() => {
        if(successMsg) successMsg.style.display = 'none';
        form.style.display = 'block';
        if(formHeading) formHeading.style.display = 'block';
    }, 4000);
}

function triggerDownload() {
    const fileUrl = 'assets/brochure /Elyria Brochure.pdf';
    
    // Create invisible anchor tag to trigger download
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'Elyria-Brochure.pdf';
    a.target = '_blank';
    document.body.appendChild(a);
    
    try {
        a.click();
    } catch (e) {
        // Fallback for strict browsers
        window.open(fileUrl, '_blank');
    }
    
    setTimeout(() => {
        if (a && a.parentNode) {
            document.body.removeChild(a);
        }
    }, 500);
}

function fireConversionEvents() {
    /**
     * Reusable hooks for marketing scripts.
     * Easy to integrate GTM and Meta tags here.
     */
    
    // Google Tag Manager Hook
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'lead_submission',
            'form_name': 'Elyria Register Interest'
        });
    }

    // Google Ads Conversion Hook (Placeholder)
    // gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXX/YYYYYYYYYYYY'});

    // Meta Pixel Hook
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
        fbq('track', 'CompleteRegistration');
    }
    
    console.log('[Analytics] Conversion events fired.');
}
