"use client";

import Link from "next/link";
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
    <header className="bg-bone-700 sticky top-0 z-50 py-5">
      {/* Main header always visible */}
      <div className="py-4 px-6 md:px-12">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/">Logo</Link>
            <span className="text-2xl font-semibold text-bone-200">
              Therapy with Jasdeep
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="menu-button text-bone-200 hover:text-bone-100 transition-colors p-2 rounded-full hover:bg-bone-800/10 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link
              href="/calendar"
              className="bg-giants-orange hover:bg-giants-orange-300 text-white px-4 py-2 rounded-md shadow-lg transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable navigation section */}
      <div
        className={`header-content overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-6 md:px-12 py-4 bg-bone-700 backdrop-blur-sm">
          <ul className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            <li>
              <Link
                href="/about"
                className="block text-lg text-bone-200 hover:text-giants-orange transition-colors py-3 px-4 rounded-md hover:bg-bone-700/10"
                onClick={() => setIsMenuOpen(false)}
              >
                About Jasdeep
              </Link>
            </li>
            <li>
              <Link
                href="/therapy-with-jasdeep"
                className="block text-lg text-bone-200 hover:text-giants-orange transition-colors py-3 px-4 rounded-md hover:bg-bone-700/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Therapy With Jasdeep
              </Link>
            </li>
            <li>
              <Link
                href="/workshops"
                className="block text-lg text-bone-200 hover:text-giants-orange transition-colors py-3 px-4 rounded-md hover:bg-bone-700/10"
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
