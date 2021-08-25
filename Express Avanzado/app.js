import express from "express";

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Item {
  constructor(title, price, thumbnail, id) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.id = id.length + 1;
  }
}
const productos = [];
productos.push(
  new Item(
    "Remera",
    200,
    "https://www.remerasya.com/pub/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/r/e/remera_azul_lisa_3.jpg",
    productos
  )
);
productos.push(
  new Item(
    "Pantalon",
    300,
    "https://www.remerasya.com/pub/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/r/e/remera_azul_lisa_3.jpg",
    productos
  )
);

productos.push(
  new Item(
    "Campera",
    400,
    "https://www.remerasya.com/pub/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/r/e/remera_azul_lisa_3.jpg",
    productos
  )
);
app.get("/api/productos/listar", (req, res) => {
  if (productos.length < 1) res.json({ error: "no hay productos cargados" });
  else res.send(productos);
});
app.get("/api/productos/listar/:id", (req, res) => {
  if (productos[req.params.id - 1] == null)
    res.json({ error: "producto no encontrado" });
  else res.send(productos[req.params.id - 1]);
});

app.post("/api/productos/guardar", (req, res) => {
  productos.push(
    new Item(req.body.title, req.body.price, req.body.thumbnail, productos)
  );
  res.send(productos);
});
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Pagina no encontrada, revise el url.",
  });
});
app.listen(8080, () => {
  console.log("Servidor en puerto 8080");
});
