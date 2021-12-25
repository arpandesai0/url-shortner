import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Routes } from "react-router";
// import HeroVideo from "./components/HeroVideo";
import Navbar from "./components/Navbar.js";
import { useEffect } from "react";
import Redirect from "./components/Redirect";
import Home from "./components/Home";
import Track from "./components/Track";
import axios from "axios";
import AboutUs from "./components/AboutUs";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
  return (
    <div className="App bg-stone-100">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/:id" element={<Redirect />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
