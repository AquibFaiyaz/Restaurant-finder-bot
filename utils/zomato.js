const axios = require('axios');

axios({
    method: "GET",
    url: "https://developers.zomato.com/api/v2.1/geocode?lat=27.902268&lon=78.083478",
    headers: {
      "user-key": "e817e176add64cb95a322155317ba478",
      "content-type": "application/json"
    }
  })
    .then(response => {
      const resList = response.data.nearby_restaurants;
      resList.forEach(dhaba =>{
        const name = dhaba.restaurant.name;
        const locate= dhaba.restaurant.location.address;

       const menuLink =  dhaba.restaurant.menu_url;
       const rating = dhaba.restaurant.user_rating.aggregate_rating
       console.log('Name: '+ name + '\nLocation: '+locate+ '\nmenu-Link: '+menuLink+ '\n\nRating: ' +rating)
       
      })
      //console.log(response.data.nearby_restaurants);
    })
    .catch(error => {
      console.log(error);
    });