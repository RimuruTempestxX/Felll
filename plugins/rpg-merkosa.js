// let pajak = 0.02let handler = async (m, { conn, text, usedPrefix, command }) => {let dapat = (Math.floor(Math.random() * 600000))let healtu = (Math.floor(Math.random() * 100))let nomors = m.sender  let who  if (m.isGroup) who = m.mentionedJid[0]  else who = m.chat  if (!who) throw 'Format: *.merkosa @Tag*'  if (typeof db.data.users[who] == 'undefined') throw '*Pengguna Tidak Ada Didalam Data Base*'  let __timers = (new Date - global.db.data.users[m.sender].lastmerkosa)  let _timers = (3600000 - __timers)   let timers = clockString(_timers)  let users = global.db.data.users  if (new Date - global.db.data.users[m.sender].lastmerkosa > 3600000){   if (10 > users[who].os) throw '*Target Sudah Tidak Memiliki O/S*'   if (100 > users[who].os) throw '*Stamina Target Kurang*'   if (600000 > users[who].exp) throw '*Nafsu Target Dibawah Batas Minimal*'   if (10 > users[m.sender].os) throw '*Kamu Tidak Memiliki O/S*'   if (100 > users[m.sender].os) throw '*Stamina Kamu Kurang*'  users[who].os -= healtu * 1  users[who].stamina -= healtu * 1  users[who].exp -= dapat * 1  users[who].diperkosa += 1  users[m.sender].exp += dapat * 1  users[m.sender].os -= healtu * 1  users[m.sender].stamina -= healtu * 1  users[m.sender].memperkosa += 1  users[m.sender].apocalypseglory += 10000  global.db.data.users[m.sender].lastmerkosa = new Date * 1  m.reply(`*「 RAPE 」*\n\nTarget Berhasil Diperkosa Dan Kamu Mendapatkan\n${dapat} Exp✨\nO/S Kamu Berkurang ${healtu} 💦 Serta Kamu Mendapatakan Apocalypse Glory\nTarget Berkurang ${healtu} O/S 💦\nTarget Berkurang ${dapat} Exp ✨`)}else conn.reply(m.chat, `*「 RAPE 」*\n\n*Tunggu ${timers} Untuk Memperkosa Lagi*`, m)}handler.help = ['merkosa @Tag']handler.tags = ['rpg']handler.command = /^merkosa$/handler.limit = 2handler.group = true export default handlerfunction pickRandom(list) {    return list[Math.floor(Math.random() * list.length)]}function clockString(ms) {  let h = Math.floor(ms / 3600000)  let m = Math.floor(ms / 60000) % 60  let s = Math.floor(ms / 1000) % 60  console.log({ms,h,m,s})  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}