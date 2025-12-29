"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      function handleClickOutside(e) {
        if (
          !e.target.closest(".header-content") &&
          !e.target.closest(".menu-button")
        ) {
          setIsMenuOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-white sticky top-0 z-50 py-5 shadow-sm">
      {/* Main header always visible */}
      <div className="py-4 px-6 md:px-12">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/jasdeep-logo.png"
              alt="Jasdeep Mago - Neuropsychologist, Psychotherapist & Relationship Coach"
              width={200}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            <button
              className="menu-button text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <a
              href="https://wa.me/919004025163"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#fa5719] hover:bg-[#fb7a47] text-white px-4 py-2 rounded-md shadow-lg transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>

      {/* Expandable navigation section */}
      <div
        className={`header-content overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-6 md:px-12 py-4 bg-white backdrop-blur-sm border-t border-gray-200">
          <ul className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            <li>
              <Link
                href="/about"
                className="block text-lg text-gray-700 hover:text-[#fa5719] transition-colors py-3 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                About Jasdeep
              </Link>
            </li>
            <li>
              <Link
                href="/therapy-with-jasdeep"
                className="block text-lg text-gray-700 hover:text-[#fa5719] transition-colors py-3 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Therapy With Jasdeep
              </Link>
            </li>
            <li>
              <Link
                href="/workshops"
                className="block text-lg text-gray-700 hover:text-[#fa5719] transition-colors py-3 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Workshops
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
