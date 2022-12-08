const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

validacaoEmailOuUsuarioDuplicado = (req, res, next) => {
    // nomeUsuario
    User.findOne({
        where: {
            nomeUsuario: req.body.nomeUsuario
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Falha! Nome de usuário já existente!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Falha! Email já existente!"
                });
                return;
            }

            next();
        });
    });
};

validaRolesExiste = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Falha, nível não existente = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const VerificaCadastro = {
    validacaoEmailOuUsuarioDuplicado: validacaoEmailOuUsuarioDuplicado,
    validaRolesExiste: validaRolesExiste
};

module.exports = VerificaCadastro;
