const express = require('express');
const router = express.Router();
const newsArticlesController = require('../controllers/newsArticles');

// news

router.get('/news', newsArticlesController.getNewsArticles);
router.get('/news/approved', newsArticlesController.getApprovedNewsArticles);

router.put('/news', newsArticlesController.updateNewsArticle);
router.delete('/news/:id', newsArticlesController.deleteNewsArticle);

module.exports = router;
