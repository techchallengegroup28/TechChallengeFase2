const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Configura o autoincremento
    },
    titulo: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    datapostagem: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    dataatualizacao: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    conteudo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagem: {
        type: DataTypes.BLOB,
        allowNull: true
    }
}, {
    tableName: 'post',
    timestamps: false, // Desativa colunas de timestamps (opcional)
    freezeTableName: true // Desativa a pluralização automática do nome da tabela
});

module.exports = Post;
