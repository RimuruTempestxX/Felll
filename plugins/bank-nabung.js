const xpperlimit = 1
let handler = async (m, { conn, command, args }) => {
	let user = global.db.data.users[m.sender]
  let count = command.replace(/^atm/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (user.atm == 0) return m.reply('*Kamu Belum Mempunyai Kartu ATM*\n*Dapatkan Kartu ATM Di #craft*')
  if (user.bank > user.fullatm) return m.reply('*Uang Diatm Kamu Sudah Penuh*')
  if (count > user.fullatm - user.bank) return m.reply('*Uangnya Sudah Penuh Dibank*')
  if (global.db.data.users[m.sender].money >= xpperlimit * count) {
    global.db.data.users[m.sender].money -= xpperlimit * count
    global.db.data.users[m.sender].bank += count
    conn.reply(m.chat, `*Sukses Menabung Sebesar ${count} Money 💵*`, m)
  } else conn.reply(m.chat, `*Uang Anda Tidak Mencukupi Untuk Menabung ${count} Money 💵*`, m)
}
handler.help = ['atm <jumlah>']
handler.tags = ['rpg']
handler.command = /^atm([0-9]+)|atm|atmall$/i
handler.register = false
export default handler