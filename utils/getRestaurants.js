const request = require("request");
const axios = require("axios");

const getRestaurants = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYXF1aWI0NTYiLCJhIjoiY2tkdG54dGM5MDVjMzJybno4czI3bXptbSJ9.svK5JpvP8wtOGR0JmSxkWg&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      return callback("Please check your connectivity", undefined);
    } else if (response.body.features.length === 0) {
      return callback("Please enter a correct location", undefined);
    } else {
      const latitude = response.body.features[0].center[1];
      const longitude = response.body.features[0].center[0];

      axios({
        method: "GET",
        url: `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`,
        headers: {
          "user-key": "e817e176add64cb95a322155317ba478",
          "content-type": "application/json",
        },
      }).then((response) => {
        const resList = response.data.nearby_restaurants;
        resList.forEach((restaurant) => {
          const name = restaurant.restaurant.name;
          const locate = restaurant.restaurant.location.address;
          const rating = restaurant.restaurant.user_rating.aggregate_rating;

          const menuLink = restaurant.restaurant.menu_url;
          callback(undefined, { name, locate, menuLink, rating });
        });
      });
    }
  });
};

module.exports = getRestaurants;
