const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2a8b74ace033fa414711eff9a259befc&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    //このエラーはネット関係のもの
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback('"Unable to find location"' + url, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out and it feels like ${body.current.feelslike} degrees and the humidity is ${body.current.humidity} %`
      );
    }
  });
};

module.exports = forecast;
