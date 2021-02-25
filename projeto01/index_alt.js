const express = require('express');
const app = express();

// digo ao express usar o ejs como motor de render
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/:nome?/:lang?', (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = true;

    var produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-cola", preco: 5.00},
        {nome: "Leite", preco: 1.45},
        {nome: "Carne", preco: 15.00},
        {nome: "Redbull", preco: 6.75},
        {nome: "Nescau", preco: 4.00}
    ]

    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "RedPills",
        inscritos: 1000000,
        msg: exibirMsg,
        produtos: produtos
    })
});


app.listen(8080, () => {
    console.log("App Rodando")
});