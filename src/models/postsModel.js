// Arquivo que vai ser responsável pela parte de conexão com o banco, e também vai representar os dados
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; //importamos a função de conexão com o banco de dados
// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); //armazena o objeto de conexão que será utilizado nas operações

// **Função para bucar todos os posts do banco de dados**
export async function getTodosPosts(){ //"get" pq o padrão é em ingles
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

// **Função para criar um novo post no banco de dados**
export async function criarPost(novoPost){

    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    // Insere um novo documento (post) na coleção e retorna um objeto com informações sobre a inserção
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}