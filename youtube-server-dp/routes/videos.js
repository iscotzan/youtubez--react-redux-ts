const router = require('express').Router();

const videoController = require('../controllers/videoController');

router.get('/', videoController.getSavedVideos);

router.get('/trend', videoController.getTrendVideos);

router.get('/search', videoController.searchVideos);

router.get('/search-library', videoController.searchMyLibrary);

router.get('/:id', videoController.getSingleVideo);


router.put('/:id', videoController.saveVideo);

router.delete('/:id', videoController.deleteVideo);

router.get('/isFavorite/:id', videoController.isFavorite);

module.exports = router;