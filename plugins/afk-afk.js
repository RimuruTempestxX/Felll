let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    let caption = `${conn.getName(m.sender)} @${m.sender.replace(/@.+/, '')} Sekarang Lagi AFK\nDengan Alasan${text ? ': ' + text : ''}`
    let kataafk = ['mau turu', 'mau nyolong', 'Ke rumah ayang', 'jagain lilin', 'beli pop es', 'kawin lari', 'main kelereng', 'petak umpet', 'push renk', 'push up joni', 'olahraga', 'onani', 'beraq', 'open bo', 'di suruh emak', 'kerja']
    conn.reply(m.chat, caption, m, { mentions: conn.parseMention(caption) })
}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.group = true
handler.register = false
handler.command = /^afk$/i

export default handler