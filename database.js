const mongoose = require("mongoose");
const {mongodb} = require("./keys");

mongoose.set("useFindAndModify", false);
mongoose.connect(mongodb.URI, {
	useNewUrlParser: true
})
  .then(db => console.log("DB conectada a BaseDHIDAW"))
  .catch(err => console.log(err))