const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

verificaToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Não existe token!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Não autorizado!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

verificaAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "administrador") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Necessário ser admin!"
            });
            return;
        });
    });
};

verificaModerador = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderador") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Necessário ser moderator!"
            });
        });
    });
};

verificaModeradorOuAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderador") {
                    next();
                    return;
                }

                if (roles[i].name === "administrador") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Necessário ser administrador ou moderator!"
            });
        });
    });
};

const autenticacaoJwt = {
    verificaToken: verificaToken,
    verificaAdmin: verificaAdmin,
    verificaModerador: verificaModerador,
    verificaModeradorOuAdmin: verificaModeradorOuAdmin
};
module.exports = autenticacaoJwt;