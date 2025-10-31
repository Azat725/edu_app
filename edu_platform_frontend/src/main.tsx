import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import CoursesList from "./pages/CoursesList.tsx";
import CoursePage from "./pages/CoursePage.tsx";   
import NewLesson from "./pages/NewLesson.tsx";
import LessonPage from "./pages/LessonPage.tsx";     

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoursesList />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/lessons/new" element={<NewLesson />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
