import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = isScrolled
    ? "text-white hover:text-indigo-500"
    : "text-white hover:text-indigo-300";

  const dropdownClass =
    "absolute hidden group-hover:flex flex-col top-10 left-0 bg-white text-gray-800 rounded-md shadow-xl z-50 py-4 px-6 min-w-[200px]";

  return (
    <nav
      className={`fixed w-full top-0 z-40 transition-colors duration-300 ${
        isScrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <span className="text-3xl select-none text-indigo-600">⚡</span>
            <span className={`text-xl font-semibold select-none ${isScrolled ? "text-white" : "text-white"}`}>
              LEADA AI
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-8 font-medium items-center">

            {/* Features Dropdown */}
            <div className="relative group">
              <button className={`transition duration-200 ${navLinkClass}`}>Features</button>
              <div className={dropdownClass}>
                <a href="/features/ai-analytics" className="hover:text-indigo-600">AI Analytics</a>
                <a href="/features/dashboards" className="hover:text-indigo-600 mt-1">Custom Dashboards</a>
                <a href="/features/feedback" className="hover:text-indigo-600 mt-1">User Feedback</a>
                <a href="/features/insights" className="hover:text-indigo-600 mt-1">Real-Time Insights</a>
              </div>
            </div>

            {/* Pricing */}
            <a href="/pricing" className={`transition duration-200 ${navLinkClass}`}>Pricing</a>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className={`transition duration-200 ${navLinkClass}`}>Solutions</button>
              <div className={dropdownClass}>
                <a href="/solutions/ecommerce" className="hover:text-indigo-600">E-commerce</a>
                <a href="/solutions/saas" className="hover:text-indigo-600 mt-1">SaaS Platforms</a>
                <a href="/solutions/enterprise" className="hover:text-indigo-600 mt-1">Enterprise</a>
                <a href="/solutions/startups" className="hover:text-indigo-600 mt-1">Startups</a>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className={`transition duration-200 ${navLinkClass}`}>Resources</button>
              <div className={dropdownClass}>
                <a href="/blog" className="hover:text-indigo-600">Blog</a>
                <a href="/help-center" className="hover:text-indigo-600 mt-1">Help Center</a>
                <a href="/docs" className="hover:text-indigo-600 mt-1">Documentation</a>
                <a href="/community" className="hover:text-indigo-600 mt-1">Community</a>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => (window.location.href = "/signup")}
              className={`px-4 py-1.5 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                isScrolled
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden focus:outline-none ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
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
    </nav>
  );
};

export default Nav;
