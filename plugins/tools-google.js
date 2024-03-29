import { googleIt } from '@bochilteam/scraper'
let handler = async (m, { conn, command, args }) => {
    const fetch = (await import('node-fetch')).default
    let full = /f$/i.test(command)
    let text = args.join` `
    if (!text) return conn.reply(m.chat, 'Format: *.google Kata Kunci*', m)
    let url = 'https://google.com/search?q=' + encodeURIComponent(text)
    let search = await googleIt(text)
    let msg = search.articles.map(({
        // header,
        title,
        url,
        description
    }) => {
        return `*${title}*\n*${url}*\n*${description}*`
    }).join('\n\n')
    try {
        let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).arrayBuffer()
        if (/<!DOCTYPE html>/i.test(ss.toBuffer().toString())) throw ''
        await conn.sendFile(m.chat, ss, 'screenshot.png', url + '\n\n' + msg, m)
    } catch (e) {
        m.reply(msg)
    }
}
handler.help = ['google']
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.limit = 1
handler.register = false
export default handler