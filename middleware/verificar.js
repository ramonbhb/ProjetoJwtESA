const jwt = require('jsonwebtoken');

let verificar = function verificarJwt(roles) {
    return (req,res,next) => {
        let token = req.headers['authorization'];

        /* bearerToken = Bearer HASD09123Jkqwemlq123809OA */
        let tokens = token.split(' ');
        token = tokens[1];

        if (!token) {
            return res.status(401).json({mensagem: "Não existe token"});
        }
        jwt.verify(token, process.env.ACCESS_SECRET, (erro,userDecoded) =>{
            if (erro) {
                return res.status(400).json({mensagem: "Token Inválido", "erro": erro});
            }
            else { 
                /* Dado que o token é válido, o usuário possui nível de acesso?*/
                let papelValido = false;
                //console.log(userDecoded);
                roles.forEach(role => {
                    if (role == userDecoded.role) papelValido = true;
                })

                if (!papelValido) return res.status(400).json({mensagem: "Usuário não possui nível de permissão"});
                req.user = userDecoded;        
                next();
            }
        })
    }
}

module.exports = verificar;