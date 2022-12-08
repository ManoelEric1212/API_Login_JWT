const { autenticaJWT } = require("../middleware/")
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/teste/todos", controller.allAccess);

    app.get(
        "/api/teste/usuario",
        [autenticaJWT.verificaToken],
        controller.userBoard
    );

    app.get(
        "/api/teste/moderador",
        [autenticaJWT.verificaToken, autenticaJWT.verificaModerador],
        controller.moderatorBoard
    );

    app.get(
        "/api/teste/administrador",
        [autenticaJWT.verificaToken, autenticaJWT.verificaAdmin],
        controller.adminBoard
    );
};