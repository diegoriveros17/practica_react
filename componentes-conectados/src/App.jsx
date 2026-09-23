import { useState } from "react";

// import "./App.css";
import { Navbar } from "./assets/Navbar";
import { ProductList } from "./assets/PoductList";

function App() {
  const productos = [
    {
      id: 1,
      nombre: "Teclado mecánico",
      precio: 45000,
      categoria: "Periféricos",
      disponible: true,
    },
    {
      id: 2,
      nombre: "Mouse inalámbrico",
      precio: 18000,
      categoria: "Periféricos",
      disponible: false,
    },
    {
      id: 3,
      nombre: "Monitor 24 pulgadas",
      precio: 120000,
      categoria: "Pantallas",
      disponible: true,
    },
    {
      id: 4,
      nombre: "Auriculares Gamer",
      precio: 32000,
      categoria: "Audio",
      disponible: true,
    },
    {
      id: 5,
      nombre: "Silla ergonómica",
      precio: 85000,
      categoria: "Mobiliario",
      disponible: false,
    },
  ];

  return (
    <>
      <Navbar cant_productos={productos.length}></Navbar>
      <ProductList products={productos}></ProductList>
      <ProductCard products={productos}></ProductCard>
    </>
  );
}

export default App;
