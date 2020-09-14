const httpService = require('../services/httpService');
const dbService = require('../services/dbService');
const Boom = require('boom');
const formatVideoItems = items => items.map(({
                                                 id,
                                                 snippet: {
                                                     title,
                                                     thumbnails: {high: {url}},
                                                 },
                                                 contentDetails: {duration, definition},
                                                 statistics: {viewCount, likeCount, dislikeCount}
                                             }) => ({
    id,
    title,
    thumbnailUrl: url,
    duration,
    definition,
    viewCount,
    likeCount,
    dislikeCount,
}));


exports.getSingleVideo = async (req, res) => {
    const params = {id: req.params.id};

    try {
        const {data: {items}} = await httpService.fetchVideos(params);
        res.json({...formatVideoItems(items)[0]});
    } catch ({response: {status, data}}) {
        res.status(status).send(data);
    }
};

exports.getTrendVideos = async (req, res) => {
    const params = {
        chart: 'mostPopular',
        pageToken: req.query.page || '',
    };

    try {
        const {data: {items, nextPageToken}} = await httpService.fetchVideos(params);
        res.json({items: formatVideoItems(items), nextPageToken});
    } catch ({response: {status, data}}) {
        res.status(status).send(data);
    }
};

exports.searchVideos = async (req, res) => {
    if (!req.query.name) res.json(Boom.badRequest('Name is required'));

    const params = {
        q: req.query.name,
        pageToken: req.query.page || '',
    };

    try {
        const {data: {items: searchItems, nextPageToken}} = await httpService.searchVideos(params);
        const idList = searchItems.map(({id: {videoId}}) => videoId).join(',');
        const {data: {items}} = await httpService.fetchVideos({id: idList});

        res.json({items: formatVideoItems(items), nextPageToken});
    } catch ({response: {status, data}}) {
        res.status(status).send(data);
    }
};

exports.getSavedVideos = async (req, res) => {
    let lastVideoId = null;
    if (req.query.page) {
        lastVideoId = req.query.page
    }
    let limit = 10;
    if (req.query.limit) {
        limit = req.query.limit
    }
    const favorites = await dbService.fetchFavorites(lastVideoId, limit);
    const nextPageToken = favorites.length ? favorites[favorites.length - 1]._id : null;
    res.json({items: favorites, nextPageToken})
};

exports.saveVideo = async (req, res) => {
    try {
        const saved = await dbService.saveFavorite(req.body)
        res.json({message: saved ? 'ok' : 'favorite already exists'})
    } catch (e) {
        res.json({message: e})
    }

};

exports.deleteVideo = async (req, res) => {
    try {
        const deleted = await dbService.deleteFromFavorites(req.params.id)
        res.json({message: 'ok', deleted})
    } catch (e) {
        res.json({message: e})
    }
};

exports.isFavorite = async (req, res) => {
    try {
        const isVideoAFavorite = await dbService.isFavorite(req.params.id)
        res.json(isVideoAFavorite)
    } catch (e) {
        res.json({message: e})
    }
}