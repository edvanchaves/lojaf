const express = require('express');
// const Sequelize = require('sequelize');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', (process.env.PORT || 5000));

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

var nextId = 4;


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
*/

// Incluindo um novo contato
app.post('/contatos', (request, response) => {
    

    var novoContato = request.body;

    console.log('Cadastrando um novo contato: ');
    console.log(request.body);
    console.log(novoContato);

    novoContato.id = nextId;
    nextId += 1;

    contatos.push(novoContato);

    response.send(response.json(novoContato));

    /*Contato.create(novoContato)
    .then(() => {
        response.send(response.json(novoContato));
    })
    .catch(()=>{
        response.send('Erro na criação de um novo contato!');
    });*/
});

// Excluindo um contato
app.delete('/contatos/:id', (request, response) => {
    const idDel = request.params.id;

    var x = -1;

    for (var i = 0; i < contatos.length; i++) {
        var c = contatos[i];
        if (c.id == idDel)
            x = i;
    }

    console.log('X: ' + x + ' idDel: ' + idDel);

    if (x > -1){
        console.log(contatos);
        contatos = contatos.filter(x => x.id != idDel );
        console.log(contatos);
        console.log('Contato excluído com sucesso!');
        response.send('Contato excluído com sucesso!');
    }
    else{
        console.log('Erro na exclusão!');
        response.send('Erro na exclusão!');
    }
    
    /*Contato.findById(id)
    .then((contato) => {
        contato.destroy()
        .then(() => {
            response.send(response.json(contato));
        });
    })
    .catch(() => {
        response.send('Erro na exclusão!');
    });
    */

});


// Atualizando um contato
app.put('/contatos/:id', (request, response) => {
    const idAtu = request.params.id;
    const novo = request.body;

    console.log(idAtu);
    console.log(novo);

    var x = -1;

    for (var i = 0; i < contatos.length; i++) {
        var c = contatos[i];
        if (c.id == idAtu) {
            x = i;
            contatos[i] = novo;
        }
    }

    if (x > -1){
        console.log('Contato atualizado com sucesso!');
        response.send('Contato atualizado com sucesso!');
    }
    else{
        console.log('Erro na atualização!');
        response.send('Erro na atualização!');
    }


    /*Contato.findById(id)
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
    });*/

});


app.listen(app.get('port'), () => console.log('Aplicação inicializada!'));