import { Contacto } from "./Contacto";
import { Footer } from "./Footer";
import { Inicio } from "./Inicio";
import { Navbar } from "./Navbar";

export const App = () => {
  return (
    <>
      <Navbar />
      <Inicio />
      <Contacto />
      <Footer />
    </>
  );
};
