import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage.js";
import LogInPage from "./LogInPage/LogInPage.js";
import RegisterPage from "./RegisterPage/RegisterPage.js"
import MainPage from "./MainPage/MainPage.js"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LogInPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/profile" element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
