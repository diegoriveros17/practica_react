export const ProductCard = ({ nombre, precio, categoria, disponibilidad }) => {
  return (
    <>
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{nombre}</li>
          <li class="list-group-item">{precio}</li>
          <li class="list-group-item">{categoria}</li>
          <li class="list-group-item">{disponibilidad}</li>
        </ul>
      </div>
    </>
  );
};
