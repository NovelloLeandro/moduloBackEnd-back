import express, { Request, Response } from "express";
import { v4 as idGenerator } from "uuid";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const recados: Array<any> = [];

app.post("/recados", (request: Request, response: Response) => {
    const { descricao, detalhamento } = request.body;

    const recado = {
        id: idGenerator(),
        descricao,
        detalhamento,
    };

    recados.push(recado);

    return response.status(200).json({
        dados: recado,
        mensagem: "Recado salvo",
    });
});

app.get("/recados", (request: Request, response: Response) => {
    return response.status(200).json({
        dados: recados,
        mensagem: "Recados encontrados",
    });
});

app.get("/recados/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    const recado = recados.find((recado) => recado.id === id);

    return response.status(200).json({
        dados: recado,
        mensagem: "Recado não encontrados",
    });
});

app.put("/recados/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    const { descricao, detalhamento, } = request.body;

    const index = recados.findIndex((recado) => recado.id == id);

    if (index >= 0) {
        recados[index].descricao = descricao;
        recados[index].detalhamento = detalhamento;
    }
    return response.json(recados[index]);
});

app.delete("/recados/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    const index = recados.findIndex((recado) => recado.id === id);

    recados.splice(index, 1);

    return response.sendStatus(204);
});

app.listen(8080, () => {
    console.log("Api Rodando...");
});
