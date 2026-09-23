import { useEffect, useState } from "react";
import { Navigate } from "react-router";

// Verifica la sesión antes de mostrar login/register; si ya hay sesión, manda a /
export const PublicOnlyRoute = ({ children }) => {
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

  if (autenticado) {
    return <Navigate to="/" replace />;
  }

  return children;
};
