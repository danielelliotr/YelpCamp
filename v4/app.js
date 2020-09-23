const express = require("express");
const app = express();
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment")
const seedDB = require("./seed");
const campground = require("./models/campground");
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
        await res.render("campgrounds/index", {
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
    const response = await res.render("campgrounds/new");
  } catch (err) {
    console.error(err);
  }
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground)
      //render show template with that campground
      res.render("campgrounds/show", {
        campground: foundCampground
      });
    }
  });
})

// ==================
// COMMENTS ROUTES
// ==================

app.get("/campgrounds/:id/comments/new", function (req, res) {
  // find campground by id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {
        campground: campground
      });
    }
  })
});

app.post("/campgrounds/:id/comments", function (req, res) {
  //lookup campground using ID
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
  //create new comment
  //connect new comment to campground
  //redirect campground show page
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
