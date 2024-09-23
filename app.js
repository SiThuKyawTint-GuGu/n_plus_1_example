const express = require('express');
const { Post, Comment, sequelize } = require('./models');

const app = express();

app.get('/posts', async (req, res) => {
    const posts = await Post.findAll();

    for (let post of posts) {
        const comments = await Comment.findAll({ where: { PostId: post.id } });
        post.dataValues.comments = comments;
    }

    res.json(posts);
});

// Seed some sample data
app.get('/seed', async (req, res) => {
    await sequelize.sync({ force: true });

    const post1 = await Post.create({ title: 'Post 1', content: 'Content 1' });
    const post2 = await Post.create({ title: 'Post 2', content: 'Content 2' });

    await Comment.create({ text: 'Comment 1', PostId: post1.id });
    await Comment.create({ text: 'Comment 2', PostId: post1.id });
    await Comment.create({ text: 'Comment 3', PostId: post2.id });

    res.send('Data seeded');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
