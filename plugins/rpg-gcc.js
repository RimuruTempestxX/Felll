let gachaCharacter = async (m, { args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]

    const crystalNeeded = 3 // jumlah crystal yang dibutuhkan untuk 1x gacha
    let gachaCount = parseInt(args[0]) || 1 // jumlah gacha yang akan dilakukan, defaultnya 1

    // Cek apakah gachaCount merupakan nilai yang valid (hanya 1 sampai 10)
    if (gachaCount < 1 || gachaCount > 30 || gachaCount !== Math.floor(gachaCount)) {
        return m.reply('*Gacha Hanya Bisa Dilakukan 1× Sampai 30×.*')
    }

    const totalCrystalNeeded = crystalNeeded * gachaCount // total crystal yang dibutuhkan untuk semua gacha

    if (user.crystal < totalCrystalNeeded) {
        return m.reply(`
            Kamu tidak memiliki cukup crystal untuk melakukan gacha.
            Crystal yang dibutuhkan untuk ${gachaCount}× gacha adalah *${totalCrystalNeeded}*.
            Dapatkan Crystal di *Adventure, Misi & Crate.*
        `.trim())
    }

    let result = []
    let itemCount = {} // Objek untuk menyimpan jumlah item yang didapatkan

    for (let i = 0; i < gachaCount; i++) {
        const gachaResult = doGacha(user) // Mengirimkan data pengguna ke fungsi doGacha
        result.push(gachaResult)
        // Tambahkan item yang didapatkan ke data pengguna
        if (typeof gachaResult === 'string' && gachaResult.startsWith("Item ")) {
            const item = gachaResult.split(": ")[1]
            itemCount[item] = (itemCount[item] || 0) + 1 // Menambahkan jumlah item yang didapatkan
        }
    }

    let reply = `Hasil Gacha:\n`
    // Menampilkan hasil gacha
    result.forEach((item, index) => {
        if (typeof item === 'object' && item.hasOwnProperty('name')) {
            reply += `${index + 1}. ⭐ Karakter: ${item.name}\n`
        } else {
            reply += `${index + 1}. ${item}\n`
        }
    })

    // Menambahkan jumlah item yang didapatkan ke dalam pesan reply
    for (const item in itemCount) {
        reply += ``
    }

    // Kurangi jumlah crystal pengguna sesuai dengan jumlah crystal yang dibutuhkan
    user.crystal -= totalCrystalNeeded

    m.reply(reply.trim())
}

// Fungsi untuk melakukan gacha
function doGacha(user) {
    const randomNumber = Math.random() * 100 // generate angka random antara 0 dan 100

    if (randomNumber < 1) {
        // Logika untuk karakter...
        let character = {
            name: "Astoria",
            rarity: "⭐⭐⭐⭐⭐",
            level: 1,
            stats: {
                hp: 496,
                attack: 396,
                defense: 273
            },
            criticalRate: 0,
            criticalDamage: 50,
            element: "Inferno",
            elementalBonusDamage: 0,
            healingBonus: 0,
            weapon: 1
        };
        
        // Periksa apakah karakter pertama sudah ada atau belum
        if (!user.character) {
            user.character = character; // Jika belum ada, simpan karakter pertama
        } else if (!user.character2) {
            user.character2 = character; // Jika karakter kedua belum ada, simpan karakter kedua
        } else if (!user.character3) {
            user.character3 = character; // Jika karakter ketiga belum ada, simpan karakter ketiga
        } else {
            // Anda dapat menambahkan logika untuk menyimpan karakter tambahan di sini
            // Misalnya: user.character4 = character;
        }
        
        return character;
    } else if (randomNumber < 2) {
        user.enigma += 10;
        return "💠 Item Epic: Enigma 10";
    } else if (randomNumber < 4) {
        user.enigma += 7;
        return "💠 Item Epic: Enigma 7";
    } else if (randomNumber < 9) {
        user.enigma += 5;
        return "💠 Item Epic: Enigma 5";
    } else if (randomNumber < 15) {
        user.enigma += 3;
        return "💠 Item Epic: Enigma 3";
    } else if (randomNumber < 18) {
        user.enigma += 1;
        return "💠 Item Epic: Enigma 1";
    } else if (randomNumber < 50) {
        user.crystal += 2;
        return "🍃 Item Rare: Crystal 2";
    } else if (randomNumber < 100) {
        return "🍃 Item Rare: Money 1000"; // Contoh penanganan untuk item lainnya
    }
}



gachaCharacter.help = ['gcc <jumlah>']
gachaCharacter.tags = ['rpg']
gachaCharacter.command = /^gcc/i
gachaCharacter.register = false

export default gachaCharacter
