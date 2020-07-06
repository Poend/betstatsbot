const TelegramBot = require('node-telegram-bot-api')
const TOKEN = require('../token')
// const bot = new TelegramBot(TOKEN, { polling: true })
const log = require('../log')
const changePages = require('./menu/changePages');
const message = require('./menu/pages/main/message');

const options = {
  webHook: {
    port: 443,
    key: `/etc/ssl/private/nginx-selfsigned.key`, // Path to file with PEM private key
    cert: `/etc/ssl/certs/nginx-selfsigned.crt` // Path to file with PEM certificate
  }
  };
// This URL must route to the port set above (i.e. 443)
const url = 'https://v292757.hosted-by-vdsina.ru';
const bot = new TelegramBot(TOKEN, options);

// //This informs the Telegram servers of the new webhook.
// bot.setWebHook(`${url}/bot${TOKEN}`, {
//  certificate: options.webHook.cert,
// });

//Just to ping!
// bot.on('message', function onMessage(msg) {
//   bot.sendMessage(msg.chat.id, 'I am alive!');
// });

// определяем состояние приложения, которое потом будем менять
// и присваиваем дефолтное значение, чтобы все не полегло в случае чего
// PS будем его также сбрасывать при команде НА ГЛАВНУЮ СТРАНИЦУ
const globalState = {}


// bot.on('message', msg => {
//   // Логгирую для разработки в консоль
  
//   changePages({msg, globalState, bot})
//   log({text: 'message time', value: Date(msg.date)})
//   log({text: 'chat_id', value: msg.chat.id})
//   log({text: 'state', value: globalState})

  
// })

// bot.on('polling_error', msg => console.log(msg))
bot.on('message', function onMessage(msg) {
  changePages({msg, globalState, bot})
} )