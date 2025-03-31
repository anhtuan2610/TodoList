import { Link } from "react-router-dom";

const FormApp = () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="border border-white rounded-xl p-10 flex justify-center items-center h-80 font-bold text-2xl cursor-pointer">
        <Link to="create-require">Form Create Require</Link>
      </div>
      <div className="border border-white rounded-xl p-10 flex justify-center items-center h-80 font-bold text-2xl cursor-pointer">
        <Link to="edit-require">Form Edit Require</Link>
      </div>
    </div>
  );
};

export default FormApp;
