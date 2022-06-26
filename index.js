const mineflayer = require('mineflayer')
const mineflayernavigate = require('mineflayer-navigate')(mineflayer)
const ms = require('ms')
const mongoose = require('mongoose')
mongoose.connect('').then(console.log('đã kết nối với mỏn go daubui của Huyblox'))
const autoeat = require('mineflayer-auto-eat')
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const util = require('minecraft-server-util');
const { autototem } = require('mineflayer-auto-totem')
const toolPlugin = require('mineflayer-tool').plugin
const fs = require("fs");
const armorManager = require('mineflayer-armor-manager')
const { username } = require('./config.json');
const { Client, MessageEmbed } = require("discord.js");
const superagent = require("superagent")
require('dotenv').config();
const client = new Client();
setchannel = require('./models/setchannel')

const Owner = "Huybloxgaming"; //Tên chủ Bot

const config = {
	address: "2y2c.org",
	version: "1.12.2",
  pin: process.env.pin,
}; // Setting server , Pin , verison

const botCount = 1;
const personalSpace = 4;

var offset = 0;
var bots = [];

const bot = mineflayer.createBot({
  host: config.address,
  port: 25565,
  username: username,
  version: config.version,
})
bot.on('windowOpen', async (window) => {

// const pass = config.pin.split(' ')

// const p2 = pass[1];
// const p3 = pass[2];
// const p4 = pass[3];

//bot.simpleClick.leftMouse(Number(p1));
//bot.simpleClick.leftMouse(Number(p2));
//bot.simpleClick.leftMouse(Number(p3));
//bot.simpleClick.leftMouse(Number(p4));
 //   setTimeout(() => { bot.chat('/2y2c') }, ms(`30s`))
 //   setTimeout(() => { bot.clickWindow(10, 0, 0); }, ms(`5s`))});
  //  setInterval(() => { bot.chat ('AO làng CPvP | DISCORD : https://discord.2y2cpvp.ga | Join Us Now!! | Bạn có thể thắng giải chỉ bằng kĩ năng CPVP!!!')},ms(`60s`))


// ^ bỏ cái // ra
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const vec3 = require('vec3')
const RANGE_GOAL = 1

let fileContent = fs.readFileSync("bot-data.txt", "utf8").split('\n')
let linesDigged = Number(fileContent[0])
let linesEnd = Number(fileContent[1])
let HomeX = Number(fileContent[2])
let HomeY = Number(fileContent[3])
let HomeZ = Number(fileContent[4])

let sway = Number(fileContent[5])
let shift = Number(fileContent[6])

let restorePoint = 0
let restore = []

var chesting = 0
var digging = 0
var offset = 0

bot.loadPlugin(pathfinder)
bot.loadPlugin(toolPlugin)
bot.loadPlugin(autoeat)
bot.loadPlugin(tpsPlugin)
bot.loadPlugin(armorManager)
bot.loadPlugin(autototem)
mineflayernavigate(bot)

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  if (message === ',tps') {
    bot.chat('Current tps: ' + bot.getTps ())
  }
})
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  if (message === ',serverinfo') {
    bot.chat(`tps server : ${bot.getTps()} Online Player : ${Object.values(bot.players).map(name => name.username).length} | ${randomnum}`)
  }
})
bot.on('login', () => {
  bot.autoEat.options = {
    priority: 'foodPoints',
    startAt: 17,
    bannedFood: []
  }
  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)
  bot.pathfinder.setMovements(defaultMove)
  defaultMove.scafoldingBlocks = []
  defaultMove.allowParkour = false
})

bot.on('health', () => {
  console.log(`food  : ${bot.food} | heart  : ${bot.health}`)
  if (bot.food !== 20) {
    bot.autoEat.disable()
    bot.autoEat.enable()
  }
})

