import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage.js";
import LogInPage from "./LogInPage/LogInPage.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LogInPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
