import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Format: *${usedPrefix + command} ${atas ? atas : 'Teks Atas'}|${bawah ? bawah : 'Teks Bawah'}*`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `*Mime ${mime} Tidak Didukung*`
    let img = await q.download()
    let url = await uploadImage(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
    let stiker = await sticker(false, meme, global.packname, global.author)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, '', { asSticker: 1 })
}
handler.help = ['smeme <teks atas>|<teks bawah>']
handler.tags = ['sticker']
handler.command = /^(smeme)$/i
handler.register = false
handler.limit = 1

export default handler
