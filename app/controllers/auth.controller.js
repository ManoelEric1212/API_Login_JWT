const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.cadastro = (req, res) => {
    // Salvando usuario no banco
    User.create({
        nomeUsuario: req.body.nomeUsuario,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        nome: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "Usuário registrado com sucesso!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "Usuário registrado com sucesso!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.login = (req, res) => {
    User.findOne({
        where: {
            nomeUsuario: req.body.nomeUsuario
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Usuário não encontrado." });
            }

            var senhaValida = bcrypt.compareSync(
                req.body.senha,
                user.senha
            );

            if (!senhaValida) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Senha inválida!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].nome.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    nomeUsuario: user.nomeUsuario,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};