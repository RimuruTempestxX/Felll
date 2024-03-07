// Fungsi untuk melakukan gacha karakter
let gachaCharacter = async (m, { args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]

    let gachaCount = parseInt(args[0]) || 1

    if (gachaCount < 1 || gachaCount > 10 || isNaN(gachaCount)) {
        return m.reply('Jumlah gacha tidak valid. Gunakan angka antara 1 dan 10.')
    }

    const gachaCost = 10
    const totalCost = gachaCost * gachaCount

    if (user.coins < totalCost) {
        return m.reply(`Maaf, kamu tidak memiliki cukup koin untuk melakukan gacha. Total biaya gacha adalah ${totalCost} koin.`)
    }

    let gachaResults = []

    for (let i = 0; i < gachaCount; i++) {
        let rarity = Math.random() < 0.1 ? 'Legendary' : 'Rare'
        let character = generateRandomCharacter(rarity)
        gachaResults.push(character)
    }

    user.coins -= totalCost

    // Format hasil gacha sebelum dikirim
    let reply = 'Berikut adalah hasil gacha karakter kamu:\n\n'
    gachaResults.forEach((character, index) => {
        reply += `Gacha ke-${index + 1}:\n`
        reply += `Nama: ${character.name}\n`
        reply += `Level: ${character.level}\n`
        reply += `Statistik:\n`
        reply += `  - HP: ${character.stats.hp}\n`
        reply += `  - Attack: ${character.stats.attack}\n`
        reply += `  - Defense: ${character.stats.defense}\n`
        reply += `Critical Rate: ${character.criticalRate}%\n`
        reply += `Critical Damage: ${character.criticalDamage}%\n`
        reply += `Elemen: ${character.element}\n`
        reply += `Bonus Damage Elemen: ${character.elementalBonusDamage}%\n`
        reply += `Bonus Healing: ${character.healingBonus}%\n`
        reply += `Evolusi: ${character.evolution}\n`
        reply += `Senjata: ${character.weapon}\n\n`
    })

    m.reply(reply)
}

// Fungsi untuk menghasilkan karakter acak berdasarkan kelangkaan
let generateRandomCharacter = (rarity) => {
    let character = {
        name: generateRandomName(), // Menghasilkan nama karakter acak
        level: Math.floor(Math.random() * 100) + 1, // Level antara 1 dan 100
        stats: generateRandomStats(), // Statistik acak
        criticalRate: Math.floor(Math.random() * 100) + 1, // Rate kritis acak antara 1 dan 100
        criticalDamage: Math.floor(Math.random() * 100) + 1, // Damage kritis acak antara 1 dan 100
        element: generateRandomElement(), // Elemen acak
        elementalBonusDamage: Math.floor(Math.random() * 100) + 1, // Bonus damage elemen acak antara 1 dan 100
        healingBonus: Math.floor(Math.random() * 100) + 1, // Bonus healing acak antara 1 dan 100
        evolution: generateRandomEvolution(), // Evolusi acak
        weapon: generateRandomWeapon() // Senjata acak
    }

    return character
}

// Fungsi untuk menghasilkan nama karakter acak (contoh)
let generateRandomName = () => {
    // Logika untuk menghasilkan nama acak
    return "Karakter Acak"
}

// Fungsi untuk menghasilkan statistik karakter acak (contoh)
let generateRandomStats = () => {
    // Logika untuk menghasilkan statistik acak
    return {
        hp: Math.floor(Math.random() * 1000) + 1, // HP acak antara 1 dan 1000
        attack: Math.floor(Math.random() * 1000) + 1, // Serangan acak antara 1 dan 1000
        defense: Math.floor(Math.random() * 1000) + 1 // Pertahanan acak antara 1 dan 1000
    }
}

// Fungsi untuk menghasilkan elemen karakter acak (contoh)
let generateRandomElement = () => {
    // Logika untuk menghasilkan elemen acak
    return "Fire"
}

// Fungsi untuk menghasilkan evolusi karakter acak (contoh)
let generateRandomEvolution = () => {
    // Logika untuk menghasilkan evolusi acak
    return "Evolusi 1"
}

// Fungsi untuk menghasilkan senjata karakter acak (contoh)
let generateRandomWeapon = () => {
    // Logika untuk menghasilkan senjata acak
    return "Pedang"
}

// Menambahkan properti untuk bantuan, tag, pola perintah, dan status pendaftaran
gachaCharacter.help = ['gachacharacter <jumlah>']
gachaCharacter.tags = ['rpg']
gachaCharacter.command = /^gachacharacter/i
gachaCharacter.register = true

// Menyematkan fungsi ke modul ekspor
export default gachaCharacter