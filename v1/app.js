const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

let campgrounds = [{
    name: "Mount Doom",
    image: "https://i.redd.it/j8v3w8mp8pa51.jpg"
  },
  {
    name: "The Shire",
    image: "https://vignette.wikia.nocookie.net/lotr/images/d/d2/Hobbiton1_6x4.jpg/revision/latest?cb=20080504223308"
  },
  {
    name: "The Shire",
    image: "https://vignette.wikia.nocookie.net/lotr/images/d/d2/Hobbiton1_6x4.jpg/revision/latest?cb=20080504223308"
  },
  {
    name: "The Shire",
    image: "https://vignette.wikia.nocookie.net/lotr/images/d/d2/Hobbiton1_6x4.jpg/revision/latest?cb=20080504223308"
  },
  {
    name: "The Shire",
    image: "https://vignette.wikia.nocookie.net/lotr/images/d/d2/Hobbiton1_6x4.jpg/revision/latest?cb=20080504223308"
  },
  {
    name: "The Shire",
    image: "https://vignette.wikia.nocookie.net/lotr/images/d/d2/Hobbiton1_6x4.jpg/revision/latest?cb=20080504223308"
  },
  {
    name: "The Shire",
    image: "https://vignette.wikia.nocookie.net/lotr/images/d/d2/Hobbiton1_6x4.jpg/revision/latest?cb=20080504223308"
  },
  {
    name: "Rivendell",
    image: "https://vignette.wikia.nocookie.net/lotr/images/d/d8/614690.jpg/revision/latest?cb=20180501204919"
  }
]

app.get("/", async (req, res, next) => {
  try {
    const response = await res.render("landing", {})
  } catch (err) {
    console.error(err)
  }
});

app.get("/campgrounds", async (req, res, next) => {
  try {
    const response = await res.render("campgrounds", {
      campgrounds: campgrounds
    })
  } catch (err) {
    console.error(err)
  }
})

app.post("/campgrounds", async (req, res, next) => {
  try {
    //get data from forms and add to campgrounds array
    let name = req.body.name
    let image = req.body.img
    let newCampground = {
      name: name,
      image: image
    }
    campgrounds.push(newCampground)
    // redirect back to campgrounds page
    const response = await res.redirect("/campgrounds")
  } catch (err) {
    console.error(err)
  }
})

app.get("/campgrounds/new", async (req, res, next) => {
  try {
    const response = await res.render("new")
  } catch (err) {
    console.error(err)
  }
})

app.listen(3000, () => {
  console.log("Listening on Port 3000")
})
