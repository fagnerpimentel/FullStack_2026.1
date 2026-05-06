require("colors")
var http = require("http")
var express = require("express")
var bodyParser = require("body-parser")
var mongodb = require("mongodb");

const MongoClinet = mongodb.MongoClient;
const uri = "mongodb+srv://professor:ncjKblNhpDjr3l1k@aulabd.cjihvk4.mongodb.net/?appName=AulaBD"
const client = new MongoClinet(uri, { useNewUrlParser: true })

var dbo = client.db("Exemplo_bd");
var usuarios = dbo.collection("usuarios");

var app = express()
app.use(express.static("./public"))
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views');

var server = http.createServer(app)
server.listen(80)

console.log("Servidor Rodando ...".rainbow)

app.get("/", function(req, res){
    res.redirect("home.html")
})

app.get("/inicio", function(req, res){
    var text = req.query.text;
    var number = req.query.number;
    var color = req.query.color;
    console.log(text, number, color);
    console.log("requisição feita por GET")
})

app.post("/inicio", function(req,res){
    var text = req.body.text;
    var number = req.body.number;
    var color = req.body.color;
    console.log(text, number, color);
    console.log("requisição feita por POST")
})

app.post("/cadastro", function(req, res){
    var nome = req.body.nome;
    var login = req.body.login;
    var senha = req.body.senha;

    console.log(nome, login, senha);

    res.render("resposta.ejs",
        {resposta: "Usuário cadastrado com sucesso!"})
})

app.get("/for", function(req,res){
    var qtde = req.query.qtde;
    res.render("exemplo_for.ejs",{qtde})
})

app.post("/cadastrar_usuario", function(req,res){

    var data = {
        db_nome: req.body.nome,
        db_login: req.body.login,
        db_senha: req.body.senha
    }
    
    usuarios.insertOne(data, function (err) {
        if (err) {
            console.log(err);
            res.render('resposta_usuario.ejs', {resposta: "Erro ao cadastrar usuário!"})
        }else {
            res.render('resposta_usuario.ejs', {resposta: "Usuário cadastrado com sucesso!"})        
        };
    });
})


  app.post("/logar_usuario", function(req, res) {
    var data = {
        db_login: req.body.login, 
        db_senha: req.body.senha 
    };

    usuarios.find(data).toArray(function(err, items) {
      console.log(items);
      if (items.length == 0) {
        res.render('resposta_usuario.ejs', {resposta: "Usuário/senha não encontrado!"})
      }else if (err) {
        res.render('resposta_usuario.ejs', {resposta: "Erro ao logar usuário!"})
      }else {
        res.render('resposta_usuario.ejs', {resposta: "Usuário logado com sucesso!"})        
      };
    });

  });
