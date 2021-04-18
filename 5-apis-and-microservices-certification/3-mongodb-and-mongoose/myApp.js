require('dotenv').config();
const mongoose = require('mongoose');

// 1) Install and Set Up Mongoose
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// 2) Create a Model
var Schema = mongoose.Schema;
var PersonSchema = new Schema({
  name:  String,
  age: Number,
  favoriteFoods: [String]
});
var Person = mongoose.model('Person', PersonSchema);

// 3)
const createAndSavePerson = (done) => {
  var person = new Person({ 
    name: 'Marcelo Vilela', 
    age: '26', 
    favoriteFoods: ['pizza', 'hamburguer'] 
  });
  var data = person.save(function (err, person) {
    done(err, person);
  });
};

// 4)
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (error, data){
    done(error, data);
  });
};

// 5)
const findPeopleByName = (personName, done) => {
  Person.find({name:personName})
    .exec((err,data)=>done(err,data));
};

// 6)
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food})
    .exec((err,data)=>done(err,data));
};

// 7)
const findPersonById = (personId, done) => {
  Person.findById({_id: personId})
    .exec((err,data)=>done(err,data));
};

// 8)
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person
    .findById({_id: personId})
    .exec((err,person)=>{
      person.favoriteFoods.push(foodToAdd)
      person.save((err,data)=>done(err,data));
    });
};

// 9)
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
    (err,data)=>done(err,data)
  );
};

// 10)
const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    {_id:personId}, 
    {}, 
    (err,data)=>done(err,data)
  );
};

// 11)
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(
    {name: nameToRemove},
    (err,data)=>done(err,data)
  );
};

// 12)
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person
    .find({favoriteFoods: foodToSearch})
    .sort({'name': 'asc'})
    .limit(2)
    .select('name favoriteFoods')
    .exec((err,data)=>done(err,data));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
