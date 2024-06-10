const locationsData = require('../data/locations.json');
const validateDate = require('validate-date');

exports.isValidLocation = (location) => 
    locationsData.map((loc) =>loc.toLowerCase()).includes(location.toLowerCase());

exports.isValidDate = (year, month, day) => 
    validateDate(`${year}-${month}-${day}`, responseType="boolean", dateFormat="yyyy-mm-dd");
