// src/pages/Footer.tsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-white text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold text-indigo-500 mb-2">LEADA AI</h2>
          <p className="text-sm text-gray-400">
            Empowering smarter decisions through AI-powered insights and analytics.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">Features</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/features/ai-analytics" className="hover:text-indigo-500">AI Analytics</Link></li>
            <li><Link to="/features/dashboards" className="hover:text-indigo-500">Custom Dashboards</Link></li>
            <li><Link to="/features/feedback" className="hover:text-indigo-500">User Feedback</Link></li>
            <li><Link to="/features/insights" className="hover:text-indigo-500">Real-Time Insights</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">Solutions</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/solutions/ecommerce" className="hover:text-indigo-500">E-commerce</Link></li>
            <li><Link to="/solutions/saas" className="hover:text-indigo-500">SaaS Platforms</Link></li>
            <li><Link to="/solutions/enterprise" className="hover:text-indigo-500">Enterprise</Link></li>
            <li><Link to="/solutions/startups" className="hover:text-indigo-500">Startups</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">Company</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-indigo-500">About</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-500">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-500">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-500">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Leada AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
