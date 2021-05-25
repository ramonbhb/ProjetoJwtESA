const { Router } = require('express');
const jwt = require('jsonwebtoken');
const verificar = require('../middleware/verificar');

const routes = Router();

routes.get('/', (req,res) => {
    res.status(200).json({mensagem: "Hello World"})
});

routes.post('/login', (req,res) => {
   let usuario = { 
       id: 1,
       login: 'natan',
       senha:'123',
       role: 'usuario'
   }

   let usuario2 = {
       id: 2,
       login: 'sergioDeVoltaComFone',
       senha: 'sergioREIS',
       role: "admin"
   }

   if (req.body.login == usuario.login && req.body.senha == usuario.senha) {
        const token = jwt.sign({id: usuario.id, role: usuario.role},process.env.ACCESS_SECRET, {
          expiresIn: 300 //process.env.ACCESS_LIFE
        })
        res.status(200).json({
            token: token
        })
   }
   else if (req.body.login == usuario2.login && req.body.senha == usuario2.senha) {
        const token = jwt.sign({id: usuario2.id, role: usuario2.role},process.env.ACCESS_SECRET, {
        expiresIn: 300 //process.env.ACCESS_LIFE
        })
        res.status(200).json({
            token: token
        })
    }
    else {
       res.status(401).json({
           token: ''
       })
   }
})

routes.get('/oi', verificar(['usuario','admin']), (req,res) => {
    //req.user.id 
    //req.user.role
    res.status(200).json({mensagem: "Essa é uma rota com o usuário logado"})
});

routes.get('/oiAdmin', verificar(['admin']), (req,res) => {
    res.status(200).json({mensagem: "Essa é uma rota com o usuário logado"})
});

module.exports = routes;