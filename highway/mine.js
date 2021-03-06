let stop = Boolean
const Vec3 = require('vec3').Vec3;

module.exports = async (bot) => {
    async function dig() {
        if (stop === true) return
        for (let y = 3; y >= 0; y--) {
            if (y !== 0) {
                for (let z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                    if (target.name === 'air') continue;
                    if (target && bot.canDigBlock(target)) {
                        try {
                            await bot.dig(target, false, new Vec3(-1, 0, 0))
                        } catch (err) {
                            console.log(err.stack);
                        }
                        continue;
                    }
                    console.log('deo dao dc');

                }
                continue;
            }
            if (y === 0) {
                for (let z = -1; z <= 1; z++) {
                    const targetdown = bot.blockAt(bot.entity.position.offset(2, y, z));
                    if (targetdown.name === 'air') continue;
                    if (targetdown && bot.canDigBlock(targetdown)) {
                        try {
                            await bot.dig(targetdown, false, new Vec3(-1, 0, 0))
                        } catch (err) {
                            console.log(err.stack);
                        }
                        continue;
                    }
                    console.log('deo dao dc');
                }
            }
        }
        const checkinfront = await require('./checkInFront')(bot);
        const scaffoldcheck = await require('./scaffoldcheck')(bot);
        const lavacheck = await require('./CheckLavaBLock')(bot);
        const checkwall = await require('./check')(bot);
        if (scaffoldcheck === true) {
            await require('./scaffoldhighway')(bot)
            await dig()
            return;
        }
        if (lavacheck.check === true) {
            await require('./placelavablock')(bot);
            await dig();
            return;
        }
        if (checkinfront === false) {
            setTimeout(async () => {
          bot.equip(278, 'hand')
                await dig();
                bot.navigate.to(bot.entity.position.offset(-1, 0, 0));
            }, 500);
            return;
        }
        if (checkwall === false) {
            setTimeout(() => dig(), 500)
            return;
        }

        setTimeout(async () => {
            await dig();
            bot.navigate.to(bot.entity.position.offset(1, 0, 0));
        }, 500);
    }
    stop = false
    bot.chat('di dao thoiii')
    await dig()
}