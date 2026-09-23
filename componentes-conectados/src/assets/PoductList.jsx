import { ProductCard } from "./productCard";

export const ProductList = ({ products }) => {
  const productos = products.map((product) => {
    return (
      <ProductCard
        nombre={product.nombre}
        precio={product.precio}
        categoria={product.categoria}
        disponibilidad={product.disponibilidad}
      ></ProductCard>
    );
  });
  //   return <></>;
};
