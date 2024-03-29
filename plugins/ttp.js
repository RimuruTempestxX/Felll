import api from 'api-dylux';
import { sticker } from '../lib/sticker.js';
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) throw 'Format: *.ttp Teks*'
  try {
    const res = await api.ttp(text);
    const stiker = await sticker(false, res.result, global.packname, global.author);
    if (stiker) await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
  } catch (error) {
    console.error(error);
  }
};

handler.help = ['ttp'].map(v => v + ' <teks>');
handler.tags = ['sticker'];
handler.command = /^ttp$/i;
handler.limit = 1
export default handler;
