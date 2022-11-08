import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage.js";
import LogInPage from "./LogInPage/LogInPage.js";
import RegisterPage from "./RegisterPage/RegisterPage.js";
import MainPage from "./MainPage/MainPage.js";
import GroupsPage from "./GroupsPage/GroupsPage.js";
import ObjectPage from "./ObjectPage/ObjectMainPage.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LogInPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/profile" element={<MainPage/>}/>
        <Route path="/profile/groups" element={<GroupsPage/>}/>
        <Route path="/profile/object" element={<ObjectPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
