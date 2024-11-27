// Arquivo que vai ser responsável pela parte de rotas

import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// **Configuração do Multer para armazenamento de arquivos, Código padrão do multer para organizar os nomes corretamente**

// Define onde os arquivos serão salvos no servidor
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Indica o diretório de destino para os arquivos
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define o nome do arquivo, mantendo o nome original
        cb(null, file.originalname);
    }
})

// Inicializando o multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads" , storage})

// **Função para configurar as rotas da aplicação**

const routes = (app) => {
    // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json()); //indica que a aplicação usa a funcionalidade de converter dados em json
    app.use(cors(corsOptions))


    //** Rotas da aplicação**

    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost);
    // Rota para envio de imagens, com o auxílio do multer
    app.post("/upload", upload.single("imagem"), uploadImagem);
    // Rota para atualizar novo post
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;
