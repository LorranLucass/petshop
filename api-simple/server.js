const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Ração Premium', price: 120.0, description: 'Alimento balanceado para cães e gatos' },
  { id: 2, name: 'Coleira Azul', price: 45.5, description: 'Coleira confortável e resistente' },
  { id: 3, name: 'Brinquedo Bola', price: 25.0, description: 'Bola para pet brincar' },
];

let pets = [
  { id: 1, name: 'Rex', type: 'Cachorro', age: 4 },
  { id: 2, name: 'Mimi', type: 'Gato', age: 2 },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }
  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    price,
    description: description || '',
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  if (!name || price == null) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }
  product.name = name;
  product.price = price;
  product.description = description || product.description;
  res.json(product);
});

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  products.splice(index, 1);
  res.status(204).send();
});

app.get('/pets', (req, res) => {
  res.json(pets);
});

app.post('/pets', (req, res) => {
  const { name, type, age } = req.body;
  if (!name || !type || age == null) {
    return res.status(400).json({ error: 'Nome, tipo e idade são obrigatórios' });
  }
  const newPet = {
    id: pets.length > 0 ? pets[pets.length - 1].id + 1 : 1,
    name,
    type,
    age,
  };
  pets.push(newPet);
  res.status(201).json(newPet);
});

app.put('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, type, age } = req.body;
  const pet = pets.find(p => p.id === id);
  if (!pet) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }
  if (!name || !type || age == null) {
    return res.status(400).json({ error: 'Nome, tipo e idade são obrigatórios' });
  }
  pet.name = name;
  pet.type = type;
  pet.age = age;
  res.json(pet);
});

app.delete('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pets.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }
  pets.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API rodando em http://192.168.1.50:${PORT}`);
});