bot.on("physicsTick", async () => {
    bot.autototem.equip()
})
bot.on('chat', async (username, message) => {
  let Owner = bot.Owner;
  command = message.split(' ')
  switch (command[0]) {
    case ',bariton':
      const target = bot.players[username]?.entity
      if (!target) {
        bot.chat("I don't see you !")
        break
      }
      const { x: playerX, y: playerY, z: playerZ } = target.position
      bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL))
      break
          case ',sethome':
      HomeX = bot.entity.position.x.toFixed(1)
      HomeY = bot.entity.position.y.toFixed(1)
      HomeZ = bot.entity.position.z.toFixed(1)
      bot.chat(`Ok was sethome |data save|`)
      console.log(`was sethome at ${HomeX} ${HomeY} ${HomeZ}`)
      save()
      break
    case ',mine':
        const mine = require('./highway/check')(bot);
        mine
      case ',home':
      digging = 0
      bot.stopDigging()
      bot.pathfinder.goto(new GoalNear(HomeX, HomeY, HomeZ, 0))
      break
        case ',botoff': 
      save()
      digging = 2
      bot.stopDigging()
      bot.quit()
      process.exit(1)
    case 'Vakyla':
    bot.chat("mẹ m mồm hôi vl tự nhiên nhắc tới rác")
    case ',botinfo':
     bot.chat(`food  : ${bot.food} | heart  : ${bot.health} | ${randomnum}`)
    case ',help':
     bot.chat(`/w ${username} tps , serverinfo , kd | | ${randomnum}`)
  }
function save () {
  if (bot.food === 20) bot.autoEat.disable()
  else bot.autoEat.enable()
  fs.writeFileSync("bot-data.txt", linesDigged + '\n' + linesEnd + '\n' + HomeX + '\n' + HomeY + '\n' + HomeZ + '\n' + sway + '\n' + shift )
  bot.chat('data saved')
}
  })
	bot.on('kicked', (reason) => console.info('Kicked for reason', reason))

bot.on('message', message => {
  const embed = new MessageEmbed()
	.setDescription(message.toString())
	.setColor('GREEN')
  client.channels.cache.get("950367506625876008").send(embed)
});
bot.once('login', () => {
    bot.once('spawn', () => {
      const spawn = new MessageEmbed()
        .setDescription(`bot đã login vào server`)
        .setColor('BLUE')
      client.channels.cache.get("950367506625876008").send(spawn)
      console.log("Bot đã đăng nhập vào server");
      setInterval(() => {
        bot.swingArm("left");
        bot.look(Math.floor(Math.random() * Math.floor("360")), 0, true, null);
      }, 1 * 60 * 1000);
    });
  });
var reconnect = 10;
bot.on('end', (reason) => {
  const end = new MessageEmbed()
	.setDescription(`bot đã bị kick lý do \`${reason}\`\, vào lại sau ${reconnect} giây**`)
	.setColor('RED')
  client.channels.cache.get("950367506625876008").send(end)
  console.log(`Bot mất kết nối server, lý do: ${reason}, kết nối lại sau ${reconnect}s`);
  setTimeout(() => {
	const relog = new MessageEmbed()
	  .setDescription(`kết nối lại server`)
	  .setColor('RED')
	client.channels.cache.get("950367506625876008").send(relog)
	console.log("Đang kết nối lại server...");
	createBot();
  }, ms(`${reconnect}s`))
});

