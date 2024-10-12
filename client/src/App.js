import React,{useState,useEffect}from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar";
import Comments from "./components/Comments";
import StoryDetail from "./components/StoryDetail";
import axios from "axios";


const API_URL = `http://localhost:3001`

const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation(); 
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/stories`); // Use the API_URL constant
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);



  return (
    <div className="min-h-screen bg-gray-200">
      {/* Conditionally render NavBar only for the home route */}
      {location.pathname === "/" && <NavBar stories={stories} user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/comment" element={<Comments />} />
        <Route path="/stories/:id" element={<StoryDetail />} /> 
      </Routes>
    </div>
  );
};

// Wrap the App component with Router
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
