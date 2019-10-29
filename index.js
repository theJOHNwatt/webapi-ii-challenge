const express = require('express');
const server = express();
const postsRouter = require('./posts/posts-router.js')

server.get('/api/posts', postsRouter);

server.listen(8000, () => {
    console.log('\n*** Server Running on http://localhost:8000 ***\n');
  });