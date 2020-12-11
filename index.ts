const { Telegraf } = require('telegraf')
const bot = new Telegraf("1235243246:AAFE7yHEfvM_N4VlQwOruJARLocyf0a46rw") //сюда помещается токен, который дал botFather
bot.start((ctx) => ctx.reply('Welcome')) //ответ бота на команду /start
bot.help((ctx) => ctx.reply('Send me a sticker')) //ответ бота на команду /help
bot.on('sticker', (ctx) => ctx.reply('')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
bot.hears('hi', (ctx) => ctx.reply('Hey there')) // bot.hears это обработчик конкретного текста, данном случае это - "hi"
bot.launch().then(() => console.log('bot is active')) // запуск бота
