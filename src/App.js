import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage/HomePage.js";
import LogInPage from "./LogInPage/LogInPage.js";
import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage.js";
import RegisterPage from "./RegisterPage/RegisterPage.js";
import MainPage from "./MainPage/MainPage.js";
import GroupsPage from "./GroupsPage/GroupsPage.js";
import ObjectPage from "./ObjectPage/ObjectMainPage.js";
import EventsPage from "./EventsPage/EventsPage.js";
import GroupMemebers from "./GroupsPage/GroupMembers.js";
import GroupMemebersAdd from "./GroupsPage/GroupMembersAdd.js";
import GroupEvents from "./GroupsPage/GroupEvent.js";
import GroupsAdd from "./GroupsAdd/GroupsAdd.js";
import { useAuthContext } from "./context/AuthContext";
import Navigation from "./MainPage/MainPageNavi.js";
import EventsAdd from "./EventsPage/EventsAdd.js";
import PassChange from "./ResetPasswordPage/PassChange.js";
const App = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      {user ? <Navigation /> : null}
      <Routes>
        <Route
          path="/"
          element={!user ? <HomePage /> : <Navigate to="/profile" />}
        />
        <Route
          path="/login"
          element={!user ? <LogInPage /> : <Navigate to="/profile" />}
        />
        <Route
          path="/passchange"
          element={
            !user ? <ResetPasswordPage /> : <Navigate to="/passchange" />
          }
        />
        <Route
          path="/newpassword/*"
          element={
            !user ? <PassChange /> : <Navigate to="/newpassword/*" />
          }
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/profile" />}
        />
        <Route
          path="/profile"
          element={user ? <MainPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/groups"
          element={user ? <GroupsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/groups/add"
          element={user ? <GroupsAdd /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/events/add"
          element={user ? <EventsAdd /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/object/:id/details"
          element={user ? <ObjectPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/events"
          element={user ? <EventsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/groups/:id/members"
          element={user ? <GroupMemebers /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/groups/:id/members/add"
          element={user ? <GroupMemebersAdd /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/groups/:id/events"
          element={user ? <GroupEvents /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
