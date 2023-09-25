const express = require('express');
const app = express();
const menu = require('./menu.json'); // Importa los datos del menú

const PORT = 9000; // Puerto en el que se ejecutará el servidor

app.use(express.json()); // Habilita el uso de JSON en las peticiones

// Define tus rutas y funciones aquí

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

app.get('/menu', (req, res) => {
    res.json(menu);
  });

  app.get('/menu/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const plato = menu.find(item => item.id === id);
    if (!plato) {
      res.status(404).json({ msg: 'Plato no encontrado' });
    } else {
      res.json(plato);
    }
  });

  app.get('/combos', (req, res) => {
    const combos = menu.filter(item => item.tipo === 'combo');
    res.json(combos);
  });

  app.get('/principales', (req, res) => {
    const principales = menu.filter(item => item.tipo === 'principal');
    res.json(principales);
  });

  app.get('/postres', (req, res) => {
    const postres = menu.filter(item => item.tipo === 'postre');
    res.json(postres);
  });

  app.post('/pedido', (req, res) => {
    const { productos } = req.body;
    const precioTotal = productos.reduce((total, producto) => {
      const plato = menu.find(item => item.id === producto.id);
      if (plato) {
        total += plato.precio * producto.cantidad;
      }
      return total;
    }, 0);
  
    res.json({ msg: 'Pedido recibido', precio: precioTotal });
  });
