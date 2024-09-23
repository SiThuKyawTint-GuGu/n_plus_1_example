const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

const Post = require('./post')(sequelize, DataTypes);
const Comment = require('./comment')(sequelize, DataTypes);

Post.associate({ Comment });
Comment.associate({ Post });

sequelize.sync();

module.exports = { sequelize, Post, Comment };
