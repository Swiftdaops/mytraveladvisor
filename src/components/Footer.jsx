"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const luxuryEase = [0.22, 1, 0.36, 1];

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-16">
      <motion.div
        className="max-w-7xl mx-auto px-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: luxuryEase }}
        viewport={{ once: true }}
      >
        {/* Logo + Description */}
        <div className="flex flex-col items-start">
          <Image
            src="https://res.cloudinary.com/dnitzkowt/image/upload/v1767082632/ChatGPT_Image_Dec_30__2025__08_12_29_AM-removebg-preview_voi1mz.png"
            alt="My Travel Advisor Logo"
            width={120}
            height={120}
            className="mb-4"
          />
          <span className="font-serif text-lg font-semibold mb-2">My Travel Advisor</span>
          <p className="text-stone-300/90 text-sm font-light max-w-xs">
            Expert travel planning and personalized itineraries to make your trips unforgettable.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-stone-300/90 text-sm font-light">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li>
              <Link href="/who-we-work-with#who-we-work-with-content" className="hover:text-white transition-colors">
                Who We Work With
              </Link>
            </li>
            <li>
              <Link href="/who-we-work-with#why-clients-choose-us" className="hover:text-white transition-colors">
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link href="/who-we-work-with#how-we-work" className="hover:text-white transition-colors">
                Our Process
              </Link>
            </li>
            <li>
              <Link href="/plan-my-trip#inquiry" className="hover:text-white transition-colors">
                Plan Your Trip
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-stone-300/90 text-sm font-light">
            <li>Email: <a href="mailto:contact@mytraveladvisor.com" className="hover:text-white transition-colors">contact@mytraveladvisor.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 234 567 8890</a></li>
            <li>Address: 123 Travel St, Wanderlust City</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="text-stone-300/90 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="text-stone-300/90 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-stone-300/90 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="text-stone-300/90 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        className="mt-12 border-t border-stone-700 pt-6 text-center text-stone-400 text-sm font-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: luxuryEase }}
        viewport={{ once: true }}
      >
        © {new Date().getFullYear()} My Travel Advisor. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
