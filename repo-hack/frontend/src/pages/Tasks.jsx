import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Tasks.css";

export const Tasks = () => {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [tituloEdit, setTituloEdit] = useState("");
  const [descripcionEdit, setDescripcionEdit] = useState("");
  const navigate = useNavigate();

  // Trae las tareas del usuario logueado; si no hay sesión válida, el backend devuelve 401
  const cargarTareas = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/tasks-by-user", {
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setTareas(data);
    } catch {
      setError("Error de conexión");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  // Crea una tarea nueva y refresca la lista
  const handleCrear = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: titulo,
          description: descripcion,
          is_completed: false,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al crear la tarea");
        return;
      }

      setTitulo("");
      setDescripcion("");
      cargarTareas();
    } catch {
      setError("Error de conexión");
    }
  };

  // Invierte is_completed de la tarea
  const handleToggleCompletada = async (tarea) => {
    setError("");

    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${tarea.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ is_completed: !tarea.is_completed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al actualizar la tarea");
        return;
      }

      cargarTareas();
    } catch {
      setError("Error de conexión");
    }
  };

  // Borra la tarea y refresca la lista
  const handleEliminar = async (id) => {
    setError("");

    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al eliminar la tarea");
        return;
      }

      cargarTareas();
    } catch {
      setError("Error de conexión");
    }
  };

  // Abre el formulario de edición inline, precargado con los datos de la tarea
  const iniciarEdicion = (tarea) => {
    setEditandoId(tarea.id);
    setTituloEdit(tarea.title);
    setDescripcionEdit(tarea.description);
  };

  // Cierra el formulario de edición sin guardar cambios
  const cancelarEdicion = () => {
    setEditandoId(null);
    setTituloEdit("");
    setDescripcionEdit("");
  };

  // Guarda título/descripción editados y cierra el formulario de edición
  const handleGuardarEdicion = async (e, id) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: tituloEdit,
          description: descripcionEdit,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al actualizar la tarea");
        return;
      }

      cancelarEdicion();
      cargarTareas();
    } catch {
      setError("Error de conexión");
    }
  };

  if (cargando) {
    return <p>Cargando tareas...</p>;
  }

  return (
    <div className="tasks-container">
      <h2>Mis tareas</h2>

      <form onSubmit={handleCrear} className="formulario">
        <label>
          Título
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <label>
          Descripción
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>
        <button type="submit">Agregar tarea</button>
      </form>

      {error && <p className="mensaje-error">{error}</p>}

      {tareas.length === 0 ? (
        <p>No tenés tareas todavía.</p>
      ) : (
        <ul className="lista-tareas">
          {tareas.map((tarea) => (
            <li key={tarea.id} className="tarea-item">
              {editandoId === tarea.id ? (
                <form
                  onSubmit={(e) => handleGuardarEdicion(e, tarea.id)}
                  className="formulario-edicion"
                >
                  <input
                    type="text"
                    value={tituloEdit}
                    onChange={(e) => setTituloEdit(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={descripcionEdit}
                    onChange={(e) => setDescripcionEdit(e.target.value)}
                  />
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={cancelarEdicion}>
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <div className="tarea-info">
                    <span
                      className={
                        tarea.is_completed
                          ? "tarea-titulo completada"
                          : "tarea-titulo"
                      }
                    >
                      {tarea.title}
                    </span>
                    <p className="tarea-descripcion">{tarea.description}</p>
                  </div>
                  <div className="tarea-acciones">
                    <button onClick={() => handleToggleCompletada(tarea)}>
                      {tarea.is_completed
                        ? "Marcar pendiente"
                        : "Marcar completada"}
                    </button>
                    <button onClick={() => iniciarEdicion(tarea)}>
                      Editar
                    </button>
                    <button onClick={() => handleEliminar(tarea.id)}>
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
