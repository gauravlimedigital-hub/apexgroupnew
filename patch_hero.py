import re

html_code = """    <!-- 1. Hero Section -->
    <section id="hero" class="hero">
        <div class="hero-media-wrapper">
            <div class="hero-bg"></div>
            <!-- CSS Fog Layers -->
            <div class="fog-layer fog-1"></div>
            <div class="fog-layer fog-2"></div>
            <div class="hero-overlay"></div>
            <div class="hero-bottom-gradient"></div>
        </div>
        <div class="container hero-grid">
            <div class="hero-content reveal-up">
                <span class="caption premium-label">PREMIUM BIOPHILIC RESIDENCES</span>
                <h1>Experience<br>Biophilic Living</h1>
                <div class="hero-divider"></div>
                <div class="hero-location">in Siddharth Vihar</div>
                <p class="subheading">Premium 3 & 4 BHK Residences<br>Inspired by Nature.<br>Starting from ₹2.5 Cr.</p>
                
                <div class="hero-actions">
                    <a href="#contact" class="btn-primary btn-with-icon">
                        BOOK SITE VISIT
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <a href="#" class="btn-secondary dark brochure-trigger btn-with-icon">
                        DOWNLOAD BROCHURE
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                    </a>
                </div>
                
                <div class="usp-row">
                    <div class="usp-card">
                        <div class="usp-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C12 2 4 6 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13C20 6 12 2 12 2Z"></path><path d="M12 21V11"></path></svg>
                        </div>
                        <div class="usp-content">
                            <span class="usp-number">80%</span>
                            <span class="usp-text">OPEN GREENS</span>
                        </div>
                    </div>
                    <div class="usp-card">
                        <div class="usp-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21L21 21"></path><path d="M5 21V7L13 3V21"></path><path d="M19 21V11L13 7"></path></svg>
                        </div>
                        <div class="usp-content">
                            <span class="usp-number">35,000</span>
                            <span class="usp-text">SQ.FT CLUBHOUSE</span>
                        </div>
                    </div>
                    <div class="usp-card">
                        <div class="usp-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path><path d="M2 12H22"></path><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"></path></svg>
                        </div>
                        <div class="usp-content">
                            <span class="usp-number">43</span>
                            <span class="usp-text">ACRES GREEN VIEW</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="hero-form-wrapper reveal-up delay-1">
                <div class="glass-form">
                    <h3>Register Interest</h3>
                    <div class="ornate-divider">
                        <span></span>
                        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="var(--color-accent-gold)" stroke-width="1"><path d="M12 2L15 8H9L12 2Z"/><circle cx="12" cy="5" r="1" fill="var(--color-accent-gold)"/></svg>
                        <span></span>
                    </div>
                    
                    <div id="form-success-msg" class="success-message" style="display: none;">
                        <h4>Thank you.</h4>
                        <p>Your brochure is downloading.</p>
                        <p>Our relationship manager will contact you shortly.</p>
                    </div>
                    
                    <form class="enquiry-form" id="enquiry-form" novalidate>
                        <div class="form-group has-icon">
                            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <input type="text" name="name" placeholder="Your Name" required>
                            <span class="form-error"></span>
                        </div>
                        
                        <div class="form-group has-icon">
                            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <input type="tel" name="mobile" placeholder="Mobile Number" required>
                            <span class="form-error"></span>
                        </div>
                        
                        <div class="form-group has-icon">
                            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <input type="email" name="email" placeholder="Email Address" required>
                            <span class="form-error"></span>
                        </div>
                        
                        <div class="form-group has-icon">
                            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            <select name="bhk" required>
                                <option value="" disabled selected>Apartment Type</option>
                                <option value="3BHK">3 BHK</option>
                                <option value="4BHK">4 BHK</option>
                            </select>
                            <span class="form-error"></span>
                        </div>

                        <div class="bhk-buttons">
                            <button type="button" class="bhk-btn" onclick="document.querySelector('select[name=\'bhk\']').value='3BHK'">3 BHK</button>
                            <button type="button" class="bhk-btn" onclick="document.querySelector('select[name=\'bhk\']').value='4BHK'">4 BHK</button>
                        </div>
                        
                        <button type="submit" id="submit-btn" class="btn-primary full-width btn-with-icon">
                            <span class="btn-text">DOWNLOAD BROCHURE</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            <span class="loading-spinner" style="display: none;"></span>
                        </button>

                        <div class="privacy-note">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            Your information is safe with us
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>"""

with open('index.html', 'r') as f:
    content = f.read()

pattern = re.compile(r'<!-- 1\. Hero Section -->.*?</section>', re.DOTALL)
new_content = pattern.sub(html_code, content, count=1)

with open('index.html', 'w') as f:
    f.write(new_content)

