const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const locationsController = require("./controllers/locations.js");
const itinerariesController = require("./controllers/itineraries.js");
const errorsController = require("./controllers/errors.js");

const app = express();
app.set("port", 3000);
const router = express.Router();

// CORS middleware
app.use(cors());

router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
router.use(bodyParser.json());

//Routes
router.get("/locations", locationsController.locations);
router.get("/itineraries", itinerariesController.itineraries);

//Middleware
router.use(errorsController.internalError);

//Starting server
app.use("/", router);
app.listen(app.get("port"), () =>
  console.log(
    `Server started and listening in http:localhost:${app.get("port")}`
  )
);
