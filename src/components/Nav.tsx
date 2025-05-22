import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = isScrolled
    ? "text-white hover:text-indigo-500"
    : "text-white hover:text-indigo-300";

  const dropdownClass =
    "absolute left-0 top-full mt-2 flex-col bg-white text-gray-800 rounded-md shadow-lg z-50 py-4 px-6 min-w-[200px]";

  const handleEnter = (menu) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 250); // delay closing so user can hover into dropdown
  };

  const renderDropdown = (items, menu) => (
    <div
      className={dropdownClass}
      onMouseEnter={() => handleEnter(menu)}
      onMouseLeave={handleLeave}
    >
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="block mt-1 first:mt-0 hover:text-indigo-600"
        >
          {item.label}
        </a>
      ))}
    </div>
  );

  return (
    <nav
      className={`fixed w-full top-5 z-40 transition-colors duration-300 ${
        isScrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-12">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <span className="text-2xl select-none text-indigo-600">⚡</span>
            <span className="text-lg font-semibold select-none text-white">LEADA AI</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 font-medium items-center">
            {/* Features */}
            <div
              className="relative"
              onMouseEnter={() => handleEnter("features")}
              onMouseLeave={handleLeave}
            >
              <button className={navLinkClass}>Features</button>
              {openDropdown === "features" &&
                renderDropdown(
                  [
                    { href: "/features/ai-analytics", label: "AI Analytics" },
                    { href: "/features/dashboards", label: "Custom Dashboards" },
                    { href: "/features/feedback", label: "User Feedback" },
                    { href: "/features/insights", label: "Real-Time Insights" },
                  ],
                  "features"
                )}
            </div>

            {/* Pricing */}
            <a href="/pricing" className={`transition duration-200 ${navLinkClass}`}>
              Pricing
            </a>

            {/* Solutions */}
            <div
              className="relative"
              onMouseEnter={() => handleEnter("solutions")}
              onMouseLeave={handleLeave}
            >
              <button className={navLinkClass}>Solutions</button>
              {openDropdown === "solutions" &&
                renderDropdown(
                  [
                    { href: "/solutions/ecommerce", label: "E-commerce" },
                    { href: "/solutions/saas", label: "SaaS Platforms" },
                    { href: "/solutions/enterprise", label: "Enterprise" },
                    { href: "/solutions/startups", label: "Startups" },
                  ],
                  "solutions"
                )}
            </div>

            {/* Resources */}
            <div
              className="relative"
              onMouseEnter={() => handleEnter("resources")}
              onMouseLeave={handleLeave}
            >
              <button className={navLinkClass}>Resources</button>
              {openDropdown === "resources" &&
                renderDropdown(
                  [
                    { href: "/blog", label: "Blog" },
                    { href: "/help-center", label: "Help Center" },
                    { href: "/docs", label: "Documentation" },
                    { href: "/community", label: "Community" },
                  ],
                  "resources"
                )}
            </div>
          </div>

          {/* Signup and Login Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => (window.location.href = "/signup")}
              className={`px-4 py-1.5 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                isScrolled
                  ? "bg-transparent border border-white text-white hover:bg-white hover:text-black"
                  : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              }`}
            >
              Sign Up
            </button>

            <button
              onClick={() => (window.location.href = "/login")}
              className={`px-4 py-1.5 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                isScrolled
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              }`}
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden focus:outline-none ${isScrolled ? "text-gray-700" : "text-white"}`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4 space-y-2">
          <a href="/features" className="block hover:text-indigo-400">
            Features
          </a>
          <a href="/pricing" className="block hover:text-indigo-400">
            Pricing
          </a>
          <a href="/solutions" className="block hover:text-indigo-400">
            Solutions
          </a>
          <a href="/resources" className="block hover:text-indigo-400">
            Resources
          </a>
          <a href="/login" className="block hover:text-indigo-400 font-medium">
            Login
          </a>
          <a href="/signup" className="block font-bold text-indigo-400">
            Sign Up
          </a>
        </div>
      )}
    </nav>
  );
};

export default Nav;
