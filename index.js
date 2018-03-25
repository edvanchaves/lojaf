const express = require('express');
// const Sequelize = require('sequelize');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Definindo o Model
class Contato {

    constructor(id,
                nome,
                telefone,
                email){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
    }
}

var contatos = Array();
contatos.push(new Contato(1, 'Ana', '9999-8888', 'ana@123.com'));
contatos.push(new Contato(2, 'João', '9999-8888', 'ana@123.com'));
contatos.push(new Contato(3, 'Maria', '9999-8888', 'ana@123.com'));


// Rotas
// Obtendo a lista de todos os contatos
app.get('/', (request, response) => {
    response.send(response.json(contatos));
}
);

app.get('/contatos', (request, response) => {
        response.send(response.json(contatos));
    }
);

/*
//Obtendo um contato por um ID
app.get('/contatos/:id', (request, response) => {
    const id = request.params.id;
    Contato.findById(id)
    .then((contato) => {
        response.send(response.json(contato));
    })
    .catch(()=>{
        response.send('Erro na recuperação dos contatos!');
    });
});

// Incluindo um novo contato
app.post('/contatos', (request, response) => {
    const novoContato = request.body.contato;

    Contato.create(novoContato)
    .then(() => {
        response.send(response.json(novoContato));
    })
    .catch(()=>{
        response.send('Erro na criação de um novo contato!');
    });
});

// Excluindo um contato
app.delete('/contatos/:id', (request, response) => {
    const id = request.params.id;
    Contato.findById(id)
    .then((contato) => {
        contato.destroy()
        .then(() => {
            response.send(response.json(contato));
        });
    })
    .catch(() => {
        response.send('Erro na exclusão!');
    });

});

// Atualizando um contato
app.put('/contatos/:id', (request, response) => {
    const id = request.params.id;
    const novo = request.body.contato;

    Contato.findById(id)
    .then((contato) => {

        contato.nome = novo.contato ? novo.contato : contato.nome;
        contato.telefone = novo.telefone ? novo.telefone : contato.telefone;
        contato.email = novo.email ? novo.email : contato.email;
        contato.tipo = novo.tipo ? novo.tipo : contato.tipo;

        contato.save()
        .then(() => {
            response.send(response.json(novo));
        });
    })
    .catch(() => {
        response.send('Erro na atualização!');
    });

});
*/

app.listen(3000, () => console.log('Aplicação inicializada!'));