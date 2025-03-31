import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-[#18181A] min-h-screen text-white px-10 py-6">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
