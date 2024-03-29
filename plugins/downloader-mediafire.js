import { lookup } from 'mime-types'
import { mediafiredl } from '@bochilteam/scraper'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
	if (!args[0]) throw 'Format: *.mediafire Tautan*' 
	if (!/https?:\/\/(www\.)?mediafire\.com/.test(args[0])) throw '*Tautan Tidak Sah*' 
	let res = await mediafiredl(args[0])
	let mimetype = await lookup(res.url)
	delete res.url2
	m.reply(Object.keys(res).map(v => `*• ${v.capitalize()}:* ${res[v]}`).join('\n') + '\n\n*File Sedang Dikirimkan...*')
	conn.sendMessage(m.chat, { document: { url: res.url }, fileName: res.filename, mimetype }, { quoted: m })
	await apivisit
}
handler.help = handler.alias = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire)$/i
handler.register = false
handler.limit = 1
export default handler