const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database.js')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')


//Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco com sucesso')
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })


// digo ao express usar o ejs como motor de render
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Rotas pagina principal
app.get('/', (req, res) => {
    Pergunta.findAll({raw: true, order: [
        ['id','DESC']//ASC = crescente
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    })
    
});

app.get('/perguntar', (req, res) => {
    res.render("perguntar");
});

//Rota salvar pergunta
app.post('/salvarpergunta', (req, res) => {

    //recebo os dados e salvo dentro das variaveis
    var titulo = req.body.titulo
    var description = req.body.description

    // faço um INSERT passando os dados
    Pergunta.create({
        titulo: titulo,
        description: description
    }).then(() => { // se der certo redireciono para a pagina principal
        res.redirect('/')
    })
});


//rota das perguntas
app.get('/pergunta/:id',(req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta',{
                    pergunta: pergunta,
                    respostas: respostas
                })
            });
        }else{
            res.redirect('/')
        }
    })
});

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })
})

app.listen(8080, () => {
    console.log("App Rodando")
});