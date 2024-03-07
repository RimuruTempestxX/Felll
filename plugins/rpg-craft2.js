let handler = async m => m.reply(`*List of Item Recipes*


Pickaxe ⛏️
*.craft2 pickaxe*
- 40 Kayu
- 20 Batu
- 20 Iron
- 80 String
Level Maks 11 📊

Ax 🛶
*craft2 ax*
- 40 Kayu
- 20 Batu
- 20 Iron
- 80 String
Level Maks 11 📊

Sword ⚔️
*.craft2 sword*
- 40 Kayu
- 60 Iron
Level Maks 11 📊

Fishingrod 🎣
*.craft2 fishingrod*
- 40 Kayu
- 8 Iron
- 80 String
Level Maks 4 📊

Armor 🥼
*.craft2 armor*
- 120 Iron
- 4 Emerald
- 20 Diamond
Level Maks 11 📊

ATM 💳
*.craft2 atm*
- 5 Plastik PVC
- 1 Semikonduktor
- 40000 Money (Biaya Admin)
Level Maks 100 📊
`.trim()) // Tambah sendiri kalo mau


handler.help = ['craft']
handler.tags = ['rpg']
handler.command = /^craft$/i
handler.premium = false
export default handler