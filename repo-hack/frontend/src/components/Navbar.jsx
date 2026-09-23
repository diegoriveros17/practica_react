import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import "./Navbar.css";

export const Navbar = () => {
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Se re-ejecuta en cada cambio de ruta (login/register/logout siempre navegan) para reflejar la sesión actual
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/profile", {
          credentials: "include",
        });

        if (!res.ok) {
          setUsuario(null);
          return;
        }

        const data = await res.json();
        setUsuario(data.user);
      } catch {
        setUsuario(null);
      }
    };

    cargarPerfil();
  }, [location]);

  // Limpia la cookie de sesión en el backend y vuelve al login
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignoramos error de red en logout
    }

    setUsuario(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">Tareas App</span>
      <div className="navbar-links">
        {usuario ? (
          <>
            <Link to="/">Inicio</Link>
            <Link to="/tasks">Mis tareas</Link>
            <span className="navbar-usuario">Hola, {usuario.name}</span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};
