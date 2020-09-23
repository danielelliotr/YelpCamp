const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let seeds = [{
    name: "Gondolin",
    image: "https://i.guim.co.uk/img/media/01f7ff104f0f7b6a08e28b49bdb5359b5c7774c7/67_1149_2154_1291/master/2154.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=05bfb986bc12cd847deb03ecd94033db",
    description: "Gondolin was a hidden city of the Elves located approximately in the middle of the land of Beleriand in Middle-earth. It was founded by Turgon the Wise, a Ñoldorin lord in the early First Age. It endured the longest of all the Ñoldorin kingdoms in exile, lasting nearly four centuries during the Years of the Sun."
  },
  {
    name: "Hyrule",
    image: "https://www.alfabetajuega.com/wp-content/uploads/2020/03/zelda-breath-wild-hyrule.jpg",
    description: "The Kingdom of Hyrule, also simply known as Hyrule, the Land of the Gods, the Lesser Kingdom of Hyrule, the Surface, and Hyrule Kingdom, is the name of the kingdom that serves as the iconic setting for a majority of the games in the Zelda series.[note 1] It is usually depicted as a beautiful and prosperous land blessed with deep forests, tall mountains, vast lakes, a barren desert, great cities, villages, and many ancient temples hidden throughout."
  },
  {
    name: "Luthadel",
    image: "https://i.pinimg.com/originals/01/d4/91/01d4910b11b5a65385c5e8f90f7bee5e.jpg",
    description: "Luthadel is the capital city in the Final Empire and located in the middle of the Central Dominance. Luthadel is originally home to the castle belonging to the Lord Ruler, as he resides in the fortress known as Kredik Shaw. An interesting note is that Luthadel was originally the Terris Mountains, as the Lord Ruler changed the geography of the land when he reached the Well of Ascension, which is hidden beneath his castle."
  },
  {
    name: "King's Landing",
    image: "https://awoiaf.westeros.org/images/6/64/Tomasz_Jedruszek_Kings_Landing.jpg",
    description: "King's Landing is the capital, and largest city, of the Seven Kingdoms. Located on the east coast of Westeros in the Crownlands, just north of where the Blackwater Rush flows into Blackwater Bay and overlooking Blackwater Bay, King's Landing is the site of the Iron Throne and the Red Keep, the seat of the King of the Andals and the First Men (hence the name). It enjoys a warm climate and life there is luxurious for those that can afford it, although it is not without its slums such as Flea Bottom. The city is overpopulated and dangerous at the best of times, despite being policed by the City Watch."
  }
];

async function seedDB() {
  try {
    await Campground.remove({});
    await Comment.remove({})
    for (const seed of seeds) {
      let campground = await Campground.create(seed)
      let comment = await Comment.create({
        text: "This place is great, but I wish there was internet",
        author: "Homer"
      })
      campground.comments.push(comment);
      campground.save();
    }
  } catch (error) {
    console.log(error)
  }
}


module.exports = seedDB;
