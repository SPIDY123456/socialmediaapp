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
  import MessagePage from "./pages/MessagePage";
  import GroupPage from "./pages/GroupPage";
  import StreamPage from "./pages/StreamPage";

  const API_URL = `https://socialmediaapp-cxsr.onrender.com`

  const App = () => {
    const userId = '6708ab88636e45ebfa4141e8';
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
        {location.pathname === "/" && <NavBar stories = {stories} user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/comment" element={<Comments />} />
          <Route path="/stories/:id" element={<StoryDetail />} /> 
          <Route path="/messages" element={<MessagePage userId={userId}/>} />
          <Route path="/groups" element={<GroupPage />} />
          <Route path="/streams" element={<StreamPage />} />
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
