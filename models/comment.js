module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        text: DataTypes.STRING,
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Post);
    };

    return Comment;
};
