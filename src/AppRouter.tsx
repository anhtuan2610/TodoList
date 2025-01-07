import { Route, Routes } from "react-router-dom";
import { TodoApp } from "./pages/todo-app";
import "./index.css";
import { Home } from "./pages/home";
import { TimeApp } from "./pages/time-app";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo-app" element={<TodoApp />} />
      <Route path="/time-app" element={<TimeApp />} />
    </Routes>
  );
};
