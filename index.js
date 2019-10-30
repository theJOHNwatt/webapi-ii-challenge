const express = require('express');

const postsRouter = require('./posts/posts-router.js')
const server = express();

server.use(express.json());
server.get('/api/posts', postsRouter);

server.get("/", (req, res) => {
  res.send(`
    
    <p>testing API</p>
  `);
});
server.use("/api/posts", postsRouter);

server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
  });

