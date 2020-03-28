const config = require('./auth')
const Discord = require('discord.js')

// Basta adicionar as clássicas velhotadas para esse array
var VELHOTADAS = require('./VELHOTADAS')

var Bohobot = new Discord.Client()

Bohobot.on('ready', async (event) => {
  console.log(`Name: ${Bohobot.user.username} and ID: ${Bohobot.user.id}`)
  const channel = await Bohobot.channels.fetch(config.recChannel)
  channel.join()
})

Bohobot.on('message', (message, userID) => {
  if (message.content.includes('velho')) {
    console.log(`BOHOMOL WAS TRIGGERED at ${Date.now()}`)
    message.reply(velhoteMessageGenerator())
  }
})

function velhoteMessageGenerator () {
  var message = VELHOTADAS[Math.floor(Math.random() * VELHOTADAS.length)]
  return message
}

Bohobot.login(config.token)