client.on('message', async message => {
  if (!message.guild) return;
  if (message.author.bot || message.author.id === client.user.id) return;
  if (message.channel.id === "950367506625876008") {
	message.react('👍');
	bot.chat(`&e[${message.author.tag}] ${message.content}  | Vᴀᴋʏʟᴀ = Tʀᴀsʜ`)
  }
  if (message.author.id === '536142062395981836') {
	const args = message.content.split(' ');
	const cmd = args.shift().toLowerCase();
	switch (cmd) {
	  case `!chat`: {
		if (!args.length) return;
		await message.react('❤');
		await bot.chat(args.join(" "))
	  }
	}
  }
})

			var string = `1 2 3 4 5 6 6 7 8 9 0`;
			var words = string.split(' ');
            let random1 = words[Math.floor(Math.random() * words.length)];
            let random2 = words[Math.floor(Math.random() * words.length)];
            let random3 = words[Math.floor(Math.random() * words.length)];
            let random4 = words[Math.floor(Math.random() * words.length)];
            let random5 = words[Math.floor(Math.random() * words.length)];
            let random6 = words[Math.floor(Math.random() * words.length)];
            let random7 = words[Math.floor(Math.random() * words.length)];
            let random8 = words[Math.floor(Math.random() * words.length)];
            let random9 = words[Math.floor(Math.random() * words.length)];
            let random10 = words[Math.floor(Math.random() * words.length)];
            var randomnum = `${random1}${random2}${random3}${random4}${random5}${random6}${random7}${random8}${random9}${random10}` 




			const kill1 = /^(.+) bị giết bởi (.+) sử dụng (.+)$/;
			const kill2 = /^(.+) bị đẩy té xuống vực bởi (.+)$/;
			const kill3 = /^(.+) chết ngạt vì đéo biết bơi$/;
			const kill4 = /^(.+) bị thông đít đến chết$/;
			const kill5 = /^(.+) chết đói$/;
			const kill6 = /^(.+) cứ nghĩ cháy là ngầu$/;
			const kill7 = /^(.+) té đập con mẹ nó mặt$/;
			const kill8 = /^(.+) bú cu tự sát$/;
			const kill9 = /^(.+) Tập bơi trong lava$/;
			const kill10 = /^(.+) đang leo lên thì té khỏi dây leo$/;
			const kill11 = /^(.+) đã bị giết bởi (.+)$/;
			const kill12 = /^(.+) đập mặt vào cột điện$/;
			const kill13 = /^(.+) nghĩ rằng cậu ấy bơi được hoài$/;
			const kill14 = /^(.+) chết cháy$/;
			const kill15 = /^(.+) đang leo lên thì té khỏi Thang$/;
			const kill16 = /^(.+) bị bắt bởi (.+) dùng (.+)$/;
			const kill17 = /^(.+) đã giết (.+) bằng (.+)$/;
			const kill18 = /^(.+) bị giết bởi (.+)$/;
			const kill19 = /^(.+) đã giết hại (.+) bằng (.+)$/;
			const kill20 = /^(.+) chết khi tắm xông hơi$/;
			const kill21 = /^(.+) bóp chim tự tử$/;
			const kill22 = /^(.+) nổ banh xác (.+) với tnt$/;
			const kill23 = /^(.+) was blown up by a Creeper$/;
			const kill24 = /^(.+) (?:nỏ|nổ) banh chim$/;
			const kill25 = /^(.+) bị giết bởi (.+) dùng (.+)$/;
			const kill26 = /^(.+) bị sét đánh$/;
			const kill27 = /^(.+) bị đè chết bởi đe$/;
			const kill28 = /^(.+) ngủ dưới nether :kappa: $/;
			const kill29 = /^(.+) bị hội đồng bởi (.+) Sử dụng (.+)$/;
			const kill30 = /^(.+) bị bốc hơi$/;
		
			// Nhập vào database
			const kd = require('./kd');
			const date = new Date();
			const joinDate = `Ng ${date.getDate()},Thg ${date.getMonth() + 1},Năm ${date.getFullYear()}`;
		
			async function victimWriter(victim, message, kd) {
				let data = await kd.findOne({ username: victim })
				if (data) {
					const deathcount = Number(data.death) + 1;
					if (data.firstdeath === 'No data') {
						kd.findOneAndUpdate({ username: victim }, { $set: { firstdeath: message, lastdeath: message, death: deathcount } });
					}
					else if (data.firstdeath !== 'No data' && data.lastdeath !== 'No data') {
						kd.findOneAndUpdate({ username: victim }, { $set: { lastdeath: message, death: deathcount } });
					}
				} else {
					data = new kd({
						username: victim,
						kill: '0',
						death: '1',
						firstkill: 'No data',
						lastkill: 'No data',
						firstdeath: `${message}`,
						lastdeath: `${message}`,
						joinDate: joinDate,
					});
					data.save();
				}
			}
			async function killerWriter(killer, message, kd) {
				let data = await kd.findOne({ username: killer })
				if (err) throw err;
				if (data) {
					const killcount = Number(data.kill) + 1;
					if (data.firstdeath === 'No data') {
						await kd.findOneAndUpdate({ username: killer }, { $set: { firstkill: message, lastkill: message, kill: killcount } });
					}
					else if (data.firstkill !== 'No data' && data.lastkill !== 'No data') {
						await kd.findOneAndUpdate({ username: killer }, { $set: { lastkill: message, kill: killcount } });
					}
				} else {
					data = new kd({
						username: killer,
						kill: '1',
						death: '0',
						firstkill: `${message}`,
						lastkill: `${message}`,
						firstdeath: 'No data',
						lastdeath: 'No data',
						joinDate: joinDate,
					});
					await data.save();
				}
			}
		
			// Message
			bot.on('message', async (message) => {
				if (bot.player.username === 'Huybloxgam1ng') return
				const messageregex = /^<(.+)> (.+)$/;
				if (messageregex.test(message.toString())) return;
				const str = message.toString();
				if (kill1.test(str)) {
					const victim = `${kill1.exec(str)[1]}`;
					const killer = `${kill1.exec(str)[2]}`;
					const weapon = `${kill1.exec(str)[3]}`;
					const message = `${victim} bị giết bởi ${killer} dùng ${weapon}`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill2.test(str)) {
					const victim = `${kill2.exec(str)[1]}`;
					const killer = `${kill2.exec(str)[2]}`;
					const message = `${victim} bị đẩy xuống vực ${killer}`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill3.test(str)) {
					const victim = `${kill3.exec(str)[1]}`;
					const message = `${victim} chết ngạt vì đéo biết bơi`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill4.test(str)) {
					const victim = `${kill4.exec(str)[1]}`;
					const message = `${victim} bị thông đít đến chết`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill5.test(str)) {
					const victim = `${kill5.exec(str)[1]}`;
					const message = `${victim} chết đói`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill6.test(str)) {
					const victim = `${kill6.exec(str)[1]}`;
					const message = `${victim} cứ nghĩ cháy là ngầu`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill7.test(str)) {
					const victim = `${kill7.exec(str)[1]}`;
					const message = `${victim} té đập con mẹ nó mặt`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill8.test(str)) {
					const victim = `${kill8.exec(str)[1]}`;
					const message = `${victim} bú cu tự sát`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill9.test(str)) {
					const victim = `${kill9.exec(str)[1]}`;
					const message = `${victim} Tập bơi trong lava`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill10.test(str)) {
					const victim = `${kill10.exec(str)[1]}`;
					const message = `${victim} đang leo thì té khỏi dây leo`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill11.test(str)) {
					const victim = `${kill11.exec(str)[1]}`;
					const killer = `${kill11.exec(str)[2]}`;
					const message = `${victim} bị giết bởi ${killer}`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill12.test(str)) {
					const victim = `${kill12.exec(str)[1]}`;
					const message = `${victim} đập mặt vào cột điện`;
					// Victim
					kvictimWriter(victim, message, kd)
				}
				else if (kill13.test(str)) {
					const victim = `${kill13.exec(str)[1]}`;
					const message = `${victim} nghĩ rằng cậu ấy bơi được hoài`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill14.test(str)) {
					const victim = `${kill14.exec(str)[1]}`;
					const message = `${victim} chết cháy`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill15.test(str)) {
					const victim = `${kill15.exec(str)[1]}`;
					const message = `${victim} đang leo thì té khỏi thang`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill16.test(str)) {
					const victim = `${kill16.exec(str)[1]}`;
					const killer = `${kill16.exec(str)[2]}`;
					const weapon = `${kill16.exec(str)[3]}`;
					const message = `${victim} bị bắn bởi ${killer} sử dụng ${weapon}`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill17.test(str)) {
					const victim = `${kill17.exec(str)[2]}`;
					const killer = `${kill17.exec(str)[1]}`;
					const weapon = `${kill17.exec(str)[3]}`;
					const message = `${killer} đã giết ${victim} dùng ${weapon}`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill18.test(str)) {
					const victim = `${kill18.exec(str)[1]}`;
					const killer = `${kill18.exec(str)[2]}`;
					const message = `${victim} bị giết bởi ${killer}`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill19.test(str)) {
					const victim = `${kill19.exec(str)[1]}`;
					const killer = `${kill19.exec(str)[2]}`;
					const weapon = `${kill19.exec(str)[3]}`;
					const message = `${victim} đã giết hại ${killer} bẳng ${weapon}`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill20.test(str)) {
					const victim = `${kill13.exec(str)[1]}`;
					const message = `${victim} chết khi tắm xông hơi`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill21.test(str)) {
					const victim = `${kill21.exec(str)[1]}`;
					const message = `${victim} bóp chim tự tử`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill22.test(str)) {
					const killer = `${kill22.exec(str)[2]}`;
					const victim = `${kill22.exec(str)[1]}`;
					const message = `${victim} nổ banh xác ${killer} bằng tnt`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill23.test(str)) {
					const victim = `${kill23.exec(str)[1]}`;
					const message = `${victim} was blown up by a Creeper`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill24.test(str)) {
					const victim = `${kill24.exec(str)[1]}`;
					const message = `${victim} nổ banh chim`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill25.test(str)) {
					const victim = `${kill25.exec(str)[1]}`;
					const killer = `${kill25.exec(str)[2]}`;
					const weapon = `${kill25.exec(str)[3]}`;
					const message = `${victim} bị giết bởi ${killer} dùng ${weapon}`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill26.test(str)) {
					const victim = `${kill26.exec(str)[1]}`;
					const message = `${victim} bị sét đánh`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill27.test(str)) {
					const victim = `${kill27.exec(str)[1]}`;
					const message = `${victim} bì đè chết bởi đe`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill28.test(str)) {
					const victim = `${kill28.exec(str)[1]}`;
					const message = `${victim} ngủ dưới nether :kappa:`;
					// Victim
					victimWriter(victim, message, kd)
				}
				else if (kill29.test(str)) {
					const victim = `${kill29.exec(str)[1]}`;
					const killer = `${kill29.exec(str)[2]}`;
					const weapon = `${kill29.exec(str)[3]}`;
					const message = `${victim} bị hội đồng bởi ${killer} dùng ${weapon}`;
					// Victim
					victimWriter(victim, message, kd)
					// Killer
					killerWriter(killer, message, kd)
				}
				else if (kill30.test(str)) {
					const victim = `${kill30.exec(str)[1]}`;
					const message = `${victim} bị bốc hơi`;
					// Victim
					victimWriter(victim, message, kd)
				}
			});
			const kdcommand = /^<(.+)> (?:og.kd|,kd)/;
			const jdcommand = /^<(.+)> (?:,jd|og.jd)/;
			const lastkill = /^<(.+)> (?:,lk|,lastkill|og.lk|og.lastkill)/;
			const firstkill = /^<(.+)> (?:,fk|!firstkill|og.firstkill|og.fk)/;
			const lastdeath = /^<(.+)> (?:,ld|!lastdeath|og.ld|og.lastdeath)/;
			const firstdeath = /^<(.+)> (?:,fd|!firstdeath|og.fd|og.firstdeath)/;
		
			bot.on('message', async (msg) => {
				const text = msg.toString();
				const str = msg.toString();
				if (kdcommand.test(msg.toString())) {
					const fullname = kdcommand.exec(text)[1];
					const userlenght = fullname.length - 9;
					const username = fullname.slice(-userlenght);
					const checkdonator = fullname.slice(0, -username.length);
					if (checkdonator === '[Donator]') {
						kd.findOne({ username: `${username}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								const kdpoint = data.kill / data.death;
								bot.chat(`/w ${username} Kill: ${data.kill} | Death: ${data.death} | K/D: ${kdpoint} `);
							}
							else {
								bot.chat(`/w ${username} tự sát để tạo data.`);
							}
						});
					}
					else {
						kd.findOne({ username: `${fullname}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								const kdpoint = data.kill / data.death;
								bot.chat(`/w ${fullname} Kill: ${data.kill} | Death: ${data.death} | K/D: ${kdpoint}`);
							}
							else {
								bot.chat(`/w ${fullname} tự sát để tạo data.`);
							}
						});
					}
				}
				else if (jdcommand.test(msg.toString())) {
					const fullname = jdcommand.exec(text)[1];
					const userlenght = fullname.length - 9;
					const username = fullname.slice(-userlenght);
					const checkdonator = fullname.slice(0, -username.length);
					if (checkdonator === '[Donator]') {
						kd.findOne({ username: `${username}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${username} Dữ liệu được tạo từ ${data.joinDate}`);
							}
							else {
								bot.chat(`/w ${username} tự sát để tạo data.`);
							}
						});
					}
					else {
						kd.findOne({ username: `${fullname}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${fullname} dữ liệu dc tạo vào ${data.joinDate}`);
							}
							else {
								bot.chat(`/w ${fullname} tự sát để tạo data.`);
							}
						});
					}
				}
				else if (lastkill.test(str)) {
					const fullname = lastkill.exec(text)[1];
					const userlenght = fullname.length - 9;
					const username = fullname.slice(-userlenght);
					const checkdonator = fullname.slice(0, -username.length);
					if (checkdonator === '[Donator]') {
						kd.findOne({ username: `${username}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${username} Lastkill: ${data.lastkill}`);
							}
							else {
								bot.chat(`/w ${username} tự sát để tạo data.`);
							}
						});
					}
					else {
						kd.findOne({ username: `${fullname}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${fullname} Lastkill: ${data.lastkill}`);
							}
							else {
								bot.chat(`/w ${fullname} tự sát để tạo data.`);
							}
						});
					}
				}
				else if (firstkill.test(str)) {
					const fullname = firstkill.exec(text)[1];
					const userlenght = fullname.length - 9;
					const username = fullname.slice(-userlenght);
					const checkdonator = fullname.slice(0, -username.length);
					if (checkdonator === '[Donator]') {
						kd.findOne({ username: `${username}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${username} Firstkill: ${data.firstkill}`);
							}
							else {
								bot.chat(`/w ${username} tự sát để tạo data.`);
							}
						});
					}
					else {
						kd.findOne({ username: `${fullname}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${fullname} Firstkill: ${data.firstkill}`);
							}
							else {
								bot.chat(`/w ${fullname} tự sát để tạo data.`);
							}
						});
					}
				}
				else if (lastdeath.test(str)) {
					const fullname = lastdeath.exec(text)[1];
					const userlenght = fullname.length - 9;
					const username = fullname.slice(-userlenght);
					const checkdonator = fullname.slice(0, -username.length);
					if (checkdonator === '[Donator]') {
						kd.findOne({ username: `${username}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${username} Lastdeath: ${data.lastdeath}`);
							}
							else {
								bot.chat(`/w ${username} tự sát để tạo data.`);
							}
						});
					}
					else {
						kd.findOne({ username: `${fullname}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${fullname} Lastdeath: ${data.lastdeath}`);
							}
							else {
								bot.chat(`/w ${fullname} tự sát để tạo data.`);
							}
						});
					}
				}
				else if (firstdeath.test(str)) {
					const fullname = firstdeath.exec(text)[1];
					const userlenght = fullname.length - 9;
					const username = fullname.slice(-userlenght);
					const checkdonator = fullname.slice(0, -username.length);
					if (checkdonator === '[Donator]') {
						kd.findOne({ username: `${username}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${username} Firstdeath: ${data.firstdeath}`);
							}
							else {
								bot.chat(`/w ${username} tự sát để tạo data.`);
							}
						});
					}
					else {
						kd.findOne({ username: `${fullname}` }, async (err, data) => {
							if (err) throw err;
							if (data) {
								bot.chat(`/w ${fullname} Firstdeath: ${data.firstdeath}`);
							}
							else {
								bot.chat(`/w ${fullname} tự sát để tạo data.`);
							}
						});
					}
				}
			});
client.login(process.env.token);
