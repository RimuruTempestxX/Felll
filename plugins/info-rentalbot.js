import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
let tekss = `——————————————————————————

*Harga LIMIT Bot:*
150 Limit = Rp 7.000
240 Limit = Rp 10.000


——————————————————————————

*Hanya Menyediakan Limit,*
*Karena Bot Gratis Ditambahkan*

——————————————————————————

*Tertarik? Atau Tanya2 Dulu?*
*Kontak Admin Pemilik Bot*
— WhatsApp: *wa.me/6285163083750*
— Telegram: *t.me/Keizha_S*`
await m.reply(tekss)
await apivisit
}
handler.help = ['sewa','premium']
handler.tags = ['info','main']
handler.command = /^(rental|iklan|sewabot|sewa)$/i
export default handler