const config = require('./auth')
const Discord = require('discord.js')
const Giphy = require('giphy-api')('N7m01C7R9QFDIuc1WzloHpk4sj5Hd9vo')

const { promisify } = require('util')
Giphy.random = promisify(Giphy.random)

// Basta adicionar as clássicas velhotadas para esse array
var VELHOTADAS = require('./VELHOTADAS')

var Bohobot = new Discord.Client()
var onTrivia = false
var triviaQuestion = -1

Bohobot.on('ready', async (event) => {
  console.log(`Name: ${Bohobot.user.username} and ID: ${Bohobot.user.id}`)
  const general = await Bohobot.channels.cache.get('238835694779367424')
  general.send('CHEGUEI DO PLANTÃO NEGADA BORA TIBIA!!!')
  const channel = await Bohobot.channels.fetch(config.recChannel)
  channel.join()
})

Bohobot.on('message', async (message, userID) => {
  if (onTrivia || message.content.includes('!trivia')) {
    if (message.author.id !== '693471460307501067') {
      triviaLoop(message)
    }
  } else if (message.content.includes('velho')) {
    message.reply(velhoteMessageGenerator())
  } else if (message.content.includes('!gif')) {
    const gif = await Giphy.random('funny cat')
    message.reply(gif.data.embed_url)
  }
})

function velhoteMessageGenerator () {
  var message = VELHOTADAS[Math.floor(Math.random() * VELHOTADAS.length)]
  return message
}

function triviaLoop (message) {
  const QA = require('./trivia')

  if (!onTrivia) {
    onTrivia = true
    triviaQuestion = Math.floor(Math.random() * VELHOTADAS.length)
    message.reply(QA[triviaQuestion].Q)
  } else if (message.content.toLowerCase() === QA[triviaQuestion].A.toLowerCase()) {
    message.reply('ACERTOU MIZERAVEL!!!')
    onTrivia = false
    triviaQuestion = -1
  } else {
    message.reply(`ERROU SEUS NEWBA, A RESPOSTA É: ${QA[triviaQuestion].A}`)
    onTrivia = false
    triviaQuestion = -1
  }
}

Bohobot.login(config.token)
