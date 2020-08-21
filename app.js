
const Telegraf = require('telegraf');
const axios = require('axios');
const request = require('request');
const getRestaurants = require('./utils/getRestaurants');


const bot = new Telegraf('1233420128:AAHliiaWVLSev3N41YW__l4Y8KPvcVP25U8');


bot.start(ctx =>{
  ctx.reply(`Hello ${ctx.from.first_name}`);
  ctx.reply('You can search restaurants in your location.\neg: type `saket, delhi`')
})

bot.on('text', ctx => {
    
    const city = ctx.message.text;
  
    
    getRestaurants(city, (error, data) =>{
      if(error){
        return ctx.reply('Sorry this loction is not in my directory!! Please try another one')
      }
        ctx.reply('Name: '+ data.name + '\n\nLocation: '+data.locate+ '\n\nRating: '+data.rating+ '\n\nMenu-link: '+data.menuLink)
    })
  });

process.env.PORT





