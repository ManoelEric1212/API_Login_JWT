const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.URL,
    {
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "usuario_roles",
    foreignKey: "roleId",
    otherKey: "usuarioId"
});
db.user.belongsToMany(db.role, {
    through: "usuario_roles",
    foreignKey: "usuarioId",
    otherKey: "roleId"
});

db.ROLES = ["usuario", "administrador", "moderador"];

module.exports = db;