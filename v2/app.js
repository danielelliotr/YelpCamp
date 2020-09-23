const express = require("express");
const app = express();
const axios = require("axios");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
connectDB();

app.use(express.json());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

// Schema Setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Hyrule",
//   image: "https://www.alfabetajuega.com/wp-content/uploads/2020/03/zelda-breath-wild-hyrule.jpg",
//   description: "The Kingdom of Hyrule, also simply known as Hyrule, the Land of the Gods, the Lesser Kingdom of Hyrule, the Surface, and Hyrule Kingdom, is the name of the kingdom that serves as the iconic setting for a majority of the games in the Zelda series. It is usually depicted as a beautiful and prosperous land blessed with deep forests, tall mountains, vast lakes, a barren desert, great cities, villages, and many ancient temples hidden throughout."

// }, (err, campground) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("New Location")
//     console.log(campground)
//   }
// });

app.get("/", async (req, res, next) => {
  try {
    const response = await res.render("landing", {})
  } catch (err) {
    console.error(err)
  }
});

// INDEX - show all campgrounds
app.get("/campgrounds", async (req, res, next) => {
  try {
    await Campground.find({}, async (err, allcampgrounds) => {
      try {
        await res.render("index", {
          campgrounds: allcampgrounds
        });
      } catch (err) {
        console.error(err)
      }
    });
  } catch (err) {
    console.error(err)
  }
});

// CREATE - Add new campground to DB
app.post("/campgrounds", async (req, res, next) => {
  //get data from forms and add to campgrounds array
  try {
    let name = req.body.name
    let image = req.body.img
    let desc = req.body.description
    let newCampground = {
      name: name,
      image: image,
      description: desc
    }
    // Create a new campground and save to DB
    await Campground.create(newCampground, async (err, newlyCreated) => {
      try {
        // redirect back to campgrounds page
        await res.redirect("/campgrounds")
      } catch (err) {
        console.error(err)
      }
    });
  } catch (err) {
    console.error(err)
  }
});

// NEW - Show form to create new database
app.get("/campgrounds/new", async (req, res, next) => {
  try {
    const response = await res.render("new")
  } catch (err) {
    console.error(err)
  }
})

// SHOW  - Shows more info about one campground
app.get("/campgrounds/:id", async (req, res, next) => {
  try {
    // Find the campground with the provided ID
    await Campground.findById(req.params.id, async (err, foundCampground) => {
      try {
        await res.render("show", {
          campground: foundCampground
        });
      } catch (err) {
        console.error(err)
      }
    });
  } catch (err) {
    console.error(err)
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
