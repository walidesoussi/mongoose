const express = require('express')
const router = express.Router()
const Contact = require('../Models/contactSchema')
//add contact @post
router.post('/newcontact', (req, res) => {
    let newContact = new Contact(req.body)
    newContact.save((err, data) => {
        err ? console.log(err) : res.send('contact was added');
    })
})
//Create Many Records with model.create

const arrayOfPeople = [
    { name: "Walid", age: 26, favoriteFoods: ["hamburger"] }, 
    { name: "yasmine", age: 20, favoriteFoods: ["Mloukhiya"] },
    {name:"mariem", age:17 , favoritefood:["Madfouna"] },
    
  ];
  const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, persons) => {
      err ? console.log(err) : done(null, persons);
    });
  };
  router.post("/manyperson", (req, res) => {
    createManyPeople(req.body, (err, data) => {
      err ? console.log(err) : res.send("many person tsan3ou ");
    });
  });

  //Use model.find() to Search Your Database

  router.get("/:name", (req, res) => {
    Person.find({ name: req.params.name }, (req, res) => {
      err ? console.log(err) : res.json(data);
    });
  });



//Use model.findOne() to Return a Single Matching Document from Your Database

router.get("/getfavorite/:favoritefoods", (req, res) => {
  Person.findOne(
    {favoriteFoods : { $elMatch: { $eq: req.params.favoritefoods } } },
    (req, res) => {
      err ? console.log(err) : res.json(data);
    }
  );
});

    // Use model.findById() to Search Your Database By _id

    router.get("/:id", (req, res) => {
      Person.findById({ _id: req.params.id }, (req, res) => {
        err ? console.log(err) : res.json(data);
      });
    });

    //Perform Classic Updates by Running Find, Edit, then Save
    router.put("/:id", async (req, res) => {
      try {
        const foodToAdd = "hamburger";
        data.favoriteFoods = [...data.favoriteFoods, foodToAdd];
        const result = await data.save();
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json({ error: err });
      }
    });

    // Perform New Updates on a Document Using model.findOneAndUpdate()
    router.put("/update/:name", (req, res) => {
      const ageToSet = 20;
      Person.findByIdAndUpdate(
        { name: req.params.name },
        { $set: { age: ageToSet } },
        { returnNewDocument: true },
        (err, doc) => {
          err
            ? console.log("Something wrong when updating record")
            : res.json(doc);
        }
      );
    });
     

    // Delete One Document Using model.findByIdAndRemove
    router.delete("/:id", (req, res) => {
      Person.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
        err ? console.log(err) : res.json(data);
      });
    });
    
    // MongoDB and Mongoose - Delete Many Documents with model.remove()
     
    router.delete("/delname/:name", (req, res) => {
      Person.remove({ name: req.params.name }, (err, data) => {
        err ? console.log(err) : res.send("all persons named Mary were deleted");
      });
    });

    // Chain Search Query Helpers to Narrow Search Results
   
    router.get("/", (req, res) => {
      const foodToSearch = "Burritos";
      Person.find({ favoriteFoods: { $elMatch: { $eq: foodToSearch } } })
        .sort({ name: "desc" })
        .limit(2)
        .select("-age")
        .exec((err, data) => {
          err ? console.log(err) : res.json(data);
        });
    });
    

    module.exports = router;
