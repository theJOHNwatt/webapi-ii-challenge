const router = require('express').Router();
const Posts = require('../data/db');

module.exports = router;

router.post('/', (req,res) => {
    Posts.insert(req.body)
    .then(posts => {
        res.status(201).json(posts)
    })
    .catch(err => {
        req.status(500).json({
            message:'There was an error while saving the post to the database'
        })
    })
})

router.post('/:id/comments', (req,res) => {

  const comment = req.body;

  if (!comment.post_id) {
    res.status(404).json({message:"The post with the specified ID does not exist."});
  } else if (!comment.text) {
    res.status(400).json({errorMessage: "Please provide text for the comment"});
  } else if (comment.post_id && comment.text) {
    Posts
    .insertComment(comment)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({err: "Could not insert comment. Check post structure and try again."});
    });
  }
})

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: 'The posts information could not be retrieved.',
      });
    });
  });

  router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post information could not be retrieved.',
      });
    });
  });

  router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id, req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post information could not be retrieved.',
      });
    });
  });

  router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post could not be removed',
      });
    });
  });

  router.put('/:id', (req,res) => {
    const info = req.body;
    const id = req.params.id;
    

    Posts.update(id, info)
    .then(posts => {
        res.status(201).json({data: 'User information updated'});
    })
    .catch(err => {
        console.log('error', err);
        req.status(500).json({error: 'The user information could not be modified'});
    })
})
