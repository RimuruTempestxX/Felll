let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  const caption = `
*🏦 BANK ${user.registered ? user.name : conn.getName(m.sender)}*

 💳 Atm: *${user.atm > 0 ? 'Level ' + user.atm : '✖️'}*
 🏛️ Bank: *${user.bank} / ${user.fullatm}*
 💵 Money: *${user.money}*
 🤖 Robo: *${user.robo > 0 ? 'Level ' + user.robo : '✖️'}*
 🌟 Status: *${user.premiumTime > 0 ? 'Premium' : 'Free'}*
 📑 Registered: *${user.registered ? 'Yes':'No'}*
`.trim()

  // Send the message as plain text
  conn.sendMessage(m.chat, { text: caption }, { quoted: m }); 
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^(bank)$/i

handler.register = false 
export default handler