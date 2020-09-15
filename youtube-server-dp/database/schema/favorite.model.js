module.exports = mongoose => {
    const Favorite = mongoose.model(
        "favorite",
        mongoose.Schema(
            {
                id: String,
                title: String,
                thumbnailUrl: String,
                duration: String,
                definition: String,
                viewCount: String,
                likeCount: String,
                dislikeCount: String
            }
            , {timestamps: true}
        )
    );

    return Favorite;
};