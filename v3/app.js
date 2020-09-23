const express = require("express");
const app = express();
const axios = require("axios");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seed")
// seedDB();
connectDB();

app.use(express.json());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

app.get("/", async (req, res, next) => {
  try {
    const response = await res.render("landing", {});
  } catch (err) {
    console.error(err);
  }
});

// INDEX - show all campgrounds
app.get("/campgrounds", async (req, res, next) => {
  try {
    await Campground.find({}, async (err, allcampgrounds) => {
      try {
        await res.render("index", {
          campgrounds: allcampgrounds,
        });
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// CREATE - Add new campground to DB
app.post("/campgrounds", async (req, res, next) => {
  //get data from forms and add to campgrounds array
  try {
    let name = req.body.name;
    let image = req.body.img;
    let desc = req.body.description;
    let newCampground = {
      name: name,
      image: image,
      description: desc,
    };
    // Create a new campground and save to DB
    await Campground.create(newCampground, async (err, newlyCreated) => {
      try {
        // redirect back to campgrounds page
        await res.redirect("/campgrounds");
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// NEW - Show form to create new database
app.get("/campgrounds/new", async (req, res, next) => {
  try {
    const response = await res.render("new");
  } catch (err) {
    console.error(err);
  }
});

// SHOW  - Shows more info about one campground
// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground)
      //render show template with that campground
      res.render("show", {
        campground: foundCampground
      });
    }
  });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
