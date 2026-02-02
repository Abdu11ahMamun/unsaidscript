/**
 * Footer component
 * @module components/layout/Footer
 */

import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS } from "../../utils";

/**
 * Footer with social links and copyright
 * @returns {JSX.Element} Footer element
 * @example
 * <Footer />
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
  };

  return (
    <footer className="border-t border-white/10 bg-black/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-xl font-black text-white">UnsaidScript</div>
            <div className="mt-1 text-sm text-gray-500">by Abdullah Al Mamun</div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = socialIcons[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-cyan-400 hover:text-cyan-400"
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {currentYear} UnsaidScript. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
