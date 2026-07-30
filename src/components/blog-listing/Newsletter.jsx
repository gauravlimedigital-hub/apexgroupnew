import React, { useState } from 'react';
import { Container } from '../ui/Container';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="newsletter-section py-[60px] mb-[80px] bg-[#FAFAFA]" aria-labelledby="newsletter-heading">
      <Container>
        <div className="newsletter-box bg-[#101F43] rounded-xl p-8 lg:p-12 text-white shadow-xl">
          <div id="newsletter-form-container" className="newsletter-box-grid grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            <div className="newsletter-left-col space-y-3">
              <div className="newsletter-icon-container w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#d7c2a3] text-xl mb-4">
                <i className="fa-regular fa-envelope" aria-hidden="true"></i>
              </div>
              <h2 id="newsletter-heading" className="font-cormorant font-bold text-3xl lg:text-4xl leading-tight">
                Stay Updated with New Property Insights
              </h2>
              <p className="font-poppins text-sm text-[#d9cbc2]">
                Subscribe to receive latest blogs and investment tips.
              </p>
            </div>

            <div className="newsletter-right-col">
              {submitted ? (
                <div className="newsletter-success bg-white/10 p-6 rounded-xl border border-[#d7c2a3]/40 text-center space-y-2">
                  <i className="fa-solid fa-circle-check text-3xl text-[#d7c2a3]" aria-hidden="true"></i>
                  <h4 className="font-poppins font-semibold text-lg text-white">Thank you for subscribing!</h4>
                  <p className="font-poppins text-xs text-[#d9cbc2]">You'll receive our latest real estate guides directly in your inbox.</p>
                </div>
              ) : (
                <form className="newsletter-form flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit} novalidate>
                  <label htmlFor="newsletter-email-field" className="sr-only">Email address for subscription</label>
                  <input
                    type="email"
                    id="newsletter-email-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    aria-label="Email address for subscription"
                    className="flex-grow h-[52px] px-5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/60 font-poppins text-sm focus:outline-none focus:border-[#d7c2a3]"
                  />
                  <button
                    type="submit"
                    className="btn-primary newsletter-btn h-[52px] px-8 bg-[#d7c2a3] text-[#111f43] font-poppins font-semibold text-sm rounded-lg hover:bg-[#c8b08f] transition-colors shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
