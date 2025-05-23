// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import SubscriptionPage from "./pages/subscriptionpage";
import LoginPage from "./components/GoogleLogin";
import Signup from "./pages/signup";
import Homepage from "./pages/homepage";
import "./styles/global.css"; // Ensure this contains the html/body height fix

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="pricing" element={<SubscriptionPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
