import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
export function Footer() {
  return (
    <footer className="border-t border-[#354773]/30 bg-[#111f43] pt-8 pb-6 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-8 md:gap-10 lg:gap-8 xl:gap-12 items-start mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7 text-center sm:text-left">
            <div className="shrink-0">
              <a 
                href="https://www.theapexgroup.in/" 
                target="_blank" 
                rel="noopener" 
                aria-label="Visit Apex Home"
                className="inline-block hover:opacity-85 transition-opacity"
              >
                <img 
                  src="/logo.png" 
                  alt="Apex Logo" 
                  className="h-[84px] sm:h-[96px] lg:h-[108px] w-auto object-contain" 
                />
              </a>
            </div>
            <div className="m-0 p-0">
              <p className="m-0 p-0 text-sm text-[#d9cbc2] max-w-[360px] leading-relaxed">
                For over 28 years, The Apex Group has delivered landmark residential and commercial developments across Delhi NCR, driven by one belief: We Commit, We Deliver.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left m-0 p-0">
            <h4 className="m-0 p-0 font-bold text-white mb-3 font-poppins tracking-[0.03em]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#d9cbc2] m-0 p-0 font-poppins">
              <li><a href="https://www.theapexgroup.in/" target="_blank" rel="noopener" className="hover:text-[#d7c2a3] transition-colors duration-300">Home</a></li>
              <li><a href="https://theapexgroup.in/why-us.php" target="_blank" rel="noopener" className="hover:text-[#d7c2a3] transition-colors duration-300">About</a></li>
              <li><span className="cursor-default">Testimonials</span></li>
              <li><a href="https://theapexgroup.in/contact-us.php" target="_blank" rel="noopener" className="hover:text-[#d7c2a3] transition-colors duration-300">Contact</a></li>
              <li><span className="cursor-default">Become a Partner</span></li>
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left m-0 p-0">
            <h4 className="m-0 p-0 font-bold text-white mb-3 font-poppins tracking-[0.03em]">Projects</h4>
            <ul className="space-y-2 text-sm text-[#d9cbc2] m-0 p-0 font-poppins">
              <li><a href="https://www.theapexgroup.in/qubec.php" target="_self" className="hover:text-[#d7c2a3] transition-colors duration-300">Apex Quebec</a></li>
              <li><a href="https://www.theapexgroup.in/drio.php" target="_self" className="hover:text-[#d7c2a3] transition-colors duration-300">Apex D’Rio</a></li>
              <li><a href="https://www.theapexgroup.in/apexKremlin.php" target="_self" className="hover:text-[#d7c2a3] transition-colors duration-300">Apex The Kremlin</a></li>
              <li><a href="https://www.theapexgroup.in/apex-alphabet.php" target="_self" className="hover:text-[#d7c2a3] transition-colors duration-300">Apex Alphabet</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left m-0 p-0">
            <h4 className="m-0 p-0 font-bold text-white mb-3 font-poppins tracking-[0.03em]">Legal</h4>
            <ul className="space-y-2 text-sm text-[#d9cbc2] m-0 p-0 font-poppins">
              <li><a href="https://theapexgroup.in/privacy-policy/" target="_blank" rel="noopener" className="hover:text-[#d7c2a3] transition-colors duration-300">Privacy Policy</a></li>
              <li><span className="cursor-default">Cookie Policy</span></li>
              <li><span className="cursor-default">Disclaimer</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#354773]/30 pt-5 pb-2 mt-2 relative flex flex-col-reverse md:flex-row items-center justify-end min-h-[44px] gap-4">
          <p className="text-[13px] sm:text-sm text-[#d9cbc2]/80 text-center md:absolute md:left-1/2 md:-translate-x-1/2 w-full md:w-auto z-10 font-poppins">
            Copyright &copy; 2026 The Apex Groups. All rights reserved to Apex Heights Pvt. Ltd.
          </p>
          <div className="flex gap-4 sm:gap-5 items-center justify-center md:justify-end z-10">
            <a 
              href="https://www.facebook.com/theapexgroupofficial" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="text-[#d7c2a3] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <FaFacebookF size={22} />
            </a>
            <a 
              href="https://www.instagram.com/theapexgroupofficial/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="text-[#d7c2a3] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <FaInstagram size={22} />
            </a>
            <a 
              href="https://www.linkedin.com/company/theapexgroupin/posts/?feedView=all" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="text-[#d7c2a3] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <FaLinkedinIn size={22} />
            </a>
            <a 
              href="https://www.youtube.com/channel/UC8d5Q5P8BMATTf6cRwc1Q6w" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube"
              className="text-[#d7c2a3] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
