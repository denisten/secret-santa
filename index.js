const { Telegraf } = require('telegraf')
const {Stage, session} = Telegraf
const dotenv = require('dotenv');
const SceneGenerator = require('./scene')
const curScene = new SceneGenerator()
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN)
const targetScene = curScene.targetScene();
const stage = new Stage([targetScene])

bot.use(session())
bot.use(stage.middleware())
bot.command('scenes',  (ctx) => ctx.scene.enter('target'))
bot.start((ctx) => ctx.scene.enter('target'))
bot.launch().then(() => console.log('bot is active')) // запуск бота
