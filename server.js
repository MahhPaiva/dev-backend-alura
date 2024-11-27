//É o arquivo que configura o servidor

import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express(); //representa o express/servidor, então para quase tudo vamos udar esse "app"
app.use(express.static("uploads")); // Isso indica para o express que tudo dentro dessa pasta está aberto à acesso
routes(app);

app.listen(3000, () => { //indica para o servidor que é para ele "ouvir", e 3000 é a porta padrão de servidor local
    console.log("Servidor escutando...");
});

/*
app.get("/posts", (req, res) => { 
    res.status(200).json(posts); // vai retornar os arquivos em json do nosso array posts
});

function buscarPostPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id) //
    })
}

app.get("/posts/:id", (req, res) => { //":id" indica para o express que essa informação vai ser substituida por um dado variável
    const index = buscarPostPorID(req.params.id)
    res.status(200).json(posts[index]);
});

app.get("/livro", (req, res) => { //uma nova rota livro, indicando a rota que o servidor vai traçar pra buscar uma informação
    res.status(200).send({ // 200 é o status HTTP que indica que a solicitação foi bem sucedida
        titulo: "A canção de Aquiles",
        autor: "Madeline Miller",
        ano: 2010
    });
});

const posts = [
    {
      id: 1,
      descricao: "Uma foto teste",
      imagem: "https://placecats.com/millie/300/150",
    },
    {
      id: 2,
      descricao: "Gato curioso olhando pela janela",
      imagem: "https://placecats.com/millie/300/150",
    },
    {
      id: 3,
      descricao: "Gatinho dormindo em uma caixa",
      imagem: "https://placecats.com/millie/300/150",
    },
  ];
*/