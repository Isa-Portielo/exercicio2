import conexao from "../config/conexao.js";

 const JogadorSchema = new conexao.Schema({
    nome: String,
    numero: Number,
    selecao: String,
    gols: Number,
    assistencias: Number
 })

 const Jogador = conexao.model("Jogador", JogadorSchema);
 export default Jogador;