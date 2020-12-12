const Scene = require('telegraf/scenes/base')
const data = require('./data.json')
const {sorted, shuffled} = require('./shuffled.json');
const fs = require('fs')
const shuffle = require('./shuffle')
let canShuffle = !sorted;
class SceneGenerator {
    targetScene () {
        const target = new Scene('target');
        target.enter(async(ctx) => {
            await ctx.reply('Привет, введи свой пароль, и я покажу тебе твою цель в игре.')
            if(!sorted && canShuffle) {
                canShuffle = false;
                const data = {sorted: true, shuffled: shuffle(shuffled)}
                fs.writeFileSync('./shuffled.json', JSON.stringify(data))
            }
        })
        target.on('text', async(ctx) => {
            console.log(ctx.message.text)
            // console.log(data.data)

            const user = data.data.filter(el => String(el.password) === String(ctx.message.text))
            // console.log({user})
            if(!user.length) {
                ctx.reply('Пароль неверный, копипастить не умеешь?')
            }
            else {
                console.log(shuffled)
                const userIndex = shuffled.findIndex(el => el === user[0].id)
                const targetIndex = (userIndex + 1) % (shuffled.length);
                const targetId = shuffled[targetIndex]
                const target = data.data.find(el => el.id === targetId)
                const helpersArr = target.info;
                const helpers = [];
                helpersArr.forEach(userId => {
                    const helper = data.data.filter(user => user.id === userId)
                    if(helper.length) helpers.push(helper[0].surname + ' ' + helper[0].name)
                })
                await ctx.telegram.sendPhoto(ctx.chat.id, {source: fs.readFileSync(`./photos/${targetId}.jpg`)})
                ctx.reply(`🎯 Твоя цель - ${target.surname} ${target.name}\n🎁 Дать подсказку по подарку смогут:\n ${helpers}\n Удачи ;)`)
                ctx.scene.leave()
            }
        })
        return target
    }
}

module.exports = SceneGenerator;
