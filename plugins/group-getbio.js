let handler = async (m, { conn, text, command }) => {
  try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.quoted.sender ? m.quoted.sender : m.sender
    let bio = await conn.fetchStatus(who)
    m.reply(bio.status)
  } catch {
    if (text) throw `*Bio Dia Mode Private*`
    else try {
      let who = m.quoted ? m.quoted.sender : m.sender
      let bio = await conn.fetchStatus(who)
      m.reply(bio.status)
    } catch {
      throw `*Bio Dia Mode Private*`
    }
  }
}
handler.help = ['getbio'].map(v => v + ' <@tag / reply>')
handler.tags = ['group']
handler.command = /^(getb?io)$/i
handler.register = false
export default handler