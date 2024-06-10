const locationsData = require('../data/locations.json');

exports.locations = (req, res) => res.send(locationsData);
