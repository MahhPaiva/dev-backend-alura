// Arquivo que vai ser responsável pela parte de requisição e resposta

import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

// **Função para listar todos os posts**
export async function listarPosts(req, res) { 
    // Chama a função para buscar os posts
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 e os posts no formato JSON
    res.status(200).json(posts); 
}

// **Função para criar um novo post**
export async function postarNovoPost(req, res) {
    const novoPost = req.body; // Obtém os dados do novo post do corpo da requisição
    // Tenta criar o novo post
    try {
        const postCriado = await criarPost(novoPost);
        // Se a criação for bem-sucedida, envia o post criado como resposta
        res.status(200).json(postCriado);
    }
    // Se não der certo, exibe a mensagem de erro
    catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição!"})
    }
}

// **Função para fazer upload de uma imagem e criar um novo post**
export async function uploadImagem(req, res) {
    // Cria um objeto com os dados do novo post, incluindo o nome da imagem original
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try {
        // Cria o novo post com a imagem
        const postCriado = await criarPost(novoPost);
        // Renomeia o arquivo da imagem para incluir o ID do post recém-criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;// `` é uma template string, une string e variável
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia o post criado como resposta
        res.status(200).json(postCriado);
    }
    catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição!"})
    }
}

// **Função para atualizar novo post**
export async function atualizarNovoPost(req, res) {
    const id = req.params.id; 
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    }
    catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição!"});
    }
}