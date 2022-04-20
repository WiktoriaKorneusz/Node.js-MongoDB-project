// requires
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const db = require("../data/database");
const genres = require("../genres.js");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

// get routes
router.get("/", async (req, res) => {
    const movies = await db.getDb().collection("movies").find().toArray();
    res.render("index", { movies: movies });
});

router.get("/add-movie", (req, res) => {
    res.render("add-movie");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/add-review", (req, res) => {
    res.render("add-review");
});

router.get("/edit-review", (req, res) => {
    res.render("edit-review");
});

router.get("/movies/:id", async (req, res) => {
    let movieId = req.params.id;
    try {
        movieId = new ObjectId(movieId);
    } catch (err) {
        return res.status(404).render("404");
    }
    const movie = await db
        .getDb()
        .collection("movies")
        .findOne({ _id: movieId });
    const reviews = await db
        .getDb()
        .collection("reviews")
        .find({ movie_id: req.params.id })
        .toArray();

    res.render("movie", { movie: movie, reviews: reviews });
});

router.get("/reviews/:movie_id/add", (req, res) => {
    const movieId = req.params.movie_id;
    res.render("add-review", { movieId: movieId });
});

router.get("/reviews/:reviewId/edit", async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await db
        .getDb()
        .collection("reviews")
        .findOne({ _id: new ObjectId(reviewId) });
    res.render("edit-review", { review: review });
});

router.post("/delete-review/:id", async (req, res) => {
    const reviewId = new ObjectId(req.params.id);
    await db.getDb().collection("reviews").deleteOne({ _id: reviewId });
    res.redirect("/");
});

// post routes
router.post("/edit-review", async (req, res) => {
    const reviewId = new ObjectId(req.body.reviewId);
    const body = req.body.review;
    await db
        .getDb()
        .collection("reviews")
        .updateOne({ _id: reviewId }, { $set: { body: body } });
    res.redirect(`/`);
});

router.post("/add-review", async (req, res) => {
    const movieId = req.body.movieId;
    const review = {
        movie_id: req.body.movieId,
        review_title: req.body.title,
        name: req.body.name,
        score: +req.body.score,
        body: req.body.review,
        date: new Date(),
    };
    await db.getDb().collection("reviews").insertOne(review);
    res.redirect(`/movies/${movieId}`);
});

router.post("/movies", async (req, res) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=`;
    const title = req.body.title;

    const response = await fetch(url + title);
    const data = await response.json();
    const list = data.results;
    const movie = list.find(
        (b) => b.title.toLowerCase() == title.toLowerCase()
    );
    let movieData;

    if (movie) {
        movieData = {
            title: movie.title,
            genres: movie.genre_ids.map((genre) => genres[genre]),
            image: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
            overview: movie.overview,
            score: movie.vote_average,
        };
    } else {
        movieData = {
            title: title,
            genres: "N/A",
            image: `/images/imageNotFound.png`,
            overview: "N/A",
            score: "N/A",
        };
    }
    await db.getDb().collection("movies").insertOne(movieData);
    res.redirect("/");
});

// Exports router
module.exports = router;
