const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const contadorValores = {};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/atualizar', (req, res) => {
  const valor = req.body.valor;

  if (!valor) {
    return res.status(400).json({ erro: 'Nenhum valor fornecido' });
  }

  contadorValores[valor] = (contadorValores[valor] || 0) + 1;

  res.json({ valor, contador: contadorValores[valor] });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
