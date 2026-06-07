const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us', page: 'about', pageCss: 'about' });
});

router.get('/blog', (req, res) => {
  res.render('blog', { title: 'Blog', page: 'blog', pageCss: 'blog' });
});

router.get('/support', (req, res) => {
  res.render('support', { title: 'Support', page: 'support', pageCss: 'support' });
});

module.exports = router;
