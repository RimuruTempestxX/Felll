let checkAllCharacters = async (m, { args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]

    let reply = '*Kamu Memiliki Karakter Berikut Ini:*\n\n';

    Object.keys(user).forEach(key => {
        if (key.startsWith('character')) {
            const character = user[key];
            reply += `🪪 Nama: *${character.name}*\n📊 Level: *${character.level}*\n💫 Rarity: *${character.rarity}*\n♥️ HP: *${character.stats.hp}*\n🗡️ Attack: *${character.stats.attack}*\n🛡️ Defense: *${character.stats.defense}*\n💢 Critical Rate: *${character.criticalRate}*\n⚔️ Critical Damage: *${character.criticalDamage}*\n🪄 Element: *${character.element}*\n⏫ Elemental Bonus Damage: *${character.elementalBonusDamage}*\n🩺Healing Bonus: *${character.healingBonus}*\n🔪 Weapon: *${character.weapon}*\n\n--------------------------------------------------------------------\n`;
        }
    });

    m.reply(reply.trim());
}

checkAllCharacters.help = ['cc']
checkAllCharacters.tags = ['rpg']
checkAllCharacters.command = /^cc$/i
checkAllCharacters.register = false

export default checkAllCharacters
