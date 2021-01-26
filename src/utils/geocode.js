const request = require("request");

const geocode = (adress, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(adress) +
    ".json?access_token=pk.eyJ1IjoidG9mdXJlZGJ1bGwiLCJhIjoiY2trOXllamhtMG16dzJuczlkeDhtNWhuNSJ9.P-otCVPROQPWtKngILxH5g&limit=1";
  //encode は ?などの特殊記号を処理してくれる

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to locations services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
