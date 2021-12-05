import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import SideNav from "./components/SideNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Header from "./components/Header";

function App() {
  const sideNavState = useState(false);
  return (
    <Router>
      <Header sideNavState={sideNavState} />
      <main>
        <SideNav sideNavState={sideNavState} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userName" element={<Profile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
