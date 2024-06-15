const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'ae'],
  description: "An AI command powered by GPT-4",
  usage: "Ai questions" ,
  credits: 'aesther',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`♡   ∩_∩\n    （„• ֊ •„)♡\n┏━∪∪━━━━ღ❦ღ┓\🛜 [Autobot]✨:\nhttps://www.facebook.com/thegodess.aesther\n〉「𝙰𝚎𝚜𝚝𝚑𝚎𝚛」`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(``, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://soyeon-api.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage('♡   ∩_∩\n    （„• ֊ •„)♡\n┏━∪∪━━━━ღ❦ღ┓' + response + '\n[📩]\n┗ღ❦ღ━━━━━━━┛ ', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('⚠️ 🫠エラー。。。。。 ⚠️', event.threadID, event.messageID);
  }
};
