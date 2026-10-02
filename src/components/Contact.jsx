import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  
  // React Form State tracking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big background text
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  // State for submission feedback
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const triggerMailto = () => {
    const subject = encodeURIComponent(`Portfolio Message from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(`Sender Name: ${formData.firstName} ${formData.lastName}\nSender Email: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:yashsanjaynawal810@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  // Handle form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.permission) {
      alert("Please check the permission checkbox before sending.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(`Hi Yash,\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);

    // Open Gmail web composer pre-filled with Yash's email address and message
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=yashsanjaynawal810@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');

    // Also fallback trigger mailto for default email app
    setTimeout(() => {
      window.location.href = `mailto:yashsanjaynawal810@gmail.com?subject=${subject}&body=${body}`;
    }, 500);

    setSubmitted(true);
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0b0b0b] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-white/10 select-none">
      
      {/* Background Cinematic Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Huge Background Parallax Netflix Watermark Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-10"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-red-600 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#141414]/95 backdrop-blur-2xl border-t border-l border-white/15 w-full md:w-[90%] lg:w-[82%] p-8 md:p-16 text-white flex flex-col justify-between rounded-tl-[3rem] shadow-[0_-25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Subtle internal top crimson highlight glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90"></div>

          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-red-600/10 border border-red-600/30 text-xs font-mono uppercase tracking-widest text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span>EPISODE 04 // GET IN TOUCH</span>
            </div>
            <span className="text-xs font-mono text-white/40 tracking-wider hidden md:block">
              // DIRECT TRANSMISSION TO YASH
            </span>
          </div>

          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-600 flex items-center justify-center text-red-500 shadow-[0_0_30px_rgba(229,9,20,0.5)]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">Email Client Opened!</h3>
              <p className="text-sm text-white/70 max-w-md font-light">
                Your email has been prefilled and addressed to <strong className="text-red-500 font-mono">yashsanjaynawal810@gmail.com</strong>. Simply hit <strong className="text-white">Send</strong> in your email window!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="mailto:yashsanjaynawal810@gmail.com"
                  className="px-6 py-2.5 rounded bg-red-600 hover:bg-red-700 text-xs font-mono uppercase tracking-widest text-white transition-all shadow-[0_0_15px_rgba(229,9,20,0.5)]"
                >
                  Direct Email Address
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-widest text-white border border-white/20 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
              <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
                
                {/* Left Column */}
                <div className="flex-1 flex flex-col gap-10">
                  <div className="relative">
                    <input 
                      type="text" 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name" 
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name" 
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email Address" 
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex-1 flex flex-col">
                  <div className="relative h-full flex flex-col">
                    <textarea 
                      id="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..." 
                      required
                      className="w-full h-full min-h-[140px] bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium resize-none rounded-none text-white"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col md:flex-row gap-12 mt-4 pt-6 border-t border-white/10">
                {/* Left text */}
                <div className="flex-1 flex items-start gap-4 text-sm font-light text-white/70">
                  <input 
                    type="checkbox" 
                    id="permission" 
                    checked={formData.permission}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded-sm border-white/30 bg-transparent text-red-600 focus:ring-0 focus:ring-offset-0 cursor-pointer" 
                    style={{ accentColor: "#E50914" }}
                  />
                  <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                    I give permission to deliver this message directly to yashsanjaynawal810@gmail.com.
                  </label>
                </div>

                {/* Right text & button */}
                <div className="flex-1 flex flex-col gap-8 text-xs text-white/50 font-light">
                  <p className="leading-relaxed max-w-[400px]">
                    Direct transmission system configured for <strong className="text-white">yashsanjaynawal810@gmail.com</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                    <p className="max-w-[250px] leading-relaxed">
                      Ready to start a project or collaboration? Send a direct signal.
                    </p>
                    
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="px-8 py-3.5 rounded bg-red-600 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-700 transition-all duration-300 group whitespace-nowrap shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 disabled:opacity-50"
                    >
                      {submitting ? "Transmitting..." : "Send Message"}
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;