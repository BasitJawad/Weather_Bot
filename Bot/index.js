const dotenv = require('dotenv');
const axios = require('axios');
const Telegram = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
dotenv.config();
const token = process.env.Telegram_bot_token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new Telegram(token);

// Replace these with actual coordinates
const lat = process.env.lat; // Example: Riyadh latitude
const lon = process.env.lon; // Example: Riyadh longitude
const apiKey = process.env.WeatherSecret;

async function getWeather() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const weatherMessage = `The weather in ${response.data.name} is ${response.data.weather[0].description}, temperature is ${response.data.main.temp}°C, wind speed is ${response.data.wind.speed} m/s, `
    bot.sendMessage(
      process.env.Telegram_chat_id,
      weatherMessage
    );
  } catch (err) {
    console.error('Error fetching weather:', err.message);
  }
}

getWeather();
