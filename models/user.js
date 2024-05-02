const { DataTypes } = require("sequelize");

const db = require("../db/conn")

const User = db.define("Users", {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    level: {
        type: DataTypes.INTEGER,
        require: true
    },
    experience: {
        type: DataTypes.INTEGER,
        require: true
    },
    categories: {
        type: DataTypes.JSONB(DataTypes.ENUM('physical', 'study', 'learn', 'pyxel')),
        allowNull: false
    }
})

module.exports = User