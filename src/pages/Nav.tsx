import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

type DropdownItem = { href: string; label: string };

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();

  // Track scroll position for nav style
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync Firebase auth state and localStorage user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const navLinkClass = isScrolled
    ? "text-white hover:text-indigo-500"
    : "text-white hover:text-indigo-300";

  const dropdownClass =
    "absolute left-0 top-full mt-2 flex-col bg-white text-gray-800 rounded-md shadow-lg z-50 py-4 px-6 min-w-[200px]";

  // Dropdown open handlers with delay on mouse leave
  const handleEnter = (menu: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 250);
  };

  // Render dropdown menu items
  const renderDropdown = (items: DropdownItem[], menu: string) => (
    <div
      className={dropdownClass}
      onMouseEnter={() => handleEnter(menu)}
      onMouseLeave={handleLeave}
      tabIndex={0}
      onFocus={() => handleEnter(menu)}
      onBlur={handleLeave}
    >
      {items.map((item: DropdownItem, index: number) => (
        <Link
          key={index}
          to={item.href}
          className="block mt-1 first:mt-0 hover:text-indigo-600"
          onClick={() => setOpenDropdown(null)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <nav
      className={`fixed w-full top-5 left-2 z-40 transition-colors duration-500 ${
        isScrolled ? "bg-black shadow-gray-500/90 shadow-md" : "bg-transparent"
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
            <div
              className="relative"
              onMouseEnter={() => handleEnter("features")}
              onMouseLeave={handleLeave}
              tabIndex={0}
              onFocus={() => handleEnter("features")}
              onBlur={handleLeave}
            >
              <Link to="/features" className={navLinkClass + " cursor-pointer select-none"}>
                Features
              </Link>
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

            <Link to="/pricing" className={`transition duration-200 ${navLinkClass}`}>
              Pricing
            </Link>

            <div
              className="relative"
              onMouseEnter={() => handleEnter("solutions")}
              onMouseLeave={handleLeave}
              tabIndex={0}
              onFocus={() => handleEnter("solutions")}
              onBlur={handleLeave}
            >
              <Link to="/solutions" className={navLinkClass + " cursor-pointer select-none"}>
                Solutions
              </Link>
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

            <div
              className="relative"
              onMouseEnter={() => handleEnter("resources")}
              onMouseLeave={handleLeave}
              tabIndex={0}
              onFocus={() => handleEnter("resources")}
              onBlur={handleLeave}
            >
              <Link to="/resources" className={navLinkClass + " cursor-pointer select-none"}>
                Resources
              </Link>
              {openDropdown === "resources" &&
                renderDropdown(
                  [
                    { href: "/blog", label: "Blog" },
                    { href: "/help-center", label: "Help Center" },
                    { href: "/resources/docs", label: "Documentation" },
                    { href: "/community", label: "Community" },
                  ],
                  "resources"
                )}
            </div>
          </div>

          {/* Desktop User Buttons */}
          {!user ? (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate("/signup")}
                className={`px-4 py-1.5 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isScrolled
                    ? "bg-transparent border border-white text-white hover:bg-white hover:text-black"
                    : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`px-4 py-1.5 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isScrolled
                    ? "bg-black-600 text-white border-white hover:bg-white hover:text-black"
                    : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                }`}
              >
                Login
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden focus:outline-none text-white`}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4 space-y-2">
          <Link to="/features" className="block hover:text-indigo-400" onClick={() => setIsMenuOpen(false)}>
            Features
          </Link>
          <Link to="/pricing" className="block hover:text-indigo-400" onClick={() => setIsMenuOpen(false)}>
            Pricing
          </Link>
          <Link to="/solutions" className="block hover:text-indigo-400" onClick={() => setIsMenuOpen(false)}>
            Solutions
          </Link>
          <Link to="/resources" className="block hover:text-indigo-400" onClick={() => setIsMenuOpen(false)}>
            Resources
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="block hover:text-indigo-400" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="block font-bold text-indigo-400" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3 mt-3">
                <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border-2 border-white" />
                <span>{user.displayName || user.email}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="mt-3 w-full px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
