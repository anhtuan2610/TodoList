import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="bg-[#212121] min-h-screen text-white px-10 py-6 grid grid-cols-4 gap-10">
      <div className="border border-white rounded-xl p-10 flex justify-center items-center max-h-64 font-bold text-2xl cursor-pointer">
        <Link to="/todo-app">Todo App</Link>
      </div>
      <div className="border border-white rounded-xl p-10 flex justify-center items-center max-h-64 font-bold text-2xl ">
        <Link to="/time-app">Time App</Link>
      </div>
    </div>
  );
};
