import express from "express";
import Selecao from './models/Selecao.js';
import Jogador from './models/Jogador.js';

const app = express();
const PORT = 3012;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.set("views", "./views");
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/selecao/lst", async (req, res) => {
  const selecoes = await Selecao.find();
  res.render("selecao/lst", { selecoes });
});
app.get("/selecao/add", (req, res) => {
  res.render("selecao/add");
});
app.post('/selecao/add', async (req, res) => {
  const {pais, cores, continente, titulosMundiais} = req.body;
  await Selecao.create({ pais, cores, continente, titulosMundiais });
  res.render("selecao/addok");
});
app.post('/selecao/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const selecoes = await Selecao.find({
    nome: new RegExp(pesquisar, 'i')
    
  });
  res.render("selecao/lst", { selecoes });
})

app.get('/selecao/del/:id', async (req, res) => {
const selecao = await Selecao.findByIdAndDelete(req.params.id)
res.redirect("/selecao/lst")
});
app.get('/selecao/edt/:id', async (req, res) => {
const selecao = await Selecao.findById(req.params.id)
res.render("selecao/edt", {selecao})
});
app.post('/selecao/edt/:id', async (req, res) => {
const selecao = await Selecao.findByIdAndUpdate(req.params.id, req.body)
res.render("selecao/edtok")
});


app.get("/jogador/lst", async (req, res) => {
  const jogadores = await Jogador.find();
  res.render("jogador/lst", { jogadores });
});
app.get("/jogador/add", (req, res) => {
  res.render("jogador/add");
});
app.post('/jogador/add', async (req, res) => {
  const {nome, numero,selecao,gols,assistencias} = req.body;
  await Jogador.create({ nome, numero, selecao, gols, assistencias });
  res.render("jogador/addok");
});
app.post('/jogador/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const jogadores = await Jogador.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("jogador/lst", { jogadores });
})
app.get('/jogador/del/:id', async (req, res) => {
const jogador = await Jogador.findByIdAndDelete(req.params.id)
res.redirect("/jogador/lst")
});
app.get('/jogador/edt/:id', async (req, res) => {
const jogador = await Jogador.findById(req.params.id)
res.render("jogador/edt", {jogador})
});
app.post('/jogador/edt/:id', async (req, res) => {
const jogador = await Jogador.findByIdAndUpdate(req.params.id, req.body)
res.render("jogador/edtok")
});


app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
}); 

