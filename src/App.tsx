// App.tsx or App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import LoginPage from './components/login'; // Import your login page here
import SubscriptionPage from './components/subscriptionpage'; // adjust the path
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/pricing" element={<SubscriptionPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes as needed */}
        <Route path="/" element={<> {/* Your homepage component here, or empty for now */} </>} />
      </Routes>
    </Router>
  );
};

export default App;
