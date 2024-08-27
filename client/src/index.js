import "./assets/css/font_awesome.css";
import "./assets/css/shared.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MessageInputs from "./components/pages/MessageInputs";
import GroupMessage from "./components/pages/GroupMessage";
import SubCourses from "./components/pages/SubCourses";
import SubCourse from "./components/pages/SubCourse";
import DashboardLayout from "./layouts/Dashboard";
import Courses from "./components/pages/Courses";
import Course from "./components/pages/Course";
import Users from "./components/pages/Users";
import Main from "./components/pages/Main";
import Home from "./components/pages/Home";
import User from "./components/pages/User";
import AuthLayout from "./layouts/Auth";
import { Provider } from "react-redux";
import store from "./stores/store";
import ReactDOM from "react-dom";
import React from "react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/auth" element={<Main />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/users" element={<Users />} />
            <Route path="/course" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/subcourse" element={<SubCourse />} />
            <Route path="/subcourses" element={<SubCourses />} />
            <Route path="/message" element={<MessageInputs />} />
            <Route path="/groupmessage" element={<GroupMessage />} />
            <Route path="/settings" element={<Home />} />
            <Route path="/media" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
