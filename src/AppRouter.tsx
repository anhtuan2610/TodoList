import { Route, Routes } from "react-router-dom";
import { TodoApp } from "./pages/todo-app";
import "./index.css";
import { Home } from "./pages/home";
import { TimeApp } from "./pages/time-app";
import Test from "./pages/test";
import FormApp from "./pages/form";
import Layout from "./components/layouts";
import CreateRequire from "./pages/form/create-require";
import EditRequire from "./pages/form/edit-require";
import CreateOptional from "./pages/form/create-optional";
import EditOptional from "./pages/form/edit-optional";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/todo-app" element={<TodoApp />} />
        <Route path="/time-app" element={<TimeApp />} />
        <Route path="/time-app" element={<TimeApp />} />
        <Route path="/form-app">
          <Route index element={<FormApp />} />
          <Route path="create-require" element={<CreateRequire />} />
          <Route path="edit-require/:id" element={<EditRequire />} />
          <Route path="create-optional" element={<CreateOptional />} />
          <Route path="edit-optional/:id" element={<EditOptional />} />
        </Route>
        <Route path="/test-app" element={<Test />} />
      </Route>
    </Routes>
  );
};
