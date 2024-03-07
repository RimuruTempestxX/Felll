const xpperlimit = 1
let handler = async (m, { conn, command, args }) => {
	let user = global.db.data.users[m.sender]
  let count = command.replace(/^pull/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].bank / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (user.atm == 0) return m.reply('*Kamu Belum Mempuyai Atm*\n*Dapatkan Kartu ATM Di #craft*')
  if (global.db.data.users[m.sender].bank >= xpperlimit * count) {
    global.db.data.users[m.sender].bank -= xpperlimit * count
    global.db.data.users[m.sender].money += count
    conn.reply(m.chat, `*Sukses Menarik Sebesar ${count} Money 💵*`, m)
  } else conn.reply(m.chat, `*Uang Diatm Anda Tidak Mencukupi Untuk Ditarik Sebesar ${count} Money 💵*`, m)
}
handler.help = ['pull <jumlah>']
handler.tags = ['rpg']
handler.command = /^pull([0-9]+)|pull|pullall$/i
handler.register = false
export default handler