import { useEffect, useState } from "react";
import { Navigate } from "react-router";

// Verifica la sesión antes de mostrar la ruta protegida; si no hay sesión, manda a /login
export const ProtectedRoute = ({ children }) => {
  const [autenticado, setAutenticado] = useState(null); // null = todavía verificando

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          credentials: "include",
        });
        setAutenticado(res.ok);
      } catch {
        setAutenticado(false);
      }
    };

    verificarSesion();
  }, []);

  if (autenticado === null) {
    return <p>Verificando sesión...</p>;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
