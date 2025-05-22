// App.tsx or App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './pages/Nav';
import LoginPage from './components/login'; // Import your login page here
import SubscriptionPage from './pages/subscriptionpage'; // adjust the path
import './styles/global.css';
import Signup from './pages/signup';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/pricing" element={<SubscriptionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup/>} />
        {/* Add more routes as needed */}
        <Route path="/" element={<> {/* Your homepage component here, or empty for now */} </>} />
      </Routes>
    </Router>
  );
};

export default App;
