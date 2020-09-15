
const db = require('./../database')
const Favorite = db.favorite
const dbService = {

    fetchFavorites(lastVideoId, limit = 20) {
        return new Promise((resolve, reject) => {
            if (lastVideoId) {
                Favorite.find({'_id': {'$gt': lastVideoId}}).countDocuments().then(count => {
                    Favorite.find({'_id': {'$gt': lastVideoId}}).limit(limit).then(data => {
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    });
                })
            } else {
                Favorite.find().limit(limit)
                    .then(data => {
                        resolve(data)
                    }).catch(err => {
                    reject(err)
                });
            }
        });
    },

    isFavorite(videoId) {
        return new Promise((resolve, reject) => {
            Favorite.find({id: videoId}).limit(1).then(
                data => {
                    resolve(data.length)
                })
        })
    },
    saveFavorite(videoData) {
        return new Promise((resolve, reject) => {
            const {id, title, thumbnailUrl, duration, definition, viewCount, likeCount, dislikeCount} = videoData;
            Favorite.find({id}).limit(1).then(
                data => {
                    if (data.length) { //already exists
                        resolve(null);
                    } else {
                        const favorite = new Favorite({
                            id,
                            title,
                            thumbnailUrl,
                            duration,
                            definition,
                            viewCount,
                            likeCount,
                            dislikeCount
                        })
                        favorite.save(favorite).then(data => {
                            resolve(data)
                        }).catch(err => {
                            reject(err.message || "Some error occurred while creating the new favorite video.")
                        });
                    }
                }
            ).catch(e => {
                console.error(e)
            })

        })
    },
    deleteFromFavorites(favoriteId) {
        return new Promise((resolve, reject) => {
            Favorite.remove({id: favoriteId})
                .then(data => {
                    if (!data) {
                        reject(`404 Cannot delete Favorite with id=${favoriteId}. Maybe Favorite was not found!`)
                    } else {
                        resolve("Favorite was deleted successfully!")
                    }
                })
                .catch(err => {
                    reject("500 Could not delete Favorite with favoriteId=" + favoriteId)
                });
        })
    }
};

module.exports = dbService;
