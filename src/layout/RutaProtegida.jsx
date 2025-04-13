import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap
import Dashboard from "../paginas/Dashboard";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );

  return (
    <>
      {/* <Dashboard /> */}
      {auth?._id ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default RutaProtegida;
