function weatherMunge(weatherData) {

    let weatherArray = weatherData.data.map(item => 
  return {

        forecast: item.weather.description,
        time: item.datetime

    };
    });
    return weatherArray.slice(0, 8);
}
module.exports = {
    weatherMunge
};