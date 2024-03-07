let upgradeCharacter = async (m, { args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]

    // Validasi apakah pengguna telah memilih karakter yang ingin ditingkatkan
    if (!args[0]) {
        return m.reply('Masukkan nama karakter yang ingin ditingkatkan.')
    }

    // Cari karakter yang diminta pengguna dalam daftar karakter yang dimiliki pengguna
    let selectedCharacter = Object.values(user).find(character => {
        return character && character.name && character.name.toLowerCase() === args[0].toLowerCase()
    })

    // Validasi apakah karakter yang dimasukkan oleh pengguna sesuai dengan yang dimiliki
    if (!selectedCharacter) {
        return m.reply('Karakter yang dimasukkan tidak ditemukan dalam daftar karakter yang dimiliki. Pastikan nama karakter sesuai dan tidak memperdulikan huruf kapital atau kecil.')
    }

    // Tentukan jumlah upgrade yang diinginkan oleh pengguna
    let upgradeCount = parseInt(args[1]) || 1

    // Validasi apakah upgradeCount merupakan nilai yang valid (hanya 1 sampai 10)
    if (upgradeCount < 1 || upgradeCount > 50 || upgradeCount !== Math.floor(upgradeCount)) {
        return m.reply('*Upgrade Hanya Bisa Dilakukan 1× Sampai 10×.*')
    }

    // Batasi jumlah upgrade agar tidak melebihi 160
    let remainingUpgrades = Math.min(160 - selectedCharacter.level, upgradeCount)

    // Validasi apakah karakter sudah mencapai level maksimal
    if (selectedCharacter.level >= 160) {
        return m.reply('Karakter ini sudah mencapai level maksimal.')
    }

    // Validasi apakah pengguna memiliki cukup enigma untuk melakukan upgrade
    let enigmaCost = remainingUpgrades
    if (user.enigma < enigmaCost) {
        return m.reply('Anda tidak memiliki cukup enigma untuk melakukan upgrade sebanyak itu.')
    }

    // Kurangi jumlah enigma pengguna sesuai dengan biaya upgrade
    user.enigma -= enigmaCost

    // Simpan nilai awal statistik karakter sebelum melakukan upgrade
    let initialStats = { ...selectedCharacter.stats }
    let initialLevel = selectedCharacter.level

    // Hitung presentase rasio keberhasilan upgrade
    let successRate = 50 // Rasio keberhasilan awal 50%
    let totalUpgradeAttempts = selectedCharacter.upgradeAttempts || 0
    let totalSuccessfulUpgrades = selectedCharacter.successfulUpgrades || 0
    let overallSuccessRate = totalUpgradeAttempts === 0 ? 0 : (totalSuccessfulUpgrades / totalUpgradeAttempts) * 100

    // Jumlah peningkatan yang berhasil
    let successfulUpgrades = 0

    // Lakukan upgrade untuk setiap jumlah upgrade yang diminta pengguna
    for (let i = 0; i < remainingUpgrades; i++) {
        // Lakukan upgrade dengan rasio keberhasilan 50%
        if (Math.random() * 100 < successRate) {
            successfulUpgrades++
            // Tingkatkan level karakter
            selectedCharacter.level++
            // Tingkatkan statistik karakter dengan peluang 90% untuk satu dari hp, attack, atau defense
            if (Math.random() < 0.9) {
                let statsToIncrease = ['hp', 'attack', 'defense']
                let selectedStat = statsToIncrease[Math.floor(Math.random() * statsToIncrease.length)]
                // Tingkatkan statistik antara 5% hingga 20%
                selectedCharacter.stats[selectedStat] *= (1 + (Math.random() * 0.15 + 0.05))
                // Bulatkan nilai statistik
                selectedCharacter.stats[selectedStat] = Math.round(selectedCharacter.stats[selectedStat])
            } else {
                // Tingkatkan bonus damage elemental atau bonus healing
                if (Math.random() < 0.05) {
                    // Tingkatkan bonus damage elemental antara 1% hingga 4%
                    selectedCharacter.elementalBonusDamage *= (1 + (Math.random() * 0.03 + 0.01))
                    // Bulatkan nilai bonus damage elemental
                    selectedCharacter.elementalBonusDamage = Math.round(selectedCharacter.elementalBonusDamage)
                } else {
                    // Tingkatkan bonus healing antara 2% hingga 4%
                    selectedCharacter.healingBonus *= (1 + (Math.random() * 0.02 + 0.02))
                    // Bulatkan nilai bonus healing
                    selectedCharacter.healingBonus = Math.round(selectedCharacter.healingBonus)
                }
            }
            // Tandai upgrade berhasil
            selectedCharacter.successfulUpgrades = (selectedCharacter.successfulUpgrades || 0) + 1
        }
        // Tandai jumlah percobaan upgrade
        selectedCharacter.upgradeAttempts = (selectedCharacter.upgradeAttempts || 0) + 1
    }

    // Simpan kembali data pengguna
    global.db.data.users[m.sender] = user

    // Tampilkan hasil upgrade
    let reply = `Hasil Peningkatan Level Untuk *${selectedCharacter.name}:*\n`
    reply += `📊 Level Awal: *${initialLevel}*\n`
    reply += `📊 Level Akhir: *${selectedCharacter.level}*\n`
    reply += `Statistik Karakter Sebelum Peningkatan:\n`
    for (const stat in initialStats) {
        let statIncrease = (selectedCharacter.stats[stat] - initialStats[stat])
        reply += `🔼 ${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${initialStats[stat]}  *+${statIncrease}*\n`
    }
    reply += `⏫ Bonus Damage Elemental: *${selectedCharacter.elementalBonusDamage}%*\n`
    reply += `🩺 Bonus Healing: *${selectedCharacter.healingBonus}%*\n\n`
    reply += `*Jumlah Peningkatan Berhasil ${successfulUpgrades} Dari ${remainingUpgrades} Upgrade*`
    m.reply(reply)
}

upgradeCharacter.help = ['upgrade <nama_karakter> [jumlah]']
upgradeCharacter.tags = ['rpg']
upgradeCharacter.command = /^upgrade/i
upgradeCharacter.register = true

export default upgradeCharacter
