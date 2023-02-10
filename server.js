const express = require("express");
const app = express();

app.use((err, req, res) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(3001, () => console.log("Servidor escuchando en el puerto 3001"));
