import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-indigo-500 mb-3">LEADA AI</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Empowering smarter decisions through AI-powered insights and analytics.
          </p>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-400">Features</h3>
          <ul className="space-y-2 text-sm">
            {["ai-analytics", "dashboards", "feedback", "insights"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/features/${item}`}
                  className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                >
                  {item.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-400">Solutions</h3>
          <ul className="space-y-2 text-sm">
            {["ecommerce", "saas", "enterprise", "startups"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/solutions/${item}`}
                  className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-400">Company</h3>
          <ul className="space-y-2 text-sm">
            {["about", "contact", "privacy", "terms"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/${item}`}
                  className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                >
                  {item === "terms" ? "Terms of Service" : item.replace(/\b\w/g, c => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Leada AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
