import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Container } from '../ui/Container';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#101F43] border-t border-[#354773] text-white mt-auto w-full">
      <Container className="pt-12 pb-[110px] md:pb-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] items-start gap-8 lg:gap-[44px]">
          {/* Column 1: Logo & Description side-by-side block */}
          <div className="flex flex-row items-start gap-7">
            <a href="https://www.theapexgroup.in/" target="_blank" rel="noopener noreferrer" aria-label="Visit Apex Home" className="shrink-0 mt-0.5">
              <img src="/logo.png" alt="Apex Logo" className="w-[110px] sm:w-[128px] h-auto object-contain" />
            </a>
            <p className="w-[320px] max-w-[320px] font-poppins text-[16px] font-normal leading-[1.8] text-white/85">
              For over 28 years, The Apex Group has delivered landmark residential and commercial developments across Delhi NCR, driven by one belief: We Commit, We Deliver.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-[16px] leading-[1.2] tracking-normal text-white mb-[14px]">Quick Links</h4>
            <ul className="flex flex-col space-y-[10px] font-poppins text-[15px] font-normal leading-[1.9] text-white/88">
              <li><a href="https://www.theapexgroup.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">Home</a></li>
              <li><a href="https://theapexgroup.in/why-us.php" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">About</a></li>
              <li><a href="https://theapexgroup.in/#testimonials" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">Testimonials</a></li>
              <li><a href="https://theapexgroup.in/contact-us.php" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">Contact</a></li>
              <li><a href="https://theapexgroup.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">Become a Partner</a></li>
            </ul>
          </div>

          {/* Column 3: Projects */}
          <div>
            <h4 className="font-poppins font-bold text-[16px] leading-[1.2] tracking-normal text-white mb-[14px]">Projects</h4>
            <ul className="flex flex-col space-y-[10px] font-poppins text-[15px] font-normal leading-[1.9] text-white/88">
              <li><a href="https://www.theapexgroup.in/qubec.php" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">Apex Quebec</a></li>
              <li><a href="https://www.theapexgroup.in/drio.php" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">Apex D’Rio</a></li>
              <li><a href="https://www.theapexgroup.in/apexKremlin.php" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">Apex The Kremlin</a></li>
              <li><a href="https://www.theapexgroup.in/apex-alphabet.php" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">Apex Alphabet</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-poppins font-bold text-[16px] leading-[1.2] tracking-normal text-white mb-[14px]">Legal</h4>
            <ul className="flex flex-col space-y-[10px] font-poppins text-[15px] font-normal leading-[1.9] text-white/88">
              <li><a href="https://theapexgroup.in/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors no-underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D6B37A] transition-colors no-underline">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-[#D6B37A] transition-colors no-underline">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom Bar */}
        <div className="border-t border-[#354773] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-5 relative min-h-[48px]">
          {/* Left: Policy Links */}
          <div className="flex items-center gap-3 text-[13px] font-poppins text-white/70 z-10">
            <a href="https://theapexgroup.in/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B37A] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#D6B37A] transition-colors">Cookie Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#D6B37A] transition-colors">Disclaimer</a>
          </div>

          {/* Centered Copyright */}
          <p className="font-poppins text-[13px] font-normal leading-[1.5] text-white/70 text-center md:absolute md:left-1/2 md:-translate-x-1/2 whitespace-nowrap pointer-events-none">
            Copyright &copy; 2026 The Apex Groups. All rights reserved to Apex Heights Pvt. Ltd.
          </p>

          {/* Right: Gold Social Icons + Back to Top Button */}
          <div className="flex items-center gap-5 z-10 ml-auto md:ml-0">
            <div className="flex items-center gap-5">
              <a href="https://www.facebook.com/theapexgroupofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#D6B37A] hover:text-white transition-colors">
                <FaFacebookF className="w-[20px] h-[20px]" />
              </a>
              <a href="https://www.instagram.com/theapexgroupofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#D6B37A] hover:text-white transition-colors">
                <FaInstagram className="w-[20px] h-[20px]" />
              </a>
              <a href="https://www.linkedin.com/company/theapexgroupin/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#D6B37A] hover:text-white transition-colors">
                <FaLinkedinIn className="w-[20px] h-[20px]" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#D6B37A] hover:text-white transition-colors">
                <FaYoutube className="w-[20px] h-[20px]" />
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 border border-[#354773] text-white hover:bg-[#D6B37A] hover:text-[#101F43] transition-all flex items-center justify-center cursor-pointer shrink-0 rounded-sm ml-2"
            >
              <i className="fa-solid fa-arrow-up text-xs" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
